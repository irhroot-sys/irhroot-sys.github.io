import { useLanguage } from "../context/LanguageContext.jsx";

export function Statistics({ statistics }) {
  const { t } = useLanguage();
  return (
    <section className="statistics" id="statistics" aria-label={t("Company statistics")}>
      <div className="statistics-grid">
        {statistics.map(({ icon: Icon, label, value }) => (
          <article className="stat" key={label}>
            <Icon />
            <div><span>{t(label)}</span><strong>{t(value)}</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}
