"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import { useCounter, useFadeIn } from "./utils";

/**
 * Defensible numbers — placeholders, swap before launch.
 *
 * Format choices:
 *  - Big numerals use Inter (the body font) at display size with
 *    `tabular-nums` + `font-feature-settings: "tnum"`. Inter's
 *    tabular figures are sharp at 80–120px and align across rows.
 *  - The unit/suffix sits inline at a smaller size in the same blue
 *    accent, drawing the eye to the numeral itself.
 *  - The label below uses the existing mono eyebrow style for
 *    visual continuity with the rest of the page.
 */

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  detail: string;
}

const STATS: ReadonlyArray<Stat> = [
  {
    value: 8,
    suffix: " wks",
    label: "Median time to production",
    detail:
      "From signed scope to live agent — including evals, observability, and runbook. Across the last six build engagements.",
  },
  {
    value: 94,
    suffix: "%",
    label: "Eval pass-rate at launch",
    detail:
      "Average eval score across our regression suite the day each agent shipped. Measured on the same dataset used in development.",
  },
  {
    value: 0,
    suffix: "",
    label: "Silent prod failures",
    detail:
      "Failures that reached real users before our observability caught them. Since we started shipping production agents in 2024.",
  },
];

export function StatsSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="stats"
      className="dark relative scroll-mt-24 border-y border-border bg-background px-4 py-20 text-foreground sm:px-6 sm:py-28"
    >
      <div className="mx-auto w-full max-w-300">
        <div
          data-fade
          className={cn(
            "mx-auto flex max-w-2xl flex-col items-center gap-3 text-center transition-all duration-700 ease-out",
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Workflow Crew in numbers
          </span>
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            What &ldquo;production-grade&rdquo; actually looks like.
          </h2>
        </div>

        <div
          data-fade
          className={cn(
            "mt-14 grid gap-x-10 gap-y-12 transition-all duration-700 ease-out md:grid-cols-3",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {STATS.map((s) => (
            <StatBlock key={s.label} stat={s} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBlock({ stat, visible }: { stat: Stat; visible: boolean }) {
  const value = useCounter(stat.value, visible, 1400);

  return (
    <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
      <div className="flex items-baseline gap-1 leading-none">
        <span
          className="font-sans text-6xl font-extrabold tracking-tight text-foreground tabular-nums sm:text-7xl"
          style={{ fontFeatureSettings: "'tnum', 'cv11'" }}
        >
          {value}
        </span>
        {stat.suffix ? (
          <span
            className="text-3xl font-semibold tracking-tight text-primary tabular-nums sm:text-4xl"
            style={{ fontFeatureSettings: "'tnum'" }}
          >
            {stat.suffix}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-1.5 md:items-start">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
          {stat.label}
        </span>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
          {stat.detail}
        </p>
      </div>
    </div>
  );
}
