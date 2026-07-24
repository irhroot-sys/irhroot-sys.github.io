import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const RouterContext = createContext(null);

function readLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function RouterProvider({ children }) {
  const [location, setLocation] = useState(readLocation);

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
    setLocation(readLocation());
  }, []);

  const value = useMemo(() => ({ ...location, navigate }), [location, navigate]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  const router = useContext(RouterContext);
  if (!router) throw new Error("useLocation must be used inside RouterProvider.");
  return router;
}

export function Link({ to, replace = false, onClick, target, children, ...props }) {
  const { navigate } = useLocation();

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
    navigate(to, { replace });
  }

  return <a href={to} target={target} onClick={handleClick} {...props}>{children}</a>;
}

export function NavLink({ to, className = "", children, ...props }) {
  const { pathname } = useLocation();
  const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
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
  const { navigate } = useLocation();
  useEffect(() => navigate(to, { replace: true }), [navigate, to]);
  return null;
}
