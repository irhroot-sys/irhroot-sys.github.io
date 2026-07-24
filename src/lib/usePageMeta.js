import { useEffect } from "react";

const siteName = "AALKC";
const baseUrl = "https://aalkc.com";

function setMeta(name, content, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function usePageMeta({ title, description, path = "/", image = "/assets/hero-recycling-yard.webp" }) {
  useEffect(() => {
    const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;
    const canonicalUrl = `${baseUrl}${path}`;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:image", `${baseUrl}${image}`, true);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, image, path, title]);
}
