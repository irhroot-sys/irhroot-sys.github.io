import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { contactDetails, navigation } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";

export function Footer() {
  const { openQuote } = useQuote();
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand">
          <img
            src="/assets/aalkc-footer-lockup-3ecaf288.png"
            width="1363"
            height="655"
            alt="Amanat Al-Kalima Company — AALKC"
            loading="lazy"
            decoding="async"
          />
          <p>Licensed scrap metal purchasing, collection, sorting, industrial logistics, and recycling services from Dammam across Saudi Arabia&apos;s Eastern Province.</p>
        </div>
        <div className="footer-links">
          <h2>Company</h2>
          {navigation.slice(1).map(({ label, to }) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div className="footer-contact">
          <h2>Contact</h2>
          <a href={contactDetails.phoneHref}><FaPhoneAlt /> {contactDetails.phoneLabel}</a>
          <a href={`mailto:${contactDetails.email}`}><FaEnvelope /> {contactDetails.email}</a>
          <span><FaMapMarkerAlt /> {contactDetails.address}</span>
          <button type="button" onClick={() => openQuote()}>Request a quote</button>
        </div>
      </div>
      <div className="footer-bottom content-width">
        <p>© {new Date().getFullYear()} Amanat Al-Kalima Company. All rights reserved.</p>
        <div className="footer-legal"><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link><span>C.R. 7050308233</span></div>
      </div>
    </footer>
  );
}
