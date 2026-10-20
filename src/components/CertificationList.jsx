import { certifications } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function CertificationList() {
  const { t } = useLanguage();
  return (
    <div className="certification-grid">
      {certifications.map((certification) => (
        <article key={certification.title}>
          <strong>{t(certification.title)}</strong>
          <span>{t(certification.label)}</span>
          <p>{t(certification.copy)}</p>
        </article>
      ))}
    </div>
  );
}
