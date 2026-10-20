import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { localizePath, splitLocalePath } from "./i18n.js";

const RouterContext = createContext(null);

function describeLocation({ pathname, search = "", hash = "" }) {
  // `route` is the language-neutral page path ("/services" for both
  // /services and /ar/services); `pathname` is the real URL path.
  return { pathname, search, hash, ...splitLocalePath(pathname) };
}

function readLocation() {
  return describeLocation(window.location);
}

// `url` is only passed during the build-time prerender, where there is no
// window. In the browser the router always reads the live location.
export function RouterProvider({ url, children }) {
  const [location, setLocation] = useState(() => (url ? describeLocation(url) : readLocation()));

  useEffect(() => {
    const handlePopState = () => setLocation(readLocation());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    const destination = new URL(to, window.location.href);
    if (destination.origin !== window.location.origin) {
      window.location.assign(destination.href);
      return;
    }
    window.history[replace ? "replaceState" : "pushState"]({}, "", `${destination.pathname}${destination.search}${destination.hash}`);

    // View Transitions need the DOM to be updated synchronously inside the
    // callback, hence flushSync. Where the API is missing — or the visitor
    // has asked for less motion — the route swaps as it always did and the
    // page-stage animation covers the change.
    const commit = () => setLocation(readLocation());
    const allowTransition =
      typeof document.startViewTransition === "function"
      && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (allowTransition) {
      document.startViewTransition(() => flushSync(commit));
    } else {
      commit();
    }
  }, []);

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useLocation must be used inside RouterProvider.");
  return router;
}

// `to` is written as the language-neutral path ("/contact"); the link points
// at that page in the language currently being viewed.
export function Link({ to, replace = false, onClick, target, children, ...props }) {
  const { navigate, language } = useLocation();
  const href = localizePath(to, language);

  function handleClick(event) {
    onClick?.(event);
    if (
      event.defaultPrevented
      || event.button !== 0
      || event.metaKey
      || event.ctrlKey
      || event.shiftKey
      || event.altKey
      || target === "_blank"
    ) return;
    event.preventDefault();
    navigate(href, { replace });
  }

  return <a href={href} target={target} onClick={handleClick} {...props}>{children}</a>;
}

export function NavLink({ to, className = "", children, ...props }) {
  const { route } = useLocation();
  const active = to === "/" ? route === "/" : route === to || route.startsWith(`${to}/`);
  const resolvedClassName = typeof className === "function"
    ? className({ isActive: active })
    : [className, active ? "active" : ""].filter(Boolean).join(" ");

  return (
    <Link to={to} className={resolvedClassName} aria-current={active ? "page" : undefined} {...props}>
      {children}
    </Link>
  );
}

export function Redirect({ to }) {
  const { navigate, language } = useLocation();
  useEffect(() => navigate(localizePath(to, language), { replace: true }), [language, navigate, to]);
  return null;
}
