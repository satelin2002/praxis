"use client";

import {
  Car,
  Cloud,
  Dumbbell,
  HardHat,
  Home,
  Megaphone,
  Scale,
  ShoppingBag,
  Stethoscope,
  Truck,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface Industry {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const INDUSTRIES: ReadonlyArray<Industry> = [
  { icon: Wrench, label: "Home services" },
  { icon: Home, label: "Real estate" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Stethoscope, label: "Dental & med spas" },
  { icon: Scale, label: "Law firms" },
  { icon: Megaphone, label: "Agencies" },
  { icon: Car, label: "Auto services" },
  { icon: Dumbbell, label: "Fitness & wellness" },
  { icon: UtensilsCrossed, label: "Restaurants" },
  { icon: Cloud, label: "B2B SaaS" },
  { icon: Truck, label: "Logistics" },
  { icon: HardHat, label: "Contracting" },
];

export function WhoWeWorkWithSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="who-we-work-with"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Who we work with"
          title="Built for businesses like yours."
          description="From phone-driven service businesses to inbound-heavy SaaS, we've shipped automations for teams that look like yours."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 grid gap-3 transition-all duration-700 ease-out sm:grid-cols-2 sm:gap-4 lg:grid-cols-4",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {INDUSTRIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3.5 shadow-sm transition-colors hover:border-primary/30"
              >
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4.5" />
                </span>
                <span className="truncate text-sm font-medium text-foreground">
                  {item.label}
                </span>
              </div>
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
          Don&rsquo;t see yours? Email{" "}
          <a
            href="mailto:hello@buildroom.ai"
            className="text-info underline-offset-4 hover:underline"
          >
            hello@buildroom.ai
          </a>{" "}
          — chances are we&rsquo;ve shipped something similar.
        </p>
      </div>
    </section>
  );
}
