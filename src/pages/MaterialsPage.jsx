import { useMemo, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { PageHero } from "../components/PageHero.jsx";
import { SectionHeading } from "../components/SectionHeading.jsx";
import { CtaBand } from "../components/CtaBand.jsx";
import { gradingStandards, materials } from "../data/siteContent.jsx";
import { useQuote } from "../context/QuoteContext.jsx";
import { usePageMeta } from "../lib/usePageMeta.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const categories = ["All", ...new Set(materials.map((material) => material.category))];

export function MaterialsPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { openQuote } = useQuote();
  const { t } = useLanguage();
  usePageMeta({
    title: "Materials",
    description: "Review the ferrous and non-ferrous materials AALKC purchases, including copper, steel, aluminum, brass, cast iron, stainless steel, and structural plate.",
    path: "/materials",
    image: "/assets/service-construction-materials.webp",
  });

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return materials.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const haystack = `${product.name} ${t(product.name)} ${product.category} ${t(product.category)} ${product.summary} ${t(product.summary)} ${product.details.join(" ")} ${product.details.map(t).join(" ")}`.toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query, t]);

  return (
    <>
      <PageHero
        eyebrow="What we buy"
        title="Ferrous and non-ferrous materials."
        copy="Our analysis and certified weighing process supports precise grading and transparent, market-aware quotations for every accepted load."
        image="/assets/service-construction-materials.webp"
        alt="Steel construction materials ready for supply"
        trail="Materials"
      />

      <section className="content-section content-width">
        <SectionHeading eyebrow="Material catalogue" title="Materials purchased by AALKC" copy="Specifications describe the core material families represented on the existing AALKC website. Final acceptance and value are confirmed after inspection and weighing." />
        <div className="catalog-tools" aria-label={t("Material filters")}>
          <div className="filter-chips" role="group" aria-label={t("Filter materials by category")}>
            {categories.map((item) => (
              <button type="button" className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{t(item)}</button>
            ))}
          </div>
          <label className="search-control"><FaSearch /><span className="sr-only">{t("Search materials")}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t("Search materials")} /></label>
        </div>
        <p className="result-count" aria-live="polite">{filteredProducts.length} {t(filteredProducts.length === 1 ? "result" : "results")}</p>

        {filteredProducts.length ? (
          <div className="product-grid">
            {filteredProducts.map(({ id, icon: Icon, name, category: productCategory, image, alt, summary, details }) => (
              <article className="product-card" key={id}>
                <div className="product-media"><img src={image} alt={t(alt)} loading="lazy" /><span>{t(productCategory)}</span></div>
                <div className="product-copy">
                  <Icon />
                  <h2>{t(name)}</h2>
                  <p>{t(summary)}</p>
                  <ul>{details.map((detail) => <li key={detail}>{t(detail)}</li>)}</ul>
                  <button type="button" className="inline-action" onClick={() => openQuote({ kind: "material", contextId: id, service: name, title: "Request a spot quote", prompt: "Share the estimated quantity, condition, site location, and collection requirements." })}>
                    {t("Request a spot quote")} <FaChevronRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state"><FaSearch /><h2>{t("No matching materials")}</h2><p>{t("Try another search term or clear the category filter.")}</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>{t("Clear filters")}</button></div>
        )}
      </section>
      <section className="content-section soft-section">
        <div className="content-width">
          <SectionHeading eyebrow="Quality standards" title="Grading and acceptance" copy="Review these common acceptance conditions before arranging collection. Final safety, grade, and value decisions are made after physical inspection." align="center" />
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
