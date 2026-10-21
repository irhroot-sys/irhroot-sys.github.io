import { LuArrowRight } from "react-icons/lu";
import { GuideBody } from "../components/Guide.jsx";
import { RelatedLinks, readingMinutes, readingTimeLabel } from "../components/LongForm.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { findInsightMeta, insightMeta, resolveSources } from "../data/knowledge/index.js";
import { insightBodies } from "../data/knowledge/insights.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

// Dates are written out by hand rather than with Intl, so the prerendered
// page and the browser always produce the same text (and hydrate cleanly).
const MONTHS = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
};

export function formatDate(iso, language) {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} ${MONTHS[language][month - 1]} ${year}`;
}

// Articles open on type alone: no photograph competes with the question the
// page answers. The title is set as a statement on the measure, the standfirst
// answers it in a sentence, and the record line says when it was written, how
// long it takes to read and who stands behind it.
export function ArticlePage({ slug }) {
  const article = { ...findInsightMeta(slug), ...insightBodies[slug] };
  const { t, language } = useLanguage();
  const minutes = readingMinutes(article.blocks);
  const others = insightMeta.filter((item) => item.slug !== slug && !article.related.some((link) => link.to === `/insights/${item.slug}`)).slice(0, 2);

  return (
    <>
      <header className="article-header">
        <div className="container article-header-grid">
          <nav className="page-breadcrumb" aria-label={t("Breadcrumb")}>
            <Link to="/">{t("Home")}</Link><LuArrowRight className="directional-icon" aria-hidden="true" />{" "}
            <Link to="/insights">{t("Insights")}</Link><LuArrowRight className="directional-icon" aria-hidden="true" />{" "}
            <span aria-current="page">{t(article.category)}</span>
          </nav>
          <span className="page-kicker">{t(article.category)}</span>
          <h1 id="page-title">{t(article.title)}</h1>
          <p className="article-standfirst">{t(article.standfirst)}</p>
          <dl className="article-record">
            <div><dt>{t("Published")}</dt><dd><time dateTime={article.datePublished}>{formatDate(article.datePublished, language)}</time></dd></div>
            <div><dt>{t("Reading time")}</dt><dd>{readingTimeLabel(minutes, language)}</dd></div>
            <div><dt>{t("Written by")}</dt><dd>{t("Amanat Al-Kalima Company")}</dd></div>
          </dl>
        </div>
      </header>

      <section className="content-section guide-section is-article" aria-label={t(article.title)}>
        <GuideBody
          brief={article.brief}
          blocks={article.blocks}
          faq={article.faq}
          sources={resolveSources(article.sources)}
          registerTitle="On this page"
        />
      </section>

      <section className="content-section surface-mist guide-onward">
        <div className="container">
          <RelatedLinks
            title="Keep reading"
            items={[
              ...article.related,
              ...others.map((item) => ({ to: `/insights/${item.slug}`, label: item.title, note: item.category })),
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
