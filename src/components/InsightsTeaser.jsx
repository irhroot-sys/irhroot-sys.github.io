import { LuArrowRight } from "react-icons/lu";
import { findInsightMeta } from "../data/knowledge/index.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

const DEFAULT_SLUGS = ["scrap-metal-grades-explained", "saudi-arabia-scrap-metal-industry", "preparing-scrap-for-grading"];

// A short shelf of articles for pages outside the reading room.
export function InsightsTeaser({ slugs = DEFAULT_SLUGS, surface = "surface-mist", eyebrow = "Insights", title = "Understand the trade before you sell", copy = "Guides on grading, recycling and the scrap industry in Saudi Arabia, with every figure cited." }) {
  const { t } = useLanguage();
  return (
    <section className={`insights-teaser content-section ${surface}`} aria-labelledby="insights-teaser-title">
      <div className="container">
        <SectionHeading id="insights-teaser-title" eyebrow={eyebrow} title={title} copy={copy} />
        <ul className="article-index is-shelf">
          {slugs.map((slug) => {
            const { category, title: articleTitle, description } = findInsightMeta(slug);
            return (
              <li key={slug}>
                <Link to={`/insights/${slug}`} className="article-index-link">
                  <span className="article-index-category">{t(category)}</span>
                  <h3 className="article-index-title">{t(articleTitle)}</h3>
                  <span className="article-index-summary">{t(description)}</span>
                  <span className="article-index-meta">{t("Read the article")} <LuArrowRight className="directional-icon" aria-hidden="true" /></span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link className="inline-action insights-teaser-more" to="/insights">
          {t("All insights and guides")} <LuArrowRight className="directional-icon" />
        </Link>
      </div>
    </section>
  );
}
