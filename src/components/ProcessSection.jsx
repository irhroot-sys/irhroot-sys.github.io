import { processSteps } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// The chain of custody from enquiry to settlement, drawn along a scale rule:
// each step is a station on the rule, and the last — settlement — is the
// one marked in copper.
export function ProcessSection({
  index,
  eyebrow = "Our process",
  title = "A clear route from requirement to completion",
  copy,
  surface = "surface-mist",
}) {
  const { t } = useLanguage();
  return (
    <section className={`method content-section ${surface}`} aria-labelledby="method-title">
      <div className="container">
        <SectionHeading id="method-title" index={index} eyebrow={eyebrow} title={title} copy={copy} />
        <div className="method-track">
          <span className="scale-rule" aria-hidden="true" />
          <ol className="process-grid">
            {processSteps.map((step) => (
              <li key={step.number}>
                <span className="method-station" aria-hidden="true" />
                <strong>{t("Step")} {step.number}</strong>
                <h3>{t(step.title)}</h3>
                <p>{t(step.copy)}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
