import type { Metadata } from "next";
import "@fontsource/work-sans/400.css";
import "@fontsource/work-sans/500.css";
import "@fontsource/work-sans/600.css";
import "@fontsource/work-sans/700.css";
import "@fontsource/work-sans/800.css";
import "@fontsource/noto-sans-arabic/400.css";
import "@fontsource/noto-sans-arabic/500.css";
import "@fontsource/noto-sans-arabic/600.css";
import "@fontsource/noto-sans-arabic/700.css";
import "./globals.css";

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
    <html lang="en" dir="ltr" className="h-full">
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "'Work Sans', Arial, sans-serif" }}
      >
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
