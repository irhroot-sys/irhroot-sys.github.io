import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Display: Newsreader (variable, with optical sizes, so headlines get the
// fine display cut) and, for Arabic, Markazi Text — a contemporary Naskh,
// the hand of written agreements, which carries the company's name, "the
// trust of one's word". Text and data: IBM Plex Sans (variable) with its
// Arabic partner. Every face is subset by unicode-range, so a page only
// downloads the scripts it renders.
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/markazi-text/wght.css";
import "@fontsource-variable/ibm-plex-sans/wght.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import { App } from "./App.jsx";
import { findRoute, renderKeyFor } from "./routes.jsx";
import { loadKnowledge } from "./lib/knowledge.jsx";
import { splitLocalePath } from "./lib/i18n.js";
import "./styles/index.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Every page is prerendered at build time. Adopt that markup only when it was
// rendered for this exact URL (unknown URLs get the matching 404 document, so
// they hydrate too). Anything else — e.g. an older edge Worker that answers
// every route with the homepage document — is rendered fresh, so React never
// hydrates against markup for a different page.
function start() {
  if (hasOwnMarkup()) {
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}

// A guide's prerendered markup is only adopted once the guide's own code has
// arrived; the page is already readable while it loads. If that code cannot
// be fetched, the prerendered page stays as it is — readable, with working
// links — rather than being replaced by a page that cannot render.
const hasOwnMarkup = () => container.hasChildNodes() && container.dataset.prerendered === renderKeyFor(window.location.pathname);
if (findRoute(splitLocalePath(window.location.pathname).route)?.knowledge) {
  loadKnowledge().then(start, () => {
    if (!hasOwnMarkup()) start();
  });
} else {
  start();
}
