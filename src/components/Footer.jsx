import { FaWhatsapp } from "react-icons/fa";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { contactDetails, footerCompanyLinks, services } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PhoneNumber } from "./PhoneNumber.jsx";
import { BrandMark } from "./BrandMark.jsx";

export function Footer() {
  const { openQuote } = useQuote();
  const { t, isArabic } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-main content-width">
        <div className="footer-brand">
          <div className="footer-lockup">
            <BrandMark className="footer-brandmark" />
            <p className="footer-wordmark">
              <strong dir="ltr">AALKC</strong>
              <span dir="ltr">Amanat Al-Kalima Company</span>
              <span lang="ar" dir="rtl">شركة أمانة الكلمة</span>
            </p>
          </div>
          <p>{t("Licensed scrap metal purchasing, collection, sorting, industrial logistics, and recycling services from Dammam across Saudi Arabia's Eastern Province.")}</p>
        </div>
        <div className="footer-links">
          <h2>{t("Services")}</h2>
          {services.map(({ slug, title }) => <Link key={slug} to={`/services/${slug}`}>{t(title)}</Link>)}
        </div>
        <div className="footer-links">
          <h2>{t("Company")}</h2>
          {footerCompanyLinks.map(({ label, to }) => <Link key={to} to={to}>{t(label)}</Link>)}
        </div>
        <div className="footer-contact">
          <h2>{t("Contact")}</h2>
          <a href={contactDetails.phoneHref}><LuPhone /> <PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></a>
          <a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp /> {t("WhatsApp")}</a>
          <a href={`mailto:${contactDetails.email}`}><LuMail /> {contactDetails.email}</a>
          <a href={contactDetails.mapHref} target="_blank" rel="noopener noreferrer"><LuMapPin /> {isArabic ? contactDetails.addressArabic : contactDetails.address}</a>
          <button type="button" onClick={() => openQuote()}>{t("Request a quote")}</button>
        </div>
      </div>
      <p className="footer-signature content-width" aria-hidden="true">
        <span dir="ltr">Amanat Al-Kalima</span>
        <span lang="ar" dir="rtl">أمانة الكلمة</span>
      </p>
      <div className="footer-bottom content-width">
        {/* The year is baked in at build time; tolerate it moving on before the next deploy. */}
        <p suppressHydrationWarning>© {new Date().getFullYear()} {t("Amanat Al-Kalima Company")}. {t("All rights reserved.")}</p>
        <div className="footer-legal"><Link to="/privacy">{t("Privacy Policy")}</Link><Link to="/terms">{t("Terms of Service")}</Link><span>C.R. {contactDetails.commercialRegistration}</span></div>
      </div>
    </footer>
  );
}
