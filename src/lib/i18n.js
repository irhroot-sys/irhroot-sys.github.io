import { arabicTranslations } from "../data/translations.js";

export const LANGUAGES = ["en", "ar"];
export const DEFAULT_LANGUAGE = "en";
export const LANGUAGE_STORAGE_KEY = "aalkc-language";

// Arabic lives under /ar so each language has its own crawlable URL. English
// keeps the unprefixed URLs it has always had, so no existing link breaks.
const ARABIC_PREFIX = "/ar";

// Two shapes of copy are supported. Short interface strings are written in
// English and looked up in the Arabic dictionary. Long-form content (guides
// and articles) is written as a pair, { en, ar }, so each paragraph keeps its
// translation beside it.
export function isLocalized(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value) && "en" in value;
}

export function translate(value, language) {
  if (isLocalized(value)) return value[language] ?? value.en;
  if (language !== "ar" || typeof value !== "string") return value;
  return arabicTranslations[value] || value;
}

// Builds a localized pair. A small helper so content files stay readable.
export const L = (en, ar) => ({ en, ar });

// Long-form copy marks inline links as [label](/path) or [label](https://…).
export const LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

// The text of a value in one language with any link markup removed, for
// places that cannot hold markup: structured data, meta tags, reading time.
export function plainText(value, language) {
  const text = translate(value, language);
  return typeof text === "string" ? text.replace(LINK_PATTERN, "$1") : "";
}

export function directionFor(language) {
  return language === "ar" ? "rtl" : "ltr";
}

// "/ar/services" -> { language: "ar", route: "/services" }. A trailing slash is
// ignored so "/about/" and "/about" resolve to the same page.
export function splitLocalePath(pathname = "/") {
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  if (trimmed === ARABIC_PREFIX || trimmed.startsWith(`${ARABIC_PREFIX}/`)) {
    return { language: "ar", route: trimmed.slice(ARABIC_PREFIX.length) || "/" };
  }
  return { language: DEFAULT_LANGUAGE, route: trimmed };
}

// Accepts an unprefixed in-site path, optionally with ?search and #hash, and
// returns the URL of the same page in the given language.
export function localizePath(to, language) {
  if (typeof to !== "string" || !to.startsWith("/") || to.startsWith("//")) return to;
  const suffixStart = to.search(/[?#]/);
  const path = suffixStart === -1 ? to : to.slice(0, suffixStart);
  const suffix = suffixStart === -1 ? "" : to.slice(suffixStart);
  const { route } = splitLocalePath(path);
  if (language !== "ar") return `${route}${suffix}`;
  return `${route === "/" ? ARABIC_PREFIX : `${ARABIC_PREFIX}${route}`}${suffix}`;
}
