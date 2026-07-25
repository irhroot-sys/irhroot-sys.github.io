import { FaEnvelope, FaGlobe, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { EnquiryForm } from "../components/EnquiryForm.jsx";
import { contactDetails } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PhoneNumber } from "../components/PhoneNumber.jsx";

export function ContactPage() {
  const { t, isArabic } = useLanguage();
  usePageMeta({
    title: "Contact",
    description: "Contact Amanat Al-Kalima Company at 3508 Al Qatif 1 in Dammam for scrap-metal purchasing, collection, sorting, and industrial recycling enquiries.",
    path: "/contact",
    image: "/assets/service-container-handling.webp",
  });

  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Maximize the value of your scrap."
        copy="Share the material, estimated quantity, site location, and collection needs. Our Dammam team will review the requirement and respond with the next step."
        image="/assets/service-container-handling.webp"
        alt="Scrap-handling crane loading recovered metal at an industrial yard"
        trail="Contact"
      />
      <section className="content-section content-width contact-layout">
        <div className="contact-details">
          <SectionHeading eyebrow="Official contact details" title="Direct access to AALKC" copy="Use the official phone, email, and Dammam address carried over from the existing website." />
          <div className="contact-methods">
            <a href={contactDetails.phoneHref}><FaPhoneAlt /><div><span>{t("Phone")}</span><strong><PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></strong></div></a>
            <a href={`mailto:${contactDetails.email}`}><FaEnvelope /><div><span>{t("Email")}</span><strong>{contactDetails.email}</strong></div></a>
            <a href="https://www.aalkc.com" target="_blank" rel="noreferrer"><FaGlobe /><div><span>{t("Website")}</span><strong>{contactDetails.website}</strong></div></a>
            <div><FaMapMarkerAlt /><div><span>{t("Headquarters")}</span><strong>{isArabic ? contactDetails.addressArabic : <>{contactDetails.addressLine1}<br />{contactDetails.addressLine2}<br />{contactDetails.addressCountry}</>}</strong></div></div>
          </div>
        </div>
        <div className="contact-form-panel">
          <span className="panel-kicker">{t("Request a spot quote")}</span>
          <h2>{t("Tell us about your materials")}</h2>
          <p>{t("Required fields are marked. Website values and enquiries are non-binding until inspection, grading, and weighing are complete.")}</p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
