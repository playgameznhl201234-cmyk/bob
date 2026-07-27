"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

// useLayoutEffect warns during SSR; fall back to useEffect on the server.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fades content in as it scrolls into view.
 *
 * Content is VISIBLE BY DEFAULT and only hidden once we've positively
 * confirmed it sits below the fold. Any uncertainty — no layout yet, no
 * IntersectionObserver, a throttled background tab, a hash link straight
 * to a section — leaves it visible. A missed animation is a nit; a
 * permanently blank section is a broken site.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(true);
  const [animate, setAnimate] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const rect = el.getBoundingClientRect();
    // A zero-height rect means layout isn't ready — leave it visible.
    if (rect.height === 0 && rect.width === 0) return;
    // Only hide what is genuinely below the fold.
    if (rect.top <= window.innerHeight * 0.92) return;

    setShown(false);
    setAnimate(true);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const reveal = () => setShown(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    observer.observe(el);

    // Backstop in case the observer never reports (throttled tab, etc.).
    const onScroll = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.95) {
        reveal();
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [animate]);

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={false}
      animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 18 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay: shown && animate ? delay / 1000 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
