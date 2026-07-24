import { useState } from "react";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";
import { submitEnquiry } from "../lib/enquiries.js";
import { Link } from "../lib/router.jsx";
import { TurnstileWidget } from "./TurnstileWidget.jsx";

export function EnquiryForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

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
        <h2>Message received</h2>
        <p>Your enquiry has been saved. Our team will respond using the contact details you provided.</p>
        <button type="button" className="inline-action" onClick={() => setStatus("idle")}>Send another message <FaChevronRight /></button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Full name <span className="field-status">Required</span><input name="name" autoComplete="name" minLength="2" required /></label>
        <label>Company <span className="field-status">Optional</span><input name="company" autoComplete="organization" /></label>
      </div>
      <div className="form-row">
        <label>Email <span className="field-status">Required</span><input name="email" type="email" autoComplete="email" required /></label>
        <label>Phone <span className="field-status">Required</span><input name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <label>Subject
        <select name="subject" defaultValue="General enquiry">
          <option>General enquiry</option>
          <option>Scrap metal trading</option>
          <option>Construction materials</option>
          <option>Machinery and equipment</option>
          <option>Container service</option>
          <option>Industrial demolition</option>
          <option>Heavy logistics</option>
          <option>Metal sorting</option>
          <option>Global export</option>
        </select>
      </label>
      <label>How can we help? <span className="field-status">Required</span><textarea name="message" rows="6" minLength="10" required placeholder="Describe the materials, estimated quantity, and site location." /></label>
      <label className="consent-field">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I consent to AALKC storing and using these details to respond to my request, as described in the <Link to="/privacy">Privacy Policy</Link>.</span>
      </label>
      <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
      {turnstileSiteKey ? (
        <div className="turnstile-area">
          <TurnstileWidget siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
        </div>
      ) : (
        <p className="form-notice">Online submission is temporarily unavailable. Please email contact@aalkc.com.</p>
      )}
      {error && <div className="form-alert" role="alert">{error}</div>}
      <button type="submit" className="primary-button submit-button" disabled={status === "loading" || !turnstileToken}>
        {status === "loading" ? "Sending…" : "Send message"} <FaChevronRight />
      </button>
    </form>
  );
}
