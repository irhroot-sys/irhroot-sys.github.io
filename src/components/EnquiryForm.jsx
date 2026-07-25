import { useState } from "react";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { submitEnquiry } from "../lib/enquiries.js";
import { Link } from "../lib/router.jsx";
import { TurnstileWidget } from "./TurnstileWidget.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function EnquiryForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const { t } = useLanguage();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      await submitEnquiry({
        kind: "contact",
        subject: formData.get("subject"),
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        service: formData.get("subject"),
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

  if (status === "success") {
    return (
      <div className="contact-success" role="status">
        <FaCheckCircle />
        <h2>{t("Message received")}</h2>
        <p>{t("Your enquiry has been saved. Our team will respond using the contact details you provided.")}</p>
        <button type="button" className="inline-action" onClick={() => setStatus("idle")}>{t("Send another message")} <FaChevronRight className="directional-icon" /></button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>{t("Full name")} <span className="field-status">{t("Required")}</span><input name="name" autoComplete="name" minLength="2" required /></label>
        <label>{t("Company")} <span className="field-status">{t("Optional")}</span><input name="company" autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label>{t("Email")} <span className="field-status">{t("Required")}</span><input name="email" type="email" autoComplete="email" required /></label>
        <label>{t("Phone")} <span className="field-status">{t("Required")}</span><input name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" required /></label>
      </div>
      <label>{t("Subject")}
        <select name="subject" defaultValue="General enquiry">
          {["General enquiry", "Scrap metal trading", "Construction materials", "Machinery and equipment", "Container service", "Industrial demolition", "Heavy logistics", "Metal sorting", "Global export"].map((option) => <option key={option} value={option}>{t(option)}</option>)}
        </select>
      </label>
      <label>{t("How can we help?")} <span className="field-status">{t("Required")}</span><textarea name="message" rows="6" minLength="10" required placeholder={t("Describe the materials, estimated quantity, and site location.")} /></label>
      <label className="consent-field">
        <input type="checkbox" name="consent" value="yes" required />
        <span>{t("I consent to AALKC storing and using these details to respond to my request, as described in the")} <Link to="/privacy">{t("Privacy Policy")}</Link>.</span>
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
        {status === "loading" ? t("Sending…") : t("Send message")} <FaChevronRight className="directional-icon" />
      </button>
    </form>
  );
}
