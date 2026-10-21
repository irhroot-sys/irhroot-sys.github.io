import { Suspense, use } from "react";

// The guide and article pages carry most of the site's words. They are built
// into their own chunk so the homepage, services and contact pages never
// download them.
//
//  · Build-time prerender: entry-server provides the module up front, so every
//    guide renders in full, synchronously.
//  · First visit to a guide: main.jsx loads the chunk before hydrating, so the
//    prerendered markup is adopted as it is.
//  · Navigating to a guide inside the app: the page suspends for the moment
//    the chunk takes to arrive.
let knowledgeModule = null;
let pending = null;

export function provideKnowledge(module) {
  knowledgeModule = module;
}

export function loadKnowledge() {
  if (knowledgeModule) return Promise.resolve(knowledgeModule);
  pending ??= import("../pages/knowledge.jsx").then((module) => {
    knowledgeModule = module;
    return module;
  });
  return pending;
}

function LoadedPage({ name, props }) {
  const module = knowledgeModule ?? use(loadKnowledge());
  const Page = module[name];
  return <Page {...props} />;
}

export function KnowledgePage({ name, ...props }) {
  return (
    <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
      <LoadedPage name={name} props={props} />
    </Suspense>
  );
}

// Questions for a guide's FAQPage structured data, once its body is loaded
// (always, at build time).
export function knowledgeFaq(reference) {
  if (!reference || !knowledgeModule) return [];
  return knowledgeModule.faqFor(reference);
}
