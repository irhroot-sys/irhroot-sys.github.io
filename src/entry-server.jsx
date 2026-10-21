import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { provideKnowledge } from "./lib/knowledge.jsx";
import * as knowledge from "./pages/knowledge.jsx";

// Every guide is rendered in full at build time.
provideKnowledge(knowledge);

// Build-time only: renders one URL to static markup for scripts/prerender.mjs.
export function render(pathname) {
  return renderToString(<App url={{ pathname }} />);
}

export { routes, renderKeyFor, notFoundRoute } from "./routes.jsx";
export { buildPageHead, renderHeadTags, absoluteUrl, SITE_URL } from "./lib/seo.js";
export { LANGUAGES, localizePath, plainText } from "./lib/i18n.js";
export { contactDetails } from "./data/siteContent.jsx";
