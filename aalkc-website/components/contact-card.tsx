import { contact, company } from "@/lib/content";
import { PHONE, PHONE_DISPLAY, WHATSAPP_LINK, EMAIL, GOOGLE_MAPS_URL } from "@/lib/constants";

interface ContactCardProps {
  lang?: "en" | "ar";
}

export default function ContactCard({ lang = "en" }: ContactCardProps) {
  const isAr = lang === "ar";

  return (
    <div
      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      dir={isAr ? "rtl" : "ltr"}
    >
      <h2 className="text-xl font-bold text-[#0a1f2e] mb-4">
        {isAr ? "معلومات التواصل" : "Contact Information"}
      </h2>

      <ul className="space-y-4 text-sm">
        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            {isAr ? "الهاتف" : "Phone"}
          </p>
          <a
            href={`tel:${PHONE}`}
            className="text-[#0f4c6b] font-semibold hover:underline text-base"
          >
            {PHONE_DISPLAY}
          </a>
        </li>

        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            WhatsApp
          </p>
          <a
            href={WHATSAPP_LINK()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25d366] px-4 py-2 text-sm font-bold text-white hover:bg-[#1da851] transition-colors"
          >
            💬 {isAr ? "راسلنا على واتساب" : "Message on WhatsApp"}
          </a>
        </li>

        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            {isAr ? "البريد الإلكتروني" : "Email"}
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="text-[#0f4c6b] hover:underline"
          >
            {EMAIL}
          </a>
        </li>

        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            {isAr ? "العنوان" : "Address"}
          </p>
          <address className="not-italic text-gray-700 leading-relaxed">
            {isAr ? contact.addressAr : contact.addressEn}
          </address>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[#0f4c6b] text-xs hover:underline"
          >
            {isAr ? "← عرض على خرائط جوجل" : "View on Google Maps →"}
          </a>
        </li>

        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            {isAr ? "رقم الترخيص" : "Business License"}
          </p>
          <p className="text-gray-700">{contact.businessLicense}</p>
        </li>

        <li>
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wide mb-1">
            {isAr ? "تقييم جوجل" : "Google Rating"}
          </p>
          <p className="text-[#e8a317] font-bold text-lg">
            ★ {company.googleRating}{" "}
            <span className="text-gray-500 font-normal text-sm">
              ({company.reviewCount}+ {isAr ? "تقييم" : "reviews"})
            </span>
          </p>
        </li>
      </ul>
    </div>
  );
}
