"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky bottom bar with a single CTA. Visible below `md`.
 * Hidden by default; fades in once the user has scrolled past the hero
 * (so it doesn't compete with the hero CTAs that are already on screen),
 * and hidden again once the contact form is itself in view (so we're not
 * shouting at someone already filling it out).
 *
 * Pure CSS scroll listener via IntersectionObserver — no library, no
 * scroll spam.
 */
export function StickyMobileCta() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero =
      typeof document !== "undefined"
        ? document.querySelector("section:first-of-type")
        : null;
    const finalCta =
      typeof document !== "undefined"
        ? document.getElementById("subscribe")
        : null;
    if (!hero || !finalCta) return;

    let heroOnScreen = true;
    let finalCtaOnScreen = false;

    const update = () => {
      // Show only when hero is scrolled past AND the final CTA is not yet in view
      setVisible(!heroOnScreen && !finalCtaOnScreen);
    };

    const heroIo = new IntersectionObserver(
      ([entry]) => {
        heroOnScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0.1 },
    );
    const finalCtaIo = new IntersectionObserver(
      ([entry]) => {
        finalCtaOnScreen = entry.isIntersecting;
        update();
      },
      { threshold: 0.2 },
    );

    heroIo.observe(hero);
    finalCtaIo.observe(finalCta);

    return () => {
      heroIo.disconnect();
      finalCtaIo.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-all duration-300 ease-out md:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <Link
        href="#pricing"
        tabIndex={visible ? 0 : -1}
        className={cn(
          "group pointer-events-auto flex items-center justify-between gap-3 rounded-full bg-primary px-5 py-3.5 text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-primary/90",
        )}
      >
        <span className="flex flex-col text-left leading-tight">
          <span className="font-mono text-[11px] uppercase tracking-wider opacity-80">
            From $2,500/mo
          </span>
          <span className="text-sm font-semibold">
            Subscribe — cancel anytime
          </span>
        </span>
        <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
