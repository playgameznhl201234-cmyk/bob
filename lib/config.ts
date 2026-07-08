/**
 * Central site configuration — edit contact details and service wiring here.
 */
export const siteConfig = {
  // PLACEHOLDER: swap in the real production domain once it's connected
  // (used by sitemap.xml, robots.txt, and the LocalBusiness structured data)
  url: "https://painfreediana.com",
  businessName: "PainFreeDiana",
  trainerName: "Diana Kovalenko",
  tagline: "Helping you move pain-free & live your best life",
  email: "painfreediana@gmail.com",
  location: "Saskatoon, SK, Canada",
  instagram: "https://www.instagram.com/painfreediana/",
  facebook: "https://www.facebook.com/profile.php?id=61572342303798",
  /**
   * Formspree form ID — the contact form posts to
   * https://formspree.io/f/<formspreeId>.
   *
   * Setup (see README.md for full steps):
   * 1. Create a free account at https://formspree.io with painfreediana@gmail.com
   * 2. Create a new form and copy its ID (looks like "mqkrzabc")
   * 3. Put it in .env.local as NEXT_PUBLIC_FORMSPREE_ID=mqkrzabc
   *    (and add the same env var in Vercel → Project → Settings → Environment Variables)
   */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID",
};
