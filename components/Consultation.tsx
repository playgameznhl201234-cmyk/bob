import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { siteConfig } from "@/lib/config";

const INCLUDED = [
  {
    title: "A 30-minute in-person assessment",
    body: "We meet face to face in Saskatoon — after you reach out, we'll text you the time and location details.",
  },
  {
    title: "Movement & pain-history assessment",
    body: "We look at how you move and where it hurts, so recommendations are based on your body — not a questionnaire.",
  },
  {
    title: "A personalized plan outline",
    body: "You leave knowing exactly what your first 4 weeks would look like, whether you train with me or not.",
  },
  {
    title: "An honest recommendation",
    body: "If personal training isn't what you need right now, I'll tell you — and point you toward what is.",
  },
];

export default function Consultation() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-ink/10 bg-cream-deep/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-teal-ink">
              Free consultation
            </p>
            <h2
              id="contact-heading"
              className="mt-3 font-heading text-3xl text-brand sm:text-4xl"
            >
              Let’s figure out what’s holding you back
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              The consultation is free, and there’s no obligation. Here’s what
              it includes:
            </p>
            <ul className="mt-8 space-y-5">
              {INCLUDED.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal-ink"
                    aria-hidden="true"
                  >
                    <svg
                      width="15"
                      height="15"
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
                    <span className="font-semibold text-ink">
                      {item.title}.
                    </span>{" "}
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <ContactForm />
            {siteConfig.bookingUrl && (
              <p className="mt-5 text-center text-sm text-ink-soft">
                Prefer to skip the form?{" "}
                <a
                  href={siteConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand underline underline-offset-4 hover:text-brand-deep"
                >
                  Book your consultation time directly
                </a>
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
