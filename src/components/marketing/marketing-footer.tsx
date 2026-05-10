import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { NewsletterForm } from "./newsletter-form";

const COLUMNS: ReadonlyArray<{
  heading: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}> = [
  {
    heading: "Product",
    links: [
      { label: "How it works", href: "/#process" },
      { label: "What we build", href: "/#what-we-build" },
      { label: "Who we work with", href: "/#who-we-work-with" },
      { label: "Why us", href: "/#why-us" },
      { label: "Example workflows", href: "/#recently-shipped" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Subscribe", href: "/#subscribe" },
      { label: "hello@buildroom.ai", href: "mailto:hello@buildroom.ai" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <div className="flex items-center gap-2.5 text-foreground">
              <Logo size={28} />
              <span className="text-xl font-bold tracking-tight">
                Buildroom
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI automation for small businesses. One flat monthly fee. Cancel
              anytime.
            </p>
            <div className="mt-2 max-w-xs">
              <NewsletterForm />
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-10 sm:grid-cols-3 lg:max-w-xl">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/40 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} buildroom.ai. All rights reserved.</p>
          <p className="text-muted-foreground/70 font-mono text-xs uppercase tracking-wider">
            Stop doing the work AI can do for you.
          </p>
        </div>

        {/* Independence disclaimer — keeps anyone reading the footer honest
            about what Buildroom is and isn't. Same line we'll surface at
            the top of /privacy and /terms. */}
        <p className="border-t border-border/40 pt-6 text-xs leading-relaxed text-muted-foreground/70">
          Buildroom is an independent business and is not affiliated with,
          sponsored by, endorsed by, or associated with Google, Alphabet, or
          any current or former employer of its founders.
        </p>
      </div>
    </footer>
  );
}
