"use client";

import { useState } from "react";

/**
 * Before/after image comparison slider (drag or arrow keys to compare).
 * Accessible: the whole surface is a native range input, so it works with
 * keyboard, touch, and screen readers.
 */
export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative aspect-[4/5] w-full select-none overflow-hidden">
      <img
        src={after}
        alt={afterAlt}
        width={480}
        height={600}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <img
        src={before}
        alt={beforeAlt}
        width={480}
        height={600}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        draggable={false}
      />

      <div
        className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-white shadow-[0_0_6px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-md">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 6-6 6 6 6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </span>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-ink/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand-ink/70 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream">
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Slide to compare before and after photos"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
