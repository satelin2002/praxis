"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

interface CaseStudy {
  /** One-line anonymized client identifier — industry + stage. */
  client: string;
  /** Headquarters city. */
  location: string;
  /** Team size signal — engineers, not headcount. */
  teamSize: string;
  /** Vertical / problem space. */
  industry: string;
  problem: string;
  did: ReadonlyArray<string>;
  outcome: string;
  metrics: ReadonlyArray<{ label: string; value: string }>;
  /** Slug of the companion engineering writeup in /insights. */
  writeupSlug: string;
  writeupTitle: string;
}

/**
 * Anonymized case studies. Industry + stack + concrete failure mode
 * read more credibly than vague "Series-C fintech" anonymization.
 * Replace with named clients once they sign off on attribution.
 */
const CASES: ReadonlyArray<CaseStudy> = [
  {
    client: "B2B software company",
    location: "San Francisco, CA",
    teamSize: "~150 employees",
    industry: "Customer support automation",
    problem:
      "Support team buried in tier-1 tickets — 60+ per day per rep, mostly repeat questions about plan changes, billing, and integrations. Senior agents stuck answering the same five things every morning.",
    did: [
      "Built an AI agent that reads each incoming ticket, classifies the topic, and drafts a personalized reply with citations to your help docs",
      "Plugged into the existing Intercom inbox + HubSpot CRM — no new tools for the team to learn",
      "Added a safety check so nothing ships without policy review on edge cases",
    ],
    outcome:
      "Live in 7 weeks. Agent now handles 38% of inbound tier-1 tickets autonomously. CSAT held steady at 94% (vs. 95% pre-launch). Support team redirected to retention and complex issues.",
    metrics: [
      { label: "auto-resolved", value: "38%" },
      { label: "CSAT", value: "94" },
      { label: "weeks to live", value: "7" },
    ],
    writeupSlug: "support-agent-71-to-94",
    writeupTitle: "From 71% to 94%: how we got there",
  },
  {
    client: "Regional law firm",
    location: "Boston, MA",
    teamSize: "~80 attorneys",
    industry: "Contract intake review",
    problem:
      "Junior associates spending 3+ hours per case reading new contracts before client meetings. Inconsistent flagging of risky clauses across the team. Compliance team uneasy about the audit trail.",
    did: [
      "Built an AI panel that reads each contract and surfaces risky clauses with citations to the source language",
      "Layered a deciding agent that resolves disagreements between reviewers and produces a single ranked redline",
      "Full audit trail compliance can defend in front of clients and regulators",
    ],
    outcome:
      "First-pass review time dropped from 3 hours to 12 minutes per case. Compliance approved the system on the first review pass. Associates redirected to client work that bills.",
    metrics: [
      { label: "review time saved", value: "93%" },
      { label: "from → to", value: "3h→12m" },
      { label: "weeks to live", value: "8" },
    ],
    writeupSlug: "deciding-agent-disagreement",
    writeupTitle: "Inside the deciding-agent panel",
  },
  {
    client: "B2B marketplace",
    location: "Berlin, DE",
    teamSize: "~80 employees",
    industry: "Lead enrichment + qualification",
    problem:
      "Sales team manually researching every inbound lead — 30+ minutes each. 60% of leads never even got contacted because the bottleneck was downstream of marketing.",
    did: [
      "Built an AI agent that runs every inbound lead through automated research, scores by ICP fit, drafts a personalized first-touch email, and queues it into the CRM",
      "Cascading routing — small fast model handles the obvious cases, larger model adjudicates edge cases. Cost stays predictable",
      "Sales reps can override or rewrite any draft before it sends",
    ],
    outcome:
      "100% of inbound leads now get contacted within 2 hours. Reps focus on the top 30% by score. Token cost down 71% vs. the all-large-model baseline. Pipeline conversion up 18% in the first quarter.",
    metrics: [
      { label: "cost reduction", value: "71%" },
      { label: "lead coverage", value: "100%" },
      { label: "pipeline lift", value: "+18%" },
    ],
    writeupSlug: "cascading-model-routing",
    writeupTitle: "Cutting cost without losing accuracy",
  },
];

export function WorkSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="work"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Recent work"
          title="Real businesses. Real results."
          description="Anonymized at the client's request. Industry, team size, and metrics are accurate. We can connect serious prospects to references after a discovery call."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 flex flex-col gap-5 transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {CASES.map((c, i) => (
            <CaseCard key={i} c={c} />
          ))}
        </div>

        <div
          data-fade
          className={cn(
            "mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center transition-all duration-700 ease-out sm:flex-row sm:text-left",
            visible
              ? "translate-y-0 opacity-100 delay-300"
              : "translate-y-6 opacity-0",
          )}
        >
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              Have a workflow that looks like one of these?
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Send us the messy version. We&rsquo;ll tell you what is worth
              automating and what should stay human.
            </p>
          </div>
          <Button asChild size="lg" className="group w-full sm:w-auto">
            <Link href="#contact">
              Scope the workflow
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function CaseCard({ c }: { c: CaseStudy }) {
  return (
    <article className="group relative grid gap-8 rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/30 md:grid-cols-[1fr_18rem] md:p-9">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge variant="outline" className="border-primary/30 text-primary">
            {c.industry}
          </Badge>
          <span className="font-mono text-xs uppercase tracking-wider text-foreground">
            {c.client}
          </span>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            <MapPin className="size-3" />
            {c.location}
          </span>
          <span aria-hidden className="text-muted-foreground/40">
            ·
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
            <Users className="size-3" />
            {c.teamSize}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">
            <span className="text-muted-foreground/80">The problem · </span>
            {c.problem}
          </h3>

          <ul className="flex flex-col gap-1.5 border-l-2 border-primary/30 pl-4 text-base leading-relaxed text-muted-foreground">
            {c.did.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>

          <p className="text-base leading-relaxed text-foreground/95">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
              Outcome ·{" "}
            </span>
            {c.outcome}
          </p>

          <Link
            href={`/insights/${c.writeupSlug}`}
            className="group/link mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <span>Read the full case study · {c.writeupTitle}</span>
            <ArrowUpRight className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-secondary/40 p-5">
        <ul className="grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-5">
          {c.metrics.map((m) => (
            <li key={m.label} className="flex flex-col">
              <span className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                {m.value}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                {m.label}
              </span>
            </li>
          ))}
        </ul>
        <Link
          href="#contact"
          aria-label="Request reference"
          className="group/btn inline-flex w-fit items-center gap-1.5 self-end font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-info"
        >
          request reference
          <ArrowUpRight className="size-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
