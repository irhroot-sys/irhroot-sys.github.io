import { useEffect, useRef } from "react";

export function TurnstileWidget({ siteKey, onToken }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let widgetId;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetId) return;
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "quote_request",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
        theme: "light",
      });
    };

    const existingScript = document.querySelector("script[data-aalkc-turnstile]");
    if (existingScript) {
      if (window.turnstile) renderWidget();
      else existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.aalkcTurnstile = "true";
      script.addEventListener("load", renderWidget, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, siteKey]);

  return <div ref={containerRef} role="group" aria-label="Spam protection challenge" />;
}
