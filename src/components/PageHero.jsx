import { LuArrowRight } from "react-icons/lu";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PAGE_HERO_SIZES } from "../data/imageSizes.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";

// Interior pages open on paper, not on a darkened photograph: the title is
// set large on the measure and the image is a captioned plate beside it, so
// the homepage's ink statement stays the one cinematic moment on the site.
export function PageHero({ eyebrow, title, copy, image, alt, trail, parent, figure = "01" }) {
  const { t } = useLanguage();
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <nav className="page-breadcrumb" aria-label={t("Breadcrumb")}>
            <Link to="/">{t("Home")}</Link><LuArrowRight className="directional-icon" aria-hidden="true" />{" "}
            {parent && <><Link to={parent.to}>{t(parent.label)}</Link><LuArrowRight className="directional-icon" aria-hidden="true" />{" "}</>}
            <span aria-current="page">{t(trail || title)}</span>
          </nav>
          <span className="page-kicker"><span className="label-index">AALKC</span>{t(eyebrow)}</span>
          <h1 id="page-title">{t(title)}</h1>
          <p>{t(copy)}</p>
        </div>
        <figure className="plate page-hero-plate">
          <div className="plate-frame page-hero-media">
            <ResponsiveImage className="page-hero-image" data-parallax="0.05" src={image} sizes={PAGE_HERO_SIZES} alt={t(alt)} loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <figcaption><b>{t("Fig.")} {figure}</b>{t(alt)}</figcaption>
        </figure>
      </div>
      <div className="container"><span className="scale-rule" aria-hidden="true" /></div>
    </section>
  );
}
