import { PHONE, WHATSAPP_LINK } from "@/lib/constants";

interface CtaBandProps {
  lang?: "en" | "ar";
}

export default function CtaBand({ lang = "en" }: CtaBandProps) {
  const isAr = lang === "ar";

  return (
    <section
      className="bg-[#0f4c6b] py-14"
      dir={isAr ? "rtl" : "ltr"}
      aria-labelledby="cta-heading"
    >
      <div className="section-container text-center">
        <h2 id="cta-heading" className="text-2xl md:text-4xl font-extrabold text-white">
          {isAr ? "هل أنت مستعد لبيع خردتك المعدنية؟" : "Ready to sell your scrap metal?"}
        </h2>
        <p className="mt-3 text-gray-200 max-w-xl mx-auto">
          {isAr
            ? "تواصل معنا اليوم للحصول على أفضل سعر وخدمة جمع مجانية في المنطقة الشرقية."
            : "Contact us today for the best price and free collection across the Eastern Province."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={`tel:${PHONE}`}
            className="rounded-lg bg-[#e8a317] px-8 py-3 font-bold text-[#0a1f2e] hover:bg-[#d4920f] transition-colors shadow-lg text-sm md:text-base"
          >
            📞 {isAr ? "اتصل الآن" : "Call Now"}
          </a>
          <a
            href={WHATSAPP_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#25d366] px-8 py-3 font-bold text-white hover:bg-[#1da851] transition-colors shadow-lg text-sm md:text-base"
          >
            💬 {isAr ? "واتساب" : "WhatsApp Us"}
          </a>
        </div>
      </div>
    </section>
  );
}
