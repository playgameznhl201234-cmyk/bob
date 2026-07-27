"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  animate,
} from "motion/react";

/**
 * Before/after comparison slider.
 *
 * Motion is spring-smoothed: the pointer sets a target and the visible
 * divider eases toward it, so dragging feels fluid rather than snapping
 * pixel-to-pixel. Drag anywhere on the image, or use the keyboard (the
 * handle is a real focusable control with arrow-key support).
 *
 * On first scroll into view the divider performs a short sweep so visitors
 * can see it's interactive — skipped for reduced-motion users.
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
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, amount: 0.4 });
  const [dragging, setDragging] = useState(false);
  const hinted = useRef(false);

  // Raw target (0–100) and the spring-smoothed value the UI actually uses.
  const target = useMotionValue(50);
  const pos = useSpring(target, { stiffness: 320, damping: 34, mass: 0.5 });

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  // Labels fade out as the divider approaches them.
  const beforeLabelOpacity = useTransform(pos, [12, 26], [0, 1]);
  const afterLabelOpacity = useTransform(pos, [74, 88], [1, 0]);

  // One-time hint sweep when the card first scrolls into view.
  useEffect(() => {
    if (!inView || hinted.current) return;
    hinted.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const controls = animate(target, [50, 68, 34, 50], {
      duration: 2.4,
      ease: "easeInOut",
      delay: 0.35,
    });
    return () => controls.stop();
  }, [inView, target]);

  function setFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    target.set(Math.max(0, Math.min(100, pct)));
  }

  function nudge(delta: number) {
    target.set(Math.max(0, Math.min(100, target.get() + delta)));
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        // Ignore secondary buttons; start dragging from anywhere on the image.
        if (e.button !== 0 && e.pointerType === "mouse") return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setDragging(true);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) setFromClientX(e.clientX);
      }}
      onPointerUp={(e) => {
        setDragging(false);
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => setDragging(false)}
      className={`group relative aspect-[3/4] w-full touch-pan-y select-none overflow-hidden ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* AFTER — the full-width base layer */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(max-width: 640px) 100vw, 480px"
        className="pointer-events-none object-cover"
        priority={false}
        draggable={false}
      />

      {/* BEFORE — clipped to the divider */}
      <motion.div
        style={{ clipPath: clip }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(max-width: 640px) 100vw, 480px"
          className="object-cover"
          draggable={false}
        />
      </motion.div>

      {/* Labels */}
      <motion.span
        style={{ opacity: beforeLabelOpacity }}
        className="pointer-events-none absolute left-3 top-3 rounded-full bg-brand-ink/75 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cream backdrop-blur-sm"
      >
        Before
      </motion.span>
      <motion.span
        style={{ opacity: afterLabelOpacity }}
        className="pointer-events-none absolute right-3 top-3 rounded-full bg-teal-deep/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm"
      >
        After
      </motion.span>

      {/* Divider line + handle */}
      <motion.div
        style={{ left }}
        className="pointer-events-none absolute bottom-0 top-0 z-10 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.45)]"
      >
        <motion.button
          type="button"
          animate={{ scale: dragging ? 1.12 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              nudge(-5);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              nudge(5);
            } else if (e.key === "Home") {
              e.preventDefault();
              target.set(0);
            } else if (e.key === "End") {
              e.preventDefault();
              target.set(100);
            }
          }}
          aria-label="Comparison slider — use the arrow keys to compare before and after"
          className="pointer-events-auto absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white/95 text-brand shadow-lg ring-1 ring-black/5 backdrop-blur transition-shadow group-hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:cursor-grabbing"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m14 7 5 5-5 5" />
            <path d="m10 17-5-5 5-5" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Hint chip — fades away once the visitor takes over */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: dragging ? 0 : 1, y: dragging ? 8 : 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-ink/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream backdrop-blur-sm"
      >
        Drag to compare
      </motion.span>
    </div>
  );
}
