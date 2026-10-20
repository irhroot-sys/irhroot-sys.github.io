# AALKC Website

Production website for Amanat Al-Kalima Company, published to [aalkc.com](https://aalkc.com) through GitHub Pages.

## Local development

```bash
npm ci
npm run dev
```

The enquiry forms require `VITE_TURNSTILE_SITE_KEY` to render Cloudflare Turnstile. Production submissions are sent to the same-origin `/api/quotes` Cloudflare Worker route.

The first `npm run dev` or `npm run build` takes about a minute longer while `scripts/build-images.mjs` generates the AVIF/WebP image sizes into `public/assets/img/` (gitignored); later runs skip unchanged images.

## How pages are built

- **One URL per page and language.** English pages keep their URLs (`/services`); Arabic pages live under `/ar` (`/ar/services`). The language is read from the URL; the EN/AR switch links to the same page in the other language, and a visitor who chose Arabic before is taken to the Arabic URL when they arrive on an English one.
- **Pages are listed once**, in [`src/routes.jsx`](src/routes.jsx), with their title, description and images. The router, the document head, the sitemap and the prerender all read that list.
- **Every page is prerendered.** `npm run build` builds the app, renders each route in both languages to static HTML (`scripts/prerender.mjs`) with its own title, description, canonical, `hreflang`, Open Graph tags and structured data, and writes `sitemap.xml` and `.well-known/security.txt`. The browser then hydrates that HTML. Head tags come from [`src/lib/seo.js`](src/lib/seo.js), used both at build time and during in-app navigation.
- **Photos** go through `<ResponsiveImage>` and are served at the size they are displayed. Add new photos to [`src/data/responsiveImages.js`](src/data/responsiveImages.js).
- **Icons** in `public/` are generated from the logo by `node scripts/build-icons.mjs` (run by hand when the logo changes).

## Quality checks

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

The Pages workflow runs all four checks before deployment. Worker deployment is intentionally manual and documented in [`worker/README.md`](worker/README.md). The same applies to the edge Worker in [`spa-fallback-worker/README.md`](spa-fallback-worker/README.md), which serves each prerendered page with the right status code, redirects, cache lifetime and security headers — deploy it **after** the Pages build it serves is live.

## Structure

- `src/` — React UI, routes, content, and form integration
- `public/` — static images, icons, SEO files, and domain verification
- `scripts/` — image variants, icons, and the build-time prerender
- `worker/` — Cloudflare Worker for secure quote processing
- `spa-fallback-worker/` — Cloudflare edge Worker in front of GitHub Pages: per-page documents, real 404s, redirects, caching and security headers
- `tests/` — browser, accessibility, synthetic, and Worker tests
- `.github/workflows/` — CI, Pages deployment, Worker deployment, and monitoring
