import { FaChevronRight } from "react-icons/fa";
import { industries } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

export function IndustriesPreview() {
  const { t } = useLanguage();
  return (
    <section className="content-section content-width industries-preview" aria-labelledby="industries-preview-title">
      <div className="industries-preview-head">
        <SectionHeading eyebrow="Industries" title="Built around the sectors that generate scrap" copy="From active construction sites to plant shutdowns, collection and grading are planned around how each sector works." />
        <Link className="explore-button" to="/industries">{t("Explore industries")} <FaChevronRight className="directional-icon" /></Link>
      </div>
      <div className="industry-tiles">
        {industries.map(({ slug, icon: Icon, title, copy }) => (
          <Link className="industry-tile" key={slug} to={`/industries#${slug}`}>
            <Icon aria-hidden="true" />
            <h3>{t(title)}</h3>
            <p>{t(copy)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
