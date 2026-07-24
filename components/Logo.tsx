/* The real logo (figure + wordmark) extracted from the original file with a
   transparent background: public/logo.png. The same artwork is used for the
   browser-tab icon (app/icon.png) so the site and tab match.

   The `tone="light"` variant is used on the dark footer — the logo's own
   colours stay readable there, so it renders the same image. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="PainFreeDiana"
      width={528}
      height={246}
      className={`h-10 w-auto sm:h-11 ${
        tone === "light" ? "brightness-0 invert" : ""
      }`}
    />
  );
}
