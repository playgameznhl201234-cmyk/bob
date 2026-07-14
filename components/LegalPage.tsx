import type { ReactNode } from "react";
import Logo from "./Logo";
import { siteConfig } from "@/lib/config";

/** Shared chrome for legal pages (privacy policy, terms & conditions). */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-ink/10 bg-cream">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <a href="/" aria-label="PainFreeDiana — back to home">
            <Logo />
          </a>
          <a
            href="/"
            className="shrink-0 whitespace-nowrap text-sm font-semibold text-brand underline-offset-4 hover:underline"
          >
            ← Back<span className="hidden sm:inline"> to home</span>
          </a>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="font-heading text-3xl text-brand sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated: {updated}</p>
        <div className="prose-legal mt-8 space-y-6 leading-relaxed text-ink-soft [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-brand [&_h2]:mt-10 [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink">
          {children}
        </div>
      </main>
      <footer className="border-t border-ink/10 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-8 text-center text-xs text-ink-soft sm:px-6">
          © {new Date().getFullYear()} {siteConfig.businessName} ·{" "}
          {siteConfig.trainerName} · {siteConfig.location} · All rights
          reserved. · <a href="/privacy" className="underline">Privacy policy</a> ·{" "}
          <a href="/terms" className="underline">Terms &amp; conditions</a>
        </div>
      </footer>
    </>
  );
}
