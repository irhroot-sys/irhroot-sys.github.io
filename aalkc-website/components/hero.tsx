import { hero } from "@/lib/content";
import { PHONE, WHATSAPP_LINK } from "@/lib/constants";

interface HeroProps {
  lang?: "en" | "ar";
}

export default function Hero({ lang = "en" }: HeroProps) {
  const isAr = lang === "ar";

  return (
    <section
      className="relative overflow-hidden bg-[#0a1f2e] py-20 md:py-28"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #1a6a96 0, #1a6a96 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#e8a317]/20 px-4 py-1.5 text-sm font-medium text-[#e8a317]">
            <span>★ 5.0</span>
            <span>|</span>
            <span>{isAr ? "شركة مرخصة • المنطقة الشرقية" : "Licensed Company • Eastern Province"}</span>
          </div>

          <h1 className="section-heading text-white text-3xl md:text-5xl leading-tight">
            {isAr ? hero.h1Ar : hero.h1}
          </h1>
          {!isAr && (
            <p className="mt-2 text-xl text-[#1a6a96] font-medium" dir="rtl">
              {hero.h1Ar}
            </p>
          )}

          <p className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl">
            {isAr ? hero.subAr : hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="rounded-lg bg-[#e8a317] px-6 py-3 text-sm font-bold text-[#0a1f2e] hover:bg-[#d4920f] transition-colors shadow-lg"
            >
              {isAr ? "احصل على عرض سعر مجاني" : hero.ctaQuote}
            </a>
            <a
              href={`tel:${PHONE}`}
              className="rounded-lg border-2 border-white px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#0a1f2e] transition-colors"
            >
              📞 {isAr ? "اتصل الآن" : hero.ctaCall}
            </a>
            <a
              href={WHATSAPP_LINK()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#25d366] px-6 py-3 text-sm font-bold text-white hover:bg-[#1da851] transition-colors"
            >
              💬 {isAr ? "واتساب" : hero.ctaWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
