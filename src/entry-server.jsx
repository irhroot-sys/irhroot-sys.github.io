import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";

// Build-time only: renders one URL to static markup for scripts/prerender.mjs.
export function render(pathname) {
  return renderToString(<App url={{ pathname }} />);
}

export { routes, renderKeyFor, notFoundRoute } from "./routes.jsx";
export { buildPageHead, renderHeadTags, absoluteUrl, SITE_URL } from "./lib/seo.js";
export { LANGUAGES, localizePath } from "./lib/i18n.js";
