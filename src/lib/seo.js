import { contactDetails, frequentlyAskedQuestions, services } from "../data/siteContent.jsx";
import { LANGUAGES, DEFAULT_LANGUAGE, directionFor, localizePath, plainText, translate } from "./i18n.js";
import { knowledgeFaq } from "./knowledge.jsx";

export const SITE_URL = "https://aalkc.com";
const LOGO_PATH = "/assets/aalkc-logo-official-9233f531.svg";
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const OG_LOCALES = { en: "en_US", ar: "ar_SA" };
const SITE_NAMES = { en: "AALKC", ar: "أمانة الكلمة" };

export function absoluteUrl(path) {
  return `${SITE_URL}${path}`;
}

function organizationNode() {
  return {
    "@type": ["Organization", "RecyclingCenter"],
    "@id": ORGANIZATION_ID,
    name: "Amanat Al-Kalima Company",
    alternateName: ["AALKC", "شركة أمانة الكلمة"],
    description: "Licensed scrap metal dealer providing recycling, trading, collection, sorting, and industrial logistics services.",
    url: `${SITE_URL}/`,
    logo: absoluteUrl(LOGO_PATH),
    image: absoluteUrl("/assets/service-industrial-dismantling.webp"),
    telephone: contactDetails.phoneHref.replace("tel:", ""),
    email: contactDetails.email,
    foundingDate: "2017",
    identifier: { "@type": "PropertyValue", propertyID: "Commercial Registration", value: contactDetails.commercialRegistration },
    address: {
      "@type": "PostalAddress",
      streetAddress: contactDetails.addressLine1,
      addressLocality: "Dammam",
      postalCode: "32517",
      addressRegion: "Eastern Province",
      addressCountry: "SA",
    },
    hasMap: contactDetails.mapHref,
    areaServed: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: contactDetails.phoneHref.replace("tel:", ""),
      email: contactDetails.email,
      availableLanguage: ["English", "Arabic"],
      areaServed: "SA",
    },
  };
}

function faqNode(items, language, canonical) {
  return {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    inLanguage: language,
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: plainText(question, language),
      acceptedAnswer: { "@type": "Answer", text: plainText(answer, language) },
    })),
  };
}

// An article names its publisher as author: the company stands behind what
// it publishes, and no individual byline is claimed.
function articleNode(route, language, canonical) {
  const { article } = route;
  return {
    "@type": "Article",
    "@id": `${canonical}#article`,
    headline: plainText(article.title, language),
    description: plainText(article.description, language),
    articleSection: plainText(article.category, language),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    inLanguage: language,
    image: absoluteUrl(route.image),
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    citation: article.citations,
  };
}

function pageSpecificNodes(route, language, canonical) {
  const t = (value) => translate(value, language);
  if (route.path === "/faq") return [faqNode(frequentlyAskedQuestions, language, canonical)];
  const nodes = [];
  if (route.article) nodes.push(articleNode(route, language, canonical));
  const faq = knowledgeFaq(route.knowledge);
  if (faq.length) nodes.push(faqNode(faq, language, canonical));
  if (nodes.length) return nodes;
  if (route.service) {
    return [{
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: t(route.service.title),
      description: t(route.service.overview),
      serviceType: t(route.service.category),
      url: canonical,
      provider: { "@id": ORGANIZATION_ID },
      areaServed: { "@type": "AdministrativeArea", name: "Eastern Province, Saudi Arabia" },
    }];
  }
  if (route.path === "/services") {
    return [{
      "@type": "ItemList",
      "@id": `${canonical}#services`,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: t(service.title),
          description: t(service.copy),
          url: absoluteUrl(localizePath(`/services/${service.slug}`, language)),
          provider: { "@id": ORGANIZATION_ID },
          areaServed: "SA",
        },
      })),
    }];
  }
  return [];
}

// Everything the document head needs for one page in one language. Used by
// the build-time prerender (serialised into each HTML file) and by the client
// (applied on in-app navigation), so the two can never disagree.
export function buildPageHead({ route, language = DEFAULT_LANGUAGE }) {
  const t = (value) => translate(value, language);
  const isNotFound = Boolean(route.noindex);
  const siteName = SITE_NAMES[language];
  const title = `${t(route.title)} | ${siteName}`;
  const description = t(route.description);
  // A not-found document is served for many URLs and must not be indexed, so
  // it names no canonical address.
  const canonical = isNotFound ? null : absoluteUrl(localizePath(route.path, language));
  const alternates = isNotFound ? [] : [
    ...LANGUAGES.map((code) => ({ hreflang: code, href: absoluteUrl(localizePath(route.path, code)) })),
    { hreflang: "x-default", href: absoluteUrl(localizePath(route.path, DEFAULT_LANGUAGE)) },
  ];

  const graph = [organizationNode()];
  if (!isNotFound) {
    graph.push(
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: "AALKC — Amanat Al-Kalima Company",
        inLanguage: LANGUAGES,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: language,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: absoluteUrl(route.image),
      },
    );
    if (route.path !== "/") {
      const trail = [
        { name: t("Home"), item: absoluteUrl(localizePath("/", language)) },
        ...(route.parent ? [{ name: t(route.parent.title), item: absoluteUrl(localizePath(route.parent.path, language)) }] : []),
        { name: t(route.title), item: canonical },
      ];
      graph.push({
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: trail.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })),
      });
    }
    graph.push(...pageSpecificNodes(route, language, canonical));
  }

  return {
    type: route.article ? "article" : "website",
    lang: language,
    dir: directionFor(language),
    title,
    description,
    canonical,
    alternates,
    robots: isNotFound ? "noindex, follow" : "index, follow, max-image-preview:large",
    image: absoluteUrl(route.image),
    ogLocale: OG_LOCALES[language],
    ogLocaleAlternates: LANGUAGES.filter((code) => code !== language).map((code) => OG_LOCALES[code]),
    siteName,
    jsonLd: { "@context": "https://schema.org", "@graph": graph },
  };
}

function escapeAttribute(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeText(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// JSON inside <script> must not be able to close the element early.
export function serializeJsonLd(jsonLd) {
  return JSON.stringify(jsonLd).replace(/</g, "\\u003c");
}

export function renderHeadTags(head) {
  const tags = [
    `<title>${escapeText(head.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(head.description)}" />`,
    `<meta name="robots" content="${escapeAttribute(head.robots)}" />`,
    ...(head.canonical ? [`<link rel="canonical" href="${escapeAttribute(head.canonical)}" />`] : []),
    ...head.alternates.map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${escapeAttribute(href)}" />`),
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:site_name" content="${escapeAttribute(head.siteName)}" />`,
    `<meta property="og:title" content="${escapeAttribute(head.title)}" />`,
    `<meta property="og:description" content="${escapeAttribute(head.description)}" />`,
    ...(head.canonical ? [`<meta property="og:url" content="${escapeAttribute(head.canonical)}" />`] : []),
    `<meta property="og:image" content="${escapeAttribute(head.image)}" />`,
    `<meta property="og:locale" content="${head.ogLocale}" />`,
    ...head.ogLocaleAlternates.map((locale) => `<meta property="og:locale:alternate" content="${locale}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttribute(head.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttribute(head.description)}" />`,
    `<meta name="twitter:image" content="${escapeAttribute(head.image)}" />`,
    `<script type="application/ld+json" data-page-jsonld>${serializeJsonLd(head.jsonLd)}</script>`,
  ];
  return tags.join("\n    ");
}
