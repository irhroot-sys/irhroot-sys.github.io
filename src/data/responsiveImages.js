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
  // AALKC's own photographs of its yard, fleet and material (see
  // public/assets/PHOTO-CREDITS.md), plus one licensed foundry photograph.
  "/assets/yard/aalkc-yard-entrance-night.webp": { width: 1448, height: 1086 },
  "/assets/yard/cable-reel-loading.webp": { width: 1920, height: 1440 },
  "/assets/yard/cast-metal-components.webp": { width: 1440, height: 1920 },
  "/assets/yard/yard-weighbridge.webp": { width: 1920, height: 946 },
  "/assets/yard/scrap-trailer.webp": { width: 1920, height: 1081 },
  "/assets/yard/structural-scrap-yard.webp": { width: 1920, height: 1081 },
  "/assets/yard/truck-grapple-loading.webp": { width: 1920, height: 1081 },
  "/assets/yard/grapple-steel-piles.webp": { width: 1920, height: 1440 },
  "/assets/yard/crane-cable-reels.webp": { width: 1920, height: 1440 },
  "/assets/yard/steel-channels-pipes.webp": { width: 1920, height: 1920 },
  "/assets/yard/used-transformers.webp": { width: 1920, height: 1440 },
  "/assets/yard/generator-stator.webp": { width: 1440, height: 1920 },
  "/assets/yard/galvanized-cable-trays.webp": { width: 1920, height: 1081 },
  "/assets/yard/steel-plates.webp": { width: 1081, height: 1920 },
  "/assets/yard/cable-reel-trucks.webp": { width: 1920, height: 1440 },
  "/assets/yard/flatbed-cable-loops.webp": { width: 1920, height: 1440 },
  "/assets/yard/stator-interior.webp": { width: 1440, height: 1920 },
  "/assets/yard/ferrous-scrap-yard.webp": { width: 1920, height: 1440 },
  "/assets/yard/steel-beams-containers.webp": { width: 1081, height: 1920 },
  "/assets/yard/transformers-safety-gates.webp": { width: 1920, height: 1440 },
  "/assets/yard/cable-drums-grapple.webp": { width: 1081, height: 1920 },
  "/assets/yard/switchgear-dismantling.webp": { width: 1920, height: 1440 },
  "/assets/yard/sorted-copper-container.webp": { width: 1440, height: 1920 },
  "/assets/yard/foundry-pour.webp": { width: 1920, height: 1280 },
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
