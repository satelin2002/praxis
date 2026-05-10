"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { BOOKING_URL } from "@/lib/cta-targets";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface Include {
  text: string;
  subtext?: string;
  emphasized?: boolean;
}

/**
 * `pitch` is split into three parts so the centre `accent` phrase
 * can render in primary green (the part the buyer should remember).
 * `pre` and `post` render in foreground; spaces between parts are
 * inserted by the renderer so the data stays clean.
 */
interface TierPitch {
  pre: string;
  accent: string;
  post: string;
}

interface Tier {
  id: "pilot" | "starter" | "growth";
  name: string;
  pitch: TierPitch;
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
    pitch: {
      pre: "Build",
      accent: "one workflow",
      post: "before going monthly.",
    },
    tagline: "Lowest-friction way to start. See us ship before you commit.",
    price: "$1,500",
    priceSuffix: "one-time",
    cta: "Discuss a pilot",
    includes: [
      {
        text: "One focused workflow, built end-to-end",
        subtext: "scoped on the kickoff call",
        emphasized: true,
      },
      { text: "Standard workflows usually live in 1–2 weeks" },
      { text: "Human approval mode where it matters" },
      { text: "Documentation + handoff to your team" },
      { text: "$1,500 credited toward month one if you continue" },
      { text: "No subscription required" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    pitch: {
      pre: "Build",
      accent: "one new workflow",
      post: "each month.",
    },
    tagline: "Replaces a part-time hire. ($30K/year, fully managed.)",
    price: "$2,500",
    priceSuffix: "/month",
    cta: "Talk through Starter",
    highlight: true,
    includes: [
      {
        text: "Up to 1 new workflow per month",
        subtext: "scoped before we build",
        emphasized: true,
      },
      { text: "Monitoring + maintenance for every workflow we've built" },
      { text: "Bug fixes and small improvements included" },
      { text: "Async support (email + shared workspace)" },
      { text: "Standard integrations" },
      { text: "Pause or cancel anytime" },
    ],
  },
  {
    id: "growth",
    name: "Growth",
    pitch: {
      pre: "Build up to",
      accent: "two new workflows",
      post: "each month.",
    },
    tagline: "Replaces a full-time ops hire. ($54K/year, no payroll, no churn.)",
    price: "$4,500",
    priceSuffix: "/month",
    cta: "Talk through Growth",
    includes: [
      {
        text: "Up to 2 new workflows per month",
        subtext: "scoped before we build",
        emphasized: true,
      },
      { text: "Monitoring + maintenance for every workflow we've built" },
      { text: "Bug fixes and improvements — priority queue" },
      { text: "Monthly workflow review call" },
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
 * Every tier CTA routes to the shared {@link BOOKING_URL} — at stage
 * zero, every prospect should land on a workflow-audit conversation
 * before any money changes hands. Stripe self-serve checkout is
 * deliberately turned off until you've scoped enough engagements to
 * trust the productized fit. When ready, swap the body of this
 * function to read from `process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_*`
 * — the call sites won't change.
 */
function getSubscribeTarget(): { href: string; isExternal: boolean } {
  return {
    href: BOOKING_URL,
    isExternal: BOOKING_URL.startsWith("http"),
  };
}

function TierCard({ tier }: { tier: Tier }) {
  const target = getSubscribeTarget();

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

      <p className="text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
        {tier.pitch.pre}{" "}
        <span className="text-primary">{tier.pitch.accent}</span>{" "}
        {tier.pitch.post}
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

/**
 * Two short clarifications below the pricing cards. Replaced the
 * previous "automation slots" explainer (standard / complex / major
 * 1/2/3-slot taxonomy) — readers were confused about whether older
 * builds kept their support after a new month started. Cleaner model:
 *   • a workflow is one repeatable business process
 *   • monthly subscribers get N new workflows + maintenance on
 *     everything we've already built for them
 */
function SlotClassesExplainer() {
  return (
    <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:p-7">
        <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
          FAQ
        </span>
        <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          What counts as a workflow?
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A workflow is one repeatable business process with a clear trigger
          and outcome — for example, &ldquo;follow up with new
          leads,&rdquo; &ldquo;request reviews after completed jobs,&rdquo;
          &ldquo;draft replies to support emails,&rdquo; or &ldquo;send
          estimate follow-ups.&rdquo; We scope each workflow before we build
          so there are no surprises.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:p-7">
        <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
          FAQ
        </span>
        <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
          What happens to workflows after they&rsquo;re built?
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          On a monthly plan, we monitor and maintain every workflow
          we&rsquo;ve built for you — bug fixes, model updates,
          integration tweaks. If you cancel, the workflows stay live on
          your accounts; we just stop monitoring and improving them.
        </p>
      </div>
    </div>
  );
}

function HowItWorksExplainer() {
  return (
    <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3 rounded-2xl border border-border/60 bg-secondary/50 p-6 sm:p-8">
      <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
        The flow
      </span>
      <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground sm:text-xl">
        How it works.
      </h3>
      <p className="text-base leading-relaxed text-muted-foreground">
        Subscribe to the plan that fits your pace. Each month we build new
        workflows for you — one on Starter, up to two on Growth. Once
        they&rsquo;re live, we monitor and maintain them for as long as
        you&rsquo;re subscribed. Everything runs on your infrastructure
        with your API keys, so you own what we build and you&rsquo;re never
        locked in.
      </p>
    </div>
  );
}
