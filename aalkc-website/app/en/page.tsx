import type { Metadata } from "next";
import { generateSeoMeta } from "@/lib/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import About from "@/components/about";
import Services from "@/components/services";
import ServiceAreas from "@/components/service-areas";
import WhyChooseUs from "@/components/why-choose-us";
import ProcessSteps from "@/components/process-steps";
import CtaBand from "@/components/cta-band";
import MobileCtaBar from "@/components/mobile-cta-bar";
import SeoSchema from "@/components/seo-schema";

export const metadata: Metadata = generateSeoMeta("homeEn", "en");

export default function HomeEnPage() {
  return (
    <>
      <SeoSchema />
      <Header lang="en" />
      <Hero lang="en" />
      <TrustBar lang="en" />
      <About lang="en" />
      <Services lang="en" />
      <ServiceAreas lang="en" />
      <WhyChooseUs lang="en" />
      <ProcessSteps lang="en" />
      <CtaBand lang="en" />
      <Footer lang="en" />
      <MobileCtaBar lang="en" />
    </>
  );
}
