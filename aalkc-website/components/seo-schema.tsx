import { company, contact } from "@/lib/content";
import { PHONE, EMAIL, SITE_URL } from "@/lib/constants";

export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: company.nameEn,
        alternateName: company.nameAr,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        foundingDate: String(company.foundingYear),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE,
          contactType: "customer service",
          areaServed: "SA",
          availableLanguage: ["Arabic", "English"],
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.addressEn,
          addressLocality: contact.city,
          addressRegion: contact.region,
          postalCode: contact.postalCode,
          addressCountry: "SA",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#local-business`,
        name: company.nameEn,
        alternateName: company.nameAr,
        description:
          "Licensed scrap metal buyers in Dammam and Eastern Province, Saudi Arabia. We buy copper, aluminum, steel and all metals.",
        url: SITE_URL,
        telephone: PHONE,
        email: EMAIL,
        priceRange: "$$",
        image: `${SITE_URL}/images/og-image.svg`, // Replace with og-image.jpg (1200×630) before launch
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(company.googleRating),
          reviewCount: String(company.reviewCount),
          bestRating: "5",
          worstRating: "1",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.addressEn,
          addressLocality: contact.city,
          addressRegion: contact.region,
          postalCode: contact.postalCode,
          addressCountry: "SA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: contact.lat,
          longitude: contact.lng,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "08:00",
          closes: "17:00",
        },
        areaServed: [
          "Dammam",
          "Al Khobar",
          "Dhahran",
          "Jubail",
          "Qatif",
          "Eastern Province",
        ],
        sameAs: [`${SITE_URL}/en`, `${SITE_URL}/ar`],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.nameEn,
        inLanguage: ["en", "ar"],
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
