import { clearStaleMarketCache, getMarketSnapshot } from './market';
import type { Env, QuoteInput, QuoteNotification } from './types';
import { parseQuoteInput, ValidationError } from './validation';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const MAX_BODY_BYTES = 16_384;
const QUOTE_RETENTION_DAYS = 90;

function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: JSON_HEADERS });
}

function allowedOrigin(request: Request, env: Env) {
  const origin = request.headers.get('origin');
  if (env.ENVIRONMENT !== 'production') return !origin || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return origin === 'https://aalkc.com' || origin === 'https://www.aalkc.com';
}

export async function verifyTurnstile(token: string, secret: string, remoteip?: string) {
  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteip) body.set('remoteip', remoteip);
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
  return result.success === true &&
    (result.hostname === 'aalkc.com' || result.hostname === 'www.aalkc.com') &&
    result.action === 'quote_request';
}

async function createQuote(request: Request, env: Env) {
  if (!allowedOrigin(request, env)) return json({ error: 'origin_not_allowed' }, 403);
  if (!env.TURNSTILE_SECRET) return json({ error: 'service_not_configured' }, 503);

  const contentLength = Number(request.headers.get('content-length') || '0');
  if (contentLength > MAX_BODY_BYTES) return json({ error: 'payload_too_large' }, 413);

  let input: QuoteInput;
  try {
    input = parseQuoteInput(await request.json());
  } catch (error) {
    if (error instanceof ValidationError) return json({ error: 'validation_failed', fields: error.fields }, 400);
    return json({ error: 'invalid_json' }, 400);
  }

  const clientIp = request.headers.get('CF-Connecting-IP') || undefined;
  if (env.QUOTE_RATE_LIMITER && clientIp) {
    const rate = await env.QUOTE_RATE_LIMITER.limit({ key: clientIp });
    if (!rate.success) return json({ error: 'rate_limited' }, 429);
  }
  if (!await verifyTurnstile(input.turnstileToken, env.TURNSTILE_SECRET, clientIp)) {
    return json({ error: 'turnstile_failed' }, 403);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date();
  const expiresAt = quoteExpiry(createdAt);
  await env.DB.prepare(`INSERT INTO quote_requests
    (id, name, company, email, phone, message, material, weight_tons, currency, market_snapshot_id, consent_at, created_at, expires_at, notification_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'queued')`)
    .bind(id, input.name, input.company ?? null, input.email, input.phone, input.message,
      input.material ?? null, input.weightTons ?? null, input.currency ?? null,
      input.marketSnapshotId ?? null, createdAt.toISOString(), createdAt.toISOString(), expiresAt.toISOString())
    .run();

  const { turnstileToken: _discarded, ...safeQuote } = input;
  try {
    await env.QUOTE_QUEUE.send({ id, quote: safeQuote, createdAt: createdAt.toISOString() });
  } catch {
    await env.DB.prepare("UPDATE quote_requests SET notification_status = 'failed' WHERE id = ?").bind(id).run();
  }
  return json({ id, status: 'received' }, 202);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);
}

export function quoteExpiry(createdAt: Date) {
  return new Date(createdAt.getTime() + QUOTE_RETENTION_DAYS * 24 * 60 * 60 * 1000);
}

export function buildQuoteEmail(message: QuoteNotification, to = 'contact@aalkc.com', from = 'quotes@aalkc.com') {
  const quote = message.quote;
  const text = [
    `Quote reference: ${message.id}`, `Name: ${quote.name}`, `Company: ${quote.company || '-'}`,
    `Email: ${quote.email}`, `Phone: ${quote.phone}`, `Material: ${quote.material || '-'}`,
    `Weight: ${quote.weightTons ? `${quote.weightTons} tons` : '-'}`, `Currency: ${quote.currency || '-'}`,
    '', quote.message,
  ].join('\n');
  return { to, from, subject: `AALKC quote request ${message.id}`, text, html: `<h1>New AALKC quote request</h1><pre>${escapeHtml(text)}</pre>` };
}

async function sendQuoteNotification(message: QuoteNotification, env: Env) {
  const to = env.QUOTE_TO_EMAIL || 'contact@aalkc.com';
  const from = env.QUOTE_FROM_EMAIL || 'quotes@aalkc.com';
  await env.EMAIL.send(buildQuoteEmail(message, to, from));
  await env.DB.prepare("UPDATE quote_requests SET notification_status = 'sent' WHERE id = ?").bind(message.id).run();
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/api/health') return json({ status: 'ok' });
    if (request.method === 'GET' && url.pathname === '/api/market') {
      try {
        const snapshot = await getMarketSnapshot(env);
        return snapshot ? json(snapshot) : json({ status: 'unavailable', reason: 'provider_not_configured' }, 503);
      } catch {
        return json({ status: 'unavailable', reason: 'provider_error' }, 503);
      }
    }
    if (request.method === 'POST' && url.pathname === '/api/quotes') return createQuote(request, env);
    return json({ error: 'not_found' }, 404);
  },
  async queue(batch: MessageBatch<QuoteNotification>, env: Env) {
    for (const message of batch.messages) {
      try {
        await sendQuoteNotification(message.body, env);
        message.ack();
      } catch {
        message.retry();
      }
    }
  },
  async scheduled(_controller: ScheduledController, env: Env) {
    await env.DB.prepare('DELETE FROM quote_requests WHERE expires_at < ?').bind(new Date().toISOString()).run();
    await clearStaleMarketCache(env);
  },
} satisfies ExportedHandler<Env, QuoteNotification>;
