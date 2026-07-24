import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function PageHero({ eyebrow, title, copy, image, alt, trail }) {
  const { t } = useLanguage();
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="page-hero-media" style={{ backgroundImage: `url(${image})` }} role="img" aria-label={t(alt)} />
      <div className="page-hero-copy content-width">
        <div className="page-breadcrumb"><Link to="/">{t("Home")}</Link><FaChevronRight /> <span>{t(trail || title)}</span></div>
        <span className="page-kicker">{t(eyebrow)}</span>
        <h1 id="page-title">{t(title)}</h1>
        <p>{t(copy)}</p>
      </div>
    </section>
  );
}
