import { FaChevronRight, FaMapSigns } from "react-icons/fa";
import { usePageMeta } from "../lib/usePageMeta.js";
import { Link } from "../lib/router.jsx";

export function NotFoundPage({ compact = false }) {
  usePageMeta({
    title: "Page not found",
    description: "The requested AALKC page could not be found.",
    path: window.location.pathname,
  });

  return (
    <section className={`not-found ${compact ? "is-compact" : ""}`}>
      <FaMapSigns />
      <span>404</span>
      <h1>That page is not available.</h1>
      <p>The address may have changed, or the page may no longer exist.</p>
      <Link className="primary-button" to="/">Return home <FaChevronRight /></Link>
    </section>
  );
}
