/**
 * AALKC SPA fallback Worker
 * ---------------------------------------------------------------------------
 * Problem this fixes:
 *   The site is a client-side-routed React app hosted on GitHub Pages.
 *   GitHub Pages only knows about the literal files it was given, so a
 *   direct request to /about, /services, /materials, /faq, /contact,
 *   /privacy, or /terms currently gets GitHub's 404.html, which:
 *     - returns a real HTTP 404 status
 *     - carries <meta name="robots" content="noindex, nofollow">
 *     - then JS-redirects the browser back into the app
 *   That's invisible to a human in a browser, but search engines and
 *   link-preview bots (WhatsApp, LinkedIn, X, Facebook, uptime checkers)
 *   don't run that JS, so they see "404, do not index" for every page
 *   except the homepage.
 *
 * What this Worker does:
 *   - Passes real static assets (JS/CSS/images/fonts/robots.txt/etc.)
 *     straight through to the origin, untouched.
 *   - Passes /api/* straight through untouched too — that's the existing
 *     quotes/market Worker's territory (see worker/wrangler.example.jsonc,
 *     routed at aalkc.com/api/*), and this must never shadow it.
 *   - For everything else (an app route with no file extension), it
 *     fetches the ACTUAL index.html from the origin's "/" and returns
 *     that content with a genuine HTTP 200 instead of GitHub's 404 page.
 *     The React app then boots normally client-side, exactly as it does
 *     today on a hard refresh of "/".
 *
 * What this does NOT fix (by itself):
 *   Per-route <title>/meta description/OG tags are set by client-side JS
 *   after the app mounts. Crawlers that don't execute JS (most social
 *   link-unfurlers) will still see the homepage's generic title/description
 *   for a shared /services or /contact link — they'll just no longer see
 *   "404 Page Not Found". Solving that fully requires prerendering or SSR
 *   per route, which is a separate, larger change.
 *
 * Deploy: see README.md alongside this file.
 * ---------------------------------------------------------------------------
 */

// File extensions that should always be treated as real static assets and
// passed straight through to the origin.
const ASSET_EXTENSIONS = new Set([
  'js', 'mjs', 'css', 'map', 'json', 'xml', 'txt',
  'png', 'jpg', 'jpeg', 'webp', 'gif', 'svg', 'ico', 'avif',
  'woff', 'woff2', 'ttf', 'otf', 'eot',
  'mp4', 'webm', 'pdf',
]);

// Root-level files with no extension (or that you'd rather not risk
// rewriting) that should also always pass straight through.
const PASSTHROUGH_PATHS = new Set([
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/manifest.json',
  '/spa-redirect.js',
  '/404-redirect.js', // harmless to leave in place; unused once this is live
]);

// How long the edge caches the fetched index.html shell before re-checking
// the origin. Purge the Worker's cache (or just wait this long) after you
// redeploy the site and want the change to show up immediately everywhere.
const SHELL_CACHE_TTL_SECONDS = 300;
const SHELL_CACHE_KEY = 'https://cache.internal/__aalkc-spa-shell__';

export default {
  async fetch(request, env, ctx) {
    // Only GET/HEAD need this treatment; let anything else (rare on a
    // static site) go straight to the origin.
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return fetch(request);
    }

    const url = new URL(request.url);

    // The homepage already gets a correct 200 from the origin today —
    // no need to touch it.
    if (url.pathname === '/') {
      return fetch(request);
    }

    // Never touch the existing quotes/market API Worker. This should
    // already be true if Cloudflare picks the more specific route, but
    // it costs nothing to be explicit and never risk shadowing it.
    if (url.pathname.startsWith('/api/')) {
      return fetch(request);
    }

    // Real files: pass through untouched.
    if (isStaticAsset(url.pathname)) {
      return fetch(request);
    }

    // Everything else is a client-side app route (/about, /services,
    // /materials, /faq, /contact, /privacy, /terms, and any future ones).
    return serveAppShell(request, ctx);
  },
};

function isStaticAsset(pathname) {
  if (PASSTHROUGH_PATHS.has(pathname)) return true;

  const lastSegment = pathname.split('/').pop() || '';
  const dotIndex = lastSegment.lastIndexOf('.');
  if (dotIndex <= 0) return false; // no extension -> app route, not an asset

  const ext = lastSegment.slice(dotIndex + 1).toLowerCase();
  return ASSET_EXTENSIONS.has(ext);
}

async function serveAppShell(request, ctx) {
  const cache = caches.default;
  const cacheKey = new Request(SHELL_CACHE_KEY, { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  // Fetch the REAL index.html from "/", not whatever the requested path
  // would normally resolve to.
  const shellUrl = new URL(request.url);
  shellUrl.pathname = '/';
  shellUrl.search = '';

  const originResponse = await fetch(shellUrl.toString(), {
    headers: { accept: 'text/html' },
  });

  if (!originResponse.ok) {
    // Origin itself is having a bad day — surface that rather than
    // pretending everything is fine.
    return originResponse;
  }

  const body = await originResponse.text();

  const shellResponse = new Response(body, {
    status: 200,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': `public, max-age=${SHELL_CACHE_TTL_SECONDS}`,
    },
  });

  ctx.waitUntil(cache.put(cacheKey, shellResponse.clone()));
  return shellResponse;
}
