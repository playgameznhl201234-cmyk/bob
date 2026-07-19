import Image from "next/image";
import Reveal from "./Reveal";
import BrandName from "./BrandName";

const DIFFERENTIATORS = [
  {
    title: "Assessment before exercise",
    body: "Nobody gets a workout on day one. Understanding how you move — and why it hurts — comes first.",
  },
  {
    title: "Evidence over trends",
    body: "No detox teas, no six-week miracles. Just principles backed by research on pain science and strength training.",
  },
  {
    title: "Train around pain, not through it",
    body: "Pain is a signal to adjust, not a badge of honour. You'll keep making progress while your body heals.",
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <Image
              src="/images/diana.jpg"
              alt="Diana Kovalenko, personal trainer, in her Saskatoon studio"
              width={960}
              height={1120}
              className="mx-auto aspect-[6/7] w-full max-w-sm rounded-2xl border border-ink/10 object-cover shadow-sm"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
                Meet the trainer
              </p>
              <h2
                id="about-heading"
                className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
              >
                Hi, I’m Diana Kovalenko
              </h2>
              {/* PLACEHOLDER: bio below is drafted copy — have Diana review
                  and personalize it (years of experience, backstory, etc.) */}
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  I’m a Saskatoon-based personal trainer who specializes in one
                  thing: helping people who hurt get strong again. Desk workers
                  with stubborn backs, new moms rebuilding their core, adults
                  over 55 who refuse to slow down, and athletes coming back
                  from injury.
                </p>
                <p>
                  I built <BrandName /> because I kept meeting people who’d
                  been told to “just rest” or “stop lifting” — advice that
                  keeps you comfortable and keeps you weak. The research is
                  clear: the right movement, dosed correctly, is one of the
                  best treatments for persistent pain. That’s what we do here.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h3 className="mt-8 font-heading text-xl text-brand">
                What makes my approach different
              </h3>
              <ul className="mt-4 space-y-4">
                {DIFFERENTIATORS.map((d) => (
                  <li key={d.title} className="flex gap-3">
                    <span
                      className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
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
                    <p className="leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">{d.title}.</span>{" "}
                      {d.body}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
