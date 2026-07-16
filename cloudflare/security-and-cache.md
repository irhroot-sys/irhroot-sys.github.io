# Cloudflare edge configuration

Apply these rules to the `aalkc.com` zone after authenticating Wrangler or the Cloudflare dashboard. They are intentionally not automated with unreviewed DNS changes.

## Response headers

Create an HTTP Response Header Modification Rule for `aalkc.com/*`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()`
- `X-Frame-Options: DENY`
- `Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://images.unsplash.com; media-src 'self'; frame-src https://www.google.com https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; report-to csp-endpoint`

Review reports, resolve violations, then change the last header name to `Content-Security-Policy`.

## Cache rules

- HTML, `/`, and `/404.html`: browser and edge TTL 5 minutes; respect revalidation.
- `/assets/*` with a hashed filename: `public, max-age=31536000, immutable`.
- `/api/*`: bypass cache. The Worker owns its explicit market-data cache.

## Operational checks

- Enable Worker exception, D1 error, queue retry/dead-letter, and email-delivery alerts.
- Alert when the market snapshot is older than 15 minutes; reject it at six hours.
- Configure the quote rate-limit binding before enabling production submission.
- Audit current MX, SPF, DKIM, and DMARC records before changing mail DNS.

The 2026-07-16 read-only audit found PurelyMail MX, `include:_spf.purelymail.com`, and reject-mode DMARC delegated to PurelyMail. Preserve those records unless the mail owner approves a coordinated migration.
