import { services } from "@/lib/content";
import ServiceCard from "./service-card";

interface ServicesProps {
  lang?: "en" | "ar";
}

export default function Services({ lang = "en" }: ServicesProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="services"
      className="bg-[#f5f7fa] py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-heading text-[#0a1f2e]">
            {isAr ? "خدماتنا" : "Our Services"}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            {isAr
              ? "نشتري جميع أنواع الخردة والمعادن"
              : "We buy all types of scrap metal and non-ferrous materials"}
          </p>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
