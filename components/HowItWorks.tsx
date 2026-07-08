import Reveal from "./Reveal";

const STEPS = [
  {
    title: "Assessment",
    body: "We start with a full movement screen and pain history — not a workout. Finding the root cause comes before fixing anything.",
  },
  {
    title: "Personalized plan",
    body: "You get a program built around your body, your goals, and your schedule — not a template pulled off a shelf.",
  },
  {
    title: "One-on-one coaching",
    body: "We train together in person in Saskatoon. Technique, load, and intensity are managed session by session, so you progress without setbacks.",
  },
  {
    title: "Track & progress",
    body: "We measure what matters — strength, range of motion, pain levels — and adjust the plan based on data, not guesswork.",
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
            A simple, evidence-based process — the same one every client goes
            through, adapted to where you’re starting from.
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
