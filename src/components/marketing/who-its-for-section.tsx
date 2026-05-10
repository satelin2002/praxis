"use client";

import { BriefcaseBusiness, Headphones, Landmark, Wrench } from "lucide-react";

import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

const AUDIENCES = [
  {
    icon: Headphones,
    label: "Support teams",
    detail: "Ticket triage, reply drafting, escalation, knowledge search",
  },
  {
    icon: BriefcaseBusiness,
    label: "Sales operators",
    detail: "Lead research, routing, CRM hygiene, follow-up drafting",
  },
  {
    icon: Landmark,
    label: "Legal & admin ops",
    detail: "Document review, intake, extraction, audit-ready summaries",
  },
  {
    icon: Wrench,
    label: "Services teams",
    detail: "Scheduling, intake, reporting, internal knowledge workflows",
  },
] as const;

export function WhoItsForSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      className="border-b border-border/40 bg-background px-4 py-10 sm:px-6"
      aria-label="Who Workflow Crew is for"
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-300 gap-3 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-4",
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        {AUDIENCES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex min-h-32 flex-col gap-3 rounded-xl border border-border/60 bg-card p-5 shadow-sm"
            >
              <div className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4.5" />
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {item.label}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
