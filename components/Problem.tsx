import Reveal from "./Reveal";

const STRUGGLES = [
  {
    title: "You rest it — the pain comes back",
    body: "Weeks off, careful stretching, maybe a foam roller. It feels better… until you train again. Rest treats the symptom, not the cause.",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </>
    ),
  },
  {
    title: "Your progress has flat-lined",
    body: "Same weights, same routine, same nagging aches — for months. Working harder isn't the answer when the plan wasn't built for your body.",
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  },
  {
    title: "Random workouts, random results",
    body: "Programs from the internet were written for someone else's body and history. Effort without direction is how small issues become injuries.",
    icon: (
      <>
        <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
        <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
        <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
        <path d="m18 14 4 4-4 4" />
      </>
    ),
  },
];

export default function Problem() {
  return (
    <section
      aria-labelledby="problem-heading"
      className="border-y border-ink/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="problem-heading"
            className="font-heading text-3xl text-brand sm:text-4xl"
          >
            Sound familiar?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Most people don’t need more willpower. They need a plan that
            accounts for their body, their history, and their pain.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STRUGGLES.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="h-full rounded-2xl border border-ink/10 bg-cream p-7">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand"
                  aria-hidden="true"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {s.icon}
                  </svg>
                </span>
                <h3 className="mt-5 font-heading text-xl text-brand">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-ink">
            Pain isn’t a life sentence — it’s information.{" "}
            <span className="font-semibold text-brand">
              With the right assessment and a plan built around your body, you
              can train hard and feel good doing it.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
