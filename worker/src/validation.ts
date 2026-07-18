import type { Currency, QuoteInput } from './types';

export class ValidationError extends Error {
  constructor(public readonly fields: Record<string, string>) {
    super('Invalid quote request');
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9\s()-]{8,30}$/;

function text(value: unknown, field: string, min: number, max: number, required = true) {
  if (value == null || value === '') {
    if (required) throw new ValidationError({ [field]: `${field} is required` });
    return undefined;
  }
  if (typeof value !== 'string') throw new ValidationError({ [field]: `${field} must be text` });
  const normalized = value.trim();
  if (normalized.length < min || normalized.length > max) {
    throw new ValidationError({ [field]: `${field} must be ${min}-${max} characters` });
  }
  return normalized;
}

export function parseQuoteInput(value: unknown): QuoteInput {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ValidationError({ body: 'A JSON object is required' });
  }
  const input = value as Record<string, unknown>;
  const fields: Record<string, string> = {};

  const capture = <T>(field: string, reader: () => T): T | undefined => {
    try {
      return reader();
    } catch (error) {
      if (error instanceof ValidationError) Object.assign(fields, error.fields);
      else fields[field] = `${field} is invalid`;
      return undefined;
    }
  };

  const name = capture('name', () => text(input.name, 'name', 2, 100));
  const company = capture('company', () => text(input.company, 'company', 1, 120, false));
  const email = capture('email', () => {
    const result = text(input.email, 'email', 3, 254)!;
    if (!emailPattern.test(result)) throw new ValidationError({ email: 'Enter a valid email address' });
    return result;
  });
  const phone = capture('phone', () => {
    const result = text(input.phone, 'phone', 8, 30)!;
    if (!phonePattern.test(result)) throw new ValidationError({ phone: 'Enter a valid phone number' });
    return result;
  });
  const message = capture('message', () => text(input.message, 'message', 10, 2000));
  const material = capture('material', () => text(input.material, 'material', 1, 80, false));
  const marketSnapshotId = capture('marketSnapshotId', () => text(input.marketSnapshotId, 'marketSnapshotId', 1, 100, false));
  const turnstileToken = capture('turnstileToken', () => text(input.turnstileToken, 'turnstileToken', 1, 2048));

  let weightTons: number | undefined;
  if (input.weightTons != null && input.weightTons !== '') {
    if (typeof input.weightTons !== 'number' || !Number.isFinite(input.weightTons) || input.weightTons < 0.1 || input.weightTons > 1000) {
      fields.weightTons = 'weightTons must be between 0.1 and 1000';
    } else weightTons = input.weightTons;
  }

  let currency: Currency | undefined;
  if (input.currency != null) {
    if (input.currency !== 'SAR' && input.currency !== 'USD') fields.currency = 'currency must be SAR or USD';
    else currency = input.currency;
  }

  if (input.consent !== true) fields.consent = 'Consent is required';
  if (Object.keys(fields).length) throw new ValidationError(fields);

  return {
    name: name!, company, email: email!, phone: phone!, message: message!, material,
    weightTons, currency, marketSnapshotId, consent: true, turnstileToken: turnstileToken!,
  };
}
