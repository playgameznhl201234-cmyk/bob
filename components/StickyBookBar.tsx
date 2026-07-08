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
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const contact = document.querySelector("#contact");
    let observer: IntersectionObserver | undefined;
    if (contact) {
      observer = new IntersectionObserver(
        (entries) => setContactVisible(entries[0].isIntersecting),
        { rootMargin: "0px 0px -15% 0px" },
      );
      observer.observe(contact);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const show = pastHero && !contactVisible;

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
