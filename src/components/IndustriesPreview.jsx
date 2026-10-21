import { LuArrowRight } from "react-icons/lu";
import { industries } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// Sectors as a typographic register on ink: the sector, what it produces,
// and the materials it typically sends. Each row opens the sector guide.
export function IndustriesPreview() {
  const { t } = useLanguage();
  return (
    <section className="sectors content-section surface-ink on-ink" aria-labelledby="sectors-title">
      <div className="container">
        <SectionHeading
          id="sectors-title"
          eyebrow="Industries"
          title="Built around the sectors that generate scrap"
          copy="From active construction sites to plant shutdowns, collection and grading are planned around how each sector works."
        />
        <ul className="sector-list">
          {industries.map(({ slug, title, copy, materials }) => (
            <li key={slug}>
              <Link className="sector-row" to={`/industries/${slug}`}>
                <span className="sector-title">{t(title)}</span>
                <span className="sector-copy">{t(copy)}</span>
                <span className="sector-materials">{materials.slice(0, 3).map((material) => t(material)).join(", ")}</span>
                <LuArrowRight className="directional-icon sector-arrow" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
