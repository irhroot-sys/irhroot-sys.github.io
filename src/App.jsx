import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { QuoteModal } from "./components/QuoteModal.jsx";
import { QuoteContext } from "./context/QuoteContext.jsx";
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
      <div className="site-shell">
        <a href="#main-content" className="skip-link">Skip to main content</a>
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
  if (pathname === "/") return <HomePage />;
  if (pathname === "/about") return <AboutPage />;
  if (pathname === "/services") return <ServicesPage />;
  if (pathname === "/materials") return <MaterialsPage />;
  if (pathname === "/products") return <Redirect to="/materials" />;
  if (pathname === "/faq") return <FaqPage />;
  if (pathname === "/contact") return <ContactPage />;
  if (pathname === "/privacy") return <LegalPage documentKey="privacy" />;
  if (pathname === "/terms") return <LegalPage documentKey="terms" />;
  return <NotFoundPage />;
}

export function App() {
  return (
    <RouterProvider>
      <SiteApp />
    </RouterProvider>
  );
}
