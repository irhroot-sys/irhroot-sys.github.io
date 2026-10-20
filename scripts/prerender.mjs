// Turns the client build into one static HTML document per page and language,
// so search engines, link-preview bots and visitors all receive the real page
// content and head tags on first response — not an empty <div id="root">.
//
//   dist/index.html            /            dist/ar.html            /ar
//   dist/about.html            /about       dist/ar/about.html      /ar/about
//   dist/404.html              (noindex)    dist/ar/404.html        (noindex)
//
// Also writes sitemap.xml (with hreflang alternates) and
// .well-known/security.txt. Run after `vite build` and the SSR build; see the
// "build" script in package.json.
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { variantSrcSet } from "../src/data/responsiveImages.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const {
  render, routes, notFoundRoute, renderKeyFor, buildPageHead, renderHeadTags, absoluteUrl, LANGUAGES, localizePath,
} = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = await readFile(path.join(distDir, "index.html"), "utf8");
for (const marker of ["<!--app-head-->", '<div id="root"><!--app-html--></div>', '<html lang="en" dir="ltr">']) {
  if (!template.includes(marker)) throw new Error(`index.html is missing the prerender marker ${marker}`);
}

// The fonts that paint the first screen: body copy and the bold display
// headline, per script. Preloading them lets the browser fetch them alongside
// the stylesheet instead of after it has been parsed.
const assetFiles = await readdir(path.join(distDir, "assets"));
function fontAsset(prefix) {
  const file = assetFiles.find((name) => name.startsWith(prefix) && name.endsWith(".woff2"));
  if (!file) throw new Error(`Expected a built font matching ${prefix}*.woff2`);
  return `/assets/${file}`;
}
const criticalFonts = {
  en: [fontAsset("ibm-plex-sans-latin-400-normal-"), fontAsset("archivo-latin-wdth-normal-")],
  ar: [fontAsset("ibm-plex-sans-arabic-arabic-400-normal-"), fontAsset("noto-kufi-arabic-arabic-700-normal-")],
};

function preloadTags(route, language) {
  const tags = criticalFonts[language].map((href) => `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin />`);
  // The hero photograph is the largest element on every page that has one.
  // Preload exactly the AVIF candidates the <picture> will choose from, so the
  // browser starts the download before React renders and never fetches twice.
  if (route.heroImage) {
    tags.push(`<link rel="preload" as="image" type="image/avif" imagesrcset="${variantSrcSet(route.heroImage, "avif")}" imagesizes="${route.heroSizes ?? "100vw"}" fetchpriority="high" />`);
  }
  return tags;
}

function documentFor({ route, language, pathname }) {
  const head = buildPageHead({ route, language });
  const headTags = [renderHeadTags(head), ...preloadTags(route, language)].join("\n    ");
  return template
    .replace('<html lang="en" dir="ltr">', `<html lang="${head.lang}" dir="${head.dir}">`)
    .replace("<!--app-head-->", headTags)
    .replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root" data-prerendered="${renderKeyFor(pathname)}">${render(pathname)}</div>`,
    );
}

function outputFileFor(pathname) {
  if (pathname === "/") return "index.html";
  return `${pathname.slice(1)}.html`;
}

async function write(relativeFile, contents) {
  const file = path.join(distDir, relativeFile);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, contents);
}

const written = [];
for (const language of LANGUAGES) {
  for (const route of routes) {
    const pathname = localizePath(route.path, language);
    const file = outputFileFor(pathname);
    await write(file, documentFor({ route, language, pathname }));
    written.push(file);
  }
  // Served by the edge Worker, with a real 404 status, for any unknown URL in
  // that language. The path only needs to be one no route matches.
  const notFoundFile = language === "en" ? "404.html" : `${language}/404.html`;
  await write(notFoundFile, documentFor({ route: notFoundRoute, language, pathname: localizePath("/404", language) }));
  written.push(notFoundFile);
}

const today = new Date().toISOString().slice(0, 10);
const sitemapEntries = routes.flatMap((route) => LANGUAGES.map((language) => {
  const alternates = [
    ...LANGUAGES.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absoluteUrl(localizePath(route.path, code))}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(route.path)}" />`,
  ].join("\n");
  return `  <url>
    <loc>${absoluteUrl(localizePath(route.path, language))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${alternates}
  </url>`;
}));
await write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapEntries.join("\n")}
</urlset>
`);

// RFC 9116 requires an Expires date no more than a year out; regenerating it
// on every deploy keeps it valid.
const expires = new Date(Date.now() + 330 * 24 * 60 * 60 * 1000).toISOString().replace(/\.\d{3}Z$/, "Z");
await write(".well-known/security.txt", `Contact: mailto:contact@aalkc.com
Expires: ${expires}
Preferred-Languages: en, ar
Canonical: https://aalkc.com/.well-known/security.txt
`);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerendered ${written.length} documents, sitemap.xml and security.txt`);
