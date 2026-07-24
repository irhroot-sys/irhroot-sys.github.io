import { FaChevronRight } from "react-icons/fa";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link } from "../lib/router.jsx";

export function CtaBand({ title = "Have an industrial requirement to discuss?", copy = "Share the scope and our Dammam team will coordinate the right next step.", action = "quote" }) {
  const { openQuote } = useQuote();
  return (
    <section className="cta-band content-width">
      <div>
        <span>Talk to AALKC</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      {action === "contact" ? (
        <Link className="secondary-button" to="/contact">Contact our team <FaChevronRight /></Link>
      ) : (
        <button type="button" className="secondary-button" onClick={() => openQuote()}>Request a quote <FaChevronRight /></button>
      )}
    </section>
  );
}
