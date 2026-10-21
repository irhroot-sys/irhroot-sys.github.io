import { useLanguage } from "../context/LanguageContext.jsx";

// The standard section opening: a quiet kicker, the title, and the
// supporting copy answering from the right of the measure. Sections are not a
// sequence, so they are not numbered.
export function SectionHeading({ eyebrow, title, copy, align = "left", compact = false, id }) {
  const { t } = useLanguage();
  return (
    <header className={`section-heading is-${align}${compact ? " is-compact" : ""}`}>
      {eyebrow && <span>{t(eyebrow)}</span>}
      <h2 id={id}>{t(title)}</h2>
      {copy && <p>{t(copy)}</p>}
    </header>
  );
}
