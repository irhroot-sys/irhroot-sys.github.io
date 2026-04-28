import { whyChooseUs } from "@/lib/content";

interface WhyChooseUsProps {
  lang?: "en" | "ar";
}

export default function WhyChooseUs({ lang = "en" }: WhyChooseUsProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="why-us"
      className="bg-[#f5f7fa] py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-heading text-[#0a1f2e]">
            {isAr ? "لماذا تختارنا؟" : "Why Choose Us?"}
          </h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyChooseUs.map((item, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
              <div className="text-2xl mb-2" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#0f4c6b] text-sm">
                {isAr ? item.titleAr : item.titleEn}
              </h3>
              <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
                {isAr ? item.descriptionAr : item.descriptionEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
