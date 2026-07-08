import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";

/* PLACEHOLDER: everything in this array is sample data. Replace the images
   with real before/after or progress photos (drop them in /public/images and
   consider switching <img> to next/image once they're real .jpg/.webp files),
   and replace `stat` / `caption` / alt text with real client outcomes.
   Remove the "Placeholder" badge in the markup below once real photos are in.
   Cards with `before`/`after` render an interactive comparison slider;
   cards with `image` render a plain photo. */
const RESULTS = [
  {
    before: "/images/placeholders/before-1.svg",
    after: "/images/placeholders/after-1.svg",
    image: undefined as string | undefined,
    alt: "Placeholder before/after comparison — swap with real client photos",
    stat: "Lost 20 lbs in 12 weeks",
    caption:
      "While training around a shoulder injury — no missed sessions, no flare-ups. Drag the slider to compare.",
  },
  {
    before: undefined as string | undefined,
    after: undefined as string | undefined,
    image: "/images/placeholders/result-2.svg",
    alt: "Placeholder progress photo — swap with a real client photo",
    stat: "Running again after 3 years of knee pain",
    caption: "From avoiding stairs to finishing a 10K race in eight months.",
  },
  {
    before: undefined as string | undefined,
    after: undefined as string | undefined,
    image: "/images/placeholders/result-3.svg",
    alt: "Placeholder progress photo — swap with a real client photo",
    stat: "Doubled her deadlift in 6 months",
    caption: "95 lbs to 185 lbs — with a back that used to ache from sitting.",
  },
];

export default function Results() {
  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="border-y border-ink/10 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
            Client results
          </p>
          <h2
            id="results-heading"
            className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
          >
            Real people, real progress
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Different bodies, different starting points — the same
            assessment-first approach.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r.stat} delay={i * 100} className="h-full">
              <figure className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm">
                <div className="relative">
                  {r.before && r.after ? (
                    <BeforeAfter
                      before={r.before}
                      after={r.after}
                      beforeAlt={`Before: ${r.alt}`}
                      afterAlt={`After: ${r.alt}`}
                    />
                  ) : (
                    <img
                      src={r.image}
                      alt={r.alt}
                      width={480}
                      height={600}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  )}
                  {/* PLACEHOLDER badge — delete this <span> once real photos are in */}
                  <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-brand-ink/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">
                    Placeholder
                  </span>
                </div>
                <figcaption className="flex flex-1 flex-col gap-2 p-6">
                  <span className="font-heading text-xl text-brand">
                    {r.stat}
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {r.caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
