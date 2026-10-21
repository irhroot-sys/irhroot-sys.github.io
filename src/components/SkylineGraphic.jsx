import { SKYLINE_PATHS } from "./BrandMark.jsx";

// The site's one supergraphic: the steel skyline bars from the official mark,
// enlarged into an architectural element. It reuses the approved geometry
// (never a redrawing) and is purely decorative, so it is hidden from
// assistive technology. Colour and opacity come from CSS.
export function SkylineGraphic({ className = "" }) {
  return (
    <svg
      className={`skyline-graphic ${className}`.trim()}
      viewBox="45 5 87 106"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {SKYLINE_PATHS.map((d) => <path key={d.slice(0, 16)} d={d} />)}
    </svg>
  );
}
