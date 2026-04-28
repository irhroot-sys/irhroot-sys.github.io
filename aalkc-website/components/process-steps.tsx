import { processSteps } from "@/lib/content";

interface ProcessStepsProps {
  lang?: "en" | "ar";
}

export default function ProcessSteps({ lang = "en" }: ProcessStepsProps) {
  const isAr = lang === "ar";

  return (
    <section
      id="process"
      className="bg-white py-16 md:py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="section-heading text-[#0a1f2e]">
            {isAr ? "كيف نعمل؟" : "How It Works"}
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            {isAr ? "عملية بسيطة من ٥ خطوات" : "Simple 5-step process"}
          </p>
          <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:flex items-start gap-0">
          {processSteps.map((step, i) => (
            <div key={step.step} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i < processSteps.length - 1 && (
                <div
                  className="absolute top-6 left-1/2 w-full h-0.5 bg-[#0f4c6b]/30"
                  aria-hidden="true"
                />
              )}
              {/* Step circle */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f4c6b] text-white font-bold text-lg shadow-md">
                {step.step}
              </div>
              <div className="mt-4 text-center px-2">
                <h3 className="font-bold text-[#0f4c6b] text-sm">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                  {isAr ? step.descriptionAr : step.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile vertical stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {processSteps.map((step, i) => (
            <div key={step.step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#0f4c6b] text-white font-bold">
                  {step.step}
                </div>
                {i < processSteps.length - 1 && (
                  <div className="mt-1 w-0.5 flex-1 bg-[#0f4c6b]/30" aria-hidden="true" />
                )}
              </div>
              <div className="pb-4">
                <h3 className="font-bold text-[#0f4c6b]">
                  {isAr ? step.titleAr : step.titleEn}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {isAr ? step.descriptionAr : step.descriptionEn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
