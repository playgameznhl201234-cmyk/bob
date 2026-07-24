"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";

const FEATURES = [
  "Full movement & pain-history assessment before any workout",
  "Hands-on technique coaching every session",
  "Load and intensity managed week to week",
  "Progress measured — strength, mobility, and pain levels",
  "Adults and youth athletes welcome",
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="border-y border-ink/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            Services
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
          >
            One-on-one coaching in Saskatoon
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Train together, face to face. Every rep is watched, every session
            adjusted to how your body is responding that day.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="mx-auto mt-12 max-w-2xl rounded-2xl border border-ink/10 bg-cream p-8 shadow-sm"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand"
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.4 14.4 9.6 9.6" />
                <path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
                <path d="m21.5 21.5-1.4-1.4" />
                <path d="M3.9 3.9 2.5 2.5" />
                <path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
              </svg>
            </span>
            <h3 className="mt-5 font-heading text-2xl text-brand">
              In-person personal training
            </h3>
            <ul className="mt-5 space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-ink"
                    aria-hidden="true"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Book in-person training
            </motion.a>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
