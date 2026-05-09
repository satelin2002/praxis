"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
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
          Stop paying for work that should be automated.
        </h2>
        <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
          Subscribe today. Drop your first request tonight. Have it live next
          week — for less than the cost of a part-time hire.
        </p>

        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            size="xl"
            className="group shadow-lg shadow-primary/20"
          >
            <Link href="#pricing">
              Subscribe — from $2,500/mo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="xl"
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="#pricing">Compare all plans →</Link>
          </Button>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          Pause or cancel anytime · 7-day money-back guarantee · No setup fees
        </p>
      </div>
    </section>
  );
}
