"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/config";

const FORMATS = [
  "In-person (Saskatoon)",
  "Online personal programming",
  "Not sure yet",
];

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
    `Training format: ${data.get("format") ?? ""}`,
    `Main goal: ${data.get("goal") ?? ""}`,
    `Preferred time: ${data.get("preferred_time") ?? ""}`,
    "",
    String(data.get("message") ?? ""),
  ].join("\n");
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setFirstName(String(data.get("name") ?? "").trim().split(" ")[0]);
    setStatus("sending");

    // Submissions are emailed to siteConfig.email via FormSubmit.co (no
    // account required — see lib/config.ts). If delivery fails for any
    // reason, fall back to opening the visitor's own email app with the
    // message pre-addressed and pre-filled, so no request is ever lost.
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
          onClick={() => setStatus("idle")}
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

        <div>
          <label
            htmlFor="format"
            className="mb-1.5 block text-sm font-semibold text-ink"
          >
            Training format <span aria-hidden="true">*</span>
          </label>
          <select
            id="format"
            name="format"
            required
            defaultValue=""
            className={`${inputClasses} cursor-pointer`}
          >
            <option value="" disabled>
              In-person or online?
            </option>
            {FORMATS.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
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
