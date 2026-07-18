"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "./Reveal";

/* PLACEHOLDER: drafted answers — have Diana review the wording, and add the
   gym / training location to the last answer once confirmed. */
const FAQS = [
  {
    question: "Do I need to be fit before I start?",
    answer:
      "No — that's like cleaning the house before the cleaner comes. The assessment meets you exactly where you are today, and the program starts from there.",
  },
  {
    question: "I'm in pain right now. Can I still train?",
    answer:
      "In most cases, yes — training around pain (not through it) is exactly what I specialize in. And if something needs medical attention first, I'll tell you honestly and point you to the right professional.",
  },
  {
    question: "What happens in the free consultation?",
    answer:
      "Thirty minutes, in person in Saskatoon: we talk through your pain history and goals, look at how you move, and you leave with an outline of what your first four weeks would look like — whether or not we end up working together.",
  },
  {
    question: "How much does coaching cost?",
    answer:
      "It depends on how often we train, so I cover exact numbers in the consultation — no pressure, no upselling.",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <li className="border-b border-ink/10 last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-semibold text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:text-lg"
        >
          {question}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-12 leading-relaxed text-ink-soft">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-ink/10 bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            Common questions
          </p>
          <h2
            id="faq-heading"
            className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
          >
            Frequently asked questions
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <ul className="mt-10">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={i}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
