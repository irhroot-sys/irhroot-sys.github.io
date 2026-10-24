import { Hero } from "../components/Hero.jsx";
import { IntentPaths } from "../components/Pathways.jsx";
import { MaterialsAssay } from "../components/MaterialsAssay.jsx";
import { Capabilities } from "../components/Services.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { IndustriesPreview } from "../components/IndustriesPreview.jsx";
import { CompanyRegister } from "../components/CompanyRegister.jsx";
import { InsightsTeaser } from "../components/InsightsTeaser.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { YardGallery } from "../components/YardGallery.jsx";
import { TrackRecord } from "../components/TrackRecord.jsx";
import { features, services } from "../data/siteContent.jsx";

// The homepage reads as a sequence a procurement team follows: who AALKC is,
// the three ways to work with it, what it buys, what it does, the yard itself, how a load moves, who it serves, the
// organisations and platforms it has worked through, what it knows about the trade, the registration behind it,
// and how to start.
export function HomePage() {
  return (
    <>
      <Hero />
      <IntentPaths />
      <MaterialsAssay />
      <Capabilities services={services} />
      <YardGallery surface="surface-mist" />
      <ProcessSection eyebrow="How it works" title="From enquiry to settlement in four steps" copy="A documented process keeps every load transparent, from the first enquiry to the final payment." />
      <IndustriesPreview />
      <TrackRecord />
      <InsightsTeaser />
      <CompanyRegister commitments={features.slice(0, 3)} />
      <CtaBand />
    </>
  );
}
