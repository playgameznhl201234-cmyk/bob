"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const DISMISS_KEY = "pfd-consult-popup-dismissed";

/**
 * A gentle, dismissible invitation to book a consultation. Appears once the
 * visitor has scrolled past the hero, only if they haven't dismissed or
 * booked before (remembered in localStorage). Desktop only — on mobile the
 * sticky book bar already fills this role.
 */
export default function ConsultPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY)) return;

    const reveal = () => {
      if (window.scrollY > 900) {
        setShow(true);
        window.removeEventListener("scroll", reveal);
      }
    };
    window.addEventListener("scroll", reveal, { passive: true });
    // Fallback: show after 18s even if they haven't scrolled much.
    const timer = window.setTimeout(() => setShow(true), 18000);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          key="consult-popup"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          role="dialog"
          aria-label="Book a free consultation"
          className="fixed bottom-6 right-6 z-40 hidden w-80 rounded-2xl border border-ink/10 bg-white p-6 shadow-xl md:block"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-deep hover:text-ink"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            Free consultation
          </p>
          <h2 className="mt-2 font-heading text-xl text-brand">
            Ready to feel your best?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Let’s start with a friendly, no-pressure chat about where you are
            and where you’d love to be.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={dismiss}
            className="mt-4 block rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep"
          >
            Book my free consultation
          </motion.a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
