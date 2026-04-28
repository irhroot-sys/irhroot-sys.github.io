"use client";
import Link from "next/link";
import { useState } from "react";
import { PHONE, WHATSAPP_LINK, NAV_LINKS } from "@/lib/constants";
import { company } from "@/lib/content";
import LanguageSwitcher from "./language-switcher";

interface HeaderProps {
  lang?: "en" | "ar";
}

export default function Header({ lang = "en" }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAr = lang === "ar";

  const navLinks = NAV_LINKS.map((l) => ({
    label: isAr ? l.labelAr : l.labelEn,
    href: isAr ? l.href.replace("/en", "/ar") : l.href,
  }));

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100" dir={isAr ? "rtl" : "ltr"}>
      <div className="section-container flex items-center justify-between py-3">
        {/* Logo */}
        <Link href={isAr ? "/ar" : "/en"} className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-[#0f4c6b]">{company.nameEn}</span>
          <span className="text-sm text-[#1a6a96]" dir="rtl">
            {company.nameAr}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#0f4c6b] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA buttons */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher lang={lang} />
          <a
            href={`tel:${PHONE}`}
            className="rounded border border-[#0f4c6b] px-3 py-1.5 text-sm font-semibold text-[#0f4c6b] hover:bg-[#0f4c6b] hover:text-white transition-colors"
            aria-label={isAr ? "اتصل الآن" : "Call Now"}
          >
            {isAr ? "اتصل الآن" : "Call Now"}
          </a>
          <a
            href={WHATSAPP_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#25d366] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#1da851] transition-colors"
            aria-label={isAr ? "واتساب" : "WhatsApp"}
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="md:hidden p-2 rounded text-gray-600 hover:text-[#0f4c6b]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4">
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-[#0f4c6b] font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            <LanguageSwitcher lang={lang} />
            <a
              href={`tel:${PHONE}`}
              className="block rounded border border-[#0f4c6b] py-2 text-center text-sm font-semibold text-[#0f4c6b]"
            >
              {isAr ? "اتصل الآن" : "Call Now"}
            </a>
            <a
              href={WHATSAPP_LINK()}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded bg-[#25d366] py-2 text-center text-sm font-semibold text-white"
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
