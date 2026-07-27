"use client";

import { useEffect, useRef } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    grecaptcha?: any;
    onPfdRecaptchaLoad?: () => void;
  }
}

/**
 * Renders the real Google reCAPTCHA v2 ("I'm not a robot") widget. Loads
 * Google's script once, renders the checkbox, and reports the token to the
 * parent via onToken (null when it expires or errors).
 */
export default function Recaptcha({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onTokenRef = useRef(onToken);

  // Keep the callback ref current without touching it during render.
  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let cancelled = false;

    function renderWidget() {
      if (
        cancelled ||
        !window.grecaptcha ||
        !window.grecaptcha.render ||
        !containerRef.current ||
        widgetId.current !== null
      ) {
        return;
      }
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(null),
        "error-callback": () => onTokenRef.current(null),
      });
    }

    if (window.grecaptcha && window.grecaptcha.render) {
      renderWidget();
    } else {
      window.onPfdRecaptchaLoad = renderWidget;
      if (!document.querySelector("script[data-pfd-recaptcha]")) {
        const script = document.createElement("script");
        script.src =
          "https://www.google.com/recaptcha/api.js?onload=onPfdRecaptchaLoad&render=explicit";
        script.async = true;
        script.defer = true;
        script.setAttribute("data-pfd-recaptcha", "true");
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
    };
  }, [siteKey]);

  return <div ref={containerRef} className="min-h-[78px]" />;
}
