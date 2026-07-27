import Reveal from "./Reveal";
import BeforeAfter from "./BeforeAfter";
import ResultVideo from "./ResultVideo";

/* Client-result videos.
 *
 * Two kinds are supported:
 *
 *   { file: "/videos/name.mp4", poster: "/videos/name.jpg", label: "..." }
 *     Self-hosted — plays inline on the site, loads fast, no Instagram
 *     branding, and can never break. Preferred.
 *
 *   { instagram: "https://www.instagram.com/p/SHORTCODE/" }
 *     Instagram embed. Note: Instagram only ships a working player for
 *     some post types — others render a "Watch on Instagram" button that
 *     sends visitors off-site. Always check a new link before adding it.
 *
 * Leave the array empty to hide the video row entirely.
 */
type ResultClip =
  | { file: string; poster?: string; label: string; instagram?: never }
  | { instagram: string; file?: never; poster?: never; label?: never };

const VIDEOS: ResultClip[] = [
  {
    file: "/videos/progression.mp4",
    poster: "/videos/progression.jpg",
    label: "Before and after: seated good morning, squat, split squat and more",
  },
  {
    file: "/videos/ankle-to-lacrosse.mp4",
    poster: "/videos/ankle-to-lacrosse.jpg",
    label: "Client result: from ankle pain to playing lacrosse confidently",
  },
  {
    file: "/videos/youth-athlete.mp4",
    poster: "/videos/youth-athlete.jpg",
    label: "A young athlete talks about recovering from wrist pain and getting faster",
  },
];

function toEmbedUrl(url: string) {
  return url.replace(/\/+$/, "") + "/embed/";
}

const RESULT = {
  before: "/images/result-before.jpg",
  after: "/images/result-after.jpg",
  beforeAlt:
    "Client performing a seated good morning with a light dumbbell at the start of training",
  afterAlt:
    "The same client performing a barbell seated good morning with Diana coaching alongside",
  stat: "Seated good morning progression",
  caption:
    "From a light dumbbell and a cautious hinge to a loaded barbell with confident control. Drag the slider to compare.",
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
            Different bodies, different starting points — every one supported
            with care, patience, and a plan made just for them.
          </p>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-md">
          <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-cream shadow-sm">
            <BeforeAfter
              before={RESULT.before}
              after={RESULT.after}
              beforeAlt={RESULT.beforeAlt}
              afterAlt={RESULT.afterAlt}
            />
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

        {VIDEOS.length > 0 && (
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
              {VIDEOS.map((clip, i) => (
                <Reveal key={clip.file ?? clip.instagram} delay={i * 100}>
                  {clip.file ? (
                    <ResultVideo
                      src={clip.file}
                      poster={clip.poster}
                      label={clip.label}
                    />
                  ) : (
                    <iframe
                      src={toEmbedUrl(clip.instagram!)}
                      title={`Client result video ${i + 1} from Instagram`}
                      loading="lazy"
                      allow="encrypted-media"
                      className="h-[560px] w-full rounded-2xl border border-ink/10 bg-white shadow-sm"
                    />
                  )}
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
