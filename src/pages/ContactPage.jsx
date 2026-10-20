import { FaWhatsapp } from "react-icons/fa";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { EnquiryForm } from "../components/EnquiryForm.jsx";
import { contactDetails } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { PhoneNumber } from "../components/PhoneNumber.jsx";

export function ContactPage() {
  const { t, isArabic } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Start a conversation"
        title="Maximize the value of your scrap."
        copy="Share the material, estimated quantity, site location, and collection needs. Our Dammam team will review the requirement and respond with the next step."
        image="/assets/service-container-handling.webp"
        alt={t("Scrap-handling crane loading recovered metal at an industrial yard")}
        trail="Contact"
      />
      <section className="content-section container contact-layout">
        <div className="contact-details">
          <SectionHeading index="01" eyebrow="Official contact details" title="Direct access to AALKC" copy="Reach our Dammam headquarters directly using the official phone, email, and address below." />
          <div className="contact-methods">
            <a href={contactDetails.phoneHref}><LuPhone /><div><span>{t("Phone")}</span><strong><PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></strong></div></a>
            <a href={`mailto:${contactDetails.email}`}><LuMail /><div><span>{t("Email")}</span><strong>{contactDetails.email}</strong></div></a>
            <a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp /><div><span>{t("WhatsApp")}</span><strong><PhoneNumber>{contactDetails.phoneLabel}</PhoneNumber></strong></div></a>
            <a href={contactDetails.mapHref} target="_blank" rel="noopener noreferrer"><LuMapPin /><div><span>{t("Headquarters")}</span><strong>{isArabic ? contactDetails.addressArabic : <>{contactDetails.addressLine1}<br />{contactDetails.addressLine2}<br />{contactDetails.addressCountry}</>}</strong><em className="contact-method-hint">{t("Open in Google Maps")}</em></div></a>
          </div>
        </div>
        <div className="contact-form-panel">
          <span className="panel-kicker">{t("Request a spot quote")}</span>
          <h2>{t("Tell us about your materials")}</h2>
          <p>{t("Required fields are marked. Website values and enquiries are non-binding until inspection, grading, and weighing are complete.")}</p>
          <p className="form-photo-hint">
            <FaWhatsapp aria-hidden="true" />
            <span>{t("Have photos of the material? Send them on")} <a href={contactDetails.whatsappHref} target="_blank" rel="noopener noreferrer">{t("WhatsApp")}</a> {t("for a faster assessment.")}</span>
          </p>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
