import Logo from "./Logo";
import BrandName from "./BrandName";
import { siteConfig } from "@/lib/config";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-brand-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {siteConfig.tagline}. One-on-one personal training in{" "}
              {siteConfig.location.split(",")[0]}, focused on injury recovery,
              mobility, and strength.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-cream/80 transition-colors hover:text-teal"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-cream/80">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {siteConfig.location}
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PainFreeDiana on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-teal hover:text-teal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PainFreeDiana on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition-colors hover:border-teal hover:text-teal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-teal">
              Quick links
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-cream/80 transition-colors hover:text-teal"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-center">
          <p className="text-xs text-cream/60">
            © {new Date().getFullYear()} <BrandName tone="light" /> ·{" "}
            {siteConfig.trainerName} · {siteConfig.location} · All rights
            reserved.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-cream/45">
            The content on this website is provided for general information
            only and is not medical advice. Always consult a qualified health
            professional before beginning any new exercise program.
          </p>
        </div>
      </div>
    </footer>
  );
}
