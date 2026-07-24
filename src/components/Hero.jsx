import {
  FaChevronRight,
  FaIndustry,
} from "react-icons/fa";
import { Link } from "../lib/router.jsx";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" role="img" aria-label="Scrap handling excavator working in an industrial recycling yard" />
      <div className="hero-copy">
        <div className="eyebrow light"><span>Amanat Al-Kalima Company</span></div>
        <h1 id="hero-title">Building Value,<br /><span>Recycling the Future.</span></h1>
        <p>
          Premium, transparent, and efficient metal recycling services for
          industrial, commercial, and construction businesses across Saudi Arabia.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/services">
            Our Services <FaChevronRight />
          </Link>
          <Link className="secondary-button" to="/contact">
            Contact Us <FaChevronRight />
          </Link>
        </div>
      </div>
      <div className="hero-watermark" aria-hidden="true"><FaIndustry /></div>
    </section>
  );
}
