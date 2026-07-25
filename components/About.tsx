import Image from "next/image";
import Reveal from "./Reveal";
import BrandName from "./BrandName";

const DIFFERENTIATORS = [
  {
    title: "Understanding you first",
    body: "Nobody gets a workout on day one. We start by understanding how you move and what your body needs, so everything after fits you.",
  },
  {
    title: "Grounded in what works",
    body: "No quick fixes or fleeting trends — just caring, thoughtful coaching grounded in solid principles of movement and strength.",
  },
  {
    title: "Working with your body",
    body: "We work with your body, not against it. You'll keep making steady, sustainable progress while feeling supported the whole way.",
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
                  thing: helping people who hurt get strong again. Young
                  athletes rebuilding after an injury, desk workers with
                  stubborn backs, new moms rebuilding their core, and adults
                  over 55 who refuse to slow down.
                </p>
                <p>
                  A lot of my work is with teens and youth athletes — coming
                  back from a sports injury, or building the strength and
                  movement quality that prevents the next one. Parents tell me
                  the confidence their kids gain matters as much as the
                  physical progress.
                </p>
                <p>
                  I built <BrandName /> because I kept meeting people who’d
                  been told to simply “rest” or “stop” — and who deserved so
                  much more. I believe the right movement, guided with care, is
                  one of the most powerful ways to feel better, grow stronger,
                  and trust your body again. That’s what we do here.
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
