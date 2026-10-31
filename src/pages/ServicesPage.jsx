import { LuArrowRight, LuCheck } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { services } from "../data/siteContent.jsx";
import { ProcessSection } from "../components/ProcessSection.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { ResponsiveImage } from "../components/ResponsiveImage.jsx";
import { PLATE_SIZES } from "../data/imageSizes.js";
import { photos } from "../data/photos.js";


export function ServicesPage() {
  const { openQuote } = useQuote();
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow="Industrial recycling services"
        title="Scrap management built for industrial scale."
        copy="From site collection and dismantling to grading, logistics, purchasing, and global trade, AALKC coordinates the complete material-recovery process."
        image={photos.cableReelTrucks.src}
        alt={photos.cableReelTrucks.alt}
        focus={photos.cableReelTrucks.focus}
        trail="Services"
      />

      <section className="content-section container">
        <SectionHeading eyebrow="What we do" title="Six connected service lines" copy="Choose a service below or send the full requirement and our team will coordinate the right operational route." />
        <div className="service-detail-list">
          {services.map(({ slug, title, copy, image, alt, capabilities, focalPosition, category }, index) => (
            <article className={`service-detail ${index % 2 ? "is-reversed" : ""}`} id={slug} key={slug}>
              <figure className="service-detail-plate">
                <div className="plate-frame service-detail-media"><ResponsiveImage src={image} sizes={PLATE_SIZES} alt={t(alt)} loading="lazy" decoding="async" style={{ objectPosition: focalPosition || "center" }} /></div>
              </figure>
              <div className="service-detail-copy">
                <span className="label">{t(category)}</span>
                <h2>{t(title)}</h2>
                <p>{t(copy)}</p>
                <ul className="check-list">{capabilities.map((capability) => <li key={capability}><LuCheck aria-hidden="true" />{t(capability)}</li>)}</ul>
                <div className="service-detail-actions">
                  <Link className="secondary-button" to={`/services/${slug}`}>
                    {t("View service details")} <LuArrowRight className="directional-icon" />
                  </Link>
                  <button type="button" className="inline-action" onClick={() => openQuote({ service: title })}>
                    {t("Request a quote")} <LuArrowRight className="directional-icon" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProcessSection />
      <CtaBand />
    </>
  );
}
