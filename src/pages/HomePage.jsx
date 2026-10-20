import { Hero } from "../components/Hero.jsx";
import { FeatureStrip } from "../components/FeatureStrip.jsx";
import { Services } from "../components/Services.jsx";
import { Statistics } from "../components/Statistics.jsx";
import { features, services, statistics } from "../data/siteContent.jsx";

export function HomePage() {
  return (
    <>
      <Hero />
      <FeatureStrip features={features} />
      <Services services={services} />
      <Statistics statistics={statistics} />
    </>
  );
}
