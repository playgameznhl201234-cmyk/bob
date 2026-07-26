"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "motion/react";

const HANDLE = 48; // px

/**
 * Drag-to-verify human check. The visitor must physically slide the handle
 * across the track — a real gesture with movement, not a one-click checkbox
 * a bot can auto-tick. Fully keyboard-accessible (focus the handle, then
 * arrow-right / Enter / Space completes it). Paired with the honeypot and
 * timing guards in ContactForm for layered spam protection.
 */
export default function SlideToVerify({
  onVerifiedChange,
}: {
  onVerifiedChange: (verified: boolean) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [verified, setVerified] = useState(false);

  const fillWidth = useTransform(x, (v) => v + HANDLE);
  const promptOpacity = useTransform(x, [0, 90], [1, 0]);

  function maxX() {
    const track = trackRef.current;
    return track ? track.offsetWidth - HANDLE - 8 : 0;
  }

  function complete() {
    if (verified) return;
    setVerified(true);
    onVerifiedChange(true);
    animate(x, maxX(), { type: "spring", stiffness: 400, damping: 32 });
  }

  function reset() {
    setVerified(false);
    onVerifiedChange(false);
    animate(x, 0, { type: "spring", stiffness: 500, damping: 34 });
  }

  function handleDragEnd() {
    if (verified) return;
    if (x.get() >= maxX() * 0.9) complete();
    else animate(x, 0, { type: "spring", stiffness: 500, damping: 34 });
  }

  return (
    <div
      ref={trackRef}
      className={`relative flex h-14 select-none items-center overflow-hidden rounded-full border px-1 transition-colors ${
        verified
          ? "border-teal-deep/40 bg-teal/15"
          : "border-ink/20 bg-cream"
      }`}
    >
      {/* progress fill */}
      <motion.div
        aria-hidden="true"
        style={{ width: fillWidth }}
        className={`absolute left-0 top-0 h-full rounded-full ${
          verified ? "bg-teal/25" : "bg-brand/10"
        }`}
      />

      {/* prompt / verified label */}
      {verified ? (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-teal-ink">
          Verified — thank you!
        </span>
      ) : (
        <motion.span
          style={{ opacity: promptOpacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center pl-8 text-sm font-medium text-ink-soft"
        >
          Slide to verify you’re human →
        </motion.span>
      )}

      {/* draggable handle */}
      <motion.button
        type="button"
        drag={verified ? false : "x"}
        dragConstraints={trackRef}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileTap={{ scale: 0.96 }}
        onKeyDown={(e) => {
          if (verified) return;
          if (["ArrowRight", "Enter", " ", "Spacebar"].includes(e.key)) {
            e.preventDefault();
            complete();
          }
        }}
        aria-label={
          verified
            ? "Verified as human"
            : "Slide or press arrow-right to verify you are human"
        }
        className="relative z-10 flex h-12 w-12 shrink-0 cursor-grab items-center justify-center rounded-full bg-white text-brand shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:cursor-grabbing"
      >
        {verified ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-ink"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        )}
      </motion.button>

      {/* hidden control so a parent form reset can re-lock the slider */}
      {verified && (
        <button
          type="button"
          onClick={reset}
          className="sr-only"
          aria-label="Reset verification"
          data-slide-reset
        />
      )}
    </div>
  );
}
