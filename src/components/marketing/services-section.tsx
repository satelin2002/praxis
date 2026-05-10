"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface Include {
  text: string;
  subtext?: string;
  emphasized?: boolean;
}

interface Tier {
  id: "pilot" | "starter" | "growth";
  name: string;
  pitch: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  cta: string;
  highlight?: boolean;
  includes: ReadonlyArray<Include>;
}

/* Three tiers, escalating commitment:
 *   Pilot   — one-time, low-friction first build (anchor for cold buyers)
 *   Starter — $2,500/mo, the most-popular highlight; this is where most
 *             subscribers actually land and where we'll quote on calls
 *   Growth  — $4,500/mo, upgrade for teams ready to automate seriously
 *
 * Scale ($8,500/mo) was removed — it overstated capacity for stage zero
 * and made the page feel agency-tier rather than productized. Add back
 * later when there's demand from existing subscribers asking for it. */
const TIERS: ReadonlyArray<Tier> = [
  {
    id: "pilot",
    name: "Pilot",
    pitch: "Try us with one automation. No commitment to subscribe.",
    tagline: "Lowest-friction way to start. See us ship before you go monthly.",
    price: "$1,500",
    priceSuffix: "one-time",
    cta: "Start a pilot",
    includes: [
      {
        text: "1 automation built end-to-end",
        subtext: "scoped on the kickoff call",
        emphasized: true,
      },
      { text: "Up to 3 weeks of build time" },
      { text: "Full handoff with documentation" },
      { text: "$1,500 credited toward month one if you continue" },
      { text: "No subscription required" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    pitch: "For solo operators shipping their first automations.",
    tagline: "Replaces a part-time hire. ($30K/year, fully managed.)",
    price: "$2,500",
    priceSuffix: "/month",
    cta: "Subscribe",
    highlight: true,
    includes: [
      {
        text: "1 automation slot per month",
        subtext: "save up for complex builds",
        emphasized: true,
      },
      { text: "Everything we build, monitored and maintained" },
      { text: "Async support (Notion + email)" },
      { text: "Standard integrations" },
      { text: "Pause or cancel anytime" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    pitch: "For growing businesses automating across the team.",
    tagline: "Replaces a full-time ops hire. ($54K/year, no payroll, no churn.)",
    price: "$4,500",
    priceSuffix: "/month",
    cta: "Subscribe",
    includes: [
      {
        text: "2 automation slots per month",
        subtext: "flexible across standard and complex",
        emphasized: true,
      },
      { text: "Everything we build, monitored and maintained" },
      { text: "Priority support + monthly sync call" },
      { text: "Custom integrations" },
      { text: "Direct Slack channel" },
      { text: "Pause or cancel anytime" },
    ],
  },
];

export function ServicesSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="pricing"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple subscription. Pause or cancel anytime."
          description="We build, deploy, and maintain AI automations for your business. Subscribe at the pace that fits your team. Everything we build runs on your infrastructure — you own it, even if you leave."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-5 transition-all duration-700 ease-out lg:grid-cols-3",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {TIERS.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Every automation includes: production-grade engineering · monitoring
          and error tracking · full documentation · deployed to your
          infrastructure (you own everything) · 7-day money-back guarantee.
        </p>

        <SlotClassesExplainer />
        <HowItWorksExplainer />
      </div>
    </section>
  );
}

/**
 * Resolve where the per-tier Subscribe button sends the buyer.
 *
 * Once Stripe payment links exist, set per-tier `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_*`
 * env vars at build time and clicks open Stripe checkout in a new tab. Until
 * then, clicks open a pre-filled `mailto:` so the buyer lands on a real next
 * step instead of a dead anchor.
 */
function getSubscribeTarget(
  tierId: Tier["id"],
  tierName: string,
): { href: string; isExternal: boolean } {
  // Pilot is intentionally not self-serve — it routes to a sales
  // conversation so we can scope the workflow on the kickoff call.
  if (tierId === "pilot") {
    const subject = encodeURIComponent("Pilot — start a workflow");
    return {
      href: `mailto:hello@buildroom.ai?subject=${subject}`,
      isExternal: false,
    };
  }

  const stripeLink =
    tierId === "starter"
      ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_STARTER
      : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_GROWTH;

  if (stripeLink) {
    return { href: stripeLink, isExternal: true };
  }

  const subject = encodeURIComponent(`Subscribe — ${tierName}`);
  return {
    href: `mailto:hello@buildroom.ai?subject=${subject}`,
    isExternal: false,
  };
}

function TierCard({ tier }: { tier: Tier }) {
  const target = getSubscribeTarget(tier.id, tier.name);

  return (
    <div
      className={cn(
        "relative flex flex-col gap-5 rounded-2xl border bg-background p-7 shadow-sm transition-colors",
        tier.highlight
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border hover:border-primary/30",
      )}
    >
      {tier.highlight ? (
        <Badge className="absolute -top-3 right-6 px-3 py-1 text-xs">
          most popular
        </Badge>
      ) : null}

      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold tracking-tight text-foreground">
          {tier.name}
        </h3>
      </div>

      <div className="flex flex-col gap-2 border-y border-border py-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            {tier.price}
          </span>
          <span className="text-base text-muted-foreground">
            {tier.priceSuffix}
          </span>
        </div>
        <p className="text-sm italic leading-relaxed text-muted-foreground">
          {tier.tagline}
        </p>
      </div>

      <p className="text-sm font-semibold leading-relaxed text-foreground">
        {tier.pitch}
      </p>

      <ul className="flex flex-1 flex-col gap-2.5">
        {tier.includes.map((item) => (
          <li
            key={item.text}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span
              className={cn(
                item.emphasized ? "font-semibold text-foreground" : undefined,
              )}
            >
              {item.text}
              {item.subtext ? (
                <span className="font-normal text-muted-foreground">
                  {" "}
                  — {item.subtext}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        size="lg"
        variant={tier.highlight ? "default" : "outline"}
        className="group mt-2 w-full"
      >
        <Link
          href={target.href}
          target={target.isExternal ? "_blank" : undefined}
          rel={target.isExternal ? "noopener noreferrer" : undefined}
        >
          {tier.cta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
}

interface SlotClass {
  name: string;
  slots: string;
  body: string;
  examples: string;
}

const SLOT_CLASSES: ReadonlyArray<SlotClass> = [
  {
    name: "Standard",
    slots: "1 slot",
    body: "Focused workflow touching 1–3 systems. Most builds are this.",
    examples:
      "email triage, lead qualifier, appointment booker, review flow, basic support agent.",
  },
  {
    name: "Complex",
    slots: "2 slots",
    body: "Multi-step workflows with multiple agents, custom integrations, or non-standard data handling.",
    examples:
      "multi-channel support with escalation, lead enrichment with research, custom CRM workflows.",
  },
  {
    name: "Major",
    slots: "3 slots",
    body: "Custom multi-agent systems, regulated workflows, or anything requiring 4+ weeks of engineering.",
    examples:
      "multi-agent review with audit trails, full ops platforms, compliance-bound systems.",
  },
];

function SlotClassesExplainer() {
  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:p-8">
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
        What counts as one automation slot?
      </h3>
      <p className="mt-3 text-base leading-relaxed text-foreground/85">
        We classify every build into one of three types — standard, complex,
        or major — and tell you upfront, in writing, before any work starts.
      </p>

      <ul className="mt-5 flex flex-col divide-y divide-border/60">
        {SLOT_CLASSES.map((cls) => (
          <li
            key={cls.name}
            className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-foreground">
                {cls.name}
              </span>
              <span className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                {cls.slots}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80">
              {cls.body}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-muted-foreground/90">
                Examples:
              </span>{" "}
              {cls.examples}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Slots roll forward — save them for bigger builds, or stack across
        months for major work.
      </p>
    </div>
  );
}

function HowItWorksExplainer() {
  return (
    <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:p-8">
      <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
        How it works
      </h3>
      <p className="mt-3 text-base leading-relaxed text-foreground/85">
        Subscribe to the plan that fits your pace. Each month we build new
        automations for you — one, two, or three depending on your tier. Once
        they&rsquo;re live, we monitor and maintain them for as long as
        you&rsquo;re subscribed. Everything runs on your infrastructure with
        your API keys, so you own what we build and you&rsquo;re never locked
        in.
      </p>
    </div>
  );
}
