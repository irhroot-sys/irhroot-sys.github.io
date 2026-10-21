import { Hero } from "../components/Hero.jsx";
import { MaterialsAssay } from "../components/MaterialsAssay.jsx";
import { Capabilities } from "../components/Services.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { IndustriesPreview } from "../components/IndustriesPreview.jsx";
import { CompanyRegister } from "../components/CompanyRegister.jsx";
import { InsightsTeaser } from "../components/InsightsTeaser.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { features, services } from "../data/siteContent.jsx";

// The homepage reads as a sequence a procurement team follows: who AALKC is,
// what it buys, what it does, how a load moves, who it serves, what it knows
// about the trade, the registration behind it, and how to start.
export function HomePage() {
  return (
    <>
      <Hero />
      <MaterialsAssay />
      <Capabilities services={services} />
      <ProcessSection eyebrow="How it works" title="From enquiry to settlement in four steps" copy="A documented process keeps every load transparent, from the first enquiry to the final payment." />
      <IndustriesPreview />
      <InsightsTeaser />
      <CompanyRegister commitments={features.slice(0, 3)} />
      <CtaBand />
    </>
  );
}
