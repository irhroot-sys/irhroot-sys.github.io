import { Fragment } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import { useLanguage } from "../context/LanguageContext.jsx";
import { Link } from "../lib/router.jsx";
import { LINK_PATTERN, plainText } from "../lib/i18n.js";

export { plainText };

// Long-form content is stored as a list of blocks (see src/data/knowledge).
// Every piece of copy is a localized pair, so the same structure renders the
// English and the Arabic page.

// Inline links are written in the copy as [label](/path) or
// [label](https://…). Internal paths become in-site links in the current
// language; external ones open the source in a new tab.

export function RichText({ text }) {
  const { t } = useLanguage();
  const value = t(text) ?? "";
  const parts = [];
  let last = 0;
  for (const match of value.matchAll(LINK_PATTERN)) {
    if (match.index > last) parts.push(value.slice(last, match.index));
    const [, label, href] = match;
    parts.push(href.startsWith("/")
      ? <Link key={match.index} to={href}>{label}</Link>
      : <a key={match.index} href={href} target="_blank" rel="noopener noreferrer">{label}</a>);
    last = match.index + match[0].length;
  }
  if (last < value.length) parts.push(value.slice(last));
  return <>{parts.map((part, index) => <Fragment key={index}>{part}</Fragment>)}</>;
}


export function Blocks({ blocks }) {
  const { t } = useLanguage();
  return blocks.map((block, index) => {
    switch (block.type) {
      case "h2":
        return <h2 key={index} id={block.id} className="longform-h2">{t(block.text)}</h2>;
      case "h3":
        return <h3 key={index} className="longform-h3">{t(block.text)}</h3>;
      case "p":
        return <p key={index}><RichText text={block.text} /></p>;
      case "list": {
        const List = block.ordered ? "ol" : "ul";
        return (
          <List key={index} className={`longform-list${block.ordered ? " is-ordered" : ""}`}>
            {block.items.map((item, itemIndex) => <li key={itemIndex}><RichText text={item} /></li>)}
          </List>
        );
      }
      case "definitions":
        return (
          <dl key={index} className="longform-definitions">
            {block.items.map(({ term, text }, itemIndex) => (
              <div key={itemIndex}>
                <dt>{t(term)}</dt>
                <dd><RichText text={text} /></dd>
              </div>
            ))}
          </dl>
        );
      case "table":
        return (
          <div key={index} className="longform-table" role="region" aria-label={t(block.caption)} tabIndex={0}>
            <table>
              <caption>{t(block.caption)}</caption>
              <thead><tr>{block.head.map((cell, cellIndex) => <th key={cellIndex} scope="col">{t(cell)}</th>)}</tr></thead>
              <tbody>
                {block.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => cellIndex === 0
                      ? <th key={cellIndex} scope="row"><RichText text={cell} /></th>
                      : <td key={cellIndex}><RichText text={cell} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "note":
        return (
          <aside key={index} className="longform-note">
            {block.title && <strong>{t(block.title)}</strong>}
            <p><RichText text={block.text} /></p>
          </aside>
        );
      default:
        return null;
    }
  });
}

// The direct answer, first. Search and answer engines quote the opening of a
// page; a reader skimming gets the substance in four lines.
export function InBrief({ points, title = "In brief" }) {
  const { t } = useLanguage();
  return (
    <section className="in-brief" aria-label={t(title)}>
      <h2 className="in-brief-title">{t(title)}</h2>
      <ul>
        {points.map((point, index) => <li key={index}><RichText text={point} /></li>)}
      </ul>
    </section>
  );
}

export function TableOfContents({ blocks, title = "On this page" }) {
  const { t } = useLanguage();
  const headings = blocks.filter((block) => block.type === "h2" && block.id);
  if (headings.length < 3) return null;
  return (
    <nav className="toc" aria-label={t(title)}>
      <p className="toc-title">{t(title)}</p>
      <ol>
        {headings.map(({ id, text }) => <li key={id}><a href={`#${id}`}>{t(text)}</a></li>)}
      </ol>
    </nav>
  );
}

export function FaqBlock({ items, title = "Questions we are asked", id = "questions" }) {
  const { t } = useLanguage();
  if (!items?.length) return null;
  return (
    <section id={id} className="longform-faq" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="longform-h2">{t(title)}</h2>
      <div className="faq-list">
        {items.map(({ question, answer }, index) => (
          <details key={index} open={index === 0}>
            <summary><span>{t(question)}</span></summary>
            <p><RichText text={answer} /></p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Sources are listed by publisher and title, linked to the page that supports
// the claim. They are part of the content, not a footnote: a reader can check
// every figure on the page.
export function SourcesList({ sources, title = "Sources" }) {
  const { t } = useLanguage();
  if (!sources?.length) return null;
  return (
    <section className="sources" aria-labelledby="sources-title">
      <h2 id="sources-title" className="sources-title">{t(title)}</h2>
      <ol>
        {sources.map(({ publisher, title: sourceTitle, url }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <span className="sources-publisher">{publisher}</span>
              <span className="sources-name" dir="auto">{sourceTitle}</span>
              <LuArrowUpRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

// Onward links at the foot of a guide: related materials, sectors, services
// or articles, each with a one-line reason to follow it.
export function RelatedLinks({ title, items }) {
  const { t } = useLanguage();
  if (!items?.length) return null;
  return (
    <section className="related-links" aria-label={t(title)}>
      <h2 className="related-links-title">{t(title)}</h2>
      <ul>
        {items.map(({ to, label, note }) => (
          <li key={to}>
            <Link to={to}>
              <strong>{t(label)}</strong>
              {note && <span>{t(note)}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// "7 min read" / "7 دقائق قراءة". Arabic counts agree with the number:
// 1 and 2 have their own forms, 3–10 take the plural, 11 and above the
// singular.
export function readingTimeLabel(minutes, language) {
  if (language !== "ar") return `${minutes} min read`;
  if (minutes === 1) return "دقيقة قراءة واحدة";
  if (minutes === 2) return "دقيقتا قراءة";
  return `${minutes} ${minutes <= 10 ? "دقائق" : "دقيقة"} قراءة`;
}

// Reading time from the words on the page, rounded up, never below a minute.
// Counted on the English text, so both languages state the same time for the
// same article (Arabic packs the same meaning into fewer, longer words).
export function readingMinutes(blocks, language = "en") {
  const words = blocks.flatMap((block) => [block.text, ...(block.items ?? []).map((item) => item.text ?? item.term ?? item), ...(block.rows ?? []).flat()])
    .filter(Boolean)
    .map((value) => plainText(value, language))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}
