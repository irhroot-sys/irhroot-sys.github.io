import { useMemo, useState } from "react";
import { LuArrowRight, LuSearch } from "react-icons/lu";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { gradingStandards, materials } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";

// The three detail lines every material carries, in order.
const SPEC_LABELS = ["Grade / form", "Specification", "Typical use"];

const categories = ["All", ...new Set(materials.map((material) => material.category))];

// Materials data mixes real descriptive words ("aerospace", "plumbing") with
// short alloy/spec shorthand ("Cu-Zn", "A36", bare percentages like "99.9%").
// Splitting on word boundaries (instead of a raw substring match against one
// giant blob) stops a fragment like "al" inside "Structural" from matching a
// query for "Aluminum". Dropping tokens shorter than SEARCH_TOKEN_MIN_LENGTH
// on top of that keeps a two-letter chemical symbol on ONE material (e.g.
// "Cu-Zn" in Brass's spec line) from surfacing that unrelated card for a
// query like "Cu" — it now yields no match instead of a wrong one, same as
// any other search with zero results, rather than silently substituting a
// different material.
const SEARCH_TOKEN_MIN_LENGTH = 3;

function tokenize(text, { minLength = 1 } = {}) {
  return String(text)
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((token) => token.length >= minLength);
}

export function MaterialsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { openQuote } = useQuote();
  const { t } = useLanguage();

  const filteredProducts = useMemo(() => {
    const queryTokens = tokenize(query);
    return materials.filter((product) => {
      if (category !== "All" && product.category !== category) return false;
      if (!queryTokens.length) return true;

      const haystackText = [
        product.name, t(product.name),
        product.category, t(product.category),
        product.summary, t(product.summary),
        ...product.details, ...product.details.map(t),
      ].join(" ");
      const haystackTokens = tokenize(haystackText, { minLength: SEARCH_TOKEN_MIN_LENGTH });

      return queryTokens.every((queryToken) => haystackTokens.some((token) => token.startsWith(queryToken)));
    });
  }, [category, query, t]);

  return (
    <>
      <PageHero
        eyebrow="What we buy"
        title="Ferrous and non-ferrous materials."
        copy="Our analysis and certified weighing process supports precise grading and transparent, market-aware quotations for every accepted load."
        image="/assets/service-construction-materials.webp"
        alt={t("Steel construction materials ready for supply")}
        trail="Materials"
      />

      <section className="content-section container">
        <SectionHeading eyebrow="Material catalogue" title="Materials purchased by AALKC" copy="Specifications describe the core material families AALKC purchases. Final acceptance and value are confirmed after inspection and weighing." />
        <div className="catalog-tools" aria-label={t("Material filters")}>
          <div className="filter-chips" role="group" aria-label={t("Filter materials by category")}>
            {categories.map((item) => (
              <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{t(item)}</button>
            ))}
          </div>
          <label className="search-control"><LuSearch /><span className="sr-only">{t("Search materials")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search materials")} /></label>
        </div>
        <p className="result-count" aria-live="polite">{filteredProducts.length} {t(filteredProducts.length === 1 ? "result" : "results")}</p>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map(({ id, symbol, atomicNumber, name, category: productCategory, summary, details }) => (
              <article className="product-card" id={id} key={id}>
                <header className="product-head">
                  <span className="product-symbol" dir="ltr" aria-hidden="true" data-alloy={atomicNumber ? undefined : ""}>{symbol}</span>
                  <span className="product-meta">
                    <span dir="ltr">{atomicNumber ? `Z ${atomicNumber}` : t("Alloy")}</span>
                    <span>{t(productCategory)}</span>
                  </span>
                </header>
                <div className="product-copy">
                  <h2><Link to={`/materials/${id}`}>{t(name)}</Link></h2>
                  <p>{t(summary)}</p>
                  <dl className="product-spec">
                    {details.map((detail, index) => (
                      <div key={detail}><dt>{t(SPEC_LABELS[index])}</dt><dd>{t(detail)}</dd></div>
                    ))}
                  </dl>
                  <div className="product-actions">
                  <Link className="inline-action" to={`/materials/${id}`}>{t("Read the material guide")} <LuArrowRight className="directional-icon" /></Link>
                  <button type="button" className="inline-action" onClick={() => openQuote({ kind: "material", contextId: id, service: name, title: "Request a spot quote", prompt: "Share the estimated quantity, condition, site location, and collection requirements." })}>
                    {t("Request a spot quote")} <LuArrowRight className="directional-icon" />
                  </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><LuSearch /><h2>{t("No matching materials")}</h2><p>{t("Try another search term or clear the category filter.")}</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>{t("Clear filters")}</button></div>
        )}
      </section>
      <section className="content-section surface-white">
        <div className="container">
          <SectionHeading eyebrow="Quality standards" title="Grading and acceptance" copy="Review these common acceptance conditions before arranging collection. Final safety, grade, and value decisions are made after physical inspection." />
          <div className="grading-grid">
            {gradingStandards.map((standard) => (
              <article className="grading-card" key={standard.material}>
                <h2>{t(standard.material)}</h2>
                <div><h3>{t("Acceptable conditions")}</h3><ul>{standard.acceptable.map((item) => <li key={item}>{t(item)}</li>)}</ul></div>
                <div className="downgrade-list"><h3>{t("Common downgrades")}</h3><ul>{standard.downgrades.map((item) => <li key={item}>{t(item)}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand title="Have a material not listed here?" copy="Send the material type, estimated quantity, condition, and site location for verification." />
    </>
  );
}
