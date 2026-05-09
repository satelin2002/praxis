"use client";

import { Code2, Gauge, KeyRound, Receipt } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

const PILLARS = [
  {
    icon: Code2,
    title: "Engineers, not contractors.",
    body: "The person who builds your automation is the same person you're subscribing to. No junior pass-through, no offshore handoff.",
  },
  {
    icon: Gauge,
    title: "Production-grade by default.",
    body: "Built by engineers from Google. Real monitoring, real error handling, real reliability — not a demo that breaks the first week.",
  },
  {
    icon: KeyRound,
    title: "You own everything. Literally.",
    body: "Your automations run on your infrastructure, with your API keys, on your accounts. We deploy and maintain — but nothing lives on our servers. No platform lock-in, no hostage data. If you ever leave, your automations keep running. We just stop maintaining them.",
  },
  {
    icon: Receipt,
    title: "No contracts. No surprises.",
    body: "Flat monthly fee. Pause or cancel anytime. No setup costs, no hidden charges, no per-call pricing nonsense.",
  },
] as const;

export function ApproachSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="why-us"
      className="relative scroll-mt-24 bg-secondary px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Why us"
          title="Built by senior engineers. Priced for small businesses."
          description="Four things that show up in every subscription we deliver. None of them are slogans — they're how the work actually happens."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-5 transition-all duration-700 ease-out md:grid-cols-2",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <article
                key={p.title}
                className="relative flex flex-col gap-4 rounded-xl border border-border bg-background p-7 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
