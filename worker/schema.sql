CREATE TABLE IF NOT EXISTS quote_requests (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  material TEXT,
  weight_tons REAL,
  currency TEXT CHECK (currency IS NULL OR currency IN ('SAR', 'USD')),
  market_snapshot_id TEXT,
  consent_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  notification_status TEXT NOT NULL CHECK (notification_status IN ('queued', 'sent', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_quote_requests_expires_at ON quote_requests(expires_at);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at);

CREATE TABLE IF NOT EXISTS quote_notification_failures (
  quote_id TEXT PRIMARY KEY,
  error_code TEXT NOT NULL,
  attempts INTEGER NOT NULL,
  failed_at TEXT NOT NULL,
  FOREIGN KEY (quote_id) REFERENCES quote_requests(id) ON DELETE CASCADE
);
