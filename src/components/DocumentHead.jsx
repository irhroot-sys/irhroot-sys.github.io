import { useEffect } from "react";
import { buildPageHead, serializeJsonLd } from "../lib/seo.js";

function upsert(selector, create) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = create();
    document.head.appendChild(element);
  }
  return element;
}

function setMeta(key, content, attribute = "name") {
  upsert(`meta[${attribute}="${key}"]`, () => {
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    return meta;
  }).setAttribute("content", content);
}

function replaceAll(selector, build) {
  document.head.querySelectorAll(selector).forEach((element) => element.remove());
  build().forEach((element) => document.head.appendChild(element));
}

// Prerendered HTML already carries the right head for the page it was built
// for. This keeps the head correct as the visitor navigates inside the app.
export function DocumentHead({ route, language }) {
  useEffect(() => {
    const head = buildPageHead({ route, language });
    document.title = head.title;
    setMeta("description", head.description);
    setMeta("robots", head.robots);
    setMeta("og:type", head.type, "property");
    setMeta("og:site_name", head.siteName, "property");
    setMeta("og:title", head.title, "property");
    setMeta("og:description", head.description, "property");
    setMeta("og:image", head.image, "property");
    setMeta("og:locale", head.ogLocale, "property");
    setMeta("twitter:title", head.title);
    setMeta("twitter:description", head.description);
    setMeta("twitter:image", head.image);

    if (head.canonical) {
      setMeta("og:url", head.canonical, "property");
      upsert('link[rel="canonical"]', () => {
        const link = document.createElement("link");
        link.rel = "canonical";
        return link;
      }).href = head.canonical;
    } else {
      document.head.querySelectorAll('link[rel="canonical"], meta[property="og:url"]').forEach((element) => element.remove());
    }

    replaceAll('link[rel="alternate"][hreflang]', () => head.alternates.map(({ hreflang, href }) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = hreflang;
      link.href = href;
      return link;
    }));

    replaceAll('meta[property="og:locale:alternate"]', () => head.ogLocaleAlternates.map((locale) => {
      const meta = document.createElement("meta");
      meta.setAttribute("property", "og:locale:alternate");
      meta.setAttribute("content", locale);
      return meta;
    }));

    upsert("script[data-page-jsonld]", () => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageJsonld = "";
      return script;
    }).textContent = serializeJsonLd(head.jsonLd);
  }, [language, route]);

  return null;
}
