import { certifications } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

// Each standard as a plate: the issuing scheme and edition in mono, the
// standard's number set large — the way it appears on the certificate.
function plateParts(title) {
  const iso = /^ISO (\d+):(\d{4})$/.exec(title);
  if (iso) return { scheme: "ISO", number: iso[1], edition: iso[2] };
  return { scheme: "KSA", number: "MoC", edition: null };
}

export function CertificationList() {
  const { t } = useLanguage();
  return (
    <ul className="certification-grid">
      {certifications.map((certification) => {
        const { scheme, number, edition } = plateParts(certification.title);
        return (
          <li key={certification.title}>
            <span className="sr-only">{t(certification.title)}</span>
            <span className="cert-scheme" dir="ltr" aria-hidden="true">{scheme}{edition && <span>: {edition}</span>}</span>
            <strong className="cert-number" dir="ltr" aria-hidden="true">{number}</strong>
            <span className="cert-label">{t(certification.label)}</span>
            <p>{t(certification.copy)}</p>
          </li>
        );
      })}
    </ul>
  );
}
