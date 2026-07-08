"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Fades content in as it scrolls into view, powered by Motion.
 * The data-reveal attribute lets the noscript fallback in layout.tsx keep
 * content visible when JavaScript is disabled.
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
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}
