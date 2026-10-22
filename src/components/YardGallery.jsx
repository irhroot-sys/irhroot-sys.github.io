import { yardGallery } from "../data/photos.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// The operation itself, in AALKC's own photographs. Set as a contact sheet
// rather than a carousel: one lead frame and a measured run of smaller ones,
// each captioned with what it shows, so a buyer or supplier sees the yard,
// the equipment and the material before they call.
const SIZES = {
  lead: "(max-width: 900px) 100vw, 58vw",
  frame: "(max-width: 620px) 100vw, (max-width: 900px) 50vw, 29vw",
};

export function YardGallery({ surface = "surface-white" }) {
  const { t } = useLanguage();
  return (
    <section className={`yard content-section ${surface}`} aria-labelledby="yard-title">
      <div className="container">
        <SectionHeading
          id="yard-title"
          eyebrow="The yard"
          title="Our operation, in pictures."
          copy="AALKC's own photographs of its yard, its equipment and the material it handles."
        />
        <ul className="yard-gallery">
          {yardGallery.map(({ src, alt, focus }, index) => (
            <li key={src} className={index === 0 ? "is-lead" : undefined}>
              <figure>
                <div className="yard-frame">
                  <ResponsiveImage src={src} sizes={index === 0 ? SIZES.lead : SIZES.frame} alt="" loading="lazy" decoding="async" style={{ objectPosition: focus }} />
                </div>
                <figcaption>{t(alt)}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
