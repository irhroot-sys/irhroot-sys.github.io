import { ServiceCard as ServiceCardType } from "@/lib/content";

interface ServiceCardProps {
  service: ServiceCardType;
  lang?: "en" | "ar";
}

export default function ServiceCard({ service, lang = "en" }: ServiceCardProps) {
  const isAr = lang === "ar";

  return (
    <article
      className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-[#0f4c6b] transition-all duration-200"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="text-3xl mb-3" aria-hidden="true">
        {service.icon}
      </div>
      <h3 className="text-base font-bold text-[#0a1f2e] group-hover:text-[#0f4c6b] transition-colors">
        {isAr ? service.titleAr : service.titleEn}
      </h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
        {isAr ? service.descriptionAr : service.descriptionEn}
      </p>
      <p className="mt-3 text-xs text-gray-400 italic">
        {isAr ? service.keywordsAr : service.keywordsEn}
      </p>
    </article>
  );
}
