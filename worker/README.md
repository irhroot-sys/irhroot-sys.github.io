# AALKC API Worker

The Worker exposes same-origin market and quote APIs. Live market data remains disabled until a licensed provider supplies the canonical market response documented by `GET /api/market`.

## Provisioning

1. Authenticate Wrangler and create D1 database `aalkc-quotes`, KV namespace `MARKET_CACHE`, queue `aalkc-quote-notifications`, and dead-letter queue `aalkc-quote-notifications-dlq`. Confirm the `QUOTE_RATE_LIMITER` namespace ID is unique within the account.
2. Copy `wrangler.example.jsonc` to `wrangler.jsonc` and replace the D1/KV IDs.
3. Apply `schema.sql` to local and remote D1.
4. Onboard `aalkc.com` in Cloudflare Email Service without replacing existing SPF/DKIM/DMARC records.
5. Add `TURNSTILE_SECRET` with `wrangler secret put`. Add `MARKET_API_KEY` only after selecting a licensed provider.
6. Set `MARKET_PROVIDER_URL` and `MARKET_PROVIDER_NAME`, deploy, and verify `/api/health`, `/api/market`, and a Turnstile-protected quote submission.

Never commit `wrangler.jsonc`, `.dev.vars`, API keys, or Turnstile secrets.
