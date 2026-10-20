import { responsiveImages, variantSrcSet } from "../data/responsiveImages.js";

// Serves each photograph at the size it is actually displayed, as AVIF with a
// WebP fallback. The <picture> wrapper is `display: contents`, so the <img>
// still lays out (and is styled) exactly as if it were a direct child. `src`
// stays the original file for the rare browser that ignores both sources.
export function ResponsiveImage({ src, sizes, alt, ...imageProps }) {
  const image = responsiveImages[src];
  if (!image) return <img src={src} alt={alt} {...imageProps} />;

  return (
    <picture className="responsive-picture">
      <source type="image/avif" srcSet={variantSrcSet(src, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={variantSrcSet(src, "webp")} sizes={sizes} />
      <img src={src} alt={alt} width={image.width} height={image.height} {...imageProps} />
    </picture>
  );
}
