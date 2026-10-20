import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { ResponsiveImage } from "./ResponsiveImage.jsx";

export function PageHero({ eyebrow, title, copy, image, alt, trail, parent }) {
  const { t } = useLanguage();
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-media" data-parallax="0.05">
        <ResponsiveImage className="page-hero-image" src={image} sizes="100vw" alt={t(alt)} loading="eager" fetchPriority="high" decoding="async" />
      </div>
      <div className="page-hero-copy content-width">
        <div className="page-breadcrumb">
          <Link to="/">{t("Home")}</Link><FaChevronRight className="directional-icon" />{" "}
          {parent && <><Link to={parent.to}>{t(parent.label)}</Link><FaChevronRight className="directional-icon" />{" "}</>}
          <span>{t(trail || title)}</span>
        </div>
        <span className="page-kicker">{t(eyebrow)}</span>
        <h1 id="page-title">{t(title)}</h1>
        <p>{t(copy)}</p>
      </div>
    </section>
  );
}
