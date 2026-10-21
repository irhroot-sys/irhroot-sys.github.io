import { LuArrowRight } from "react-icons/lu";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PAGE_HERO_SIZES } from "../data/imageSizes.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";

// Interior pages open on a light ground: the title is set large on the
// measure and the photograph runs from the header to the edge of the screen
// beside it, so every page opens on the yard itself while the homepage's
// navy statement stays the one dark opening on the site.
export function PageHero({ eyebrow, title, copy, image, alt, trail, parent }) {
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
          {eyebrow && <span className="page-kicker">{t(eyebrow)}</span>}
          <h1 id="page-title">{t(title)}</h1>
          <p>{t(copy)}</p>
        </div>
        <figure className="page-hero-plate">
          <div className="page-hero-media">
            <ResponsiveImage className="page-hero-image" data-parallax="0.05" src={image} sizes={PAGE_HERO_SIZES} alt={t(alt)} loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </figure>
      </div>
    </section>
  );
}
