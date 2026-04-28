import type { Metadata } from "next";
import { Work_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Amanat Al-Kalima — Scrap Metal Buyers | Eastern Province, Saudi Arabia",
    template: "%s | Amanat Al-Kalima",
  },
  description:
    "Licensed scrap metal buyers in Dammam, Eastern Province. We buy copper, aluminum, steel, and all metals at the best market prices. Call for a free quote.",
  metadataBase: new URL("https://aalkc.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${workSans.variable} ${ibmPlexArabic.variable} h-full`}>
      <body className="min-h-full antialiased" style={{ fontFamily: "var(--font-body-loaded, Work Sans, Arial, sans-serif)" }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to content
        </a>
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
