import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuArrowUpRight, LuMail, LuMessageSquareText, LuPhone, LuX } from "react-icons/lu";
import { contactDetails } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { BrandMark } from "./BrandMark.jsx";
import { PhoneNumber } from "./PhoneNumber.jsx";

// One branded entry point for every direct channel. WhatsApp is the default
// business channel in the Kingdom, so it leads the panel, followed by a call,
// email and the quote form. The panel is a non-modal dialog: Escape or a click
// outside closes it and focus returns to the launcher.
export function ContactDock() {
  const { t } = useLanguage();
  const { openQuote } = useQuote();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const panelId = useId();
  const titleId = useId();

  const greeting = t("Hello AALKC, I would like a quote for scrap metal.");
  const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(greeting)}`;

  const close = useCallback(({ restoreFocus = true } = {}) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    rootRef.current?.querySelector(".concierge-option")?.focus();
    const handleKey = (event) => { if (event.key === "Escape") close(); };
    const handlePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) close({ restoreFocus: false });
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className={`contact-concierge${open ? " is-open" : ""}`}>
      {open && (
        <div id={panelId} className="concierge-panel" role="dialog" aria-labelledby={titleId}>
          <div className="concierge-head">
            <BrandMark className="concierge-mark" />
            <div>
              <p id={titleId} className="concierge-title">{t("Talk to our team")}</p>
              <p className="concierge-sub">{t("Amanat Al-Kalima Company")} · {t("Dammam, KSA")}</p>
            </div>
            <button type="button" className="concierge-close" onClick={() => close()} aria-label={t("Close")}>
              <LuX aria-hidden="true" />
            </button>
          </div>
          <ul className="concierge-options">
            <li>
              <a className="concierge-option" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label={t("Chat with AALKC on WhatsApp")}>
                <span className="concierge-option-icon is-whatsapp"><FaWhatsapp aria-hidden="true" /></span>
                <span className="concierge-option-text"><strong>{t("WhatsApp")}</strong><small>{t("Chat with our team")}</small></span>
                <LuArrowUpRight className="concierge-option-arrow" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="concierge-option" href={contactDetails.phoneHref} aria-label={t("Call AALKC")}>
                <span className="concierge-option-icon"><LuPhone aria-hidden="true" /></span>
                <span className="concierge-option-text"><strong>{t("Call")}</strong><small><PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></small></span>
                <LuArrowUpRight className="concierge-option-arrow" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className="concierge-option" href={`mailto:${contactDetails.email}`}>
                <span className="concierge-option-icon"><LuMail aria-hidden="true" /></span>
                <span className="concierge-option-text"><strong>{t("Email")}</strong><small dir="ltr">{contactDetails.email}</small></span>
                <LuArrowUpRight className="concierge-option-arrow" aria-hidden="true" />
              </a>
            </li>
          </ul>
          <button
            type="button"
            className="primary-button is-metal concierge-quote"
            onClick={() => { close({ restoreFocus: false }); openQuote(); }}
          >
            {t("Request a quote")} <LuArrowRight className="directional-icon" />
          </button>
        </div>
      )}
      <button
        ref={toggleRef}
        type="button"
        className="concierge-toggle"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t("Close contact options") : t("Contact AALKC")}
        onClick={() => (open ? close() : setOpen(true))}
      >
        <span className="concierge-toggle-icon" aria-hidden="true">
          {open ? <LuX /> : <LuMessageSquareText />}
        </span>
        <span className="concierge-toggle-label" aria-hidden="true">{t("Talk to us")}</span>
      </button>
    </div>
  );
}
