import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import Results from "@/components/Results";
import CtaBanner from "@/components/CtaBanner";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Consultation from "@/components/Consultation";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import StickyBookBar from "@/components/StickyBookBar";
import { siteConfig } from "@/lib/config";
import { getGoogleRating } from "@/lib/google-reviews";

/* LocalBusiness structured data — helps Google surface the site for local
   searches like "personal trainer Saskatoon". Once there are real Google
   reviews, this is also where an aggregateRating could be added. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.businessName,
  description:
    "One-on-one personal training in Saskatoon focused on injury recovery, mobility, and strength.",
  url: siteConfig.url,
  email: siteConfig.email,
  founder: {
    "@type": "Person",
    name: siteConfig.trainerName,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Saskatoon",
    addressRegion: "SK",
    addressCountry: "CA",
  },
  sameAs: [siteConfig.instagram, siteConfig.facebook],
};

export default async function Home() {
  const googleRating = await getGoogleRating();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero googleRating={googleRating} />
        <Testimonials />
        <Problem />
        <HowItWorks />
        <Services />
        <Results />
        <CtaBanner />
        <About />
        <FAQ />
        <Consultation />
      </main>
      <Footer />
      <StickyBookBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
