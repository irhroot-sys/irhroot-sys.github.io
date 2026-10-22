import { Component, Suspense, use } from "react";

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
//
// If the chunk cannot be fetched (a dropped connection, or a deploy that
// replaced it), nothing is left broken: on a first visit main.jsx leaves the
// prerendered page as it is, and during in-app navigation the guide is opened
// with a full page load, which serves its prerendered HTML.
let knowledgeModule = null;
let pending = null;

export function provideKnowledge(module) {
  knowledgeModule = module;
}

export function loadKnowledge() {
  if (knowledgeModule) return Promise.resolve(knowledgeModule);
  pending ??= import("../pages/knowledge.jsx").then(
    (module) => {
      knowledgeModule = module;
      return module;
    },
    (error) => {
      // Forget the failure, so the next attempt fetches again.
      pending = null;
      throw error;
    },
  );
  return pending;
}

function LoadedPage({ name, props }) {
  const module = knowledgeModule ?? use(loadKnowledge());
  const Page = module[name];
  return <Page {...props} />;
}

const RELOAD_KEY = "aalkc-knowledge-reload";
const RETRY_LABELS = {
  en: "This page did not load. Reload it.",
  ar: "تعذّر تحميل هذه الصفحة. أعد تحميلها.",
};

// Reloads the current URL once, so the browser fetches the prerendered page.
// Remembered per URL for the session, so a chunk that stays unreachable can
// never cause a reload loop; the second time the visitor gets a link instead.
class LoadFailure extends Component {
  state = { failed: false, retried: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    const key = `${RELOAD_KEY}:${window.location.pathname}`;
    let retried = false;
    try {
      retried = window.sessionStorage.getItem(key) === "1";
      if (!retried) window.sessionStorage.setItem(key, "1");
    } catch {
      retried = true;
    }
    if (retried) this.setState({ retried: true });
    else window.location.reload();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    if (!this.state.retried) return <div className="page-loading" aria-busy="true" />;
    return (
      <div className="page-loading container">
        <p><a href={window.location.href}>{RETRY_LABELS[document.documentElement.lang] ?? RETRY_LABELS.en}</a></p>
      </div>
    );
  }
}

export function KnowledgePage({ name, ...props }) {
  return (
    <LoadFailure>
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <LoadedPage name={name} props={props} />
      </Suspense>
    </LoadFailure>
  );
}

// Questions for a guide's FAQPage structured data, once its body is loaded
// (always, at build time).
export function knowledgeFaq(reference) {
  if (!reference || !knowledgeModule) return [];
  return knowledgeModule.faqFor(reference);
}
