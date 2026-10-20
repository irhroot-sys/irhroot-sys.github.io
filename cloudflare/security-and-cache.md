# Cloudflare edge configuration

Apply these rules to the `aalkc.com` zone after authenticating Wrangler or the Cloudflare dashboard. They are intentionally not automated with unreviewed DNS changes.

## Response headers

The edge Worker ([`spa-fallback-worker/`](../spa-fallback-worker)) now sends these on every page, so no Header Modification Rule is needed for them:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), geolocation=(), microphone=(), payment=(), usb=()`
- `X-Frame-Options: DENY`
- `Content-Security-Policy: frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'`

Still to stage by hand — a full script/style policy, report-only first. Create an HTTP Response Header Modification Rule for `aalkc.com/*`:

- `Content-Security-Policy-Report-Only: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; media-src 'self'; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com https://cloudflareinsights.com; report-to csp-endpoint`

`static.cloudflareinsights.com` / `cloudflareinsights.com` are Cloudflare Web Analytics, which is enabled on the zone. Review reports, resolve violations, then move the policy into the Worker's `Content-Security-Policy` header.

## Cache rules

The edge Worker sets browser cache lifetimes itself:

- Pages: `public, max-age=300, must-revalidate`; the 404 document: `max-age=60`.
- Fingerprinted build files under `/assets/` (`name-<hash>.js|css|woff2|svg`): `public, max-age=31536000, immutable`.
- Photos and generated image variants: `public, max-age=604800, stale-while-revalidate=86400`.
- `/api/*`: untouched; the quotes Worker owns its explicit market-data cache. Keep a Cache Rule that bypasses cache for it.

## robots.txt

Cloudflare's managed robots.txt is enabled and prepends its own rules, including a `User-agent: *` group. `public/robots.txt` therefore only adds the sitemap line. If the managed robots.txt is ever switched off, the file still allows all crawling.

## Operational checks

- Enable Worker exception, D1 error, queue retry/dead-letter, and email-delivery alerts.
- Alert when the market snapshot is older than 15 minutes; reject it at six hours.
- Configure the quote rate-limit binding before enabling production submission.
- Audit current MX, SPF, DKIM, and DMARC records before changing mail DNS.

The 2026-07-16 read-only audit found PurelyMail MX, `include:_spf.purelymail.com`, and reject-mode DMARC delegated to PurelyMail. Preserve those records unless the mail owner approves a coordinated migration.
