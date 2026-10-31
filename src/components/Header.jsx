import { useEffect, useId, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuChevronDown, LuMail, LuMapPin, LuMenu, LuPhone, LuX } from "react-icons/lu";
import { navigation, contactDetails } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link, NavLink, useLocation } from "../lib/router.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { localizePath } from "../lib/i18n.js";
import { PhoneNumber } from "./PhoneNumber.jsx";
import { BrandMark } from "./BrandMark.jsx";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [groupOpen, setGroupOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const groupRef = useRef(null);
  const groupPanelId = useId();
  const { pathname, route } = useLocation();
  const { openQuote } = useQuote();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => { setMenuOpen(false); setGroupOpen(false); }, [pathname]);

  // The desktop Company menu is a disclosure: Escape or a click elsewhere
  // closes it, and Escape returns focus to its button.
  useEffect(() => {
    if (!groupOpen) return undefined;
    const handleKey = (event) => {
      if (event.key !== "Escape") return;
      setGroupOpen(false);
      groupRef.current?.querySelector(".nav-group-toggle")?.focus();
    };
    const handlePointer = (event) => { if (!groupRef.current?.contains(event.target)) setGroupOpen(false); };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
    };
  }, [groupOpen]);
  useEffect(() => {
    if (!menuOpen) return undefined;
    const nav = navRef.current;
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");
    // Only what the sheet actually shows: the desktop Company button is hidden there.
    const focusable = [...(nav?.querySelectorAll("a, button") ?? [])].filter((element) => element.offsetParent !== null);
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
        <a href={contactDetails.phoneHref}><LuPhone /> <PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></a>
        <a href={`mailto:${contactDetails.email}`}><LuMail /> {contactDetails.email}</a>
        <span><LuMapPin /> {t("Dammam, Saudi Arabia")}</span>
      </div>

      <div className="primary-header">
        <Link className="brand" to="/" aria-label={t("AALKC home")}>
          <BrandMark className="brand-mark" animate />
          <span className="brand-wordmark" aria-hidden="true">
            <strong lang="en" dir="ltr">AALKC</strong>
            <span lang="en">Amanat Al-Kalima Company</span>
            <span lang="ar" dir="rtl">شركة أمانة الكلمة</span>
          </span>
        </Link>

        <div className="primary-nav-wrap">
          <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label={t("Primary navigation")} ref={navRef}>
            {navigation.map(({ label, to, children }) => children ? (
              <div className={`nav-group${groupOpen ? " is-open" : ""}`} key={label} ref={groupRef}>
                <button
                  type="button"
                  className={`nav-group-toggle${children.some((child) => child.to === route) ? " active" : ""}`}
                  aria-expanded={groupOpen}
                  aria-controls={groupPanelId}
                  onClick={() => setGroupOpen((open) => !open)}
                >
                  {t(label)} <LuChevronDown aria-hidden="true" />
                </button>
                {/* In the compact sheet the group is a labelled list, always open. */}
                <span className="nav-group-label" aria-hidden="true">{t(label)}</span>
                <div className="nav-group-panel" id={groupPanelId}>
                  {children.map((child) => <NavLink key={child.to} to={child.to}>{t(child.label)}</NavLink>)}
                </div>
              </div>
            ) : (
              <NavLink key={to} to={to}>
                {t(label)}
              </NavLink>
            ))}
            <button type="button" className="mobile-nav-quote" onClick={() => openQuote()}>
              {t("Request a quote")} <LuArrowRight className="directional-icon" />
            </button>
            <div className="mobile-nav-direct">
              <a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> {t("WhatsApp")}</a>
              <a href={contactDetails.phoneHref}><LuPhone aria-hidden="true" /> {t("Call")}</a>
            </div>
          </nav>
          {/* Real links, so the other language's URL is discoverable without
              JavaScript. The href is the bare page URL (identical in the
              prerendered HTML); the in-app click also keeps ?query and #hash. */}
          <div className="language-toggle" role="group" aria-label={t("Website language")}>
            {[["en", "EN"], ["ar", "AR"]].map(([code, label], index) => (
              <span className="language-option" key={code}>
                {index > 0 && <span aria-hidden="true">/</span>}
                <a
                  href={localizePath(route, code)}
                  hrefLang={code}
                  lang={code}
                  aria-current={language === code ? "true" : undefined}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                    event.preventDefault();
                    setLanguage(code);
                  }}
                >
                  {label}
                </a>
              </span>
            ))}
          </div>
          <button type="button" className="quote-button header-quote" onClick={() => openQuote()}>
            {t("Request a quote")} <LuArrowRight className="directional-icon" />
          </button>
          <button
            type="button"
            className="menu-button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("Close navigation") : t("Open navigation")}
          >
            {menuOpen ? <LuX /> : <LuMenu />}
          </button>
        </div>
      </div>
      {menuOpen && <button className="nav-scrim" aria-hidden="true" tabIndex="-1" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
