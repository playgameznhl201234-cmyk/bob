import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | PainFreeDiana",
  description:
    "How PainFreeDiana collects, uses, and protects your personal information.",
};

/* PLACEHOLDER: this policy was drafted to match how the site actually works
   (contact form → email, Instagram embeds, no tracking cookies). Have it
   reviewed by a legal professional before relying on it, and update it if
   analytics or other services are added later. */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="July 13, 2026">
      <p>
        This policy explains what personal information{" "}
        <strong>{siteConfig.businessName}</strong> ({siteConfig.trainerName},{" "}
        {siteConfig.location}) collects through this website, how it is used,
        and the choices you have. We keep it simple because what we collect is
        simple.
      </p>

      <h2>What we collect</h2>
      <p>
        The only personal information this site collects is what you type into
        the consultation form: your name, email address, phone number,
        training preferences, and anything you add in the message field. There
        are no user accounts and no hidden data collection.
      </p>

      <h2>How we use it</h2>
      <p>
        Your details are used for one purpose: responding to your consultation
        request and communicating with you about training services. We do not
        sell, rent, or share your information with anyone for marketing.
      </p>

      <h2>How it's delivered and stored</h2>
      <p>
        Form submissions are delivered to our email inbox by{" "}
        <a
          href="https://formsubmit.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          FormSubmit
        </a>
        , a form-to-email service that processes your submission in order to
        deliver it. Depending on your choice, your request may instead be sent
        from your own email app. We keep correspondence for as long as needed
        to serve you; you can ask us to delete it at any time.
      </p>

      <h2>Cookies and embedded content</h2>
      <p>
        This site does not set tracking cookies. Some pages embed videos from
        Instagram — when those load, Meta (Instagram's parent company) may
        collect data and set cookies under{" "}
        <a
          href="https://privacycenter.instagram.com/policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          its own privacy policy
        </a>
        . Links to our Instagram and Facebook profiles take you to those
        platforms, which have their own policies.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask what information we hold about you, ask us to correct it,
        or ask us to delete it — just email{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. We
        handle personal information in line with Canada's Personal Information
        Protection and Electronic Documents Act (PIPEDA).
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed at children. Training services for minors
        are only arranged with a parent or guardian.
      </p>

      <h2>Changes</h2>
      <p>
        If our practices change (for example, if we add analytics), this page
        will be updated and the date above revised.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
    </LegalPage>
  );
}
