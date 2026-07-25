import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaChevronRight, FaTimes } from "react-icons/fa";
import { services } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { submitEnquiry } from "../lib/enquiries.js";
import { Link } from "../lib/router.jsx";
import { TurnstileWidget } from "./TurnstileWidget.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function QuoteModal() {
  const { closeQuote, quoteContext } = useQuote();
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const modalRef = useRef(null);
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const { t } = useLanguage();

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return undefined;
    const focusable = modal.querySelectorAll('input, select, textarea, button, [href], [tabindex]:not([tabindex="-1"])');
    const first = modal.querySelector('input[name="name"]') || focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trapFocus = (event) => {
      if (event.key === "Escape") {
        closeQuote();
        return;
      }
      if (event.key !== "Tab") return;
      event.preventDefault();
      const items = Array.from(focusable);
      const activeIndex = items.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (activeIndex <= 0 ? items.length - 1 : activeIndex - 1)
        : (activeIndex >= items.length - 1 ? 0 : activeIndex + 1);
      items[nextIndex]?.focus();
    };

    modal.addEventListener("keydown", trapFocus);
    return () => modal.removeEventListener("keydown", trapFocus);
  }, [closeQuote, status]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      await submitEnquiry({
        kind: quoteContext.kind || "quote",
        contextId: quoteContext.contextId || "",
        subject: quoteContext.title || "Website quote request",
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: quoteContext.service || formData.get("service"),
        message: formData.get("message"),
        consent: formData.get("consent") === "yes",
        website: formData.get("website"),
        turnstileToken,
      });
      form.reset();
      setTurnstileToken("");
      setStatus("success");
    } catch (submissionError) {
      setError(submissionError.message);
      setStatus("error");
    }
  }

  const title = t(quoteContext.title || "Get a Quote");
  const prompt = t(quoteContext.prompt || "Tell us what you need and our Dammam team will respond with the next steps.");

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeQuote();
    }}>
      <section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-title" ref={modalRef}>
        <button type="button" className="modal-close" aria-label={t("Close enquiry form")} onClick={closeQuote}>
          <FaTimes />
        </button>
        {status === "success" ? (
          <div className="success-state" role="status">
            <FaCheckCircle />
            <h2 id="quote-title">{t("Request received")}</h2>
            <p>{t("Thank you. Your reference has been saved and our team will contact you shortly.")}</p>
            <button type="button" className="primary-button" onClick={closeQuote}>{t("Close")}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="modal-kicker">{t("AALKC Enquiry")}</span>
            <h2 id="quote-title">{title}</h2>
            <p>{prompt}</p>
            {quoteContext.service && <div className="selected-context">{t("Regarding")} <strong>{t(quoteContext.service)}</strong></div>}
            <div className="form-row">
              <label>{t("Full name")} <span className="field-status">{t("Required")}</span><input name="name" autoComplete="name" minLength="2" required autoFocus /></label>
              <label>{t("Company")} <span className="field-status">{t("Optional")}</span><input name="company" autoComplete="organization" /></label>
            </div>
            <div className="form-row">
              <label>{t("Email")} <span className="field-status">{t("Required")}</span><input name="email" type="email" autoComplete="email" required /></label>
              <label>{t("Phone")} <span className="field-status">{t("Required")}</span><input name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" required /></label>
            </div>
            {!quoteContext.service && (
              <label>{t("Service")}
                <select name="service" defaultValue="Scrap Metal Trading">
                  {services.map((service) => <option key={service.slug} value={service.title}>{t(service.title)}</option>)}
                </select>
              </label>
            )}
            <label>{t("Material details")} <span className="field-status">{t("Required")}</span><textarea name="message" rows="4" minLength="10" required placeholder={t("Material type, estimated quantity, condition, and site location")} /></label>
            <label className="consent-field">
              <input type="checkbox" name="consent" value="yes" required />
              <span>{t("I consent to AALKC storing and using these details to respond to my request, as described in the")} <Link to="/privacy" onClick={closeQuote}>{t("Privacy Policy")}</Link>.</span>
            </label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
            {turnstileSiteKey ? (
              <div className="turnstile-area">
                <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
              </div>
            ) : (
              <p className="form-notice">{t("Online submission is temporarily unavailable. Please email contact@aalkc.com.")}</p>
            )}
            {error && <div className="form-alert" role="alert">{error}</div>}
            <button type="submit" className="primary-button submit-button" disabled={status === "loading" || !turnstileToken}>
              {status === "loading" ? t("Sending…") : t("Send Request")} <FaChevronRight className="directional-icon" />
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
