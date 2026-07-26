import type { Metadata, Viewport } from "next";
import { Lora, Raleway, Dancing_Script } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://painfreediana.com"),
  title: "PainFreeDiana | Personal Trainer in Saskatoon — Move Pain-Free",
  description:
    "One-on-one personal training in Saskatoon with Diana Kovalenko. Supportive strength, mobility, and return-to-training coaching — helping you move pain-free, build resilience, and thrive. Book a free consultation.",
  keywords: [
    "personal trainer Saskatoon",
    "training after injury",
    "pain-free movement",
    "mobility coach",
    "strength training Saskatoon",
  ],
  openGraph: {
    title: "PainFreeDiana | Move Pain-Free, Feel Strong & Thrive",
    description:
      "Supportive one-on-one personal training in Saskatoon focused on training after injury, mobility, and lasting strength. Book a free consultation with Diana Kovalenko.",
    type: "website",
    locale: "en_CA",
    siteName: "PainFreeDiana",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f3ea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${raleway.variable} ${dancing.variable}`}
    >
      <body className="antialiased">
        <noscript>
          {/* scroll-reveal is JS-driven — keep content visible without it */}
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
