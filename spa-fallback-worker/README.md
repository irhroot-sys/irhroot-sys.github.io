# AALKC edge Worker

Sits in front of GitHub Pages on `aalkc.com/*` and `www.aalkc.com/*`. GitHub
Pages only hosts files; this Worker gives the prerendered site the behaviour
a real web server would:

| Request | Response |
| --- | --- |
| `/`, `/services`, `/ar`, `/ar/services`, … | **200** with that page's prerendered file (`/index.html`, `/services.html`, `/ar.html`, `/ar/services.html`, …) |
| Any URL with no page, e.g. `/old-page`, `/ar/old-page` | **404** with the prerendered `404.html` / `ar/404.html` (`noindex`) |
| `/services/`, `/services.html`, `/index.html`, `/ar/` | **301** to the canonical URL |
| `/products`, `/ar/products` | **301** to `/materials`, `/ar/materials` |
| Fingerprinted build files (`/assets/index-B5DAFa_R.js`, fonts, CSS) | `Cache-Control: public, max-age=31536000, immutable` |
| Photos and image variants | `Cache-Control: public, max-age=604800, stale-while-revalidate=86400` |
| Pages | `Cache-Control: public, max-age=300, must-revalidate` plus security headers |
| `/api/*` | Passed through untouched (owned by the quotes Worker in [`worker/`](../worker)) |

Security headers on pages: `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options: DENY` and a minimal
`Content-Security-Policy` (`frame-ancestors`, `base-uri`, `object-src`,
`form-action`). A full script/style policy is staged separately — see
[`cloudflare/security-and-cache.md`](../cloudflare/security-and-cache.md).

Retired URLs live in `REDIRECTS` in [`src/index.ts`](src/index.ts) and must
match `redirects` in [`src/routes.jsx`](../src/routes.jsx).

## Deploy order — important

This Worker serves the prerendered files (`/about.html`, `/ar/about.html`, …)
that the Pages build produces. **Deploy the site first, then the Worker:**

1. Merge to `main` and let **Deploy Pages** finish.
2. Actions → **Deploy SPA Fallback Worker** → Run workflow (uses the
   `production` environment's `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID`).

Deploying the Worker before the new Pages build is live would send page
requests to `.html` files that do not exist yet. The reverse order is safe:
until the new Worker is deployed, the previous one keeps serving the homepage
document for every route and the app renders the right page in the browser,
exactly as before.

Local alternative to step 2:

```bash
npm ci
npx wrangler login
npx wrangler deploy --config spa-fallback-worker/wrangler.jsonc
```

## Verify it worked

```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://aalkc.com/services          # 200
curl -s https://aalkc.com/ar/services | grep -o '<title>[^<]*'                # Arabic title
curl -sS -o /dev/null -w "%{http_code}\n" https://aalkc.com/no-such-page      # 404
curl -sSI https://aalkc.com/services/ | grep -i '^location'                    # /services
curl -sSI https://aalkc.com/services | grep -iE 'x-frame-options|content-security-policy'
curl -sS -o /dev/null -w "%{http_code}\n" https://aalkc.com/api/health        # unchanged
```

Then resubmit `https://aalkc.com/sitemap.xml` in Google Search Console (and
Bing Webmaster Tools) so the Arabic pages are discovered.

## Tests

`tests/worker/edge.test.ts` runs `handleRequest` against a stand-in origin
that, like GitHub Pages, serves only the files it has. It is part of
`npm test` and the Worker is typechecked by `npm run typecheck`.
