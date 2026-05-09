"use client";

import {
  CalendarCheck,
  Headphones,
  Inbox,
  Phone,
  Star,
  Wrench,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

const WORKFLOWS = [
  {
    icon: Phone,
    title: "Phone & call handling",
    body: "AI receptionist that answers every call, qualifies the caller, books appointments, and texts you a summary. Sounds human. Works 24/7.",
  },
  {
    icon: Inbox,
    title: "Lead capture & follow-up",
    body: "Capture leads from your website, ads, and forms. Reply in under 60 seconds. Qualify, score, and book the meeting — automatically.",
  },
  {
    icon: Headphones,
    title: "Customer support",
    body: "AI that handles tier-1 questions across email, chat, and SMS. Resolves the easy ones, escalates the rest with full context.",
  },
  {
    icon: CalendarCheck,
    title: "Appointment booking",
    body: "AI that talks to customers, checks your real calendar, books the slot, and sends confirmations and reminders. Works across channels.",
  },
  {
    icon: Star,
    title: "Review & reputation",
    body: "Automatically request reviews from happy customers, monitor incoming reviews across platforms, and draft responses for your approval.",
  },
  {
    icon: Wrench,
    title: "Custom workflow",
    body: "Got something else eating your team's time? Tell us. If it's repeatable, we can probably automate it.",
  },
] as const;

export function WhatWeBuildSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="what-we-build"
      className="relative scroll-mt-24 bg-secondary px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="What we build"
          title="Automations small businesses actually need."
          description="Six categories that cover what most businesses ask us to build first."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-5 transition-all duration-700 ease-out sm:grid-cols-2 lg:grid-cols-3",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {WORKFLOWS.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.title}
                className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {w.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {w.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
