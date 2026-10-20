/**
 * AALKC edge Worker — serves the prerendered site with correct status codes,
 * redirects, cache lifetimes and security headers.
 * ---------------------------------------------------------------------------
 * GitHub Pages hosts plain files and cannot set headers or status codes, so
 * this Worker sits in front of it on aalkc.com/* and:
 *
 *   - maps each clean page URL to its prerendered file
 *       /            -> /index.html      /ar          -> /ar.html
 *       /services    -> /services.html   /ar/services -> /ar/services.html
 *     and answers with a real 200;
 *   - answers any URL without a page with the prerendered, noindex 404
 *     document for that language and a real 404 status (no soft 404s);
 *   - 301-redirects duplicate addresses (trailing slash, *.html, index.html,
 *     retired paths) to the one canonical URL;
 *   - gives fingerprinted build assets a one-year immutable cache lifetime;
 *   - adds security headers that GitHub Pages cannot send.
 *
 * /api/* belongs to the separate quotes Worker (worker/), which Cloudflare
 * routes first because its route is more specific; it is passed through
 * untouched here as a second line of defence.
 *
 * Subrequests to the zone's own hostname go to the origin (GitHub Pages), not
 * back into this Worker.
 *
 * Deploy: see README.md alongside this file.
 * ---------------------------------------------------------------------------
 */

type Fetcher = (input: Request | string, init?: RequestInit) => Promise<Response>;

// Retired URLs. Keep in sync with `redirects` in src/routes.jsx, which handles
// the same paths during in-app navigation.
const REDIRECTS: Record<string, string> = {
  "/products": "/materials",
};

// Files that are part of the site but are not prerendered pages: search
// console verification files and the 404 documents themselves.
const PUBLIC_HTML_FILES = /^\/(google[0-9a-f]+\.html|(ar\/)?404\.html)$/;

// Vite fingerprints build output as name-<8+ char hash>.ext; those files can
// never change, so browsers may keep them for a year without revalidating.
const FINGERPRINTED_ASSET = /^\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.(?:js|css|woff2?|svg)$/;

const IMMUTABLE = "public, max-age=31536000, immutable";
// Photographs and generated image variants keep stable names, so they get a
// week plus a day of background revalidation instead.
const MEDIA = "public, max-age=604800, stale-while-revalidate=86400";
const HTML = "public, max-age=300, must-revalidate";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "X-Frame-Options": "DENY",
  // Only directives that cannot break the page: no framing, no <base>
  // hijacking, no plugins, forms post only to this origin. A full script/style
  // policy is staged separately — see cloudflare/security-and-cache.md.
  "Content-Security-Policy": "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
};

function hasExtension(pathname: string) {
  const lastSegment = pathname.split("/").pop() ?? "";
  return lastSegment.lastIndexOf(".") > 0;
}

function languageOf(pathname: string) {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

function redirectTo(url: URL, pathname: string) {
  const location = new URL(url);
  location.pathname = pathname;
  return new Response(null, { status: 301, headers: { Location: location.toString(), ...SECURITY_HEADERS } });
}

// Where a URL should permanently point instead, or null if it is canonical.
export function canonicalPathFor(pathname: string): string | null {
  let path = pathname;
  if (path.length > 1 && path.endsWith("/")) path = path.replace(/\/+$/, "") || "/";
  if (/\/index\.html$/.test(path)) path = path.replace(/\/?index\.html$/, "") || "/";
  else if (path.endsWith(".html") && !PUBLIC_HTML_FILES.test(path)) path = path.slice(0, -".html".length) || "/";

  const language = languageOf(path);
  const route = language === "ar" ? path.slice(3) || "/" : path;
  if (REDIRECTS[route]) path = language === "ar" ? `/ar${REDIRECTS[route]}` : REDIRECTS[route];

  return path === pathname ? null : path;
}

// The prerendered file for a clean page URL.
export function documentPathFor(pathname: string) {
  return pathname === "/" ? "/index.html" : `${pathname}.html`;
}

export function cacheControlFor(pathname: string) {
  if (FINGERPRINTED_ASSET.test(pathname)) return IMMUTABLE;
  if (/\.(?:avif|webp|png|jpe?g|svg|ico)$/.test(pathname)) return MEDIA;
  return null;
}

function withHeaders(response: Response, headers: Record<string, string>, status = response.status) {
  const result = new Response(response.body, { status, statusText: status === response.status ? response.statusText : "", headers: response.headers });
  for (const [name, value] of Object.entries(headers)) result.headers.set(name, value);
  return result;
}

async function serveDocument(request: Request, url: URL, fetchOrigin: Fetcher) {
  const documentUrl = new URL(documentPathFor(url.pathname), url);
  const page = await fetchOrigin(new Request(documentUrl.toString(), { method: request.method, headers: request.headers }));
  if (page.ok) return withHeaders(page, { "Cache-Control": HTML, ...SECURITY_HEADERS });
  if (page.status !== 404) return page;

  const notFoundUrl = new URL(languageOf(url.pathname) === "ar" ? "/ar/404.html" : "/404.html", url);
  const notFound = await fetchOrigin(new Request(notFoundUrl.toString(), { method: request.method, headers: request.headers }));
  // Never cache a miss for long: the page may be published minutes later.
  return withHeaders(notFound, { "Cache-Control": "public, max-age=60", ...SECURITY_HEADERS }, 404);
}

export async function handleRequest(request: Request, fetchOrigin: Fetcher): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/")) return fetchOrigin(request);
  if (request.method !== "GET" && request.method !== "HEAD") return fetchOrigin(request);

  const canonicalPath = canonicalPathFor(url.pathname);
  if (canonicalPath) return redirectTo(url, canonicalPath);

  if (hasExtension(url.pathname)) {
    const response = await fetchOrigin(request);
    const cacheControl = response.ok ? cacheControlFor(url.pathname) : null;
    return withHeaders(response, {
      "X-Content-Type-Options": "nosniff",
      ...(cacheControl ? { "Cache-Control": cacheControl } : {}),
    });
  }

  return serveDocument(request, url, fetchOrigin);
}

export default {
  fetch(request: Request) {
    return handleRequest(request, (input, init) => fetch(input, init));
  },
};
