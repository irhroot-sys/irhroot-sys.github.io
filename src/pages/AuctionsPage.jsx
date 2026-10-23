import { FaWhatsapp } from "react-icons/fa";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { FaqBlock, RichText } from "../components/LongForm.jsx";
import { auctionCapabilities, auctionChannels, auctionDisclosures, auctionRecord, auctionStages, auctionsGuide, furthestStage } from "../data/auctions.js";
import { contactDetails } from "../data/siteContent.jsx";
import { photos } from "../data/photos.js";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";

const INVITE = {
  service: "Scrap Purchasing",
  title: { en: "Invite AALKC to bid", ar: "ادعُ أمانة الكلمة للمزايدة" },
  prompt: { en: "Share the sale, the lots, the site location, the inspection window and the closing date.", ar: "شاركنا تفاصيل البيع والمجموعات وموقع الأصول وفترة المعاينة وتاريخ الإغلاق." },
};

// The four stages of a sale as a gauge: one notch per stage, set in navy
// where the record proves AALKC reached it and left as a hairline where it
// does not. The same gauge keys the scale, so a row reads at a glance.
function StageGauge({ reached, label }) {
  return (
    <span className="stage-gauge" {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}>
      {auctionStages.map(({ id }) => <i key={id} className={reached.includes(id) ? "is-reached" : undefined} />)}
    </span>
  );
}

