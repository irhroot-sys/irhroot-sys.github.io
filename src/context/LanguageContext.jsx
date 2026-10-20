import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { useLocation } from "../lib/router.jsx";
import { directionFor, LANGUAGE_STORAGE_KEY, localizePath, translate } from "../lib/i18n.js";

const LanguageContext = createContext(null);

export function readLanguagePreference() {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return null;
}

function saveLanguagePreference(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Not remembering the choice is acceptable; the URL still carries it.
  }
}

// The language is part of the URL (/ar/... is Arabic), so every page has one
// crawlable address per language. Switching language navigates to the same
// page in the other language and remembers the choice for the next visit.
export function LanguageProvider({ children }) {
  const { language, route, search, hash, navigate } = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = directionFor(language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    saveLanguagePreference(nextLanguage);
    if (nextLanguage === language) return;
    navigate(localizePath(`${route}${search}${hash}`, nextLanguage));
  }, [hash, language, navigate, route, search]);

  const t = useCallback((value) => translate(value, language), [language]);

  const value = useMemo(() => ({
    language,
    isArabic: language === "ar",
    setLanguage,
    toggleLanguage: () => setLanguage(language === "en" ? "ar" : "en"),
    t,
  }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider.");
  return context;
}
