import { useLanguage } from "../context/LanguageContext.jsx";

export function FeatureStrip({ features }) {
  const { t } = useLanguage();
  return (
    <section className="feature-strip" id="about" aria-label={t("Why choose AALKC")}>
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, copy }) => (
          <article className="feature" key={title}>
            <Icon className="feature-icon" />
            <div>
              <h2>{t(title)}</h2>
              <p>{t(copy)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
