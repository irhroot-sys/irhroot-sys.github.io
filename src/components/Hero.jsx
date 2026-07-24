import {
  FaChevronRight,
  FaIndustry,
} from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" role="img" aria-label="Scrap handling excavator working in an industrial recycling yard" />
      <div className="hero-copy">
        <div className="eyebrow light"><span>{t("Amanat Al-Kalima Company")}</span></div>
        <h1 id="hero-title">{t("Building Value,")}<br /><span>{t("Recycling the Future.")}</span></h1>
        <p>
          {t("Premium, transparent, and efficient metal recycling services for industrial, commercial, and construction businesses across Saudi Arabia.")}
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/services">
            {t("Our Services")} <FaChevronRight />
          </Link>
          <Link className="secondary-button" to="/contact">
            {t("Contact Us")} <FaChevronRight />
          </Link>
        </div>
      </div>
      <div className="hero-watermark" aria-hidden="true"><FaIndustry /></div>
    </section>
  );
}
