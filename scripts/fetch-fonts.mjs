// Fetches the Latin typefaces — Cabinet Grotesk (display) and General Sans
// (text) — from Fontshare into src/fonts/ (gitignored), where Vite picks them
// up, fingerprints them and serves them from the site's own origin.
//
// Licence: both are published by Indian Type Foundry under the ITF Free Font
// License (FFL) 2.0, which allows commercial use and self-hosting on our own
// website via @font-face, but forbids redistributing the font files —
// including through a public repository — and forbids modifying, subsetting
// or converting them. So the files are never committed (this repository is
// public): every build downloads the official variable WOFF2 files, unaltered,
// from Fontshare. CI caches src/fonts/ so a Fontshare outage cannot block a
// deploy. https://www.fontshare.com/licenses/itf-ffl
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "src", "fonts");

// "@1" is the upright variable font in Fontshare's CSS API.
const FONTS = [
  { slug: "cabinet-grotesk", file: "cabinet-grotesk-variable.woff2", family: "Cabinet Grotesk" },
  { slug: "general-sans", file: "general-sans-variable.woff2", family: "General Sans" },
];

async function isWoff2(file) {
  try {
    if ((await stat(file)).size < 10_000) return false;
    const head = (await readFile(file)).subarray(0, 4).toString("latin1");
    return head === "wOF2";
  } catch {
    return false;
  }
}

async function fetchFont({ slug, file, family }) {
  const target = path.join(outDir, file);
  if (await isWoff2(target)) return "cached";

  const css = await (await fetch(`https://api.fontshare.com/v2/css?f[]=${slug}@1&display=swap`)).text();
  if (!css.includes(`font-family: '${family}'`)) throw new Error(`Fontshare returned no @font-face for ${family}`);
  const match = css.match(/url\('(\/\/cdn\.fontshare\.com\/[^']+\.woff2)'\)/);
  if (!match) throw new Error(`Fontshare CSS for ${family} has no WOFF2 source`);

  const response = await fetch(`https:${match[1]}`);
  if (!response.ok) throw new Error(`Downloading ${family} failed: HTTP ${response.status}`);
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  if (!await isWoff2(target)) throw new Error(`${family} did not download as a WOFF2 font`);
  return "downloaded";
}

await mkdir(outDir, { recursive: true });
try {
  const results = await Promise.all(FONTS.map(async (font) => `${font.family} ${await fetchFont(font)}`));
  console.log(`fonts: ${results.join(", ")}`);
} catch (error) {
  console.error(`\nCould not fetch the Fontshare typefaces into src/fonts/: ${error.message}`);
  console.error("They are downloaded at build time because their licence forbids committing them. Check the network, or restore src/fonts/ from the CI cache.\n");
  process.exit(1);
}
