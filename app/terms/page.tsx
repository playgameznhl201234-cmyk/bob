import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms & Conditions | PainFreeDiana",
  description:
    "The terms and conditions for using the PainFreeDiana website.",
};

/* PLACEHOLDER: drafted terms — have them reviewed by a legal professional
   before relying on them. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms &amp; conditions" updated="July 13, 2026">
      <p>
        By using this website, you agree to these terms. If you don't agree,
        please don't use the site. "We", "us", and "our" refer to{" "}
        <strong>{siteConfig.businessName}</strong> ({siteConfig.trainerName},{" "}
        {siteConfig.location}).
      </p>

      <h2>Not medical advice</h2>
      <p>
        Everything on this website — text, videos, and any programs or
        exercises described — is provided for general information only and is
        not medical advice, diagnosis, or treatment. Always consult a
        physician or qualified health professional before beginning any new
        exercise program, especially if you have an injury, pain, or a medical
        condition. Exercise carries inherent risk; you participate at your own
        risk.
      </p>

      <h2>Results vary</h2>
      <p>
        Client stories, testimonials, and results shown on this site reflect
        individual experiences. They are not a promise or guarantee of the
        results you will achieve — outcomes depend on your body, history,
        consistency, and many other factors.
      </p>

      <h2>Booking and services</h2>
      <p>
        Submitting the consultation form or booking a time requests a
        consultation; it does not by itself create a coaching agreement.
        Training services, scheduling, and payment terms are agreed separately
        before coaching begins.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on this website — including the {siteConfig.businessName}{" "}
        name, logo, text, and images — belongs to us or is used with
        permission. All rights reserved. You may not copy, reproduce, or use
        it commercially without written permission.
      </p>

      <h2>Third-party content</h2>
      <p>
        This site embeds and links to third-party platforms (such as Instagram
        and Facebook). We are not responsible for their content, availability,
        or how they handle your data — see our{" "}
        <a href="/privacy">privacy policy</a> and their own terms.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.businessName} is
        not liable for any indirect, incidental, or consequential damages
        arising from your use of this website or reliance on its content.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the Province of Saskatchewan
        and the federal laws of Canada applicable there.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time; the date above shows the
        latest revision. Continued use of the site means you accept the
        current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </LegalPage>
  );
}
