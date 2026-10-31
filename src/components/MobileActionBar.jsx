import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuPhone } from "react-icons/lu";
import { contactDetails } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useQuote } from "../context/QuoteContext.jsx";

// On phones the header has no room for the quote button, so the two actions a
// supplier takes stay within thumb reach at the foot of every page: call or
// WhatsApp the yard, or request a quote. It replaces the contact launcher at
// that width (styles/components/overlays.css) and sits under the menu sheet
// and the quote dialog.
export function MobileActionBar() {
  const { t } = useLanguage();
  const { openQuote } = useQuote();
  const greeting = t("Hello AALKC, I would like a quote for scrap metal.");

  return (
    <nav className="mobile-action-bar" aria-label={t("Quick actions")}>
      <a className="mobile-action" href={contactDetails.phoneHref} aria-label={t("Call AALKC")}>
        <LuPhone aria-hidden="true" /> <span>{t("Call")}</span>
      </a>
      <a
        className="mobile-action"
        href={`${contactDetails.whatsappHref}?text=${encodeURIComponent(greeting)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("Chat with AALKC on WhatsApp")}
      >
        <FaWhatsapp aria-hidden="true" /> <span>{t("WhatsApp")}</span>
      </a>
      <button type="button" className="mobile-action is-primary" onClick={() => openQuote()}>
        {t("Request a quote")} <LuArrowRight className="directional-icon" aria-hidden="true" />
      </button>
    </nav>
  );
}
