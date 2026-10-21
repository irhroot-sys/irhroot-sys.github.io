import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuCheck, LuPhone } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { ServiceCard } from "../components/Services.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { PhoneNumber } from "../components/PhoneNumber.jsx";
import { contactDetails, industries, services } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

const RELATED_COUNT = 3;

// The services that follow this one in the list, wrapping round, so every page
// links onward to a different set.
function relatedServices(slug) {
  const index = services.findIndex((service) => service.slug === slug);
  return Array.from({ length: RELATED_COUNT }, (_, offset) => services[(index + offset + 1) % services.length]);
}

export function ServiceDetailPage({ slug }) {
  const service = services.find((item) => item.slug === slug);
  const { openQuote } = useQuote();
  const { t } = useLanguage();
  const { title, copy, overview, capabilities, image, alt } = service;
  const suitedTo = industries.filter((industry) => industry.services.includes(slug));

  return (
    <>
      <PageHero eyebrow={service.category} title={title} copy={copy} image={image} alt={alt} parent={{ label: "Services", to: "/services" }} />

      <section className="content-section container service-page-layout">
        <div className="service-page-main">
          <SectionHeading eyebrow="Service overview" title={title} compact />
          <p className="service-page-lede">{t(overview)}</p>
          <h3 className="service-page-subheading">{t("What this service covers")}</h3>
          <ul className="check-list service-page-capabilities">
            {capabilities.map((capability) => <li key={capability}><LuCheck aria-hidden="true" />{t(capability)}</li>)}
          </ul>
          {suitedTo.length > 0 && (
            <>
              <h3 className="service-page-subheading">{t("Suited to")}</h3>
              <ul className="chip-list">
                {suitedTo.map((industry) => <li key={industry.slug}><Link to={`/industries/${industry.slug}`}>{t(industry.title)}</Link></li>)}
              </ul>
            </>
          )}
        </div>
        <aside className="service-page-aside on-ink" aria-label={t("Talk to our team")}>
          <span className="label">{t("Talk to AALKC")}</span>
          <h2>{t("Talk to our team")}</h2>
          <p>{t("Share the material, estimated quantity and site location. Our Dammam team will come back with the next step.")}</p>
          <button type="button" className="primary-button" onClick={() => openQuote({ service: title })}>
            {t("Request a quote")} <LuArrowRight className="directional-icon" />
          </button>
          <a className="service-page-aside-link" href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> {t("WhatsApp")}</a>
          <a className="service-page-aside-link" href={contactDetails.phoneHref}><LuPhone aria-hidden="true" /> <PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></a>
        </aside>
      </section>

      <ProcessSection />

      <section className="content-section container related-services" aria-labelledby="related-services-title">
        <SectionHeading id="related-services-title" eyebrow="Related services" title="Often combined with" compact />
        <div className="service-cards">
          {relatedServices(slug).map((related) => <ServiceCard key={related.slug} service={related} />)}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
