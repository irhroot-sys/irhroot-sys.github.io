import { LuArrowRight } from "react-icons/lu";
import { materials } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// What AALKC buys, set as an assay register: each family under its chemical
// symbol (or an alloy's principal elements), with the grade AALKC lists for
// it. Every tile opens the guide to that material.
export function MaterialsAssay() {
  const { t } = useLanguage();
  return (
    <section className="assay content-section surface-mist" aria-labelledby="assay-title">
      <div className="container">
        <SectionHeading
          id="assay-title"
          eyebrow="What we buy"
          title="Ferrous and non-ferrous, graded at source"
          copy="Eight material families form the core of what AALKC purchases. Every load is inspected and weighed before its grade and value are confirmed."
        />
        <ul className="assay-grid">
          {materials.map(({ id, symbol, atomicNumber, name, category, details }) => (
            <li key={id}>
              <Link className="assay-tile" to={`/materials/${id}`} data-alloy={atomicNumber ? undefined : ""}>
                <span className="assay-meta">
                  <span dir="ltr">{atomicNumber ?? t("Alloy")}</span>
                  <span>{t(category)}</span>
                </span>
                <span className="assay-symbol" dir="ltr" aria-hidden="true">{symbol}</span>
                <span className="assay-name">
                  <strong>{t(name)}</strong>
                  <small>{t(details[0])}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link className="inline-action assay-more" to="/materials">
          {t("View the full material catalogue")} <LuArrowRight className="directional-icon" />
        </Link>
      </div>
    </section>
  );
}
