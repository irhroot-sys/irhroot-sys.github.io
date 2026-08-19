import { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { certifications } from "../data/siteContent.jsx";
import { BrandMark } from "./BrandMark.jsx";

const HERO_IMAGE = "/assets/service-industrial-dismantling.webp";

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
  const heroRef = useRef(null);
  useHeroDepthMotion(heroRef);

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <img
          className="hero-media-image"
          data-parallax="0.07"
          src={HERO_IMAGE}
          alt={t("Industrial material recovery and dismantling operation")}
          width="1600"
          height="900"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="hero-copy">
        <div className="eyebrow light hero-eyebrow">
          <BrandMark className="hero-badge" />
          <span>{t("Amanat Al-Kalima Company")}</span>
        </div>
        <h1 id="hero-title">
          <span className="hero-line hero-line-1">{t("Building Value,")}</span>
          <span className="hero-line hero-line-2">{t("Recycling the Future.")}</span>
        </h1>
        <p className="hero-lede">
          {t("Premium, transparent, and efficient metal recycling services for industrial, commercial, and construction businesses across Saudi Arabia.")}
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/services">
            {t("Our Services")} <FaChevronRight className="directional-icon" />
          </Link>
          <Link className="secondary-button" to="/contact">
            {t("Contact Us")} <FaChevronRight className="directional-icon" />
          </Link>
        </div>
        <ul className="hero-trust" aria-label={t("Certifications and registrations")}>
          {certifications.map(({ title }) => (
            <li key={title}>{t(title)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

