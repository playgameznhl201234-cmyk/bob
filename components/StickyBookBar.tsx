"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Mobile-only "Book a free consultation" bar pinned to the bottom of the
 * screen. Appears after scrolling past the hero, and hides while the contact
 * section is on screen so it never covers the form.
 */
export default function StickyBookBar() {
  const [pastHero, setPastHero] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide while the contact form or footer is on screen so the bar never
    // covers the form or the legal text.
    const targets = ["#contact", "#site-footer"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => el !== null);
    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setEndVisible(visible.size > 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const show = pastHero && !endVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="book-bar"
          initial={{ y: 96 }}
          animate={{ y: 0 }}
          exit={{ y: 96 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-3 pt-3 backdrop-blur-md md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <a
            href="#contact"
            className="block rounded-full bg-brand px-6 py-3.5 text-center text-base font-semibold text-white shadow-lg transition-colors hover:bg-brand-deep"
          >
            Book a free consultation
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
