"use client";

import { CalendarClock, PhoneOff, TrendingDown, Users } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

const PROBLEMS = [
  {
    icon: PhoneOff,
    title: "You're losing money to missed work.",
    body: "Calls go unanswered. Leads sit cold. Customers wait. Every missed touchpoint is revenue walking to a competitor.",
  },
  {
    icon: Users,
    title: "Hiring isn't the answer.",
    body: "A full-time receptionist runs $40K–$60K. A junior ops hire runs $50K–$80K. An AI engineer is $250K+. Buildroom replaces most of that work for $30K/year, flat — no benefits, no payroll tax, no churn risk.",
  },
  {
    icon: TrendingDown,
    title: "The cost of doing nothing.",
    body: "Every missed call is a lost job — typically $300 to $2,000 for a service business. Every cold lead is a deal that closed somewhere else. The work AI could be doing isn't free if it isn't getting done.",
  },
  {
    icon: CalendarClock,
    title: "You don't have time for a 6-month project.",
    body: "Big agencies sell big engagements. You need something live this month, not next quarter.",
  },
] as const;

export function ProblemSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="problem"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="The pattern we keep seeing"
          title="You're running a business, not an AI lab."
          description="Four reasons small businesses don't have the AI help they should."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-4 transition-all duration-700 ease-out sm:grid-cols-2",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {PROBLEMS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
