import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { frequentlyAskedQuestions } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export function FaqPage() {
  const { t } = useLanguage();
  usePageMeta({
    title: "Frequently Asked Questions",
    description: "Answers about AALKC accepted scrap materials, industrial collection, grading, pricing, environmental controls, and supplier payments.",
    path: "/faq",
  });

  return (
    <>
      <PageHero
        eyebrow="Knowledge base"
        title="Frequently asked questions."
        copy="Essential information about accepted materials, collection, grading, pricing, compliance, and supplier payments."
        image="/assets/service-scrap-metal.webp"
        alt="Sorted scrap metal at an industrial recycling yard"
        trail="FAQ"
      />
      <section className="content-section content-width faq-section">
        <SectionHeading eyebrow="AALKC guidance" title="What industrial suppliers ask us" copy="If your question is not covered here, send the material and site details to our Dammam team." />
        <div className="faq-list">
          {frequentlyAskedQuestions.map(({ question, answer }, index) => (
            <details key={question} open={index === 0}>
              <summary>{t(question)}</summary>
              <p>{t(answer)}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
