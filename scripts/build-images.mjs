// Generates the AVIF and WebP size variants listed in
// src/data/responsiveImages.js into public/assets/img/ (gitignored), which Vite
// then serves in dev and copies into dist/ on build. Variants whose source
// photo and encoder settings are unchanged are skipped, so repeat runs (and
// CI runs that restore the folder from cache) cost almost nothing.
import { createHash } from "node:crypto";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { responsiveImages, variantPath, variantWidths } from "../src/data/responsiveImages.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
// Kept outside public/ so it is never deployed.
const stampFile = path.join(root, "node_modules", ".cache", "aalkc-responsive-images.json");

// AVIF at q40 came out 35-40% smaller than the WebP fallback on these
// textured scrap photos with no visible loss at display size — and every
// photo is shown through a duotone grade and a dark scrim on top. Re-check a
// few variants by eye if these settings change.
const ENCODER_SETTINGS = {
  avif: { quality: 40, effort: 6 },
  webp: { quality: 74, effort: 5 },
};

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function readStamp() {
  try {
    return JSON.parse(await readFile(stampFile, "utf8"));
  } catch {
    return {};
  }
}

const previous = await readStamp();
const next = {};
let generated = 0;
let skipped = 0;

await Promise.all(Object.keys(responsiveImages).map(async (src) => {
  const sourceFile = path.join(publicDir, src);
  if (!await exists(sourceFile)) throw new Error(`Responsive image source is missing: ${src}`);

  const fingerprint = createHash("sha256")
    .update(await readFile(sourceFile))
    .update(JSON.stringify([ENCODER_SETTINGS, variantWidths(src)]))
    .digest("hex");
  next[src] = fingerprint;

  const outputs = variantWidths(src).flatMap((width) => Object.keys(ENCODER_SETTINGS).map((format) => ({
    width,
    format,
    file: path.join(publicDir, variantPath(src, width, format)),
  })));
  const allPresent = (await Promise.all(outputs.map(({ file }) => exists(file)))).every(Boolean);
  if (previous[src] === fingerprint && allPresent) {
    skipped += outputs.length;
    return;
  }

  await Promise.all(outputs.map(async ({ width, format, file }) => {
    await mkdir(path.dirname(file), { recursive: true });
    await sharp(sourceFile)
      .resize({ width, withoutEnlargement: true })[format](ENCODER_SETTINGS[format])
      .toFile(file);
    generated += 1;
  }));
}));

await mkdir(path.dirname(stampFile), { recursive: true });
await writeFile(stampFile, `${JSON.stringify(next, null, 2)}\n`);
console.log(`responsive images: ${generated} generated, ${skipped} up to date`);
