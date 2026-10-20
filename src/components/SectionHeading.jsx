import { useLanguage } from "../context/LanguageContext.jsx";

// The standard section opening: an indexed mono label, the title, and the
// supporting copy answering from the right of the measure.
export function SectionHeading({ index, eyebrow, title, copy, align = "left", compact = false, id }) {
  const { t } = useLanguage();
  return (
    <header className={`section-heading is-${align}${compact ? " is-compact" : ""}`}>
      <span>{index && <span className="label-index">{index}</span>}{t(eyebrow)}</span>
      <h2 id={id}>{t(title)}</h2>
      {copy && <p>{t(copy)}</p>}
    </header>
  );
}
