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

## Mail, DNS and the quote API (as of November 2026)

- **Mail** is hosted by Hostinger: MX `mx1`/`mx2.hostinger.com`, SPF `include:_spf.mail.hostinger.com`, DKIM `hostingermail-a/b/c._domainkey`. `contact@`, `himel@`, `purchase@`, `sale@` and `shahid@` are aliases of the `info@aalkc.com` mailbox. The bare TXT at the apex added on 6 October 2026 is Hostinger's domain-ownership check; keep it.
- **DMARC** is one TXT record at `_dmarc`: `p=quarantine; rua=mailto:info@aalkc.com`. Never add a CNAME at that name.
- **BIMI** `default._bimi` points to `/bimi/aalkc-logo.svg`. Gmail also requires a VMC or CMC certificate before it shows the logo.
- **Resend** sends quote notifications from `quotes@aalkc.com` (DKIM `resend._domainkey`, return path `send.aalkc.com`). The API Worker uses it when the `RESEND_API_KEY` secret is set on `aalkc-api`; without it, notifications fall back to the `send_email` binding, which can only reach verified Email Routing destinations and therefore fails. Failed notifications are re-queued by the daily job once a key exists.
- **Purelymail** is no longer the mail host, but the `aalkc-webmail` Worker is still configured for Purelymail and its ownership TXT is kept until the webmail is moved.
- **`/api/*`** must stay public: never put a Cloudflare Access application on the `aalkc-api` Worker (it turns every quote submission into a login redirect). Turnstile protects the form.
- **TLS:** Always Use HTTPS on, minimum TLS 1.2, SSL mode **Full**. Full (strict) returns error 526, because GitHub Pages does not serve a certificate for aalkc.com behind the Cloudflare proxy; do not switch it until GitHub shows a valid certificate for the custom domain.
- **www** redirects to the apex with a 301 (a Single Redirect rule); its CNAME points to `irhroot-sys.github.io`.
- **To do in the dashboard:** enable DNSSEC (the domain is registered at Cloudflare, so the DS record is added automatically) and add CAA records (`0 issue "letsencrypt.org"`, `0 iodef "mailto:info@aalkc.com"`; Cloudflare adds its own CAs once a CAA record exists).
- The **Workers Builds** check on GitHub fails on every commit: a dashboard build is connected to the repository root, where there is no Worker configuration. Deploy the API Worker with `worker/` configuration instead, and disconnect that build if the failing check is unwanted.

## Operational checks

- Enable Worker exception, D1 error, queue retry/dead-letter, and email-delivery alerts.
- Alert when the market snapshot is older than 15 minutes; reject it at six hours.
- Confirm the quote rate-limit binding stays configured.
- Audit MX, SPF, DKIM and DMARC before changing mail DNS, and keep this page in step with the zone.
