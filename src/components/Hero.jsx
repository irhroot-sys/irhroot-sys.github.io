import { useEffect, useRef } from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { contactDetails } from "../data/siteContent.jsx";
import { HOME_HERO_SIZES } from "../data/imageSizes.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { SkylineGraphic } from "./SkylineGraphic.jsx";

export const HERO_IMAGE = "/assets/service-metal-sorting.webp";

// The ledger under the statement: facts the company states elsewhere on the
// site and in its registration, set the way a register would set them.
// Nothing here is a performance claim.
const LEDGER = [
  { label: "Established", value: "2017" },
  { label: "Commercial registration", value: contactDetails.commercialRegistration, mono: true },
  { label: "Management standards", value: "ISO 9001 · 14001 · 45001", mono: true },
  { label: "Registry", value: "Saudi Ministry of Commerce" },
  { label: "Headquarters", value: "Dammam", note: "26.42° N  50.09° E" },
];

// Keep the depth effect local to the hero so pointer movement elsewhere on
// the page cannot keep the image in motion. Media-query listeners also make
// the effect respond immediately when reduced motion is changed at runtime.
function useHeroDepthMotion(heroRef) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let frame = null;
    let depthEnabled = finePointer.matches && !reduceMotion.matches;

    const resetDepth = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      hero.style.setProperty("--hero-depth-x", "0px");
      hero.style.setProperty("--hero-depth-y", "0px");
    };

    const syncMotionPreference = () => {
      depthEnabled = finePointer.matches && !reduceMotion.matches;
      hero.dataset.depth = depthEnabled ? "active" : "static";
      if (!depthEnabled) resetDepth();
    };

    const handlePointerMove = (event) => {
      if (!depthEnabled) return;
      const bounds = hero.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        hero.style.setProperty("--hero-depth-x", `${(x * -8).toFixed(2)}px`);
        hero.style.setProperty("--hero-depth-y", `${(y * -5).toFixed(2)}px`);
      });
    };

    syncMotionPreference();
    hero.addEventListener("pointermove", handlePointerMove, { passive: true });
    hero.addEventListener("pointerleave", resetDepth);
    window.addEventListener("blur", resetDepth);
    reduceMotion.addEventListener("change", syncMotionPreference);
    finePointer.addEventListener("change", syncMotionPreference);

    return () => {
      resetDepth();
      hero.removeEventListener("pointermove", handlePointerMove);
      hero.removeEventListener("pointerleave", resetDepth);
      window.removeEventListener("blur", resetDepth);
      reduceMotion.removeEventListener("change", syncMotionPreference);
      finePointer.removeEventListener("change", syncMotionPreference);
    };
  }, [heroRef]);
}

export function Hero() {
  const { t } = useLanguage();
  const { openQuote } = useQuote();
  const heroRef = useRef(null);
  useHeroDepthMotion(heroRef);

  return (
    <section ref={heroRef} className="hero on-ink" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-line hero-line-1">{t("Integrity,")}</span>{" "}
            <span className="hero-line hero-line-2">{t("weighed in every tonne.")}</span>
          </h1>
          <p className="hero-lede">
            {t("Premium, transparent, and efficient metal recycling services for industrial, commercial, and construction businesses across Saudi Arabia.")}
          </p>
          <div className="hero-actions">
            <button type="button" className="primary-button" onClick={() => openQuote()}>
              {t("Request a quote")} <LuArrowRight className="directional-icon" />
            </button>
            <Link className="inline-action" to="/services">
              {t("Explore our capabilities")} <LuArrowRight className="directional-icon" />
            </Link>
          </div>
        </div>
        <figure className="hero-plate">
          <div className="hero-media">
            <ResponsiveImage
              className="hero-media-image"
              src={HERO_IMAGE}
              sizes={HOME_HERO_SIZES}
              alt={t("Grapple loading sorted scrap metal at an industrial recycling yard")}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </figure>
        <SkylineGraphic className="hero-skyline" />
      </div>
      <div className="hero-ledger">
        <dl className="container" aria-label={t("Company credentials")}>
          {LEDGER.map(({ label, value, mono, note }) => (
            <div key={label}>
              <dt>{t(label)}</dt>
              <dd className={mono ? "is-mono" : undefined} dir={mono ? "ltr" : undefined}>
                {mono ? value : t(value)}
                {note && <small dir="ltr">{note}</small>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
