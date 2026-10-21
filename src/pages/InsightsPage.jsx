import { LuArrowRight } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { readingMinutes, readingTimeLabel } from "../components/LongForm.jsx";
import { industries, materials } from "../data/siteContent.jsx";
import { industryMeta, insightMeta, materialMeta } from "../data/knowledge/index.js";
import { insightBodies } from "../data/knowledge/insights.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

// The reading room: articles on the industry first, then the reference
// guides — one per material, one per sector, and the process — so a reader
// arriving from a search can find the answer and the next question.
export function InsightsPage() {
  const { t, language } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Notes on the scrap metal trade."
        copy="How scrap is graded, processed and recycled, the history and rules of the trade in Saudi Arabia, and practical guidance for suppliers. Every figure is cited."
        image="/assets/service-metal-sorting.webp"
        alt="Industrial metal stock prepared for sorting and grading"
        trail="Insights"
      />

      <section className="content-section container" aria-labelledby="articles-title">
        <SectionHeading id="articles-title" eyebrow="Articles" title="Read about the industry" copy="Written for procurement teams, site managers and anyone who needs to understand scrap metal before they sell it." />
        <ol className="article-index">
          {insightMeta.map(({ slug, category, title, description }) => (
            <li key={slug}>
              <Link to={`/insights/${slug}`} className="article-index-link">
                <span className="article-index-category">{t(category)}</span>
                <h3 className="article-index-title">{t(title)}</h3>
                <span className="article-index-summary">{t(description)}</span>
                <span className="article-index-meta">
                  {readingTimeLabel(readingMinutes(insightBodies[slug].blocks), language)}
                  <LuArrowRight className="directional-icon" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section surface-mist" aria-labelledby="guides-title">
        <div className="container">
          <SectionHeading id="guides-title" eyebrow="Reference guides" title="Guides to materials and sectors" copy="One page for each material AALKC buys and each sector it works with, and a step-by-step account of how a load is handled." />
          <div className="guide-index">
            <nav className="guide-index-group" aria-labelledby="guide-index-materials">
              <h3 id="guide-index-materials">{t("Materials")}</h3>
              <ul>
                {materials.map(({ id }) => <li key={id}><Link to={`/materials/${id}`}>{t(materialMeta[id].title)}</Link></li>)}
              </ul>
            </nav>
            <nav className="guide-index-group" aria-labelledby="guide-index-industries">
              <h3 id="guide-index-industries">{t("Industries")}</h3>
              <ul>
                {industries.map(({ slug }) => <li key={slug}><Link to={`/industries/${slug}`}>{t(industryMeta[slug].title)}</Link></li>)}
              </ul>
            </nav>
            <nav className="guide-index-group" aria-labelledby="guide-index-process">
              <h3 id="guide-index-process">{t("How we work")}</h3>
              <ul>
                <li><Link to="/process">{t("From enquiry to onward supply")}</Link></li>
                <li><Link to="/faq">{t("Frequently Asked Questions")}</Link></li>
                <li><Link to="/sustainability">{t("Sustainability")}</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <CtaBand title="Have a question the guides do not answer?" copy="Describe the material and the site, and our team will recommend the right approach." action="contact" />
    </>
  );
}
