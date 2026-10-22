import { LuCheck } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { CompanyRegister } from "../components/CompanyRegister.jsx";
import { companyServices, values } from "../data/siteContent.jsx";
import { CertificationList } from "../components/CertificationList.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

export function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Built on integrity"
        title="A trusted industrial recycling partner since 2017."
        copy="Amanat Al-Kalima Company provides professional metal recycling services for industrial, commercial, and construction businesses."
        image="/assets/service-industrial-dismantling.webp"
        alt={t("Industrial material recovery and dismantling operation")}
        trail="About Us"
      />

      <section className="content-section container about-intro">
        <div className="about-story">
          <SectionHeading eyebrow="Company profile" title="About Amanat Al-Kalima Company" compact />
          <p className="about-lede">{t("Established in 2017, Amanat Al-Kalima Company (شركة أمانة الكلمة) is a licensed scrap metal dealer based in Dammam, Eastern Province, Kingdom of Saudi Arabia. We provide professional metal recycling services tailored to industrial, commercial, and construction businesses.")}</p>
          <p>{t("Our commitment to integrity, efficiency, and environmental sustainability has made us a trusted partner in the region's expanding industrial sector. We manage the complete lifecycle of scrap metal trading—from reliable site collection to meticulous sorting and processing.")}</p>
        </div>
        <aside className="about-name on-ink" aria-label={t("The name")}>
          <span className="label">{t("The name")}</span>
          <p className="about-name-ar" lang="ar" dir="rtl">أمانة الكلمة</p>
          <p className="about-name-gloss">{t("Amanat Al-Kalima — “the trust of one’s word”.")}</p>
        </aside>
        <div className="mission-grid">
          <article><span className="label">{t("Our mission")}</span><p>{t("Deliver transparent, efficient, and responsible scrap-metal services that maximize value for industrial partners.")}</p></article>
          <article><span className="label">{t("Our vision")}</span><p>{t("Strengthen the circular industrial economy by returning valuable materials to productive use.")}</p></article>
        </div>
      </section>

      <section className="content-section surface-white">
        <div className="container">
          <SectionHeading eyebrow="Our services include" title="Complete scrap-metal support" copy="A complete range of scrap-metal services for industrial, commercial, and construction partners across the Eastern Province." />
          <ul className="check-list company-service-grid">
            {companyServices.map((service) => <li key={service}><LuCheck aria-hidden="true" /><span>{t(service)}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="content-section container">
        <SectionHeading eyebrow="Why choose AALKC" title="Standards that shape every transaction" copy="Our operating principles support reliable partnerships with manufacturers, fabricators, contractors, and industrial suppliers." />
        <ol className="value-grid">
          {values.map(({ icon: Icon, title, copy }) => (
            <li className="value-card" key={title}>
              <Icon aria-hidden="true" />
              <h3>{t(title)}</h3>
              <p>{t(copy)}</p>
            </li>
          ))}
        </ol>
      </section>

      <CompanyRegister id="credentials" />

      <section className="content-section container certification-section">
        <SectionHeading eyebrow="Official certification" title="Institutional integrity and trust" copy="AALKC maintains quality, environmental, and safety certifications alongside verified Ministry of Commerce registration." />
        <CertificationList />
      </section>
      <CtaBand />
    </>
  );
}
