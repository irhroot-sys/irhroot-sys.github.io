import { FaChevronLeft } from "react-icons/fa";
import { legalContent } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function LegalPage({ documentKey }) {
  const content = legalContent[documentKey];
  const { t } = useLanguage();

  usePageMeta({
    title: content?.title || "Legal",
    description: content?.intro || "AALKC legal information.",
    path: `/${documentKey}`,
  });

  return (
    <article className="legal-page content-width">
      <Link className="back-link" to="/"><FaChevronLeft /> {t("Back to home")}</Link>
      <span className="page-kicker">{t("AALKC legal")}</span>
      <h1>{t(content.title)}</h1>
      <p className="legal-intro">{t(content.intro)}</p>
      <div className="legal-sections">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{t(section.title)}</h2>
            <p>{t(section.copy)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
