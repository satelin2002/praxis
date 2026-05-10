"use client";

import * as React from "react";
import { CreditCard, MessageSquare, Rocket, Wrench } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface Step {
  weeks: string;
  title: string;
  body: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STEPS: ReadonlyArray<Step> = [
  {
    weeks: "Day 1",
    title: "Subscribe.",
    body: "Pick a plan. Pay with Stripe. You're in.",
    icon: CreditCard,
  },
  {
    weeks: "Day 1",
    title: "Kickoff call.",
    body: "Short call to map your current workflow, agree on what we're building first, and align on what success looks like. Async from there — your private board, no weekly status meetings. We'll also help you set up the accounts and API keys we'll need (typically $50–$300/mo in vendor costs, paid directly).",
    icon: MessageSquare,
  },
  {
    weeks: "1–2 weeks",
    title: "We build it.",
    body: "Most automations ship in 1–2 weeks. You get progress updates async. We test against your real data before going live.",
    icon: Wrench,
  },
  {
    weeks: "Ongoing",
    title: "We run it for you.",
    body: "Once it's live, we keep it running. Bug fixes, updates, improvements — all included while you're subscribed.",
    icon: Rocket,
  },
];

export function ProcessSection() {
  const { ref, visible } = useFadeIn();
  const [activatedCount, setActivatedCount] = React.useState(0);

  const onActivate = React.useCallback((index: number) => {
    setActivatedCount((current) => Math.max(current, index + 1));
  }, []);

  return (
    <section
      ref={ref}
      id="process"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="How it works"
          title='From "we should automate this" to live in 9 days.'
          description="Subscribe, tell us what to build, watch it ship. One flat monthly fee covers building, running, and improving every automation."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "relative mx-auto mt-16 max-w-3xl transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {/* Base timeline rule */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-4 w-px bg-border md:left-6"
          />
          {/* Primary fill — grows via scaleY as each step activates */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 left-4 w-px origin-top bg-primary transition-transform duration-[900ms] ease-out md:left-6"
            style={{ transform: `scaleY(${activatedCount / STEPS.length})` }}
          />

          <ol className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <StepRow
                key={step.title}
                step={step}
                index={i}
                onActivate={onActivate}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

interface StepRowProps {
  step: Step;
  index: number;
  onActivate: (index: number) => void;
}

function StepRow({ step, index, onActivate }: StepRowProps) {
  const { ref, visible } = useFadeIn<HTMLLIElement>({
    rootMargin: "0px 0px -15% 0px",
  });
  const Icon = step.icon;

  React.useEffect(() => {
    if (visible) onActivate(index);
  }, [visible, onActivate, index]);

  return (
    <li
      ref={ref}
      className={cn(
        "relative pl-14 transition-all duration-700 ease-out md:pl-20",
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
      )}
    >
      {/* Phase number badge — sits on the timeline rule, transitions
          from muted to primary as the row activates. */}
      <div
        className={cn(
          "absolute top-0 left-0 inline-flex size-8 items-center justify-center rounded-full border bg-background font-mono text-xs font-semibold tabular-nums transition-all duration-500 ease-out md:size-12 md:text-sm",
          visible
            ? "border-primary/45 text-primary scale-100 shadow-[0_0_0_6px_oklch(0.62_0.166_152_/_0.08)]"
            : "scale-90 border-border text-muted-foreground/60 shadow-[0_0_0_0_oklch(0.62_0.166_152_/_0)]",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex flex-col gap-3">
        <div
          className={cn(
            "flex items-center gap-3 transition-all duration-500 ease-out",
            visible
              ? "translate-x-0 opacity-100 delay-100"
              : "-translate-x-2 opacity-0",
          )}
        >
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            {step.weeks}
          </span>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <Icon
            className={cn(
              "size-3.5 text-primary transition-transform duration-500 ease-out",
              visible ? "scale-100 delay-200" : "scale-75",
            )}
          />
        </div>
        <h3
          className={cn(
            "text-xl font-semibold tracking-tight text-foreground transition-all duration-500 ease-out sm:text-2xl",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-2 opacity-0",
          )}
        >
          {step.title}
        </h3>
        <p
          className={cn(
            "text-base leading-relaxed text-muted-foreground transition-all duration-500 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-2 opacity-0",
          )}
        >
          {step.body}
        </p>
      </div>
    </li>
  );
}
