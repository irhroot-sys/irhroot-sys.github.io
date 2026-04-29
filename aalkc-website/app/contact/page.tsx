import type { Metadata } from "next";
import { generateSeoMeta } from "@/lib/seo";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ContactCard from "@/components/contact-card";
import ContactForm from "@/components/contact-form";
import MobileCtaBar from "@/components/mobile-cta-bar";

export const metadata: Metadata = generateSeoMeta("contactEn", "en");

export default function ContactPage() {
  return (
    <>
      <Header lang="en" />

      <section className="bg-[#f5f7fa] py-12 md:py-16">
        <div className="section-container">
          <div className="text-center mb-10">
            <h1 className="section-heading text-[#0a1f2e]">Contact Us</h1>
            <p className="mt-1 text-lg text-[#0f4c6b] font-medium" dir="rtl">
              تواصل معنا
            </p>
            <div className="mt-2 mx-auto h-1 w-16 rounded bg-[#e8a317]" aria-hidden="true" />
            <p className="mt-4 text-gray-600 max-w-xl mx-auto">
              Get a free quote for your scrap metal. We serve Dammam, Khobar, Jubail, and all Eastern Province cities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Form — wider */}
            <div className="lg:col-span-3">
              <ContactForm lang="en" />
            </div>
            {/* Contact card */}
            <div className="lg:col-span-2">
              <ContactCard lang="en" />
            </div>
          </div>
        </div>
      </section>

      <Footer lang="en" />
      <MobileCtaBar lang="en" />
    </>
  );
}
