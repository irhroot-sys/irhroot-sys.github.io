export function FeatureStrip({ features }) {
  return (
    <section className="feature-strip" id="about" aria-label="Why choose AALKC">
      <div className="feature-grid">
        {features.map(({ icon: Icon, title, copy }) => (
          <article className="feature" key={title}>
            <Icon className="feature-icon" />
            <div>
              <h2>{title}</h2>
              <p>{copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
