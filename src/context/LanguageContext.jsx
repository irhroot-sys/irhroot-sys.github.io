import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { arabicTranslations } from "../data/translations.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem("aalkc-language");
    if (saved === "ar" || saved === "en") return saved;
    return window.navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("aalkc-language", language);
  }, [language]);

  const translate = useCallback((value) => {
    if (language !== "ar" || typeof value !== "string") return value;
    return arabicTranslations[value] || value;
  }, [language]);

  const value = useMemo(() => ({
    language,
    isArabic: language === "ar",
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === "en" ? "ar" : "en"),
    t: translate,
  }), [language, translate]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider.");
  return context;
}