export function AuctionsPage() {
  const { openQuote } = useQuote();
  const { t, isArabic } = useLanguage();
  const photo = photos.generatorStator;
  const whatsappHref = `${contactDetails.whatsappHref}?text=${encodeURIComponent(t({ en: "Hello AALKC, we would like to invite you to bid on a sale.", ar: "مرحبًا أمانة الكلمة، نود دعوتكم للمزايدة على عملية بيع." }))}`;

  return (
    <>
      <PageHero eyebrow="Auctions & tenders" title={auctionsGuide.heading} copy={auctionsGuide.standfirst} image={photo.src} alt={photo.alt} focus={photo.focus} trail={auctionsGuide.title} />

      <section className="content-section container auction-scale-section" aria-labelledby="scale-title">
        <SectionHeading
          id="scale-title"
          eyebrow={{ en: "How to read the record", ar: "كيف تقرأ السجل" }}
          title={{ en: "Four stages, from the catalogue to the offer.", ar: "أربع مراحل، من الكتالوج إلى العرض." }}
          copy={{ en: "Every sale below is marked only with the stages its documents prove, and labelled by the furthest one.", ar: "لا يُعلَّم كل بيع أدناه إلا بالمراحل التي تثبتها وثائقه، ويُوسَم بأبعدها." }}
        />
        <ol className="stage-scale">
          {auctionStages.map(({ id, label, definition }, index) => (
            <li key={id}>
              <StageGauge reached={[id]} />
              <h3><span className="stage-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{t(label)}</h3>
              <p>{t(definition)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="content-section surface-mist" aria-labelledby="record-title">
        <div className="container">
          <SectionHeading
            id="record-title"
            eyebrow={{ en: "The record", ar: "السجل" }}
            title={{ en: "Sales we have bid in, inspected and studied.", ar: "مزادات قدّمنا فيها عروضًا أو عايناها أو درسناها." }}
            copy={{ en: "Government, utility, energy, drilling and telecom sales, from 2025 to today.", ar: "مزادات حكومية ومزادات لشركات المرافق والطاقة والحفر والاتصالات، من 2025 حتى اليوم." }}
          />
          <ul className="auction-record">
            {auctionRecord.map((record) => {
              const furthest = furthestStage(record);
              const reachedLabels = auctionStages.filter(({ id }) => record.stages.includes(id)).map(({ label }) => t(label)).join(isArabic ? "، " : ", ");
              return (
                <li key={record.id} data-stage={furthest.id}>
                  <article className="auction-entry" aria-labelledby={`sale-${record.id}`}>
                    <div className="auction-entry-stage">
                      <StageGauge reached={record.stages} label={`${t({ en: "Stages reached", ar: "المراحل المنجزة" })}: ${reachedLabels}`} />
                      <p>{t(furthest.label)}</p>
                    </div>
                    <div className="auction-entry-head">
                      <h3 id={`sale-${record.id}`}>{t(record.seller)}</h3>
                      {record.sector && <p className="auction-entry-sector">{t(record.sector)}</p>}
                      {record.note && <p className="auction-entry-note">{t(record.note)}</p>}
                    </div>
                    <dl className="auction-entry-facts">
                      <div><dt>{t({ en: "Sold through", ar: "جهة البيع" })}</dt><dd>{t(record.channel)}</dd></div>
                      <div><dt>{t({ en: "Lots", ar: "المجموعات" })}</dt><dd>{t(record.scope)}</dd></div>
                      {record.region && <div><dt>{t({ en: "Region", ar: "المنطقة" })}</dt><dd>{t(record.region)}</dd></div>}
                      <div><dt>{t({ en: "When", ar: "التاريخ" })}</dt><dd>{t(record.period)}</dd></div>
                    </dl>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="content-section container auction-brief" aria-label={t({ en: "How AALKC takes part in a sale", ar: "كيف تشارك أمانة الكلمة في البيع" })}>
        <div className="auction-channels">
          <h2 className="pathway-heading">{t({ en: "Where sales reach us", ar: "كيف تصلنا المزادات" })}</h2>
          <ul>
            {auctionChannels.map(({ name, text }, index) => (
              <li key={index}><h3>{t(name)}</h3><p>{t(text)}</p></li>
            ))}
          </ul>
        </div>
        <div className="auction-capabilities">
          <h2 className="pathway-heading">{t({ en: "What we bring to a sale", ar: "ما نقدّمه في كل بيع" })}</h2>
          <dl className="register is-plate">
            {auctionCapabilities.map(({ term, text }, index) => <div key={index}><dt>{t(term)}</dt><dd><RichText text={text} /></dd></div>)}
          </dl>
        </div>
      </section>

      <section className="content-section surface-mist" aria-labelledby="disclosure-title">
        <div className="container auction-disclosure">
          <div>
            <SectionHeading
              id="disclosure-title"
              eyebrow={{ en: "How this record is kept", ar: "كيف يُحفظ هذا السجل" }}
              title={{ en: "What we publish, and what we never will.", ar: "ما ننشره، وما لن ننشره أبدًا." }}
            />
            <ul className="check-list auction-disclosure-list">
              {auctionDisclosures.map((item, index) => <li key={index}><LuCheck aria-hidden="true" />{t(item)}</li>)}
            </ul>
          </div>
          <aside className="auction-invite" aria-labelledby="invite-title">
            <h2 id="invite-title" className="pathway-heading">{t({ en: "Selling surplus by auction or tender?", ar: "تبيع فوائضك بالمزاد أو المناقصة؟" })}</h2>
            <p>{t({ en: "Send the catalogue or lot list, the site, the inspection window and the closing date. We will confirm whether we will inspect and bid.", ar: "أرسل الكتالوج أو قائمة المجموعات والموقع وفترة المعاينة وتاريخ الإغلاق، وسنؤكد ما إذا كنا سنعاين ونزايد." })}</p>
            <div className="pathway-actions">
              <button type="button" className="primary-button" onClick={() => openQuote(INVITE)}>
                {t(INVITE.title)} <LuArrowRight className="directional-icon" />
              </button>
              <a className="secondary-button" href={whatsappHref} target="_blank" rel="noopener noreferrer"><FaWhatsapp aria-hidden="true" /> {t("WhatsApp")}</a>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-section container pathway-faq">
        <FaqBlock items={auctionsGuide.faq} />
      </section>

      <CtaBand />
    </>
  );
}
