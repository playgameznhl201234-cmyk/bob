"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#results", label: "Results" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#home"
          aria-label="PainFreeDiana — back to top"
          className="rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded px-1 py-2 text-sm font-semibold transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
                  isActive
                    ? "text-brand underline decoration-teal decoration-2 underline-offset-8"
                    : "text-ink"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Book a consultation
          </motion.a>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-brand md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobile-nav"
            id="mobile-nav"
            aria-label="Main"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-t border-ink/10 bg-cream shadow-lg md:hidden"
          >
            <div className="px-4 pb-6 pt-2">
              <ul>
                {NAV_LINKS.map((link) => {
                  const isActive = active === link.href.slice(1);
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        aria-current={isActive ? "true" : undefined}
                        className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors hover:bg-cream-deep hover:text-brand ${
                          isActive ? "text-brand" : "text-ink"
                        }`}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.97 }}
                className="mt-3 block rounded-full bg-brand px-5 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-brand-deep"
                onClick={() => setOpen(false)}
              >
                Book a consultation
              </motion.a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
