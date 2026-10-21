import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
// Display: Archivo (variable, with its width axis — set expanded for
// headlines). Text: IBM Plex Sans with its Arabic partner, one family across
// both scripts. Data: IBM Plex Mono. Arabic display: Noto Kufi Arabic.
// Every face is subset by unicode-range, so a page only downloads the
// scripts it renders.
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-400.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-500.css";
import "@fontsource/ibm-plex-sans-arabic/arabic-600.css";
import "@fontsource/noto-kufi-arabic/arabic-500.css";
import "@fontsource/noto-kufi-arabic/arabic-600.css";
import "@fontsource/noto-kufi-arabic/arabic-700.css";
import { App } from "./App.jsx";
import { renderKeyFor } from "./routes.jsx";
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
if (container.hasChildNodes() && container.dataset.prerendered === renderKeyFor(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
