import { materialGuides } from "../data/knowledge/materials.js";
import { industryGuides } from "../data/knowledge/industries.js";
import { insightBodies } from "../data/knowledge/insights.js";
import { processGuide } from "../data/knowledge/process.js";

// The lazily loaded half of the knowledge base: the guide and article pages
// and the bodies they render. See lib/knowledge.jsx.
export { MaterialDetailPage } from "./MaterialDetailPage.jsx";
export { IndustryDetailPage } from "./IndustryDetailPage.jsx";
export { ProcessPage } from "./ProcessPage.jsx";
export { InsightsPage } from "./InsightsPage.jsx";
export { ArticlePage } from "./ArticlePage.jsx";

const faqSources = {
  material: (key) => materialGuides[key]?.faq,
  industry: (key) => industryGuides[key]?.faq,
  insight: (key) => insightBodies[key]?.faq,
  process: () => processGuide.faq,
};

export function faqFor({ kind, key }) {
  return faqSources[kind]?.(key) ?? [];
}
