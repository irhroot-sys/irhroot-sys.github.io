import { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { CARD_SIZES, PLATE_SIZES } from "../data/imageSizes.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// A service as a card: photograph, category, title, summary.
export function ServiceCard({ service, headingLevel = 3 }) {
  const { t } = useLanguage();
  const { slug, title, copy, image, alt, focalPosition, category } = service;
  const Heading = `h${headingLevel}`;
  return (
    <Link className="service-card" to={`/services/${slug}`}>
      <div className="service-media">
        <ResponsiveImage src={image} sizes={CARD_SIZES} alt={t(alt)} loading="lazy" decoding="async" style={{ objectPosition: focalPosition || "center" }} />
      </div>
      <div className="service-copy">
        <span className="label">{t(category)}</span>
        <Heading>{t(title)}</Heading>
        <p>{t(copy)}</p>
        <span className="service-more">{t("View service")} <LuArrowRight className="directional-icon" aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

// The homepage's capability index. The list is the content and the
// navigation; the stage beside it shows the photograph of whichever row is
// hovered or focused, so the six services read as one operation.
export function Capabilities({ services }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  return (
    <section className="capabilities content-section surface-white" id="services" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading
          id="capabilities-title"
          eyebrow="What we do"
          title="Six capabilities, one accountable counterpart"
          copy="Comprehensive scrap management tailored to industrial-scale operations, from collection and sorting to purchasing and global trade."
        />
        <div className="capability-layout">
          <ol className="capability-index">
            {services.map((service, index) => (
              <li key={service.slug}>
                <Link
                  className={`capability-row${active === index ? " is-active" : ""}`}
                  to={`/services/${service.slug}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="capability-text">
                    <span className="capability-cat">{t(service.category)}</span>
                    <span className="capability-title">{t(service.title)}</span>
                    <span className="capability-copy">{t(service.copy)}</span>
                  </span>
                  <LuArrowRight className="directional-icon capability-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <div className="capability-stage" aria-hidden="true">
            {services.map((service, index) => (
              <figure className={`plate capability-plate${active === index ? " is-active" : ""}`} key={service.slug}>
                <div className="plate-frame">
                  <ResponsiveImage src={service.image} sizes={PLATE_SIZES} alt="" loading="lazy" decoding="async" style={{ objectPosition: service.focalPosition || "center" }} />
                </div>
              </figure>
            ))}
          </div>
        </div>
        <Link className="secondary-button capability-all" to="/services">
          {t("Explore all services")} <LuArrowRight className="directional-icon" />
        </Link>
      </div>
    </section>
  );
}
