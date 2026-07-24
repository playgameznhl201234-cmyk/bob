import Reveal from "./Reveal";

/* Real client testimonials. To add more, copy an entry and keep the format
   (quote + first name and last initial). */
const TESTIMONIALS = [
  {
    quote:
      "Diana has been working with my son for a few months and has shown so much improvement not only in his athletic ability but his confidence as well. She is great with kids and would highly recommend.",
    name: "Jennifer G.",
  },
  {
    quote:
      "Diana is very professional, has an individual technique for a client. 100% recommend.",
    name: "Andrei K.",
  },
  {
    quote:
      "Highly recommend Diana! My son injured his leg playing lacrosse, and Diana helped him immensely with his recovery. He is doing great now and continues to train with her to stay in top shape. Thank you so much, Diana, for your professional help and support!",
    name: "Elena S.",
  },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="pb-16 sm:pb-20">
      <h2
        id="testimonials-heading"
        className="mb-8 text-center text-sm font-bold uppercase tracking-widest text-teal-ink"
      >
        What clients say
      </h2>
      <Reveal>
        <div className="marquee" aria-label="Client testimonials">
          {/* The list is repeated so the loop is seamless; the copies are
              hidden from screen readers. */}
          <ul className="marquee-track">
            {[
              ...TESTIMONIALS,
              ...TESTIMONIALS,
              ...TESTIMONIALS,
              ...TESTIMONIALS,
            ].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= TESTIMONIALS.length || undefined}
                className="mr-4 flex w-80 shrink-0 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:w-96"
              >
                <blockquote className="flex flex-col gap-3">
                  <p className="text-[15px] leading-relaxed text-ink">
                    “{t.quote}”
                  </p>
                  <footer className="text-sm font-bold text-teal-ink">
                    — {t.name}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
