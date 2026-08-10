import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { certifications } from "../data/siteContent.jsx";
import { BrandMark } from "./BrandMark.jsx";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <div className="hero-media-image" role="img" aria-label={t("Industrial material recovery and dismantling operation")} />
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
