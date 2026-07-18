import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildQuoteEmail, quoteExpiry, verifyTurnstile } from '../../worker/src/index';

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
});
