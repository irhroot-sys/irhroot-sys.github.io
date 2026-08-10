import { useEffect, useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { certifications } from "../data/siteContent.jsx";
import { BrandMark } from "./BrandMark.jsx";

// Subtle cursor-driven parallax on the hero image. Kept intentionally small
// (a few px of travel) so it reads as depth rather than motion, and it's
// fully opt-out for touch devices and prefers-reduced-motion so it never
// fights the entrance choreography defined in styles.css.
function useHeroParallax(targetRef) {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return undefined;
    if (typeof window === "undefined" || !window.matchMedia) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return undefined;

    let frame = null;
    const maxOffset = 10;

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        target.style.setProperty("--parallax-x", `${(x * -maxOffset).toFixed(2)}px`);
        target.style.setProperty("--parallax-y", `${(y * -maxOffset * 0.6).toFixed(2)}px`);
      });
    };

    const handlePointerLeave = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      target.style.setProperty("--parallax-x", "0px");
      target.style.setProperty("--parallax-y", "0px");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
    };
  }, [targetRef]);
}

export function Hero() {
  const { t } = useLanguage();
  const mediaImageRef = useRef(null);
  useHeroParallax(mediaImageRef);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <div
          ref={mediaImageRef}
          className="hero-media-image"
          role="img"
          aria-label={t("Industrial material recovery and dismantling operation")}
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
