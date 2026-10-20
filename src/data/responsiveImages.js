// Every photograph rendered through <ResponsiveImage>. `width`/`height` are
// the source file's real pixel size: they give each <img> its intrinsic
// aspect ratio (no layout shift) and cap the largest variant generated.
// scripts/build-images.mjs reads this same table, so adding a photo here is
// all it takes to get AVIF and WebP variants at every size.
export const responsiveImages = {
  "/assets/service-industrial-dismantling.webp": { width: 1600, height: 900 },
  "/assets/service-container-handling.webp": { width: 1600, height: 900 },
  "/assets/service-scrap-metal.webp": { width: 1681, height: 935 },
  "/assets/service-heavy-logistics.webp": { width: 1100, height: 619 },
  "/assets/service-metal-sorting.webp": { width: 1600, height: 900 },
  "/assets/service-global-trade.webp": { width: 1600, height: 900 },
  "/assets/service-construction-materials.webp": { width: 1690, height: 931 },
};

export const VARIANT_DIRECTORY = "/assets/img";
export const VARIANT_FORMATS = ["avif", "webp"];
const STANDARD_WIDTHS = [480, 800, 1200, 1600];

export function variantWidths(src) {
  const image = responsiveImages[src];
  if (!image) return [];
  const largest = Math.min(image.width, STANDARD_WIDTHS.at(-1));
  return [...STANDARD_WIDTHS.filter((width) => width < largest), largest];
}

export function variantPath(src, width, format) {
  const name = src.split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  return `${VARIANT_DIRECTORY}/${name}-${width}.${format}`;
}

export function variantSrcSet(src, format) {
  return variantWidths(src).map((width) => `${variantPath(src, width, format)} ${width}w`).join(", ");
}
