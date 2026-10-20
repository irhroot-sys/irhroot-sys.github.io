import { LuArrowRight } from "react-icons/lu";
import { Link } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function NotFoundPage({ compact = false }) {
  const { t } = useLanguage();

  return (
    <section className={`not-found ${compact ? "is-compact" : ""}`}>
      <span className="not-found-code" aria-hidden="true">404</span>
      <span className="scale-rule" aria-hidden="true" />
      <h1>{t("That page is not available.")}</h1>
      <p>{t("The address may have changed, or the page may no longer exist.")}</p>
      <Link className="primary-button" to="/">{t("Return home")} <LuArrowRight className="directional-icon" /></Link>
    </section>
  );
}
