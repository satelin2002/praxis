"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  BOOKING_URL,
  EMAIL_DISPLAY,
  EMAIL_URL,
  IS_BOOKING_EXTERNAL,
} from "@/lib/cta-targets";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

export function FinalCtaSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="subscribe"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-border/40 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px circle at 50% 20%, oklch(0.62 0.166 152 / 0.10), transparent 60%)",
        }}
      />

      <div
        data-fade
        className={cn(
          "mx-auto flex w-full max-w-2xl flex-col items-center gap-6 text-center transition-all duration-700 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <span className="font-mono text-xs uppercase tracking-wider text-primary">
          Ready when you are
        </span>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
          Ready to find your first automation?
        </h2>
        <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Book a free workflow audit. We&rsquo;ll look at your current workflow
          and show 3–5 places AI could save time, reduce manual work, or
          recover revenue. No commitment, no slides, no pitch deck.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="xl"
            className="group shadow-lg shadow-primary/20"
          >
            <Link
              href={BOOKING_URL}
              target={IS_BOOKING_EXTERNAL ? "_blank" : undefined}
              rel={IS_BOOKING_EXTERNAL ? "noopener noreferrer" : undefined}
            >
              Book a free workflow audit
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="xl"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="#pricing">See pricing →</Link>
          </Button>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Prefer email?{" "}
          <a
            href={EMAIL_URL}
            className="text-info underline-offset-4 hover:underline"
          >
            {EMAIL_DISPLAY}
          </a>
        </p>
      </div>
    </section>
  );
}
