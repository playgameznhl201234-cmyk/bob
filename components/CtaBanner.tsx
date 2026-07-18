"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

/** Post-social-proof call to action, placed after the results section. */
export default function CtaBanner() {
  return (
    <section aria-label="Book a consultation" className="bg-brand">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16">
        <Reveal>
          <h2 className="font-heading text-3xl text-white sm:text-4xl">
            Ready to move without pain?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-cream/90">
            The first step is a free, no-pressure conversation about where you
            are and where you want to be.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-7 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-brand shadow-md transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book your free consultation
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
