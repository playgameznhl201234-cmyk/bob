/* PLACEHOLDER: the figure below is a hand-drawn vector recreation of the
   logo's lunge-stretch silhouette (the original file wasn't available as a
   transparent asset). Once you export the real logo as SVG/transparent PNG,
   drop it in /public (e.g. logo.svg) and replace the <svg> + wordmark with:
   <Image src="/logo.svg" alt="PainFreeDiana" width={190} height={52} /> */

function FigureMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="33" cy="11" r="7.5" fill="currentColor" />
      <path
        d="M37 5c3-2.5 6-2 8 .5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M32 21c-3 6.5-6 12-7 20"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M31 26c4 7 8 13 12 21"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M25 41c-5 4-8 9-9 14"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M16 56c6 2.5 12 2.5 17 1.5"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M26 44c15 9.5 33 12 52 11"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <rect x="74" y="49" width="16" height="9" rx="4.5" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-2.5 leading-none">
      <FigureMark className="h-9 w-auto shrink-0 text-teal" />
      <span className="flex items-baseline gap-2">
        <span
          className={`whitespace-nowrap font-body text-lg font-extrabold uppercase tracking-wider ${
            tone === "light" ? "text-cream" : "text-brand"
          }`}
        >
          Pain Free
        </span>
        <span
          className={`font-script text-2xl font-bold ${
            tone === "light" ? "text-teal" : "text-teal-deep"
          }`}
        >
          Diana
        </span>
      </span>
    </span>
  );
}
