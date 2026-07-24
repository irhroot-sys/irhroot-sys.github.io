import { FaChevronLeft } from "react-icons/fa";
import { legalContent } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { Link } from "../lib/router.jsx";

export function LegalPage({ documentKey }) {
  const content = legalContent[documentKey];

  usePageMeta({
    title: content?.title || "Legal",
    description: content?.intro || "AALKC legal information.",
    path: `/${documentKey}`,
  });

  return (
    <article className="legal-page content-width">
      <Link className="back-link" to="/"><FaChevronLeft /> Back to home</Link>
      <span className="page-kicker">AALKC legal</span>
      <h1>{content.title}</h1>
      <p className="legal-intro">{content.intro}</p>
      <div className="legal-sections">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
