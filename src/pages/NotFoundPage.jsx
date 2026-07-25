import { FaChevronRight, FaMapSigns } from "react-icons/fa";
import { usePageMeta } from "../lib/usePageMeta.js";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function NotFoundPage({ compact = false }) {
  const { t } = useLanguage();
  usePageMeta({
    title: "Page not found",
    description: "The requested AALKC page could not be found.",
    path: window.location.pathname,
  });

  return (
    <section className={`not-found ${compact ? "is-compact" : ""}`}>
      <FaMapSigns />
      <span>404</span>
      <h1>{t("That page is not available.")}</h1>
      <p>{t("The address may have changed, or the page may no longer exist.")}</p>
      <Link className="primary-button" to="/">{t("Return home")} <FaChevronRight className="directional-icon" /></Link>
    </section>
  );
}
