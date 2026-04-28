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

export const metadata: Metadata = generateSeoMeta("homeAr", "ar");

export default function HomeArPage() {
  return (
    <>
      <SeoSchema />
      <Header lang="ar" />
      <Hero lang="ar" />
      <TrustBar lang="ar" />
      <About lang="ar" />
      <Services lang="ar" />
      <ServiceAreas lang="ar" />
      <WhyChooseUs lang="ar" />
      <ProcessSteps lang="ar" />
      <CtaBand lang="ar" />
      <Footer lang="ar" />
      <MobileCtaBar lang="ar" />
    </>
  );
}
