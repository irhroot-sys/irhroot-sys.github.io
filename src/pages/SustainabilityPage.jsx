import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CertificationList } from "../components/CertificationList.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { RecyclingFacts } from "../components/RecyclingFacts.jsx";
import { InsightsTeaser } from "../components/InsightsTeaser.jsx";
import { sustainabilityPillars } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function SustainabilityPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Keeping valuable metal in productive use."
        copy="Every load AALKC collects is graded and returned to the supply chain, so metal already in circulation is used again instead of being wasted."
        image="/assets/service-metal-sorting.webp"
        alt="Industrial metal stock prepared for sorting and grading"
        trail="Sustainability"
      />
      <section className="content-section container">
        <SectionHeading eyebrow="Our approach" title="Four commitments behind every load" />
        <ol className="value-grid">
          {sustainabilityPillars.map(({ icon: Icon, title, copy }) => (
            <li className="value-card" key={title}><Icon aria-hidden="true" /><h3>{t(title)}</h3><p>{t(copy)}</p></li>
          ))}
        </ol>
      </section>
      <RecyclingFacts />
      <InsightsTeaser
        slugs={["scrap-metal-in-saudi-circular-economy", "how-scrap-metal-is-recycled", "saudi-arabia-scrap-metal-industry"]}
        eyebrow="National direction"
        title="Supporting the Kingdom's circular economy"
        copy="Saudi Vision 2030 and the Saudi Green Initiative place growing emphasis on waste reduction and recycling. Recovering industrial metal in the Eastern Province, and returning it to mills and foundries, is AALKC's contribution to that direction."
      />
      <section className="content-section surface-white">
        <div className="container certification-section">
          <SectionHeading eyebrow="Standards" title="Certified operating standards" copy="AALKC maintains quality, environmental, and safety certifications alongside verified Ministry of Commerce registration." />
          <CertificationList />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
