import { FaChevronRight } from "react-icons/fa";
import { Link } from "../lib/router.jsx";

export function Services({ services }) {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="services-layout">
        <div className="services-intro">
          <div className="eyebrow dark"><span>What We Do</span></div>
          <h2 id="services-title">Our Core Services</h2>
          <p>
            Comprehensive scrap management tailored to industrial-scale operations,
            from collection and sorting to purchasing and global trade.
          </p>
          <Link className="explore-button" to="/services">
            Explore All Services <FaChevronRight />
          </Link>
        </div>

        <div className="service-cards" id="service-cards">
          {services.map(({ slug, icon: Icon, title, copy, image, alt }) => (
            <Link className="service-card" key={title} to={`/services#${slug}`}>
              <img src={image} alt={alt} loading="lazy" />
              <div className="service-icon"><Icon /></div>
              <div className="service-copy">
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
