import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  buildQuoteEmail, isFinalQueueAttempt, notificationFromRow, quoteExpiry, requeueFailedNotifications,
  safeEmailErrorCode, sendViaResend, verifyTurnstile,
} from '../../worker/src/index';
import type { Env } from '../../worker/src/types';

afterEach(() => vi.unstubAllGlobals());

describe('quote retention and notifications', () => {
  it('expires stored quote requests after 90 days', () => {
    const createdAt = new Date('2026-01-01T00:00:00.000Z');
    expect(quoteExpiry(createdAt).toISOString()).toBe('2026-04-01T00:00:00.000Z');
  });

  it('builds an escaped notification payload without a Turnstile token', () => {
    const email = buildQuoteEmail({
      id: 'quote-123', createdAt: '2026-01-01T00:00:00.000Z',
      quote: { name: '<Buyer>', email: 'buyer@example.com', phone: '+966551234567', message: '<script>alert(1)</script>', consent: true },
    });
    expect(email).toMatchObject({ from: 'quotes@aalkc.com', to: 'contact@aalkc.com', subject: 'AALKC quote request quote-123' });
    expect(email.html).not.toContain('<script>');
    expect(JSON.stringify(email)).not.toContain('turnstile');
  });

  it('accepts only the quote action from an AALKC hostname', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ success: true, hostname: 'aalkc.com', action: 'quote_request' })));
    await expect(verifyTurnstile('token', 'secret')).resolves.toBe(true);
  });

  it('rejects otherwise valid Turnstile responses from another hostname', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ success: true, hostname: 'attacker.example', action: 'quote_request' })));
    await expect(verifyTurnstile('token', 'secret')).resolves.toBe(false);
  });

  it('recognizes the final attempt after the configured retry limit', () => {
    expect(isFinalQueueAttempt(5)).toBe(false);
    expect(isFinalQueueAttempt(6)).toBe(true);
  });

  it('records only a bounded provider error code', () => {
    expect(safeEmailErrorCode({ code: 'E_SENDER_NOT_VERIFIED', message: 'sensitive provider detail' })).toBe('E_SENDER_NOT_VERIFIED');
    expect(safeEmailErrorCode(new Error('sensitive provider detail'))).toBe('EMAIL_SEND_FAILED');
    expect(safeEmailErrorCode({ code: 'bad code/value' })).toBe('BAD_CODE_VALUE');
  });
});

describe('quote notification delivery', () => {
  const notification = {
    id: 'quote-9', createdAt: '2026-01-01T00:00:00.000Z',
    quote: { name: 'Buyer', email: 'buyer@example.com', phone: '+966551234567', message: 'Copper cable, 20 t', consent: true as const },
  };

  it('replies to the customer, not to the sending address', () => {
    expect(buildQuoteEmail(notification).replyTo).toBe('buyer@example.com');
  });

  it('sends through Resend with the bearer key and reply-to', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ id: 'msg_1' }));
    vi.stubGlobal('fetch', fetchMock);
    await sendViaResend(buildQuoteEmail(notification), 're_test');
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers.Authorization).toBe('Bearer re_test');
    expect(JSON.parse(init.body)).toMatchObject({ to: ['contact@aalkc.com'], reply_to: 'buyer@example.com', from: 'AALKC Website <quotes@aalkc.com>' });
  });

  it('turns a Resend rejection into a bounded error code', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ name: 'validation_error', message: 'secret detail' }, { status: 422 })));
    const error = await sendViaResend(buildQuoteEmail(notification), 're_test').catch((e) => e);
    expect(safeEmailErrorCode(error)).toBe('RESEND_422_VALIDATION_ERROR');
  });

  it('rebuilds a queue message from a stored row without empty optional fields', () => {
    const message = notificationFromRow({
      id: 'q1', name: 'A', company: null, email: 'a@example.com', phone: '1', message: 'm',
      material: 'Copper', weight_tons: 4, currency: null, market_snapshot_id: null, created_at: '2026-01-01T00:00:00.000Z',
    });
    expect(message.quote).toEqual({ name: 'A', email: 'a@example.com', phone: '1', message: 'm', consent: true, material: 'Copper', weightTons: 4 });
  });

  function fakeEnv(rows: unknown[], resendKey?: string) {
    const sent: unknown[] = [];
    const updates: string[] = [];
    const env = {
      RESEND_API_KEY: resendKey,
      QUOTE_QUEUE: { send: async (m: unknown) => { sent.push(m); } },
      DB: { prepare: (sql: string) => ({ bind: (...args: unknown[]) => ({
        all: async () => ({ results: rows }),
        run: async () => { updates.push(`${sql.trim().split(' ')[0]} ${args[0]}`); },
      }) }) },
    } as unknown as Env;
    return { env, sent, updates };
  }

  it('re-queues failed notifications once a sender is configured', async () => {
    const row = { id: 'q1', name: 'A', company: null, email: 'a@example.com', phone: '1', message: 'm', material: null, weight_tons: null, currency: null, market_snapshot_id: null, created_at: '2026-01-01T00:00:00.000Z' };
    const { env, sent, updates } = fakeEnv([row], 're_test');
    await expect(requeueFailedNotifications(env)).resolves.toBe(1);
    expect(updates).toEqual(['UPDATE q1']);
    expect(sent).toHaveLength(1);
  });

  it('keeps a notification failed when it cannot be queued again', async () => {
    const row = { id: 'q2', name: 'A', company: null, email: 'a@example.com', phone: '1', message: 'm', material: null, weight_tons: null, currency: null, market_snapshot_id: null, created_at: '2026-01-01T00:00:00.000Z' };
    const { env, updates } = fakeEnv([row], 're_test');
    (env.QUOTE_QUEUE as unknown as { send: () => Promise<void> }).send = async () => { throw new Error('queue unavailable'); };
    await expect(requeueFailedNotifications(env)).resolves.toBe(0);
    expect(updates).toEqual(['UPDATE q2', 'UPDATE q2']);
  });

  it('leaves failed notifications alone while no sender is configured', async () => {
    const { env, sent } = fakeEnv([{ id: 'q1' }]);
    await expect(requeueFailedNotifications(env)).resolves.toBe(0);
    expect(sent).toHaveLength(0);
  });
});
