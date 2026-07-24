export function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <header className={`section-heading is-${align}`}>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}
