import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

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
            {t("Explore All Services")} <FaChevronRight />
          </Link>
        </div>

        <div className="service-cards" id="service-cards">
          {services.map(({ slug, icon: Icon, title, copy, image, alt }) => (
            <Link className="service-card" key={title} to={`/services#${slug}`}>
              <div className="service-media">
                <img src={image} alt={t(alt)} loading="lazy" />
                <div className="service-icon"><Icon /></div>
              </div>
              <div className="service-copy">
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
