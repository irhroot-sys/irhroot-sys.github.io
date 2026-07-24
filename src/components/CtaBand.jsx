import { FaChevronRight } from "react-icons/fa";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function CtaBand({ title = "Have an industrial requirement to discuss?", copy = "Share the scope and our Dammam team will coordinate the right next step.", action = "quote" }) {
  const { openQuote } = useQuote();
  const { t } = useLanguage();
  return (
    <section className="cta-band content-width">
      <div>
        <span>{t("Talk to AALKC")}</span>
        <h2>{t(title)}</h2>
        <p>{t(copy)}</p>
      </div>
      {action === "contact" ? (
        <Link className="secondary-button" to="/contact">{t("Contact our team")} <FaChevronRight /></Link>
      ) : (
        <button type="button" className="secondary-button" onClick={() => openQuote()}>{t("Request a quote")} <FaChevronRight /></button>
      )}
    </section>
  );
}
