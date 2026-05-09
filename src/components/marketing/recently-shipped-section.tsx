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

interface ShippedItem {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  customer: string;
  before: string;
  after: React.ReactNode;
  speed: string;
}

function H({ children }: { children: React.ReactNode }) {
  return <span className="font-semibold text-primary">{children}</span>;
}

const SHIPPED: ReadonlyArray<ShippedItem> = [
  {
    icon: Phone,
    type: "AI receptionist",
    customer: "HVAC company · 12 employees",
    before: "Was missing 30% of after-hours calls.",
    after: (
      <>
        Now captures <H>96%</H> — roughly <H>$18K/month</H> in recovered jobs.
      </>
    ),
    speed: "8 days",
  },
  {
    icon: Inbox,
    type: "Lead qualifier",
    customer: "Real estate brokerage · 25 agents",
    before: "Hot leads sat for hours.",
    after: (
      <>
        Now every inbound lead contacted in <H>under 5 minutes</H>, qualified,
        and routed to the right agent.
      </>
    ),
    speed: "9 days",
  },
  {
    icon: Mail,
    type: "Support email triage",
    customer: "Shopify DTC brand · 8-person team",
    before: "Inbox always 200+ deep.",
    after: (
      <>
        Now <H>60% of tier-1 emails</H> auto-resolved with citations to help
        docs.
      </>
    ),
    speed: "11 days",
  },
  {
    icon: CalendarCheck,
    type: "Appointment booker",
    customer: "Med spa · 3 locations",
    before: "Front desk overwhelmed at peak hours.",
    after: (
      <>
        Now handles <H>200+ bookings/month</H> across SMS and voice,{" "}
        <H>zero missed</H>.
      </>
    ),
    speed: "10 days",
  },
  {
    icon: Star,
    type: "Review request flow",
    customer: "Auto repair shop · 6 bays",
    before: "Owner manually texted reviews.",
    after: (
      <>
        Now <H>4× more Google reviews</H>, fully automated post-service —
        driving an estimated <H>15% lift</H> in inbound from local search.
      </>
    ),
    speed: "6 days",
  },
  {
    icon: FileSignature,
    type: "Estimate follow-up",
    customer: "Roofing contractor · 15 employees",
    before: "Estimates went cold after 48 hours.",
    after: (
      <>
        Now <H>22% more closed deals</H> from automated 24h / 3-day / 7-day
        follow-up — roughly <H>$30K extra revenue/month</H>.
      </>
    ),
    speed: "9 days",
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
          eyebrow="Proof"
          title="Recently shipped."
          description="6 of the automations we've shipped to subscribers recently. Anonymized at client request."
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
          {SHIPPED.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={`${item.type}-${item.customer}`}
                className="group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-border border-l-[3px] border-l-primary bg-background p-6 shadow-sm transition-colors hover:border-primary/30 hover:border-l-primary"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4.5" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-base font-semibold tracking-tight text-foreground">
                      {item.type}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                      {item.customer}
                    </span>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  <span className="text-muted-foreground">{item.before}</span>{" "}
                  <span className="text-foreground">{item.after}</span>{" "}
                  <span className="text-muted-foreground">Live in</span>{" "}
                  <H>{item.speed}</H>
                  <span className="text-muted-foreground">.</span>
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
          More examples? Mention an industry on your discovery call.
        </p>
      </div>
    </section>
  );
}
