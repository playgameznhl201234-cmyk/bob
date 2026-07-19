/* The figure is the real silhouette extracted from the original logo file
   (public/logo-figure.png, transparent background). The wordmark is styled
   text matching the logo's fonts/colors — swap for a full logo image export
   anytime by replacing this component's contents. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="flex items-center gap-2.5 leading-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-figure.png"
        alt=""
        aria-hidden="true"
        width={267}
        height={234}
        className="h-9 w-auto shrink-0"
      />
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
