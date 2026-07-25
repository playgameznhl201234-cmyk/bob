import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Get to know you",
    body: "We begin with a full movement screen and a conversation about your history and goals — understanding your body always comes before any workout.",
  },
  {
    title: "Your personalized plan",
    body: "You get a program shaped around your body, your goals, and your schedule — thoughtfully designed for you, never a one-size-fits-all template.",
  },
  {
    title: "Coaching by your side",
    body: "We train together, one-on-one in Saskatoon. Every session is guided and adjusted to how you're feeling, so you keep progressing with confidence.",
  },
  {
    title: "Celebrate your progress",
    body: "We track what matters — strength, mobility, how you feel — and evolve your plan as you grow, so your wins keep building.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            The method
          </p>
          <h2
            id="how-heading"
            className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
          >
            How it works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            A simple, supportive process — the same caring approach for every
            client, always meeting you exactly where you are.
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 100} className="h-full">
              <li className="h-full rounded-2xl border border-ink/10 bg-white p-7 shadow-sm">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand font-heading text-lg text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-5 font-heading text-xl text-brand">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
