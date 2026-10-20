// Regenerates the browser, Apple and web-app icons in public/ from the
// official logo. Run by hand when the logo changes (`node scripts/build-icons.mjs`)
// and commit the output; the build does not depend on it.
//
// The mark is navy and grey on transparent, which disappears on dark browser
// tabs, so every icon puts it on a white square.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const logo = path.join(publicDir, "assets", "aalkc-logo-official-9233f531.svg");

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const trimmedMark = await sharp(logo, { density: 1200 }).trim().png().toBuffer();

// `inset` is the share of the square kept clear on every side. Maskable icons
// may be cropped to a circle, so their mark must sit inside the central 80%.
async function icon(size, inset) {
  const box = Math.round(size * (1 - inset * 2));
  const mark = await sharp(trimmedMark).resize(box, box, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: WHITE } })
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

// A .ico is a small directory of embedded PNGs (supported by every current
// browser), which avoids a dedicated ICO encoder.
function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, data } of pngs) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

const favicons = await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await icon(size, 0.04) })));
await writeFile(path.join(publicDir, "favicon.ico"), ico(favicons));
await writeFile(path.join(publicDir, "apple-touch-icon.png"), await icon(180, 0.1));
await writeFile(path.join(publicDir, "icon-192.png"), await icon(192, 0.1));
await writeFile(path.join(publicDir, "icon-512.png"), await icon(512, 0.1));
await writeFile(path.join(publicDir, "icon-maskable-512.png"), await icon(512, 0.2));
console.log("icons written to public/");
