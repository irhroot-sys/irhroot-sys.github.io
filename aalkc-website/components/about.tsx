import { about } from "@/lib/content";

interface AboutProps {
  lang?: "en" | "ar";
}

export default function About({ lang = "en" }: AboutProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="about"
      className="bg-white py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="section-heading text-[#0a1f2e]">
            {isAr ? about.headingAr : about.heading}
          </h2>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
          <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
            {isAr ? about.bodyAr : about.body}
          </p>
          {!isAr && (
            <p className="mt-4 text-base text-gray-500 leading-relaxed" dir="rtl">
              {about.bodyAr}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
