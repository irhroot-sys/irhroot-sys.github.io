import { describe, expect, it, vi } from 'vitest';
import { cacheControlFor, canonicalPathFor, documentPathFor, handleRequest } from '../../spa-fallback-worker/src/index';

// A stand-in for GitHub Pages: serves exactly the files it is given.
function origin(files: Record<string, string>) {
  return vi.fn(async (input: Request | string) => {
    const url = new URL(typeof input === 'string' ? input : input.url);
    const body = files[url.pathname];
    return body === undefined
      ? new Response('GitHub Pages 404', { status: 404, headers: { 'content-type': 'text/html' } })
      : new Response(body, { status: 200, headers: { 'content-type': 'text/html', 'cache-control': 'max-age=600' } });
  });
}

const site = origin({
  '/index.html': 'home',
  '/services.html': 'services',
  '/ar.html': 'ar home',
  '/ar/services.html': 'ar services',
  '/404.html': 'not found',
  '/ar/404.html': 'ar not found',
  '/assets/index-B5DAFa_R.js': 'js',
  '/assets/img/service-scrap-metal-480.avif': 'img',
  '/google103833ad7274b5fb.html': 'verification',
});

const get = (path: string, init?: RequestInit) => handleRequest(new Request(`https://aalkc.com${path}`, init), site);

describe('edge routing for the prerendered site', () => {
  it.each([
    ['/', 'home'],
    ['/services', 'services'],
    ['/ar', 'ar home'],
    ['/ar/services', 'ar services'],
  ])('serves %s from its prerendered document with a 200', async (path, body) => {
    const response = await get(path);
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(body);
    expect(response.headers.get('cache-control')).toBe('public, max-age=300, must-revalidate');
    expect(response.headers.get('x-frame-options')).toBe('DENY');
    expect(response.headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
  });

  it('answers unknown URLs with the language-matched 404 document and a real 404 status', async () => {
    const english = await get('/no-such-page');
    expect(english.status).toBe(404);
    expect(await english.text()).toBe('not found');

    const arabic = await get('/ar/no-such-page');
    expect(arabic.status).toBe(404);
    expect(await arabic.text()).toBe('ar not found');
  });

  it.each([
    ['/services/', '/services'],
    ['/ar/', '/ar'],
    ['/services.html', '/services'],
    ['/index.html', '/'],
    ['/ar.html', '/ar'],
    ['/products', '/materials'],
    ['/ar/products/', '/ar/materials'],
  ])('permanently redirects %s to %s', async (from, to) => {
    const response = await get(`${from}?ref=x`);
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe(`https://aalkc.com${to}?ref=x`);
  });

  it('leaves canonical URLs and real public files alone', () => {
    for (const path of ['/', '/services', '/ar', '/ar/services', '/404.html', '/ar/404.html', '/google103833ad7274b5fb.html', '/sitemap.xml']) {
      expect(canonicalPathFor(path)).toBeNull();
    }
  });

  it('serves search-console verification files as files', async () => {
    const response = await get('/google103833ad7274b5fb.html');
    expect(response.status).toBe(200);
    expect(await response.text()).toBe('verification');
  });

  it('caches fingerprinted build assets for a year and media for a week', async () => {
    expect((await get('/assets/index-B5DAFa_R.js')).headers.get('cache-control')).toBe('public, max-age=31536000, immutable');
    expect((await get('/assets/img/service-scrap-metal-480.avif')).headers.get('cache-control')).toBe('public, max-age=604800, stale-while-revalidate=86400');
    expect(cacheControlFor('/robots.txt')).toBeNull();
    expect(cacheControlFor('/assets/service-scrap-metal.webp')).toBe('public, max-age=604800, stale-while-revalidate=86400');
  });

  it('does not stamp a long cache lifetime onto a missing asset', async () => {
    const response = await get('/assets/index-Missing0.js');
    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control') ?? '').not.toContain('immutable');
  });

  it('never intercepts the quotes API, whatever the method', async () => {
    const api = vi.fn(async () => new Response('{"ok":true}', { status: 201 }));
    const response = await handleRequest(new Request('https://aalkc.com/api/quotes', { method: 'POST', body: '{}' }), api);
    expect(response.status).toBe(201);
    expect(api).toHaveBeenCalledTimes(1);
    expect(new URL((api.mock.calls[0] as unknown as [Request])[0].url).pathname).toBe('/api/quotes');
  });

  it('maps page URLs to their prerendered files', () => {
    expect(documentPathFor('/')).toBe('/index.html');
    expect(documentPathFor('/ar')).toBe('/ar.html');
    expect(documentPathFor('/ar/faq')).toBe('/ar/faq.html');
  });
});
