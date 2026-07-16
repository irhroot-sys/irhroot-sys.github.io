export type Currency = 'SAR' | 'USD';

export interface MarketMetal {
  code: string;
  name: string;
  price: number;
  changePct24h: number | null;
}

export interface MarketSnapshot {
  status: 'ok';
  snapshotId: string;
  source: string;
  asOf: string;
  expiresAt: string;
  currency: 'USD';
  unit: 'metric_ton';
  metals: MarketMetal[];
}

export interface QuoteInput {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  material?: string;
  weightTons?: number;
  currency?: Currency;
  marketSnapshotId?: string;
  consent: true;
  turnstileToken: string;
}

export interface QuoteNotification {
  id: string;
  quote: Omit<QuoteInput, 'turnstileToken'>;
  createdAt: string;
}

export interface EmailSendBinding {
  send(message: {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
  }): Promise<{ messageId: string }>;
}

export interface RateLimiterBinding {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  DB: D1Database;
  MARKET_CACHE: KVNamespace;
  QUOTE_QUEUE: Queue<QuoteNotification>;
  EMAIL: EmailSendBinding;
  QUOTE_RATE_LIMITER?: RateLimiterBinding;
  ENVIRONMENT: 'development' | 'production';
  MARKET_PROVIDER_NAME?: string;
  MARKET_PROVIDER_URL?: string;
  MARKET_API_KEY?: string;
  TURNSTILE_SECRET?: string;
  QUOTE_FROM_EMAIL?: string;
  QUOTE_TO_EMAIL?: string;
}
