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
  emphasized?: boolean;
}

interface Tier {
  id: "starter" | "growth" | "scale";
  name: string;
  pitch: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  cta: string;
  highlight?: boolean;
  includes: ReadonlyArray<Include>;
}

const TIERS: ReadonlyArray<Tier> = [
  {
    id: "starter",
    name: "Starter",
    pitch: "For solo operators shipping their first automations.",
    tagline: "Replaces a part-time hire. ($30K/year, fully managed.)",
    price: "$2,500",
    priceSuffix: "/month",
    cta: "Subscribe",
    includes: [
      { text: "One new automation built per month", emphasized: true },
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
    highlight: true,
    includes: [
      { text: "Two new automations built per month", emphasized: true },
      { text: "Everything we build, monitored and maintained" },
      { text: "Priority support + monthly sync call" },
      { text: "Custom integrations" },
      { text: "Direct Slack channel" },
      { text: "Pause or cancel anytime" },
    ],
  },
  {
    id: "scale",
    name: "Scale",
    pitch: "For teams running AI automations seriously.",
    tagline: "Replaces a small ops team. ($102K/year, no hiring overhead.)",
    price: "$8,500",
    priceSuffix: "/month",
    cta: "Subscribe",
    includes: [
      { text: "Three new automations built per month", emphasized: true },
      { text: "Everything we build, monitored and maintained" },
      { text: "Same-day priority support" },
      { text: "Founder-led delivery" },
      { text: "Unlimited custom integrations" },
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
  const stripeLink =
    tierId === "starter"
      ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_STARTER
      : tierId === "growth"
        ? process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_GROWTH
        : process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_SCALE;

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
