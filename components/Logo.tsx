/* The logo mark: the lunge figure from the original logo file, extracted
   with a transparent background (public/logo.png). The same artwork is used
   for the browser-tab icon (app/icon.png) and the Apple touch icon.

   The `tone="light"` variant is used on the dark footer. */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.png"
      alt="PainFreeDiana"
      width={268}
      height={246}
      className={`h-11 w-auto sm:h-12 ${
        tone === "light" ? "brightness-0 invert" : ""
      }`}
    />
  );
}
