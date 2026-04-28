import { serviceAreas } from "@/lib/content";

interface ServiceAreasProps {
  lang?: "en" | "ar";
}

export default function ServiceAreas({ lang = "en" }: ServiceAreasProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="areas"
      className="bg-white py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-heading text-[#0a1f2e]">
            {isAr ? "نغطي كامل المنطقة الشرقية" : "We Cover the Entire Eastern Province"}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            {isAr
              ? "خدمة مجانية في جميع المدن الرئيسية"
              : "Free collection across all major cities"}
          </p>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {serviceAreas.map((area) => (
            <div
              key={area.nameEn}
              className="rounded-lg border border-[#0f4c6b]/20 bg-[#e8f4fb] px-4 py-3 text-center"
            >
              <p className="font-semibold text-[#0f4c6b] text-sm">{isAr ? area.nameAr : area.nameEn}</p>
              <p className="mt-0.5 text-xs text-gray-500" dir={isAr ? "ltr" : "rtl"}>
                {isAr ? area.nameEn : area.nameAr}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
