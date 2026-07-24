import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { contactDetails, navigation } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function Footer() {
  const { openQuote } = useQuote();
  const { t, isArabic } = useLanguage();
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
          <p>{t("Licensed scrap metal purchasing, collection, sorting, industrial logistics, and recycling services from Dammam across Saudi Arabia's Eastern Province.")}</p>
        </div>
        <div className="footer-links">
          <h2>{t("Company")}</h2>
          {navigation.slice(1).map(({ label, to }) => <Link key={to} to={to}>{t(label)}</Link>)}
        </div>
        <div className="footer-contact">
          <h2>{t("Contact")}</h2>
          <a href={contactDetails.phoneHref}><FaPhoneAlt /> {contactDetails.phoneLabel}</a>
          <a href={`mailto:${contactDetails.email}`}><FaEnvelope /> {contactDetails.email}</a>
          <span><FaMapMarkerAlt /> {isArabic ? contactDetails.addressArabic : contactDetails.address}</span>
          <button type="button" onClick={() => openQuote()}>{t("Request a quote")}</button>
        </div>
      </div>
      <div className="footer-bottom content-width">
        <p>© {new Date().getFullYear()} {t("Amanat Al-Kalima Company")}. {t("All rights reserved.")}</p>
        <div className="footer-legal"><Link to="/privacy">{t("Privacy Policy")}</Link><Link to="/terms">{t("Terms of Service")}</Link><span>C.R. 7050308233</span></div>
      </div>
    </footer>
  );
}
