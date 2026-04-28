"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LanguageSwitcherProps {
  lang: "en" | "ar";
}

export default function LanguageSwitcher({ lang }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getAltHref = () => {
    if (lang === "en") {
      return pathname.replace(/^\/en/, "/ar");
    }
    return pathname.replace(/^\/ar/, "/en");
  };

  const altLang = lang === "en" ? "ar" : "en";
  const altLabel = lang === "en" ? "عربي" : "English";
  const currentLabel = lang === "en" ? "EN" : "ع";

  return (
    <div className="flex items-center gap-1 rounded border border-gray-200 p-0.5 text-sm">
      <span className="rounded px-2 py-0.5 font-semibold bg-[#0f4c6b] text-white">
        {currentLabel}
      </span>
      <Link
        href={getAltHref()}
        className="rounded px-2 py-0.5 text-gray-600 hover:text-[#0f4c6b] font-medium transition-colors"
        aria-label={`Switch to ${altLabel}`}
        hrefLang={altLang}
      >
        {altLabel}
      </Link>
    </div>
  );
}
