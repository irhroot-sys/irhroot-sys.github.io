import { processSteps } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

export function ProcessSection({
  eyebrow = "Our process",
  title = "A clear route from requirement to completion",
  copy,
}) {
  const { t } = useLanguage();
  return (
    <section className="content-section soft-section">
      <div className="content-width">
        <SectionHeading eyebrow={eyebrow} title={title} copy={copy} align="center" />
        <div className="process-grid">
          {processSteps.map((step) => <article key={step.number}><strong>{step.number}</strong><h3>{t(step.title)}</h3><p>{t(step.copy)}</p></article>)}
        </div>
      </div>
    </section>
  );
}
