"use client";

import {
  CalendarCheck,
  FileSignature,
  Inbox,
  Mail,
  Phone,
  Star,
} from "lucide-react";
import * as React from "react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface ExampleItem {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  audience: string;
  body: string;
  timeline: string;
}

/* Reframed from "Recently shipped" case studies (which named specific
   client headcounts and dollar outcomes) to illustrative example
   workflows. Same six categories, same icons, same narrative shape —
   but no fabricated subscriber outcomes, no $-amount claims, no
   shipped-in-X-days counts attributed to specific clients.
   The id="recently-shipped" stays so deep links and the footer
   anchor don't break. */
const EXAMPLES: ReadonlyArray<ExampleItem> = [
  {
    icon: Phone,
    type: "AI receptionist",
    audience: "Home & field services",
    body: "Answers every call, qualifies urgency, books from your calendar, texts you a summary.",
    timeline: "1–2 weeks",
  },
  {
    icon: Inbox,
    type: "Lead qualifier",
    audience: "Real estate, insurance, high-touch sales",
    body: "Lead in → enriched, scored, contacted in minutes, routed to the right rep.",
    timeline: "1–2 weeks",
  },
  {
    icon: Mail,
    type: "Support email triage",
    audience: "E-commerce and SaaS support",
    body: "Reads each email, drafts a reply with help-doc citations, escalates the rest with full context.",
    timeline: "1–2 weeks",
  },
  {
    icon: CalendarCheck,
    type: "Appointment booker",
    audience: "Multi-location service businesses",
    body: "Books over SMS, voice, or chat. Checks your calendar, sends confirmations, handles reschedules.",
    timeline: "1–2 weeks",
  },
  {
    icon: Star,
    type: "Review request flow",
    audience: "Local service businesses",
    body: "Asks happy customers for reviews after every job. Negative feedback routes to you privately.",
    timeline: "1 week",
  },
  {
    icon: FileSignature,
    type: "Estimate follow-up",
    audience: "Contractors, agencies, B2B sales",
    body: "Automated 24h / 3-day / 7-day follow-up — personalized to each prospect, not a blast.",
    timeline: "1–2 weeks",
  },
];

export function RecentlyShippedSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="recently-shipped"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Example workflows"
          title="What an automation looks like."
          description="Six representative workflows we build for small businesses. Outcomes are illustrative — actual results depend on call volume, lead quality, and how the workflow is configured for your business."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-4 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {EXAMPLES.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.type}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border border-l-[3px] border-l-primary bg-background p-6 shadow-sm transition-colors hover:border-primary/30 hover:border-l-primary"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                      {item.audience}
                    </span>
                  </div>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
                <p className="mt-auto pt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                  Build · {item.timeline}
                </p>
              </article>
            );
          })}
        </div>

        <p
          data-fade
          className={cn(
            "mt-10 text-center text-sm text-muted-foreground transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-4 opacity-0",
          )}
        >
          These are the common ones. We build plenty more — bring yours.
        </p>
      </div>
    </section>
  );
}
