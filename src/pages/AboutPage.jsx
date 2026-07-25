import { FaBullseye, FaCheck, FaEye } from "react-icons/fa";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { Statistics } from "../components/Statistics.jsx";
import { certifications, companyServices, statistics, values } from "../data/siteContent.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useLanguage } from "../context/LanguageContext.jsx";

export function AboutPage() {
  const { t } = useLanguage();
  usePageMeta({
    title: "About Us",
    description: "Learn about Amanat Al-Kalima Company, a licensed scrap metal dealer established in 2017 in Dammam, Saudi Arabia.",
    path: "/about",
  });

  return (
    <>
      <PageHero
        eyebrow="Built on integrity"
        title="A trusted industrial recycling partner since 2017."
        copy="Amanat Al-Kalima Company provides professional metal recycling services for industrial, commercial, and construction businesses."
        image="/assets/service-industrial-dismantling.webp"
        alt="Excavator processing recovered metal at an industrial scrap yard"
        trail="About Us"
      />

      <section className="content-section content-width about-intro">
        <div className="about-story">
          <SectionHeading eyebrow="Company profile" title="About Amanat Al-Kalima Company" />
          <p>{t("Established in 2017, Amanat Al-Kalima Company (شركة أمانة الكلمة) is a licensed scrap metal dealer based in Dammam, Eastern Province, Kingdom of Saudi Arabia. We provide professional metal recycling services tailored to industrial, commercial, and construction businesses.")}</p>
          <p>{t("Our commitment to integrity, efficiency, and environmental sustainability has made us a trusted partner in the region's expanding industrial sector. We manage the complete lifecycle of scrap metal trading—from reliable site collection to meticulous sorting and processing.")}</p>
        </div>
        <div className="mission-grid">
          <article><FaBullseye /><h2>{t("Our mission")}</h2><p>{t("Deliver transparent, efficient, and responsible scrap-metal services that maximize value for industrial partners.")}</p></article>
          <article><FaEye /><h2>{t("Our vision")}</h2><p>{t("Strengthen the circular industrial economy by returning valuable materials to productive use.")}</p></article>
        </div>
      </section>

      <section className="content-section soft-section">
        <div className="content-width">
          <SectionHeading eyebrow="Our services include" title="Complete scrap-metal support" copy="The established AALKC service offering is preserved in the new information architecture." align="center" />
          <div className="company-service-grid">
            {companyServices.map((service) => <div key={service}><FaCheck /> <span>{t(service)}</span></div>)}
          </div>
        </div>
      </section>

      <section className="content-section content-width">
        <SectionHeading eyebrow="Why choose AALKC" title="Standards that shape every transaction" copy="Our operating principles support reliable partnerships with manufacturers, fabricators, contractors, and industrial suppliers." align="center" />
        <div className="value-grid">
          {values.map(({ icon: Icon, title, copy }) => (
            <article className="value-card" key={title}><Icon /><h3>{t(title)}</h3><p>{t(copy)}</p></article>
          ))}
        </div>
      </section>

      <Statistics statistics={statistics} />

      <section className="content-section content-width certification-section">
        <SectionHeading eyebrow="Official certification" title="Institutional integrity and trust" copy="The certifications and Ministry of Commerce verification represented on the existing AALKC website are integrated here for continuity." />
        <div className="certification-grid">
          {certifications.map((certification) => (
            <article key={certification.title}>
              <strong>{t(certification.title)}</strong>
              <span>{t(certification.label)}</span>
              <p>{t(certification.copy)}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
