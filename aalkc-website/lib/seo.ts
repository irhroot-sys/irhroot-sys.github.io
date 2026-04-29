// lib/seo.ts
import type { Metadata } from "next";
import { seoMeta, SeoMeta } from "./content";
import { SITE_URL } from "./constants";

const OG_IMAGE_DEFAULT = `${SITE_URL}/images/og-image.svg`;

export function generateSeoMeta(page: keyof typeof seoMeta, lang: "en" | "ar"): Metadata {
  const meta: SeoMeta = seoMeta[page];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: meta.canonical ?? SITE_URL,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical ?? SITE_URL,
      siteName: "Amanat Al-Kalima Company",
      images: [
        {
          url: meta.ogImage ?? OG_IMAGE_DEFAULT,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: lang === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage ?? OG_IMAGE_DEFAULT],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
