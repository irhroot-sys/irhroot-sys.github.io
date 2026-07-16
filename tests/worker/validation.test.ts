import { describe, expect, it } from 'vitest';
import { parseQuoteInput, ValidationError } from '../../worker/src/validation';

const validQuote = {
  name: 'AALKC Customer',
  email: 'customer@example.com',
  phone: '+966 55 123 4567',
  message: 'Please quote five tons of copper scrap.',
  material: 'Copper',
  weightTons: 5,
  currency: 'SAR',
  consent: true,
  turnstileToken: 'verified-token',
};

describe('parseQuoteInput', () => {
  it('normalizes a valid quote', () => {
    expect(parseQuoteInput(validQuote)).toMatchObject({
      name: 'AALKC Customer',
      email: 'customer@example.com',
      material: 'Copper',
      weightTons: 5,
      currency: 'SAR',
      consent: true,
    });
  });

  it('rejects missing consent and malformed contact details', () => {
    try {
      parseQuoteInput({ ...validQuote, email: 'invalid', phone: '123', consent: false });
      throw new Error('Expected validation to fail');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).fields).toMatchObject({
        email: expect.any(String), phone: expect.any(String), consent: expect.any(String),
      });
    }
  });

  it('rejects unbounded quote weights and messages', () => {
    expect(() => parseQuoteInput({ ...validQuote, weightTons: 1001, message: 'short' })).toThrow(ValidationError);
  });
});
