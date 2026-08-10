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

function getSiblingOrder(element) {
  const parent = element.parentElement;
  if (!parent) return 0;
  const siblings = Array.from(parent.children).filter((child) => child.matches(revealSelectors));
  return Math.min(Math.max(siblings.indexOf(element), 0), 4);
}

export function MotionManager() {
  const progressRef = useRef(null);
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const targets = Array.from(document.querySelectorAll(revealSelectors));
    targets.forEach((target) => {
      target.dataset.motion = "reveal";
      target.style.setProperty("--motion-order", getSiblingOrder(target));
    });

    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -7% 0px",
    });

    targets.forEach((target) => {
      if (target.classList.contains("is-revealed")) return;
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const progress = progressRef.current;
    const header = document.querySelector(".site-header");
    let frame = null;

    const updateScrollState = () => {
      frame = null;
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollRange > 0 ? Math.min(Math.max(window.scrollY / scrollRange, 0), 1) : 0;
      progress?.style.setProperty("--scroll-progress", ratio.toFixed(4));
      header?.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    const requestUpdate = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      header?.classList.remove("is-scrolled");
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
