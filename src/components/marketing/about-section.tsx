"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

export function AboutSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="about"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="About"
          title="Who's building this."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mx-auto mt-12 flex max-w-2xl flex-col gap-6 text-center transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          <p className="text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
            We&rsquo;re a small team of senior AI engineers with deep
            production-AI experience. We started Workflow Crew because we kept
            seeing companies invest serious money in AI projects that never
            made it to production — not because the technology wasn&rsquo;t
            ready, but because the engineering rigor wasn&rsquo;t there. We
            bring that rigor to companies that need real, working automation,
            not another POC.
          </p>

          <dl className="grid gap-3 text-left sm:grid-cols-3">
            <CredibilityItem label="Delivery" value="Senior engineers only" />
            <CredibilityItem label="Default" value="Production, not POCs" />
            <CredibilityItem label="Handoff" value="Your code, prompts, data" />
          </dl>

          <div className="mt-2">
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="#contact">
                Tell us what you&rsquo;re working on
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CredibilityItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <dt className="font-mono text-xs uppercase tracking-wider text-primary">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
