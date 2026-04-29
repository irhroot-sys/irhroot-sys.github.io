"use client";
import { PHONE, WHATSAPP_LINK } from "@/lib/constants";

interface MobileCtaBarProps {
  lang?: "en" | "ar";
}

export default function MobileCtaBar({ lang = "en" }: MobileCtaBarProps) {
  const isAr = lang === "ar";

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden border-t border-gray-200 bg-white shadow-lg"
      role="navigation"
      aria-label={isAr ? "أزرار التواصل" : "Quick contact actions"}
    >
      <a
        href={`tel:${PHONE}`}
        className="flex flex-1 items-center justify-center gap-2 bg-[#0f4c6b] py-3 text-sm font-bold text-white"
        aria-label={isAr ? "اتصل الآن" : "Call Now"}
      >
        📞 {isAr ? "اتصل" : "Call"}
      </a>
      <a
        href={WHATSAPP_LINK()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25d366] py-3 text-sm font-bold text-white"
        aria-label={isAr ? "واتساب" : "WhatsApp"}
      >
        💬 WhatsApp
      </a>
    </div>
  );
}
