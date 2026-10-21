import { LuArrowRight } from "react-icons/lu";
import { recyclingFacts } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// Published industry figures about metal recycling in general, each credited
// to its source — never presented as AALKC's own results. Set as a data
// plate: the figure, the metal, the statement and its source.
export function RecyclingFacts({ withLink = false }) {
  const { t } = useLanguage();
  return (
    <section className="facts content-section surface-ink on-ink" aria-labelledby="facts-title">
      <div className="container">
        <SectionHeading id="facts-title" eyebrow="Why metal recycling matters" title="Recycled metal saves energy and raw materials" />
        <div className="facts-grid">
          {recyclingFacts.map(({ figure, metal, copy, source }) => (
            <figure key={metal}>
              <span className="facts-metal">{t(metal)}</span>
              <strong dir="auto">{t(figure)}</strong>
              <figcaption>
                <p>{t(copy)}</p>
                <small>{t("Source:")} {source}</small>
              </figcaption>
            </figure>
          ))}
        </div>
        {withLink && (
          <Link className="secondary-button facts-link" to="/sustainability">
            {t("Our approach to sustainability")} <LuArrowRight className="directional-icon" />
          </Link>
        )}
      </div>
    </section>
  );
}
