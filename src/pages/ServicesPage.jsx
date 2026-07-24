import { FaCheck, FaChevronRight } from "react-icons/fa";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { processSteps, services } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";

export function ServicesPage() {
  const { openQuote } = useQuote();
  usePageMeta({
    title: "Services",
    description: "Explore AALKC container service, industrial demolition, scrap purchasing, heavy logistics, metal sorting, and global export support.",
    path: "/services",
    image: "/assets/service-scrap-metal.webp",
  });

  return (
    <>
      <PageHero
        eyebrow="Industrial recycling services"
        title="Scrap management built for industrial scale."
        copy="From site collection and dismantling to grading, logistics, purchasing, and global trade, AALKC coordinates the complete material-recovery process."
        image="/assets/service-scrap-metal.webp"
        alt="Industrial scrap metal ready for recovery"
        trail="Services"
      />

      <section className="content-section content-width">
        <SectionHeading eyebrow="What we do" title="Six connected service lines" copy="Choose a service below or send the full requirement and our team will coordinate the right operational route." />
        <div className="service-detail-list">
          {services.map(({ slug, icon: Icon, title, copy, image, alt, capabilities }, index) => (
            <article className={`service-detail ${index % 2 ? "is-reversed" : ""}`} id={slug} key={slug}>
              <div className="service-detail-media"><img src={image} alt={alt} loading="lazy" /></div>
              <div className="service-detail-copy">
                <span className="detail-number">0{index + 1}</span>
                <Icon className="detail-icon" />
                <h2>{title}</h2>
                <p>{copy}</p>
                <ul>{capabilities.map((capability) => <li key={capability}><FaCheck />{capability}</li>)}</ul>
                <button type="button" className="inline-action" onClick={() => openQuote({ service: title, title: `Enquire about ${title}` })}>
                  Discuss this service <FaChevronRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section soft-section">
        <div className="content-width">
          <SectionHeading eyebrow="Our process" title="A clear route from requirement to completion" align="center" />
          <div className="process-grid">
            {processSteps.map((step) => <article key={step.number}><strong>{step.number}</strong><h3>{step.title}</h3><p>{step.copy}</p></article>)}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
