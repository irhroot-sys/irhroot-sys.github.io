import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { MotionManager } from "./components/MotionManager.jsx";
import { QuoteModal } from "./components/QuoteModal.jsx";
import { ContactDock } from "./components/ContactDock.jsx";
import { MobileActionBar } from "./components/MobileActionBar.jsx";
import { DocumentHead } from "./components/DocumentHead.jsx";
import { QuoteContext } from "./context/QuoteContext.jsx";
import { LanguageProvider, readLanguagePreference, useLanguage } from "./context/LanguageContext.jsx";
import { findRoute, notFoundRoute, redirects } from "./routes.jsx";
import { localizePath } from "./lib/i18n.js";
import { Redirect, RouterProvider, useLocation } from "./lib/router.jsx";

function ScrollManager() {
  // Keyed on the language-neutral route, so switching language keeps the
  // visitor where they were on the page instead of jumping to the top.
  const { route, hash } = useLocation();

  // Deliberately a layout effect, and deliberately rendered before
  // MotionManager: the scroll position has to be reset before the browser
  // paints the new route and before MotionManager measures which elements are
  // below the fold. Running this after paint made a new page flash at the
  // previous page's scroll offset and skewed every reveal measurement.
  useLayoutEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [hash, route]);

  return null;
}

// A visitor who chose Arabic before — or whose browser asks for Arabic — and
// arrives on a default (English) URL is moved to the same page in Arabic. An
// explicit /ar link is always honoured, so a shared Arabic link opens in
// Arabic. Crawlers carry no stored preference and are never redirected.
function LanguagePreferenceRedirect() {
  const { language, route, search, hash, navigate } = useLocation();

  useEffect(() => {
    if (language !== "en") return;
    const browserPrefersArabic = window.navigator.language?.toLowerCase().startsWith("ar");
    const preferred = readLanguagePreference() ?? (browserPrefersArabic ? "ar" : "en");
    if (preferred === "ar") {
      navigate(localizePath(`${route}${search}${hash}`, "ar"), { replace: true });
    }
    // Deliberately once: later navigation is the visitor's own choice.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

function SiteApp() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteContext, setQuoteContext] = useState({ kind: "quote" });
  const returnFocusRef = useRef(null);
  const { t } = useLanguage();

  const openQuote = (context = {}) => {
    returnFocusRef.current = document.activeElement;
    setQuoteContext({ kind: "quote", ...context });
    setQuoteOpen(true);
  };

  const closeQuote = () => {
    setQuoteOpen(false);
    window.setTimeout(() => returnFocusRef.current?.focus?.(), 0);
  };

  useEffect(() => {
    document.body.style.overflow = quoteOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quoteOpen]);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote, quoteContext, quoteOpen }}>
      <ScrollManager />
      <LanguagePreferenceRedirect />
      <MotionManager />
      <div className="site-shell">
        <a href="#main-content" className="skip-link">{t("Skip to main content")}</a>
        <Header />
        <main id="main-content"><PageRoutes /></main>
        <Footer />
        <ContactDock />
        <MobileActionBar />
        {quoteOpen && <QuoteModal />}
      </div>
    </QuoteContext.Provider>
  );
}

function PageRoutes() {
  const { route, language } = useLocation();
  const redirectTarget = redirects[route];
  if (redirectTarget) return <Redirect to={redirectTarget} />;

  const page = findRoute(route) ?? notFoundRoute;
  return (
    <div className={`page-stage ${route === "/" ? "is-home" : ""}`} key={route}>
      <DocumentHead route={page} language={language} />
      {page.element()}
    </div>
  );
}

// `url` is supplied only by the build-time prerender; the browser reads the
// live location.
export function App({ url } = {}) {
  return (
    <RouterProvider url={url}>
      <LanguageProvider>
        <SiteApp />
      </LanguageProvider>
    </RouterProvider>
  );
}
