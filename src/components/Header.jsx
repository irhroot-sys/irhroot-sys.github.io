import { useEffect, useRef, useState } from "react";
import { FaBars, FaChevronRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { navigation, contactDetails } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { Link, NavLink, useLocation } from "../lib/router.jsx";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  const { openQuote } = useQuote();

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
    <header className="site-header" aria-label="AALKC website header">
      <div className="utility-bar">
        <a href={contactDetails.phoneHref}><FaPhoneAlt /> {contactDetails.phoneLabel}</a>
        <a href={`mailto:${contactDetails.email}`}><FaEnvelope /> {contactDetails.email}</a>
        <span><FaMapMarkerAlt /> Dammam, Saudi Arabia</span>
        <span className="language" aria-label="Website language: English">EN</span>
      </div>

      <div className="primary-header">
        <Link className="brand" to="/" aria-label="AALKC home">
          <img
            src="/assets/aalkc-logo-official-9233f531.svg"
            width="160"
            height="160"
            alt="AALKC — Amanat Al-Kalima Company"
            decoding="async"
            fetchPriority="high"
          />
        </Link>

        <div className="primary-nav-wrap">
          <nav className={`primary-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation" ref={navRef}>
            {navigation.map(({ label, to }) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </nav>
          <button type="button" className="quote-button header-quote" onClick={() => openQuote()}>
            Get a Quote <FaChevronRight />
          </button>
          <button
            type="button"
            className="menu-button"
            ref={menuButtonRef}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && <button className="nav-scrim" aria-hidden="true" tabIndex="-1" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
