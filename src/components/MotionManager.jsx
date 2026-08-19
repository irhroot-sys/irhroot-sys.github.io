import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "../lib/router.jsx";

const revealSelectors = [
  ".feature-grid > .feature",
  ".services-intro > *",
  ".service-cards > .service-card",
  ".statistics-grid > .stat",
  ".page-hero .page-breadcrumb",
  ".page-hero .page-kicker",
  ".page-hero h1",
  ".page-hero-copy > p",
  ".section-heading > *",
  ".about-story > p",
  ".mission-grid > article",
  ".value-grid > .value-card",
  ".company-service-grid > div",
  ".certification-grid > article",
  ".service-detail-list > .service-detail",
  ".process-grid > article",
  ".catalog-tools",
  ".result-count",
  ".product-grid > .product-card",
  ".grading-grid > .grading-card",
  ".faq-list > details",
  ".contact-methods > *",
  ".contact-form-panel",
  ".legal-page > .back-link",
  ".legal-page > .page-kicker",
  ".legal-page > h1",
  ".legal-page > .legal-intro",
  ".legal-sections > section",
  ".cta-band > *",
  ".not-found > *",
].join(",");

// An element is only ever hidden if its top edge starts below this multiple of
// the viewport height. Staging something that is already on screen is what
// produces a blank first paint, so those elements are left completely alone.
const IMMEDIATE_ZONE = 1;

// The observer root is grown past the bottom of the viewport so a reveal begins
// before the element is actually visible. Without the head start a fast scroll
// outruns the animation and the visitor sees empty space.
const PRELOAD_MARGIN = "0px 0px 22% 0px";

// Late-arriving fonts and images move the layout; re-check once they settle.
const SETTLE_DELAY = 600;

const MAX_STAGGER_STEPS = 3;

function getSiblingOrder(element) {
  const parent = element.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children).filter((child) => child.matches(revealSelectors));
  return Math.min(Math.max(siblings.indexOf(element), 0), MAX_STAGGER_STEPS);
}

function viewportHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 0;
}

function isOnScreen(element) {
  const rect = element.getBoundingClientRect();
  return rect.height > 0 && rect.top < viewportHeight() && rect.bottom > 0;
}

export function MotionManager() {
  const progressRef = useRef(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Without an observer — or when the visitor has asked for less motion —
    // nothing is staged at all. The CSS resting state is visible, so content
    // can never be stranded at opacity 0.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: PRELOAD_MARGIN },
    );

    function stageNewTargets() {
      const foldLine = viewportHeight() * IMMEDIATE_ZONE;

      document.querySelectorAll(revealSelectors).forEach((element) => {
        if (element.dataset.motionStaged) return;
        element.dataset.motionStaged = "1";

        // Already on screen: never hide it, just let it paint.
        if (element.getBoundingClientRect().top < foldLine) return;

        element.dataset.motion = "reveal";
        element.style.setProperty("--motion-order", getSiblingOrder(element));
        observer.observe(element);
      });
    }

    // Safety net. The observer is the primary path, but a fast scroll, a resize
    // or a late layout shift can leave a staged element sitting on screen and
    // still hidden. Anything caught here is faded in at once, without a stagger.
    function revealStrandedTargets() {
      document.querySelectorAll('[data-motion="reveal"]:not(.is-revealed)').forEach((element) => {
        if (!isOnScreen(element)) return;
        element.classList.add("is-revealed", "is-immediate");
        observer.unobserve(element);
      });
    }

    let frame = null;
    let stagingQueued = false;

    function runScheduledWork() {
      frame = null;
      if (stagingQueued) {
        stagingQueued = false;
        stageNewTargets();
      }
      revealStrandedTargets();
    }

    function scheduleSweep({ withStaging = false } = {}) {
      if (withStaging) stagingQueued = true;
      if (frame !== null) return;
      frame = window.requestAnimationFrame(runScheduledWork);
    }

    const handleScroll = () => scheduleSweep();
    const handleResize = () => scheduleSweep({ withStaging: true });
    const handleLoad = () => scheduleSweep({ withStaging: true });

    stageNewTargets();

    // Content can appear after mount — filtered catalogues, expanded panels, a
    // language swap — so keep staging as the DOM changes. Only childList is
    // observed, so the attribute writes above cannot re-trigger this.
    const mutationObserver = new MutationObserver(() => scheduleSweep({ withStaging: true }));
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", handleLoad);
    const settleTimer = window.setTimeout(() => scheduleSweep({ withStaging: true }), SETTLE_DELAY);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  // Scroll progress, the header's scrolled state and parallax all read the
  // same scroll position, so they share one rAF pass. Splitting them would
  // mean three separate reads of layout per frame.
  useEffect(() => {
    const progress = progressRef.current;
    const header = document.querySelector(".site-header");
    const allowMotion = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let parallaxTargets = [];
    let frame = null;

    const collectParallax = () => {
      parallaxTargets = allowMotion ? Array.from(document.querySelectorAll("[data-parallax]")) : [];
    };

    // Offset is expressed as a share of the element's own height and capped,
    // so the image never travels far enough to expose its own edge — the
    // overscan scale in CSS is what buys the room.
    const updateParallax = (viewportHeight) => {
      for (const element of parallaxTargets) {
        const frameEl = element.parentElement ?? element;
        const rect = frameEl.getBoundingClientRect();
        if (rect.bottom < -160 || rect.top > viewportHeight + 160) continue;

        const strength = Number.parseFloat(element.dataset.parallax) || 0.06;
        const span = viewportHeight / 2 + rect.height / 2;
        const centreOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        const ratio = Math.max(-1, Math.min(1, centreOffset / span));
        element.style.setProperty("--parallax-y", `${(ratio * strength * rect.height).toFixed(2)}px`);
      }
    };

    const updateScrollState = () => {
      frame = null;
      const viewportHeight = window.innerHeight;
      const scrollRange = document.documentElement.scrollHeight - viewportHeight;
      const ratio = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;
      progress?.style.setProperty("--scroll-progress", ratio.toFixed(4));
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
      if (parallaxTargets.length) updateParallax(viewportHeight);
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    const handleResize = () => {
      collectParallax();
      requestUpdate();
    };

    collectParallax();
    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Parallax hosts arrive with each route, so re-collect as the DOM changes.
    const contentObserver = new MutationObserver(handleResize);
    contentObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      contentObserver.disconnect();
      parallaxTargets.forEach((element) => element.style.removeProperty("--parallax-y"));
      header?.classList.remove("is-scrolled");
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
