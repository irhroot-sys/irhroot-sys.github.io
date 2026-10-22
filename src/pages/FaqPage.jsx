import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { frequentlyAskedQuestions } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { photos } from "../data/photos.js";

export function FaqPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Knowledge base"
        title="Frequently asked questions."
        copy="Essential information about accepted materials, collection, grading, pricing, compliance, and supplier payments."
        image={photos.flatbedCable.src}
        alt={photos.flatbedCable.alt}
        focus={photos.flatbedCable.focus}
        trail="FAQ"
      />
      <section className="content-section container faq-section">
        <SectionHeading eyebrow="AALKC guidance" title="What industrial suppliers ask us" copy="If your question is not covered here, send the material and site details to our Dammam team." />
        <div className="faq-list">
          {frequentlyAskedQuestions.map(({ question, answer }, index) => (
            <details key={question} open={index === 0}>
              <summary><span>{t(question)}</span></summary>
              <p>{t(answer)}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
