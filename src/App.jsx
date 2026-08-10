import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { MotionManager } from "./components/MotionManager.jsx";
import { QuoteModal } from "./components/QuoteModal.jsx";
import { QuoteContext } from "./context/QuoteContext.jsx";
import { LanguageProvider, useLanguage } from "./context/LanguageContext.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";
import { MaterialsPage } from "./pages/MaterialsPage.jsx";
import { FaqPage } from "./pages/FaqPage.jsx";
import { LegalPage } from "./pages/LegalPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { Redirect, RouterProvider, useLocation } from "./lib/router.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [hash, pathname]);

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
      <MotionManager />
      <div className="site-shell">
        <a href="#main-content" className="skip-link">{t("Skip to main content")}</a>
        <Header />
        <main id="main-content"><PageRoutes /></main>
        <Footer />
        {quoteOpen && <QuoteModal />}
      </div>
    </QuoteContext.Provider>
  );
}

function PageRoutes() {
  const { pathname } = useLocation();
  let page;

  if (pathname === "/") page = <HomePage />;
  else if (pathname === "/about") page = <AboutPage />;
  else if (pathname === "/services") page = <ServicesPage />;
  else if (pathname === "/materials") page = <MaterialsPage />;
  else if (pathname === "/products") page = <Redirect to="/materials" />;
  else if (pathname === "/faq") page = <FaqPage />;
  else if (pathname === "/contact") page = <ContactPage />;
  else if (pathname === "/privacy") page = <LegalPage documentKey="privacy" />;
  else if (pathname === "/terms") page = <LegalPage documentKey="terms" />;
  else page = <NotFoundPage />;

  return <div className={`page-stage ${pathname === "/" ? "is-home" : ""}`} key={pathname}>{page}</div>;
}

export function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <SiteApp />
      </RouterProvider>
    </LanguageProvider>
  );
}
