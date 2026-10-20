import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { ResponsiveImage } from "./ResponsiveImage.jsx";

// Measured against the card grid: one column, then two, then three capped at
// the content width.
const SERVICE_CARD_SIZES = "(max-width: 620px) calc(100vw - 44px), (max-width: 1020px) 45vw, (max-width: 1300px) 31vw, 400px";

export function ServiceCard({ service, headingLevel = 3 }) {
  const { t } = useLanguage();
  const { slug, icon: Icon, title, copy, image, alt, focalPosition } = service;
  const Heading = `h${headingLevel}`;
  return (
    <Link className="service-card" to={`/services/${slug}`}>
      <div className="service-media">
        <ResponsiveImage src={image} sizes={SERVICE_CARD_SIZES} alt={t(alt)} loading="lazy" decoding="async" style={{ objectPosition: focalPosition || "center" }} />
        <div className="service-icon"><Icon /></div>
      </div>
      <div className="service-copy">
        <Heading>{t(title)}</Heading>
        <p>{t(copy)}</p>
      </div>
    </Link>
  );
}

export function Services({ services }) {
  const { t } = useLanguage();
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services-layout">
        <div className="services-intro">
          <div className="eyebrow dark"><span>{t("What We Do")}</span></div>
          <h2 id="services-title">{t("Our Core Services")}</h2>
          <p>{t("Comprehensive scrap management tailored to industrial-scale operations, from collection and sorting to purchasing and global trade.")}</p>
          <Link className="explore-button" to="/services">
            {t("Explore All Services")} <FaChevronRight className="directional-icon" />
          </Link>
        </div>

        <div className="service-cards" id="service-cards">
          {services.map((service) => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </div>
    </section>
  );
}
