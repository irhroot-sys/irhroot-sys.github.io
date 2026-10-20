import { Hero } from "../components/Hero.jsx";
import { FeatureStrip } from "../components/FeatureStrip.jsx";
import { Services } from "../components/Services.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { IndustriesPreview } from "../components/IndustriesPreview.jsx";
import { RecyclingFacts } from "../components/RecyclingFacts.jsx";
import { Statistics } from "../components/Statistics.jsx";
import { features, services, statistics } from "../data/siteContent.jsx";

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip features={features} />
      <Services services={services} />
      <IndustriesPreview />
      <ProcessSection eyebrow="How it works" title="From enquiry to settlement in four steps" copy="A documented process keeps every load transparent, from the first enquiry to the final payment." />
      <RecyclingFacts withLink />
      <Statistics statistics={statistics} />
    </>
  );
}
