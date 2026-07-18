import { describe, expect, it } from 'vitest';
import { buildQuoteEmail, quoteExpiry } from '../../worker/src/index';

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
});
