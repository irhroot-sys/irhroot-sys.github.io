import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { EnquiryForm } from "../components/EnquiryForm.jsx";
import { contactDetails } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";

export function ContactPage() {
  usePageMeta({
    title: "Contact",
    description: "Contact Amanat Al-Kalima Company at 3508 Al Qatif 1 in Dammam for scrap-metal purchasing, collection, sorting, and industrial recycling enquiries.",
    path: "/contact",
    image: "/assets/service-machinery-equipment.webp",
  });

  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Maximize the value of your scrap."
        copy="Share the material, estimated quantity, site location, and collection needs. Our Dammam team will review the requirement and respond with the next step."
        image="/assets/service-machinery-equipment.webp"
        alt="Industrial equipment supported by AALKC"
        trail="Contact"
      />
      <section className="content-section content-width contact-layout">
        <div className="contact-details">
          <SectionHeading eyebrow="Official contact details" title="Direct access to AALKC" copy="Use the official phone, email, and Dammam address carried over from the existing website." />
          <div className="contact-methods">
            <a href={contactDetails.phoneHref}><FaPhoneAlt /><div><span>Phone</span><strong>{contactDetails.phoneLabel}</strong></div></a>
            <a href={`mailto:${contactDetails.email}`}><FaEnvelope /><div><span>Email</span><strong>{contactDetails.email}</strong></div></a>
            <a href="https://www.aalkc.com" target="_blank" rel="noreferrer"><FaGlobe /><div><span>Website</span><strong>{contactDetails.website}</strong></div></a>
            <div><FaMapMarkerAlt /><div><span>Headquarters</span><strong>{contactDetails.addressLine1}<br />{contactDetails.addressLine2}<br />{contactDetails.addressCountry}</strong></div></div>
          </div>
          <div className="response-note" lang="ar" dir="rtl"><strong>العنوان</strong><p>{contactDetails.addressArabic}</p></div>
        </div>
        <div className="contact-form-panel">
          <span className="panel-kicker">Request a spot quote</span>
          <h2>Tell us about your materials</h2>
          <p>Required fields are marked. Website values and enquiries are non-binding until inspection, grading, and weighing are complete.</p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
