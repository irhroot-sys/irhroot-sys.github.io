import { LuArrowRight } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { Blocks, FaqBlock, InBrief, RelatedLinks } from "../components/LongForm.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { guideLinks, processMeta } from "../data/knowledge/index.js";
import { processGuide } from "../data/knowledge/process.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { photos } from "../data/photos.js";

// The stages are a true sequence — each depends on the one before — so this is
// the one place on the site where they are numbered.
export function ProcessPage() {
  const { t } = useLanguage();
  const { title } = processMeta;
  const { standfirst, brief, stages, downstream, faq } = processGuide;
  return (
    <>
      <PageHero
        eyebrow="From enquiry to onward supply"
        title={title}
        copy={standfirst}
        image={photos.weighbridge.src}
        alt={photos.weighbridge.alt}
        focus={photos.weighbridge.focus}
        trail={title}
      />

      <section className="content-section container process-intro">
        <InBrief points={brief} />
      </section>

      <section className="content-section surface-mist process-stages-section" aria-labelledby="stages-title">
        <div className="container">
          <SectionHeading id="stages-title" eyebrow="The sequence" title="Seven stages, one documented record." copy="Every load follows the same order, so the value is set on what was actually delivered." />
          <ol className="process-stages">
            {stages.map(({ id, title: stageTitle, copy, points, links }, index) => (
              <li className="process-stage" id={id} key={id}>
                <span className="process-stage-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(stageTitle)}</h3>
                <div className="process-stage-body">
                  <p>{t(copy)}</p>
                  <ul className="process-stage-points">
                    {points.map((point, pointIndex) => <li key={pointIndex}>{t(point)}</li>)}
                  </ul>
                  {links?.length > 0 && (
                    <p className="process-stage-links">
                      {links.map(([to, label]) => (
                        <Link key={to} className="inline-action" to={to}>{t(label)} <LuArrowRight className="directional-icon" /></Link>
                      ))}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section container process-after">
        <div className="longform process-longform">
          <Blocks blocks={downstream} />
        </div>
        <FaqBlock items={faq} />
      </section>

      <section className="content-section surface-mist guide-onward">
        <div className="container">
          <RelatedLinks
            title="Keep reading"
            items={[
              ...guideLinks({ insights: ["scrap-metal-grades-explained", "preparing-scrap-for-grading", "quality-and-safety-in-scrap-trading"] }),
              { to: "/materials", label: "Materials", note: "Guides to each material family we buy" },
            ]}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
