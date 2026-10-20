import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuArrowUpRight, LuMail, LuPhone } from "react-icons/lu";
import { contactDetails } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

// The close of every page: the statement on one side, every direct channel
// on the other, so the next step is a single action whichever way a
// supplier prefers to start.
export function CtaBand({ title = "Have an industrial requirement to discuss?", copy = "Share the scope and our Dammam team will coordinate the right next step.", action = "quote" }) {
  const { openQuote } = useQuote();
  const { t } = useLanguage();
  const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(t("Hello AALKC, I would like a quote for scrap metal."))}`;
  return (
    <section className="cta-band closing on-ink" aria-labelledby="closing-title">
      <div className="container closing-layout">
        <div className="closing-copy">
          <span className="label"><span className="label-index">→</span>{t("Talk to AALKC")}</span>
          <h2 id="closing-title">{t(title)}</h2>
          <p>{t(copy)}</p>
          {action === "contact" ? (
            <Link className="primary-button" to="/contact">{t("Contact our team")} <LuArrowRight className="directional-icon" /></Link>
          ) : (
            <button type="button" className="primary-button" onClick={() => openQuote()}>{t("Request a quote")} <LuArrowRight className="directional-icon" /></button>
          )}
        </div>
        <ul className="closing-channels">
          <li>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <span className="closing-key"><FaWhatsapp aria-hidden="true" />{t("WhatsApp")}</span>
              <span className="closing-value" dir="ltr">{contactDetails.phoneLabel}</span>
              <LuArrowUpRight className="closing-arrow" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={contactDetails.phoneHref}>
              <span className="closing-key"><LuPhone aria-hidden="true" />{t("Call")}</span>
              <span className="closing-value" dir="ltr">{contactDetails.phoneLabel}</span>
              <LuArrowUpRight className="closing-arrow" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={`mailto:${contactDetails.email}`}>
              <span className="closing-key"><LuMail aria-hidden="true" />{t("Email")}</span>
              <span className="closing-value" dir="ltr">{contactDetails.email}</span>
              <LuArrowUpRight className="closing-arrow" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
