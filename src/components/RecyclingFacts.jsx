import { FaChevronRight } from "react-icons/fa";
import { recyclingFacts } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

// Published industry figures about metal recycling in general, each credited
// to its source — never presented as AALKC's own results.
export function RecyclingFacts({ withLink = false }) {
  const { t } = useLanguage();
  return (
    <section className="facts-band" aria-labelledby="facts-title">
      <div className="content-width">
        <span className="facts-kicker">{t("Why metal recycling matters")}</span>
        <h2 id="facts-title">{t("Recycled metal saves energy and raw materials")}</h2>
        <div className="facts-grid">
          {recyclingFacts.map(({ figure, metal, copy, source }) => (
            <figure key={metal}>
              <strong dir="auto">{t(figure)}</strong>
              <figcaption>
                <span>{t(metal)}</span>
                <p>{t(copy)}</p>
                <small>{t("Source:")} {source}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        {withLink && (
          <Link className="secondary-button facts-link" to="/sustainability">
            {t("Our approach to sustainability")} <FaChevronRight className="directional-icon" />
          </Link>
        )}
      </div>
    </section>
  );
}
