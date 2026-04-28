import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      lang="ar"
      dir="rtl"
      className={`${ibmPlexArabic.variable}`}
      style={{ fontFamily: "var(--font-arabic-loaded, Arial, sans-serif)" }}
    >
      {children}
    </div>
  );
}
