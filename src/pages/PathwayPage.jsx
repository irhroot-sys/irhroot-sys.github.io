import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuCheck, LuX } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { FaqBlock, RichText } from "../components/LongForm.jsx";
import { IntentPaths, MaterialIndex } from "../components/Pathways.jsx";
import { buyGuide, sellGuide } from "../data/pathways.js";
import { contactDetails } from "../data/siteContent.jsx";
import { photos } from "../data/photos.js";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

// The pages behind the two commercial routes. Each answers, in order: what
// AALKC handles, what to send, and what happens next — then the questions
// people ask before they commit.
const PATHWAYS = {
  sell: {
    guide: sellGuide,
    eyebrow: "For suppliers",
    photo: photos.ferrousYard,
    handlesTitle: "What we buy",
    handlesCopy: "Eight material families, each with a guide to how it is graded.",
    sendTitle: "What to send us",
    stepsTitle: "From your first message to payment",
    quote: { service: "Scrap Purchasing", title: "Get a quote for your scrap", prompt: "Share the material, estimated quantity, condition and site location." },
    quoteLabel: "Get a quote",
    whatsappText: "Hello AALKC, I have scrap metal to sell.",
  },
  buy: {
    guide: buyGuide,
    eyebrow: "For mills, foundries and traders",
    photo: photos.foundry,
    handlesTitle: "What we supply",
    handlesCopy: "Graded scrap from the same eight families AALKC buys. Availability depends on the material collected and is confirmed for each enquiry.",
    sendTitle: "What to include in your enquiry",
    stepsTitle: "How supply works",
    quote: { kind: "buy", service: "Buy materials from AALKC", title: "Request supply", prompt: "Tell us the grade, quantity, destination and timing you need." },
    quoteLabel: "Request supply",
    whatsappText: "Hello AALKC, I would like to buy graded scrap.",
  },
};

export function PathwayPage({ id }) {
  const config = PATHWAYS[id];
  const { guide } = config;
  const { openQuote } = useQuote();
  const { t } = useLanguage();
  const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(t(config.whatsappText))}`;

  return (
    <>
      <PageHero eyebrow={config.eyebrow} title={guide.heading} copy={guide.standfirst} image={config.photo.src} alt={config.photo.alt} focus={config.photo.focus} trail={guide.title} />

      <section className="content-section container pathway-brief" aria-label={t(guide.title)}>
        <div className="pathway-handles">
          <h2 className="pathway-heading">{t(config.handlesTitle)}</h2>
          <p className="pathway-lede">{t(config.handlesCopy)}</p>
          <MaterialIndex />
        </div>
        <div className="pathway-send">
          <h2 className="pathway-heading">{t(config.sendTitle)}</h2>
          <ul className="pathway-checklist">
            {guide.send.map((item, index) => <li key={index}><LuCheck aria-hidden="true" />{t(item)}</li>)}
          </ul>
          {guide.notAccepted && (
            <>
              <h3 className="pathway-subheading">{t("Not accepted")}</h3>
              <ul className="pathway-checklist is-excluded">
                {guide.notAccepted.map((item, index) => <li key={index}><LuX aria-hidden="true" />{t(item)}</li>)}
              </ul>
            </>
          )}
          {guide.assurance && (
            <>
              <h3 className="pathway-subheading">{t("How quality is confirmed")}</h3>
              <dl className="register is-plate pathway-assurance">
                {guide.assurance.map(({ term, text }, index) => <div key={index}><dt>{t(term)}</dt><dd>{t(text)}</dd></div>)}
              </dl>
            </>
          )}
          <div className="pathway-actions">
            <button type="button" className="primary-button" onClick={() => openQuote(config.quote)}>
              {t(config.quoteLabel)} <LuArrowRight className="directional-icon" />
            </button>
            <a className="secondary-button" href={whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> {t("WhatsApp")}</a>
          </div>
          <p className="pathway-credentials">
            <RichText text={{ en: "Registered and certified: see the [company register and certifications](/about#credentials).", ar: "شركة مسجّلة ومعتمدة: اطّلع على [سجل الشركة وشهاداتها](/about#credentials)." }} />
          </p>
        </div>
      </section>

      <section className="content-section surface-mist" aria-labelledby="steps-title">
        <div className="container">
          <SectionHeading id="steps-title" eyebrow="What happens next" title={config.stepsTitle} />
          <ol className={`pathway-steps is-${guide.steps.length}`}>
            {guide.steps.map(({ title, copy }, index) => (
              <li key={index}>
                <span className="pathway-step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{t(title)}</h3>
                <p>{t(copy)}</p>
              </li>
            ))}
          </ol>
          {id === "sell" && (
            <Link className="inline-action pathway-more" to="/process">{t("See every stage in detail")} <LuArrowRight className="directional-icon" /></Link>
          )}
        </div>
      </section>

      <section className="content-section container pathway-faq">
        <FaqBlock items={guide.faq} />
      </section>

      <IntentPaths current={id} />
      <CtaBand />
    </>
  );
}
