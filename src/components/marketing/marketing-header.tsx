"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { BOOKING_URL, IS_BOOKING_EXTERNAL } from "@/lib/cta-targets";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#process", label: "How it works" },
  { href: "/#what-we-build", label: "What we build" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/#faq", label: "FAQ" },
] as const;

export function MarketingHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open + close on Escape.
  React.useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-background/80 backdrop-blur-xl"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-300 items-center gap-4 px-4 sm:px-6">
          <Link
            href="/"
            aria-label="Workflow Crew home"
            className="inline-flex shrink-0 items-center gap-2.5 text-foreground"
          >
            <Logo size={32} />
            <span className="font-heading text-[22px] font-bold tracking-tight">
              Workflow Crew
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <Button
              asChild
              size="sm"
              className="hidden shadow-sm sm:inline-flex"
            >
              <Link
                href={BOOKING_URL}
                target={IS_BOOKING_EXTERNAL ? "_blank" : undefined}
                rel={IS_BOOKING_EXTERNAL ? "noopener noreferrer" : undefined}
              >
                Book free audit
              </Link>
            </Button>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground md:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-xl animate-in fade-in duration-200 md:hidden"
    >
      <div className="flex h-16 w-full items-center gap-4 border-b border-border/40 px-4 sm:px-6">
        <Link
          href="/"
          onClick={onClose}
          aria-label="Workflow Crew home"
          className="inline-flex shrink-0 items-center gap-2.5 text-foreground"
        >
          <Logo size={32} />
          <span className="font-heading text-[22px] font-bold tracking-tight">
            Workflow Crew
          </span>
        </Link>

        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="ml-auto inline-flex size-9 items-center justify-center rounded-md border border-border/60 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-6 sm:px-6">
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between rounded-lg px-4 py-4 text-lg font-medium text-foreground transition-colors hover:bg-muted/40"
              >
                {item.label}
                <span
                  aria-hidden
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border/40 px-4 py-5 sm:px-6">
        <Button asChild size="xl" className="group w-full shadow-sm">
          <Link
            href={BOOKING_URL}
            target={IS_BOOKING_EXTERNAL ? "_blank" : undefined}
            rel={IS_BOOKING_EXTERNAL ? "noopener noreferrer" : undefined}
            onClick={onClose}
          >
            Book free audit
          </Link>
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Or email{" "}
          <a
            href="mailto:hello@tryworkflowcrew.com"
            onClick={onClose}
            className="text-info underline-offset-4 hover:underline"
          >
            hello@tryworkflowcrew.com
          </a>
        </p>
      </div>
    </div>
  );
}
