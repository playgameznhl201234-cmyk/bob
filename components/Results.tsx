import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";

/* Client-result videos from Instagram — paste full post/reel URLs here
   (e.g. "https://www.instagram.com/reel/ABC123xyz/"). Each renders as an
   embedded playable video below the results grid. Leave empty to hide the
   video row entirely. */
const INSTAGRAM_VIDEOS: string[] = [
  "https://www.instagram.com/p/DYkSHR8P9ws/",
  "https://www.instagram.com/p/DX4ID2YvqSy/",
  "https://www.instagram.com/p/DXmVl1Fj0Oc/",
];

function toEmbedUrl(url: string) {
  return url.replace(/\/+$/, "") + "/embed/";
}

/* PLACEHOLDER: the before/after below uses placeholder images and a sample
   stat. Swap /public/images/placeholders/before-1.svg and after-1.svg for
   real client photos (.jpg/.webp), update the stat + caption + alt text,
   and delete the visible "Placeholder" badge in the markup. */
const RESULT = {
  before: "/images/placeholders/before-1.svg",
  after: "/images/placeholders/after-1.svg",
  alt: "Placeholder before/after comparison — swap with real client photos",
  stat: "Lost 20 lbs in 12 weeks",
  caption:
    "While training around a shoulder injury — no missed sessions, no flare-ups. Drag the slider to compare.",
};

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

        <Reveal delay={100} className="mx-auto mt-12 max-w-md">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm">
            <div className="relative">
              <BeforeAfter
                before={RESULT.before}
                after={RESULT.after}
                beforeAlt={`Before: ${RESULT.alt}`}
                afterAlt={`After: ${RESULT.alt}`}
              />
              {/* PLACEHOLDER badge — delete this <span> once real photos are in */}
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-brand-ink/80 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">
                Placeholder
              </span>
            </div>
            <figcaption className="flex flex-col gap-2 p-6">
              <span className="font-heading text-xl text-brand">
                {RESULT.stat}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-soft">
                {RESULT.caption}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {INSTAGRAM_VIDEOS.length > 0 && (
          <>
            <Reveal className="mx-auto mt-16 max-w-2xl text-center">
              <h3 className="font-heading text-2xl text-brand sm:text-3xl">
                Watch it happen
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                Real training moments from{" "}
                <a
                  href="https://www.instagram.com/painfreediana/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline-offset-4 hover:underline"
                >
                  @painfreediana
                </a>{" "}
                on Instagram.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INSTAGRAM_VIDEOS.map((url, i) => (
                <Reveal key={url} delay={i * 100}>
                  <iframe
                    src={toEmbedUrl(url)}
                    title={`Client result video ${i + 1} from Instagram`}
                    loading="lazy"
                    allow="encrypted-media"
                    className="h-[560px] w-full rounded-2xl border border-ink/10 bg-white shadow-sm"
                  />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
