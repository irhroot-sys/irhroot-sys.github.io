import { LuArrowLeft } from "react-icons/lu";
import { legalContent } from "../data/siteContent.jsx";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function LegalPage({ documentKey }) {
  const content = legalContent[documentKey];
  const { t } = useLanguage();

  return (
    <article className="legal-page content-width">
      <Link className="back-link" to="/"><LuArrowLeft className="directional-icon" /> {t("Back to home")}</Link>
      <span className="page-kicker">{t("AALKC legal")}</span>
      <h1>{t(content.title)}</h1>
      <p className="legal-intro">{t(content.intro)}</p>
      <div className="legal-sections">
        {content.sections.map((section, index) => (
          <section key={section.title}>
            <span className="legal-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h2>{t(section.title)}</h2>
            <p>{t(section.copy)}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
