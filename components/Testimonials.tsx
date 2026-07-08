import Reveal from "./Reveal";

/* PLACEHOLDER: all 7 quotes below are realistic placeholders — replace each
   `quote` and `name` with real client testimonials before launch. */
const TESTIMONIALS = [
  {
    quote:
      "After two years of back pain, I deadlifted 200 lbs pain-free last month. Diana rebuilt me from the ground up.",
    name: "Sarah M.",
  },
  {
    quote:
      "I came to Diana after a knee injury, terrified to squat again. Now it's my favourite lift.",
    name: "James T.",
  },
  {
    quote:
      "She actually explains the why behind every exercise. No gimmicks, no fads — just steady progress.",
    name: "Priya K.",
  },
  {
    quote:
      "Postpartum, I didn't recognize my own body. Six months later I'm stronger than before pregnancy.",
    name: "Emily R.",
  },
  {
    quote:
      "At 62 I'd accepted stiffness as permanent. Diana proved me wrong within a couple of months.",
    name: "Walter P.",
  },
  {
    quote:
      "My desk-job shoulders were wrecked. Three months in, I'm pain-free at the keyboard and in the gym.",
    name: "Alex D.",
  },
  {
    quote:
      "Diana spotted a movement issue two other professionals had missed. Worth every single session.",
    name: "Megan L.",
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
          <ul className="marquee-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <li
                key={i}
                aria-hidden={i >= TESTIMONIALS.length || undefined}
                className="mr-4 w-80 shrink-0 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
              >
                <blockquote className="flex h-full flex-col justify-between gap-4">
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
