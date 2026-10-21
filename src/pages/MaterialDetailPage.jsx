import { LuArrowRight } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { GuideBody } from "../components/Guide.jsx";
import { RelatedLinks } from "../components/LongForm.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { findMaterial, guideLinks, materialMeta, resolveSources } from "../data/knowledge/index.js";
import { materialGuides } from "../data/knowledge/materials.js";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

// One page per material family: how it is graded, what lowers the grade and
// where it goes next, with the material's register in the margin and a quote
// request that arrives with the material already chosen.
export function MaterialDetailPage({ id }) {
  const material = findMaterial(id);
  const guide = { ...materialMeta[id], ...materialGuides[id] };
  const { openQuote } = useQuote();
  const { t } = useLanguage();

  const requestQuote = () => openQuote({
    kind: "material",
    contextId: id,
    service: material.name,
    title: "Request a spot quote",
    prompt: "Share the estimated quantity, condition, site location, and collection requirements.",
  });

  return (
    <>
      <PageHero
        eyebrow={material.category === "Ferrous" ? "Ferrous material guide" : "Non-ferrous material guide"}
        title={guide.title}
        copy={guide.standfirst}
        image={material.image}
        alt={material.alt}
        trail={material.name}
        parent={{ label: "Materials", to: "/materials" }}
      />
      <section className="content-section guide-section" aria-label={t(guide.title)}>
        <GuideBody
          brief={guide.brief}
          blocks={guide.blocks}
          faq={guide.faq}
          sources={resolveSources(guide.sources)}
          register={guide.facts}
          action={(
            <div className="guide-action">
              <p>{t("Prices follow the grade and the certified weight, confirmed after inspection.")}</p>
              <button type="button" className="primary-button" onClick={requestQuote}>
                {t("Request a spot quote")} <LuArrowRight className="directional-icon" />
              </button>
            </div>
          )}
        />
      </section>
      <section className="content-section surface-mist guide-onward">
        <div className="container">
          <RelatedLinks
            title="Keep reading"
            items={guideLinks({ materials: guide.related, industries: guide.industries, insights: guide.insights, services: guide.services })}
          />
        </div>
      </section>
      <CtaBand title="Have this material to sell?" copy="Send the material type, estimated quantity, condition, and site location for verification." />
    </>
  );
}
