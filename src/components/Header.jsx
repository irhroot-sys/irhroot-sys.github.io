import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { navigation, contactDetails } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link, NavLink, useLocation } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PhoneNumber } from "./PhoneNumber.jsx";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  const { openQuote } = useQuote();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const nav = navRef.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    const focusable = nav?.querySelectorAll("a, button");
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    first?.focus();

    const trapFocus = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      event.preventDefault();
      const items = Array.from(focusable);
      const activeIndex = items.indexOf(document.activeElement);
      const nextIndex = event.shiftKey
        ? (activeIndex <= 0 ? items.length - 1 : activeIndex - 1)
        : (activeIndex >= items.length - 1 ? 0 : activeIndex + 1);
      items[nextIndex].focus();
    };
    nav?.addEventListener("keydown", trapFocus);
    return () => {
      nav?.removeEventListener("keydown", trapFocus);
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
    };
  }, [menuOpen]);

  return (
    <header className="site-header" aria-label={t("AALKC website header")}>
      <div className="utility-bar">
        <a href={contactDetails.phoneHref}><FaPhoneAlt /> <PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></a>
        <a href={`mailto:${contactDetails.email}`}><FaEnvelope /> {contactDetails.email}</a>
        <span><FaMapMarkerAlt /> {t("Dammam, Saudi Arabia")}</span>
      </div>

      <div className="primary-header">
        <Link className="brand" to="/" aria-label={t("AALKC home")}>
          <img
            src="/assets/aalkc-logo-official-9233f531.svg"
            width="160"
            height="160"
            alt=""
            aria-hidden="true"
            decoding="async"
            fetchPriority="high"
          />
          <span className="brand-wordmark" aria-hidden="true">
            <strong dir="ltr">AALKC</strong>
            <span>Amanat Al-Kalima Company</span>
            <span lang="ar" dir="rtl">شركة أمانة الكلمة</span>
          </span>
        </Link>

        <div className="primary-nav-wrap">
          <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label={t("Primary navigation")} ref={navRef}>
            {navigation.map(({ label, to }) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {t(label)}
              </NavLink>
            ))}
            <button type="button" className="mobile-nav-quote" onClick={() => openQuote()}>
              {t("Get a Quote")} <FaChevronRight className="directional-icon" />
            </button>
          </nav>
          <div className="language-toggle" role="group" aria-label={t("Website language")}>
            <button type="button" lang="en" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="ar" aria-pressed={language === "ar"} onClick={() => setLanguage("ar")}>AR</button>
          </div>
          <button type="button" className="quote-button header-quote" onClick={() => openQuote()}>
            {t("Get a Quote")} <FaChevronRight className="directional-icon" />
          </button>
          <button
            type="button"
            className="menu-button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("Close navigation") : t("Open navigation")}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && <button className="nav-scrim" aria-hidden="true" tabIndex="-1" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
