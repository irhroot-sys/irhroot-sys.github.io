# AALKC SPA fallback Worker

Fixes the issue where `/about`, `/services`, `/materials`, `/faq`, `/contact`,
`/privacy`, and `/terms` return a real **HTTP 404** with
`<meta name="robots" content="noindex, nofollow">` on direct load, instead of
the actual page. Only `/` currently works correctly — this brings the rest
in line with it.

This is intentionally a separate Worker from [`worker/`](../worker), which
handles `/api/*` (quotes and market data). This one only ever touches the
HTML shell for non-API routes — see `src/index.js` for the explicit
`/api/*` passthrough and the reasoning behind keeping the two isolated.

## What changes for visitors

Nothing. This only affects the very first HTML response for a direct
hit/refresh on a sub-page. The React app itself, the "Get a Quote" modal,
the language toggle, etc. all behave exactly as they do today.

## Deploy

No secrets or per-environment IDs are needed (unlike `worker/`), so
`wrangler.jsonc` here is committed directly rather than kept as an
`.example` template.

**Via GitHub Actions (recommended, matches how `worker/` is deployed):**
Actions → "Deploy SPA Fallback Worker" → Run workflow. Uses the same
`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` already configured for the
`production` environment.

**Via Wrangler CLI locally:**

```bash
npm ci
npx wrangler login
npx wrangler deploy --config spa-fallback-worker/wrangler.jsonc
```

## Verify it worked

```bash
# Should now return 200, not 404 — and no "noindex" in the body
curl -sS -D - -o /dev/null https://aalkc.com/services
curl -s https://aalkc.com/about | grep -i robots

# Static assets and the API should still work exactly as before
curl -sS -o /dev/null -w "%{http_code}\n" https://aalkc.com/assets/index-q7l_f7L8.js
curl -sS -o /dev/null -w "%{http_code}\n" https://aalkc.com/api/health
```

Once live, resubmit `public/sitemap.xml` in Google Search Console so the
previously-blocked pages get recrawled.

## Known limitation (separate from this fix)

Per-page `<title>` and meta description are set by client-side JavaScript
after the app mounts. Bots that don't run JS (WhatsApp, X, LinkedIn,
Facebook link previews) will still show the homepage's generic
title/description for a shared `/services` or `/contact` link — they just
won't say "Page Not Found" anymore. Closing that gap needs prerendering
each route's HTML at build time, which is a separate, larger change.

`public/404.html` and `public/404-redirect.js` are left in place — they
still matter for direct hits on the raw `irhroot-sys.github.io` domain,
which isn't proxied through Cloudflare and so never reaches this Worker.
