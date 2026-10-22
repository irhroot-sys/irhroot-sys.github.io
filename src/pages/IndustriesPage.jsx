import { LuArrowRight } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { industries, services } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { photos } from "../data/photos.js";

const serviceTitles = Object.fromEntries(services.map((service) => [service.slug, service.title]));

export function IndustriesPage() {
  const { t } = useLanguage();
  return (
    <>
      <PageHero
        eyebrow="Industries we serve"
        title="Scrap programmes built around your sector."
        copy="Every sector produces scrap differently. Collection, sorting and grading are planned around how your operation works."
        image={photos.transformers.src}
        alt={photos.transformers.alt}
        focus={photos.transformers.focus}
        trail="Industries"
      />
      <section className="content-section container">
        <SectionHeading eyebrow="Sectors" title="Who we work with" copy="Manufacturers, fabricators, contractors and facility operators across the Eastern Province rely on AALKC to recover the value in their scrap." />
        <div className="industry-list">
          {industries.map(({ slug, icon: Icon, title, copy, materials, services: serviceSlugs }) => (
            <article className="industry-row" id={slug} key={slug}>
              <div className="industry-row-title">
                <Icon aria-hidden="true" />
                <h2><Link to={`/industries/${slug}`}>{t(title)}</Link></h2>
              </div>
              <div className="industry-row-copy">
                <p>{t(copy)}</p>
                <Link className="inline-action" to={`/industries/${slug}`}>{t("Read the sector guide")} <LuArrowRight className="directional-icon" /></Link>
              </div>
              <div className="industry-row-meta">
                <div>
                  <h3>{t("Typical materials")}</h3>
                  <ul className="chip-list">{materials.map((material) => <li key={material}><span>{t(material)}</span></li>)}</ul>
                </div>
                <div>
                  <h3>{t("Relevant services")}</h3>
                  <ul className="industry-service-links">
                    {serviceSlugs.map((serviceSlug) => (
                      <li key={serviceSlug}><Link to={`/services/${serviceSlug}`}>{t(serviceTitles[serviceSlug])} <LuArrowRight className="directional-icon" /></Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Not sure which service fits?" copy="Describe the material and the site, and our team will recommend the right approach." action="contact" />
    </>
  );
}
