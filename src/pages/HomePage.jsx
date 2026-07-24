import { Hero } from "../components/Hero.jsx";
import { FeatureStrip } from "../components/FeatureStrip.jsx";
import { Services } from "../components/Services.jsx";
import { Statistics } from "../components/Statistics.jsx";
import { features, services, statistics } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";

export function HomePage() {
  usePageMeta({
    title: "AALKC",
    description: "Amanat Al-Kalima Company is a licensed scrap metal dealer in Dammam providing recycling, trading, collection, sorting, and industrial logistics services.",
  });

  return (
    <>
      <Hero />
      <FeatureStrip features={features} />
      <Services services={services} />
      <Statistics statistics={statistics} />
    </>
  );
}
