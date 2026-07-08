/**
 * Renders the business name "PainFreeDiana" in the logo's fonts and colors —
 * use this anywhere the business name appears in copy.
 */
export default function BrandName({
  tone = "dark",
}: {
  tone?: "dark" | "light";
}) {
  return (
    <span className="inline-flex items-baseline whitespace-nowrap">
      <span
        className={`font-body font-extrabold tracking-wide ${
          tone === "light" ? "text-cream" : "text-brand"
        }`}
      >
        PainFree
      </span>
      <span
        className={`font-script font-bold ${
          tone === "light" ? "text-teal" : "text-teal-deep"
        }`}
        style={{ fontSize: "1.25em", lineHeight: 1 }}
      >
        Diana
      </span>
    </span>
  );
}
