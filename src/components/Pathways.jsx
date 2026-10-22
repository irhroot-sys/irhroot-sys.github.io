import { LuArrowRight } from "react-icons/lu";
import { intents } from "../data/pathways.js";
import { materials } from "../data/siteContent.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { SectionHeading } from "./SectionHeading.jsx";

// The three reasons a business contacts AALKC, side by side. Each answers
// the same two questions — what AALKC handles, and what to send — and ends
// on the one next step, so a visitor finds their route in a glance.
export function IntentPaths({ current }) {
  const { t } = useLanguage();
  const shown = intents.filter(({ id }) => id !== current);
  return (
    <section className={`pathways content-section ${current ? "surface-mist" : "surface-white"}`} aria-labelledby="pathways-title">
      <div className="container">
        <SectionHeading
          id="pathways-title"
          eyebrow={current ? "Other ways to work with us" : "Working with AALKC"}
          title={current ? "Something else in mind?" : "Three ways to work with us."}
          copy={current ? undefined : "Whether you have scrap to sell, need material, or have a site to clear, each route says what we handle and what to send."}
        />
        <ul className={`pathway-list is-${shown.length}`}>
          {shown.map(({ id, to, title, handles, send, action }) => (
            <li key={id} className="pathway">
              <h3>{t(title)}</h3>
              <dl>
                <div><dt>{t("We handle")}</dt><dd>{t(handles)}</dd></div>
                <div><dt>{t("You send")}</dt><dd>{t(send)}</dd></div>
              </dl>
              <Link className="inline-action" to={to}>{t(action)} <LuArrowRight className="directional-icon" /></Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Every material family, under its symbol, each opening its guide.
export function MaterialIndex() {
  const { t } = useLanguage();
  return (
    <ul className="material-index">
      {materials.map(({ id, symbol, atomicNumber, name, category }) => (
        <li key={id}>
          <Link to={`/materials/${id}`}>
            <span className="material-index-symbol" dir="ltr" aria-hidden="true" data-alloy={atomicNumber ? undefined : ""}>{symbol}</span>
            <span className="material-index-name">{t(name)}</span>
            <span className="material-index-family">{t(category)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
