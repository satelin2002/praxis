"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Workflow } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundOrbs } from "@/components/shared/background-orbs";
import { CanvasDotGrid } from "@/components/shared/canvas-dot-grid";
import { BOOKING_URL } from "@/lib/cta-targets";
import { cn } from "@/lib/utils";

import { LiveWorkflowCard } from "./live-workflow-card";
import { useCursorWithin, useFadeIn } from "./utils";

export function HeroSection() {
  const { ref: visibleRef, visible } = useFadeIn();
  const surfaceRef = React.useRef<HTMLDivElement>(null);
  const cursor = useCursorWithin(surfaceRef);

  return (
    <section
      ref={visibleRef}
      className="relative isolate overflow-hidden border-b border-border/40 px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28"
    >
      <CanvasDotGrid />
      <BackgroundOrbs />

      <div
        ref={surfaceRef}
        className="relative mx-auto w-full max-w-300"
        style={
          {
            "--mx": `${cursor.x * 100}%`,
            "--my": `${cursor.y * 100}%`,
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx) var(--my), oklch(0.486 0.097 178.5 / 0.10), transparent 60%)",
          }}
        />

        {/* Top row: text + CTAs on the left, rotating live-workflow card on
            the right at md+ (≥768px). On smaller screens the card is hidden
            and the headline + CTAs carry the hero on their own. */}
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10 lg:gap-14">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              data-fade
              className={cn(
                "transition-all duration-700 ease-out",
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0",
              )}
            >
              <Badge
                variant="outline"
                className="gap-1.5 border-primary/30 bg-primary/5 px-3 py-1.5 text-sm text-primary"
              >
                <Workflow className="size-3.5" />
                AI automation for small businesses
              </Badge>
            </div>

            <h1
              data-fade
              className={cn(
                "mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground transition-all duration-700 ease-out sm:text-6xl lg:text-7xl",
                visible
                  ? "translate-y-0 opacity-100 delay-100"
                  : "translate-y-4 opacity-0",
              )}
            >
              Stop doing the work{" "}
              <span className="text-primary">AI can do for you.</span>
            </h1>

            <p
              data-fade
              className={cn(
                "mt-6 max-w-2xl text-lg text-balance text-muted-foreground transition-all duration-700 ease-out sm:text-xl",
                visible
                  ? "translate-y-0 opacity-100 delay-200"
                  : "translate-y-4 opacity-0",
              )}
            >
              Buildroom builds and runs AI automations for small businesses
              — lead follow-up, customer support, booking, review requests,
              inbox triage, and other repeatable work. Save time, reduce
              manual work, recover revenue. One flat monthly fee. Cancel
              anytime.
            </p>

            <div
              data-fade
              className={cn(
                "mt-9 flex flex-col items-center gap-3 transition-all duration-700 ease-out sm:flex-row",
                visible
                  ? "translate-y-0 opacity-100 delay-300"
                  : "translate-y-4 opacity-0",
              )}
            >
              <Button
                asChild
                size="xl"
                className="group shadow-lg shadow-primary/20"
              >
                <Link href={BOOKING_URL}>
                  Book a free workflow audit
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="xl"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="#recently-shipped">See example workflows →</Link>
              </Button>
            </div>

            <p
              data-fade
              className={cn(
                "mt-4 text-sm text-muted-foreground transition-all duration-700 ease-out",
                visible
                  ? "translate-y-0 opacity-100 delay-[400ms]"
                  : "translate-y-3 opacity-0",
              )}
            >
              First automation live in 9 days · Runs on your infrastructure ·
              No contracts · Cancel anytime
            </p>
          </div>

          <div
            data-fade
            className={cn(
              "hidden transition-all duration-1000 ease-out md:flex md:items-center md:justify-center",
              visible
                ? "translate-x-0 opacity-100 delay-300"
                : "translate-x-6 opacity-0",
            )}
          >
            <LiveWorkflowCard />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <SocialProofStrip visible={visible} />
        </div>
      </div>
    </section>
  );
}

const PROOF_ITEMS = [
  "Senior engineering-led delivery",
  "Production-grade reliability",
  "One flat monthly fee",
  "Cancel anytime",
] as const;

function SocialProofStrip({ visible }: { visible: boolean }) {
  return (
    <div
      data-fade
      className={cn(
        "mt-14 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border/40 pt-8 transition-all duration-700 ease-out",
        visible
          ? "translate-y-0 opacity-100 delay-700"
          : "translate-y-4 opacity-0",
      )}
    >
      {PROOF_ITEMS.map((item, i) => (
        <React.Fragment key={item}>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            {item}
          </span>
          {i < PROOF_ITEMS.length - 1 ? (
            <span aria-hidden className="text-muted-foreground/30">
              ·
            </span>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
