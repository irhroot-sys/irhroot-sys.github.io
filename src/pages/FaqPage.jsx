import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { frequentlyAskedQuestions } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function FaqPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Knowledge base"
        title="Frequently asked questions."
        copy="Essential information about accepted materials, collection, grading, pricing, compliance, and supplier payments."
        image="/assets/service-scrap-metal.webp"
        alt={t("Sorted scrap metal at an industrial recycling yard")}
        trail="FAQ"
      />
      <section className="content-section container faq-section">
        <SectionHeading index="01" eyebrow="AALKC guidance" title="What industrial suppliers ask us" copy="If your question is not covered here, send the material and site details to our Dammam team." />
        <div className="faq-list">
          {frequentlyAskedQuestions.map(({ question, answer }, index) => (
            <details key={question} open={index === 0}>
              <summary><span className="faq-no" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{t(question)}</span></summary>
              <p>{t(answer)}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
