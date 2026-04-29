import { trustBar } from "@/lib/content";

interface TrustBarProps {
  lang?: "en" | "ar";
}

export default function TrustBar({ lang = "en" }: TrustBarProps) {
  const isAr = lang === "ar";

  return (
    <section className="bg-[#0f4c6b] py-6" aria-label={isAr ? "إحصاءات الشركة" : "Company stats"}>
      <div className="section-container">
        <dl
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
          dir={isAr ? "rtl" : "ltr"}
        >
          {trustBar.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center py-2 border-r border-[#1a6a96] last:border-r-0 even:border-r-0 lg:even:border-r lg:last:border-r-0"
            >
              <dt className="text-2xl font-extrabold text-white">{stat.number}</dt>
              <dd className="mt-1 text-xs text-gray-200 font-medium">
                {isAr ? stat.labelAr : stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
