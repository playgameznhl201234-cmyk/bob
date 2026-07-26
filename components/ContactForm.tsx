"use client";

import { useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";
import SlideToVerify from "./SlideToVerify";
import Recaptcha from "./Recaptcha";

// When a reCAPTCHA site key is configured, the form uses the real Google
// reCAPTCHA (verified server-side at /api/contact). Otherwise it falls back
// to the built-in slide-to-verify check. See README "Google reCAPTCHA".
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const GOALS = [
  "Recover from an injury",
  "Live a pain-free life",
  "Move better & train smarter",
  "Build strength & real ability",
  "Something else",
];

const TIMES = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible — whatever works",
];

type Status = "idle" | "sending" | "success" | "mailto";

const inputClasses =
  "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-base text-ink placeholder:text-ink-soft/60 focus:border-brand focus:outline-2 focus:outline-offset-1 focus:outline-brand/40";

/** Compose a mailto: link to Diana's inbox from the submitted fields. */
function buildMailtoUrl(data: FormData) {
  const subject = "Free consultation request — PainFreeDiana website";
  const body = [
    `Name: ${data.get("name") ?? ""}`,
    `Email: ${data.get("email") ?? ""}`,
    `Phone: ${data.get("phone") ?? ""}`,
    `Main goal: ${data.get("goal") ?? ""}`,
    `Preferred time: ${data.get("preferred_time") ?? ""}`,
    "",
    String(data.get("message") ?? ""),
  ].join("\n");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const useRecaptcha = RECAPTCHA_SITE_KEY !== "";
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");
  const [botError, setBotError] = useState("");
  const [verified, setVerified] = useState(false); // slide-to-verify fallback
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  // When the form was rendered — used to reject instant (bot) submissions.
  const mountedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const honeypotFilled = String(data.get("_honey") ?? "").trim() !== "";
    const tooFast = Date.now() - mountedAt.current < 3000;

    // Human check: real Google reCAPTCHA when configured, otherwise the
    // built-in slide-to-verify gesture.
    if (useRecaptcha) {
      if (!recaptchaToken) {
        setBotError("Please complete the “I’m not a robot” check before sending.");
        return;
      }
    } else if (!verified) {
      setBotError("Please slide to verify you’re human before sending.");
      return;
    }
    if (honeypotFilled || tooFast) {
      setBotError(
        "Please take a moment to complete the form — if you're a person, try again and it'll go right through.",
      );
      return;
    }
    setBotError("");
    setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
    setStatus("sending");

    // reCAPTCHA path: verify + deliver on the server (/api/contact). Only a
    // real, Google-confirmed human gets an email through.
    if (useRecaptcha) {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: recaptchaToken,
            name: data.get("name"),
            email: data.get("email"),
            phone: data.get("phone"),
            goal: data.get("goal"),
            preferred_time: data.get("preferred_time"),
            message: data.get("message"),
          }),
        });
        if (res.ok) {
          setStatus("success");
          setRecaptchaToken(null);
          window.grecaptcha?.reset?.();
          form.reset();
        } else {
          window.location.href = buildMailtoUrl(data);
          setStatus("mailto");
        }
      } catch {
        window.location.href = buildMailtoUrl(data);
        setStatus("mailto");
      }
      return;
    }

    // Fallback path: email directly via FormSubmit from the browser.
    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${siteConfig.email}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        },
      );
      const result = await response.json().catch(() => null);
      if (response.ok && result && `${result.success}` === "true") {
        setStatus("success");
        setVerified(false);
        form.reset();
      } else {
        window.location.href = buildMailtoUrl(data);
        setStatus("mailto");
      }
    } catch {
      window.location.href = buildMailtoUrl(data);
      setStatus("mailto");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-teal-deep/30 bg-white p-10 text-center shadow-sm"
      >
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/20 text-teal-ink"
          aria-hidden="true"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h3 className="font-heading text-2xl text-brand">
          Thanks{firstName ? `, ${firstName}` : ""}!
        </h3>
        <p className="max-w-sm leading-relaxed text-ink-soft">
          Your request is in. I’ll get back to you within one business day to
          set up your free consultation.
        </p>
        <button
          type="button"
          onClick={() => {
            setVerified(false);
            setStatus("idle");
          }}
          className="mt-2 cursor-pointer text-sm font-semibold text-brand underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8"
      aria-label="Book a free consultation"
    >
      {/* FormSubmit extras: subject line for the notification email +
          honeypot field for spam protection */}
      <input
        type="hidden"
        name="_subject"
        value="New consultation request — PainFreeDiana website"
      />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClasses}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(306) 555-0123"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="goal"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Main goal <span aria-hidden="true">*</span>
            </label>
            <select
              id="goal"
              name="goal"
              required
              defaultValue=""
              className={`${inputClasses} cursor-pointer`}
            >
              <option value="" disabled>
                Choose a goal…
              </option>
              {GOALS.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="preferred-time"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Preferred time <span aria-hidden="true">*</span>
            </label>
            <select
              id="preferred-time"
              name="preferred_time"
              required
              defaultValue=""
              className={`${inputClasses} cursor-pointer`}
            >
              <option value="" disabled>
                Choose a time…
              </option>
              {TIMES.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Anything else?{" "}
            <span className="font-normal text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Injuries, pain history, questions — anything you'd like me to know."
            className={inputClasses}
          />
        </div>

        {useRecaptcha ? (
          <Recaptcha siteKey={RECAPTCHA_SITE_KEY} onToken={setRecaptchaToken} />
        ) : (
          <SlideToVerify onVerifiedChange={setVerified} />
        )}

        {botError && (
          <p
            role="alert"
            className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-medium leading-relaxed text-amber-800"
          >
            {botError}
          </p>
        )}

        {status === "mailto" && (
          <p
            role="status"
            className="rounded-lg border border-teal-deep/30 bg-teal/10 px-4 py-3 text-sm font-medium leading-relaxed text-teal-ink"
          >
            Your email app should have opened with your request addressed to{" "}
            <span className="font-semibold">{siteConfig.email}</span> — just
            press send. If it didn’t open, email me directly at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold underline underline-offset-2"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full cursor-pointer rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Request my free consultation"}
        </button>

        <p className="text-center text-xs leading-relaxed text-ink-soft">
          No spam, no sales pressure — your details are only used to get back
          to you about the consultation. See our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 hover:text-brand"
          >
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
