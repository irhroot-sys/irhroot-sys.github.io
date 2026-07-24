# AALKC Website

Production website for Amanat Al-Kalima Company, published to [aalkc.com](https://aalkc.com) through GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

The enquiry forms require `VITE_TURNSTILE_SITE_KEY` to render Cloudflare Turnstile. Production submissions are sent to the same-origin `/api/quotes` Cloudflare Worker route.

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The Pages workflow runs all four checks before deployment. Worker deployment is intentionally manual and documented in [`worker/README.md`](worker/README.md).

## Structure

- `src/` — React UI, routes, content, and form integration
- `public/` — static images, SEO files, domain verification, and SPA fallback
- `worker/` — Cloudflare Worker for secure quote processing
- `tests/` — browser, accessibility, synthetic, and Worker tests
- `.github/workflows/` — CI, Pages deployment, Worker deployment, and monitoring
