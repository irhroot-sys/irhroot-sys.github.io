import { LuArrowRight } from "react-icons/lu";
import { engagements, logoHeight, platforms } from "../data/engagements.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// One organisation's mark on its plate. The logo is decorative to assistive
// technology (alt=""), because the caption beneath names the organisation in
// the reader's language; intrinsic dimensions keep the layout from shifting
// while the file loads.
function LogoMark({ item }) {
  const width = item.width ?? Math.round(item.ratio * 100);
  const height = item.height ?? 100;
  return (
    <img
      src={item.logo}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      style={{ "--logo-h": `${logoHeight(item).toFixed(2)}rem` }}
    />
  );
}

// Our experience and track record: the organisations whose sales, tenders and
// procurement AALKC has taken part in, set as a plate grid of their own
// logos, and the public platforms it bids through. Engagement, never a claim
// of partnership or of a contract won: the note under the heading says so.
export function TrackRecord({ id = "track-record", surface = "surface-white", showRecordLink = true }) {
  const { t } = useLanguage();
  return (
    <section id={id} className={`track-record content-section ${surface}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <SectionHeading
          id={`${id}-title`}
          eyebrow={{ en: "Track record", ar: "سجل الخبرة" }}
          title={{ en: "Our Experience & Track Record", ar: "خبرتنا وسجل أعمالنا" }}
          copy={{
            en: "Since 2017, AALKC has bought, inspected and cleared scrap and surplus assets for Saudi industry. Our work runs across energy, petrochemicals, utilities and manufacturing, and through the sealed-bid auctions and government tenders by which these organisations sell.",
            ar: "منذ عام 2017 تشتري أمانة الكلمة الخردة والأصول الفائضة للقطاع الصناعي السعودي وتعاينها وتُخليها. ويمتد عملنا عبر قطاعات الطاقة والبتروكيماويات والمرافق والتصنيع، ومن خلال المزادات بالظرف المختوم والمنافسات الحكومية التي تبيع بها هذه الجهات.",
          }}
        />

        <div className="engagements-head">
          <h3>{t({ en: "Selected Industry Engagements", ar: "مختارات من تعاملاتنا مع القطاع الصناعي" })}</h3>
          <p>
            {t({
              en: "Organisations whose sales, tenders and procurement AALKC has taken part in. Logos are the trademarks of their owners; showing them implies no partnership, endorsement or contract award.",
              ar: "جهات شاركت أمانة الكلمة في مبيعاتها ومنافساتها ومشترياتها. الشعارات علامات تجارية مملوكة لأصحابها، وعرضها لا يعني شراكة أو تزكية أو ترسية عقد.",
            })}
          </p>
        </div>

        <ul className="engagement-grid">
          {engagements.map((item) => (
            <li key={item.id}>
              <figure className="engagement">
                <div className="engagement-plate">
                  <LogoMark item={item} />
                </div>
                <figcaption>
                  <span className="engagement-name">{t(item.name)}</span>
                  <span className="engagement-sector">{t(item.sector)}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="platforms">
          <div className="platforms-intro">
            <h3>{t({ en: "Digital procurement platforms", ar: "منصات المشتريات والمزادات الرقمية" })}</h3>
            <p>
              {t({
                en: "Public tenders and auctions in the Kingdom are increasingly run online. AALKC is set up to register, inspect and bid on the national platforms.",
                ar: "تُدار المنافسات والمزادات العامة في المملكة إلكترونيًا بصورة متزايدة، وأمانة الكلمة مهيّأة للتسجيل والمعاينة والمزايدة عبر المنصات الوطنية.",
              })}
            </p>
            {showRecordLink && (
              <Link className="inline-action" to="/auctions-and-tenders">
                {t({ en: "See our auctions and tenders record", ar: "اطّلع على سجل مزاداتنا ومناقصاتنا" })} <LuArrowRight className="directional-icon" />
              </Link>
            )}
          </div>
          <ul className="platform-list">
            {platforms.map((item) => (
              <li key={item.id} className="platform">
                <div className="platform-plate"><LogoMark item={item} /></div>
                <div className="platform-copy">
                  <h4>{t(item.name)}</h4>
                  <p className="platform-kind">{t(item.kind)}<span className="platform-domain" dir="ltr" lang="en">{item.domain}</span></p>
                  <p>{t(item.text)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
