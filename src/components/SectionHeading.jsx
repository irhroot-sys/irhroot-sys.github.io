import { useLanguage } from "../context/LanguageContext.jsx";

export function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  const { t } = useLanguage();
  return (
    <header className={`section-heading is-${align}`}>
      <span>{t(eyebrow)}</span>
      <h2>{t(title)}</h2>
      {copy && <p>{t(copy)}</p>}
    </header>
  );
}
