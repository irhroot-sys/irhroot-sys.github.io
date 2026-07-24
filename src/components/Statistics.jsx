export function Statistics({ statistics }) {
  return (
    <section className="statistics" id="statistics" aria-label="Company statistics">
      <div className="statistics-grid">
        {statistics.map(({ icon: Icon, label, value }) => (
          <article className="stat" key={label}>
            <Icon />
            <div><span>{label}</span><strong>{value}</strong></div>
          </article>
        ))}
      </div>
    </section>
  );
}
