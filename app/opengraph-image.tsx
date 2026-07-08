import { ImageResponse } from "next/og";

/* Social share image (Open Graph / Twitter cards), generated at build time
   with the site's brand fonts. PLACEHOLDER: once you have the real logo and
   a good photo, consider replacing this generated card with a designed
   1200x630 image — just drop opengraph-image.png into /app and delete this
   file. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "PainFreeDiana — Helping you move pain-free & live your best life";

const WORDMARK = "PAIN FREE";
const SCRIPT = "Diana";
const TAGLINE = "Helping you move pain-free & live your best life";
const SUBLINE = "One-on-one personal training · Saskatoon";

/** Fetch a subsetted TTF from Google Fonts (satori can't use woff2). */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) throw new Error(`No TTF source found for ${family}`);
  const response = await fetch(match[1]);
  if (!response.ok) throw new Error(`Failed to fetch font for ${family}`);
  return response.arrayBuffer();
}

type FontOption = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 700 | 800;
  style: "normal";
};

export default async function OpengraphImage() {
  let fonts: FontOption[] | undefined;
  try {
    const [raleway, dancing, lora] = await Promise.all([
      loadGoogleFont("Raleway", 800, WORDMARK),
      loadGoogleFont("Dancing Script", 700, SCRIPT),
      loadGoogleFont("Lora", 500, TAGLINE + SUBLINE),
    ]);
    fonts = [
      { name: "Raleway", data: raleway, weight: 800, style: "normal" },
      { name: "Dancing Script", data: dancing, weight: 700, style: "normal" },
      { name: "Lora", data: lora, weight: 500, style: "normal" },
    ];
  } catch {
    // No network at build time — render with the default font instead.
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f3ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Raleway",
              fontSize: 58,
              fontWeight: 800,
              color: "#1d6fa5",
              letterSpacing: 6,
            }}
          >
            {WORDMARK}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Dancing Script",
              fontSize: 78,
              fontWeight: 700,
              color: "#0f8c81",
            }}
          >
            {SCRIPT}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#2fd5c8",
            marginTop: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontFamily: "Lora",
            fontSize: 42,
            color: "#22333e",
            marginTop: 36,
            maxWidth: 900,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {TAGLINE}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Lora",
            fontSize: 26,
            color: "#51626d",
            marginTop: 28,
          }}
        >
          {SUBLINE}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
