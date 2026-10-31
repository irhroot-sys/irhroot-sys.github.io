import { Hero } from "../components/Hero.jsx";
import { IntentPaths } from "../components/Pathways.jsx";
import { MaterialsAssay } from "../components/MaterialsAssay.jsx";
import { Capabilities } from "../components/Services.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { IndustriesPreview } from "../components/IndustriesPreview.jsx";
import { CompanyRegister } from "../components/CompanyRegister.jsx";
import { InsightsTeaser } from "../components/InsightsTeaser.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { TrackRecord } from "../components/TrackRecord.jsx";
import { features, services } from "../data/siteContent.jsx";

// The homepage leads with the proof a procurement team looks for first: the
// three ways to work with AALKC, the organisations and platforms it has
// worked through, what it does and buys, the registration behind it, how a
// load moves, who it serves, what it knows about the trade, and how to start.
// Surfaces alternate white and mist between the ink hero, sectors and close.
// The yard gallery lives on the About page.
export function HomePage() {
  return (
    <>
      <Hero />
      <IntentPaths />
      <TrackRecord surface="surface-mist" />
      <Capabilities services={services} />
      <MaterialsAssay />
      <CompanyRegister commitments={features.slice(0, 3)} />
      <ProcessSection eyebrow="How it works" title="From enquiry to settlement in four steps" copy="A documented process keeps every load transparent, from the first enquiry to the final payment." />
      <IndustriesPreview />
      <InsightsTeaser />
      <CtaBand />
    </>
  );
}
