import Link from "next/link";
import { company, footer, contact, services, serviceAreas } from "@/lib/content";
import { PHONE, PHONE_DISPLAY, WHATSAPP_LINK, EMAIL, GOOGLE_MAPS_URL } from "@/lib/constants";

interface FooterProps {
  lang?: "en" | "ar";
}

export default function Footer({ lang = "en" }: FooterProps) {
  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  return (
    <footer className="bg-[#0a1f2e] text-gray-300" dir={dir}>
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company info */}
          <div>
            <p className="text-lg font-bold text-white">{company.nameEn}</p>
            <p className="mt-1 text-sm text-[#1a6a96]" dir="rtl">
              {company.nameAr}
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              {isAr ? footer.taglineAr : footer.taglineEn}
            </p>
            <div className="mt-4 flex flex-col gap-1 text-sm">
              <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                📞 {PHONE_DISPLAY}
              </a>
              <a
                href={WHATSAPP_LINK()}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                💬 WhatsApp
              </a>
              <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                ✉️ {EMAIL}
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                📍 {isAr ? contact.addressAr : contact.addressEn}
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-3 font-semibold text-white">
              {isAr ? "خدماتنا" : "Our Services"}
            </h3>
            <ul className="space-y-1 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/${lang}#services`}
                    className="hover:text-white transition-colors"
                  >
                    {isAr ? s.titleAr : s.titleEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="mb-3 font-semibold text-white">
              {isAr ? "مناطق الخدمة" : "Service Areas"}
            </h3>
            <ul className="grid grid-cols-2 gap-1 text-sm">
              {serviceAreas.map((area) => (
                <li key={area.nameEn}>
                  <Link
                    href={`/${lang}#areas`}
                    className="hover:text-white transition-colors"
                  >
                    {isAr ? area.nameAr : area.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 font-semibold text-white">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href={isAr ? "/ar" : "/en"} className="hover:text-white transition-colors">
                  {isAr ? "الرئيسية" : "Home"}
                </Link>
              </li>
              <li>
                <Link href={isAr ? "/ar#services" : "/en#services"} className="hover:text-white transition-colors">
                  {isAr ? "خدماتنا" : "Services"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {isAr ? "تواصل معنا" : "Contact Us"}
                </Link>
              </li>
              <li>
                <Link href={isAr ? "/en" : "/ar"} className="hover:text-white transition-colors">
                  {isAr ? "English" : "عربي"}
                </Link>
              </li>
            </ul>
            <div className="mt-4 text-sm">
              <p className="text-gray-400">
                {isAr ? "تقييم جوجل:" : "Google Rating:"}{" "}
                <span className="text-[#e8a317] font-semibold">★ {company.googleRating}</span>
              </p>
              <p className="text-gray-400">
                {isAr ? "منذ عام" : "Est."} {company.foundingYear}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>{isAr ? footer.copyrightAr : footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
