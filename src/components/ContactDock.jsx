import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { contactDetails } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

// WhatsApp is the default business channel in the Kingdom, so it stays one
// tap away on every page. The call button only appears on small screens,
// where the header's phone number is hidden.
export function ContactDock() {
  const { t } = useLanguage();
  const greeting = t("Hello AALKC, I would like a quote for scrap metal.");
  const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(greeting)}`;

  return (
    <nav className="contact-dock" aria-label={t("Quick contact")}>
      <a className="contact-dock-call" href={contactDetails.phoneHref} aria-label={t("Call AALKC")}>
        <FaPhoneAlt aria-hidden="true" />
      </a>
      <a
        className="contact-dock-whatsapp"
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("Chat with AALKC on WhatsApp")}
      >
        <FaWhatsapp aria-hidden="true" />
        <span className="contact-dock-label">{t("WhatsApp")}</span>
      </a>
    </nav>
  );
}
