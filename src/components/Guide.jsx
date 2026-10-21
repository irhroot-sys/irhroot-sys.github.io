import { useLanguage } from "../context/LanguageContext.jsx";
import { Blocks, FaqBlock, InBrief, RichText, SourcesList, TableOfContents } from "./LongForm.jsx";

const FAQ_HEADING = { type: "h2", id: "questions", text: "Questions we are asked" };

// The reading layout shared by every guide and article: the direct answer
// first, then the body at a 66-character measure, with a margin column that
// holds the contents and the page's register. On a phone the answer still
// comes first and the margin column follows it.
export function GuideBody({ brief, blocks, faq, sources, register, registerTitle = "At a glance", action, children }) {
  const { t } = useLanguage();
  const contents = faq?.length ? [...blocks, FAQ_HEADING] : blocks;
  return (
    <div className="guide container">
      <div className="guide-brief">
        <InBrief points={brief} />
      </div>
      <aside className="guide-aside" aria-label={t("About this page")}>
        <TableOfContents blocks={contents} />
        {register?.length > 0 && (
          <section className="guide-register" aria-labelledby="register-title">
            <h2 id="register-title" className="guide-register-title">{t(registerTitle)}</h2>
            <dl>
              {register.map(({ term, text }, index) => (
                <div key={index}><dt>{t(term)}</dt><dd><RichText text={text} /></dd></div>
              ))}
            </dl>
          </section>
        )}
        {action}
      </aside>
      <div className="guide-main">
        <div className="longform">
          <Blocks blocks={blocks} />
        </div>
        {children}
        <FaqBlock items={faq} id={FAQ_HEADING.id} />
        <SourcesList sources={sources} />
      </div>
    </div>
  );
}
