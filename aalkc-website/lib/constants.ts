// lib/constants.ts
import { contact, company } from "./content";

export const PHONE = contact.phone;
export const PHONE_DISPLAY = contact.phoneDisplay;
export const WHATSAPP_NUMBER = contact.whatsApp;
export const EMAIL = contact.email;

export const WHATSAPP_LINK = (message?: string) => {
  const msg = message
    ? encodeURIComponent(message)
    : encodeURIComponent("Hello, I would like to get a quote for my scrap metal.");
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${msg}`;
};

export const WHATSAPP_LINK_AR = WHATSAPP_LINK(
  "مرحبًا، أود الحصول على عرض سعر لخردتي المعدنية."
);

export const GOOGLE_MAPS_URL = contact.mapUrl;

export const SITE_URL = "https://aalkc.com";

export const NAV_LINKS = [
  { labelEn: "Home", labelAr: "الرئيسية", href: "/en" },
  { labelEn: "Services", labelAr: "خدماتنا", href: "/en#services" },
  { labelEn: "Service Areas", labelAr: "مناطق الخدمة", href: "/en#areas" },
  { labelEn: "Contact", labelAr: "تواصل معنا", href: "/contact" },
] as const;

export const COMPANY_FOUNDING_YEAR = company.foundingYear;
export const COMPANY_NAME_EN = company.nameEn;
export const COMPANY_NAME_AR = company.nameAr;
