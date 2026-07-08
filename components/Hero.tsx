"use client";

import { motion } from "motion/react";
import Reveal from "./Reveal";
import type { GoogleRating } from "@/lib/google-reviews";

function Stars() {
  return (
    <span className="flex text-amber-500" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l2.92 6.9 7.08.6-5.4 4.73 1.62 6.97L12 17.5 5.78 21.2 7.4 14.23 2 9.5l7.08-.6L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export default function Hero({
  googleRating,
}: {
  googleRating?: GoogleRating | null;
}) {
  return (
    <section id="home" aria-labelledby="hero-heading">
      <div className="mx-auto max-w-3xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            One-on-one personal training · Saskatoon &amp; online
          </p>
          <h1
            id="hero-heading"
            className="mt-5 font-heading text-4xl leading-tight text-brand sm:text-5xl md:text-6xl"
          >
            Helping you move{" "}
            <span className="whitespace-nowrap">pain-free</span>
            {" & live your best life"}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Coaching that gets to the root of your pain — so you can build
            strength that lasts, without the fear of flare-ups.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
            >
              Book a free consultation
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="w-full rounded-full border border-brand/30 px-8 py-4 text-base font-semibold text-brand transition-colors hover:border-brand hover:bg-white sm:w-auto"
            >
              See services
            </motion.a>
          </div>

          {googleRating ? (
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand"
            >
              <Stars />
              {googleRating.rating.toFixed(1)} on Google ·{" "}
              {googleRating.count} review{googleRating.count === 1 ? "" : "s"}
            </a>
          ) : (
            /* Shown until Google reviews are connected via
               GOOGLE_PLACES_API_KEY + GOOGLE_PLACE_ID (see README.md) — the
               real star rating and review count replace this automatically. */
            <p className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-ink-soft">
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full bg-teal/20 text-teal-ink"
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
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
              Free consultation · No pressure, no commitment
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
