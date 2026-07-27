"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

/**
 * A self-hosted result video. Plays inline on the site — no external link,
 * no Instagram dependency, and it can never break if a post is removed.
 *
 * Shows a branded poster with a play button until the visitor starts it,
 * then hands over to the browser's native controls.
 */
export default function ResultVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster?: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    setStarted(true);
    // Let the state flush so controls are present before playback starts.
    requestAnimationFrame(() => videoRef.current?.play());
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-ink/10 bg-brand-ink shadow-sm">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={started}
        playsInline
        preload="metadata"
        aria-label={label}
        // Hide the download / picture-in-picture items in the browser's own
        // player menu, and block right-click "Save video as".
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        // object-contain keeps the whole frame visible — the video is shown
        // exactly as filmed, never cropped or zoomed.
        className="h-full w-full object-contain"
        onPlay={() => setStarted(true)}
      />

      <AnimatePresence>
        {!started && (
          <motion.button
            type="button"
            onClick={play}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            aria-label={`Play video: ${label}`}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-brand-ink/15 transition-colors hover:bg-brand-ink/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            {poster && (
              <Image
                src={poster}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 360px"
                className="-z-10 object-contain"
              />
            )}
            <motion.span
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand shadow-lg ring-1 ring-black/5 backdrop-blur"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
