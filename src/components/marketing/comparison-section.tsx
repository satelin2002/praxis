"use client";

import { Check, Minus, X } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

/* The "us" column is the only column that scores green checks. The other
   two columns get muted minus signs (neutral / "depends") and red Xs
   (genuinely bad). Every cell value is defendable on a sales call —
   no aspirational claims, no fabricated numbers. */
type Cell =
  | { kind: "neg"; text: string }
  | { kind: "neutral"; text: string }
  | { kind: "pos"; text: string };

interface Row {
  label: string;
  hire: Cell;
  diy: Cell;
  us: Cell;
}

const ROWS: ReadonlyArray<Row> = [
  {
    label: "Cost (year 1)",
    hire: { kind: "neg", text: "$50K–$250K" },
    diy: { kind: "neutral", text: "$1K–$6K + your time" },
    us: { kind: "pos", text: "From $30K" },
  },
  {
    label: "Time to first workflow",
    hire: { kind: "neg", text: "3–6 months" },
    diy: { kind: "neg", text: "Weeks of trial-and-error" },
    us: { kind: "pos", text: "9 days" },
  },
  {
    label: "Productive output",
    hire: { kind: "neg", text: "After 3-month ramp" },
    diy: { kind: "neg", text: "Whatever you piece together" },
    us: { kind: "pos", text: "From day 9" },
  },
  {
    label: "Annual savings vs. hire",
    hire: { kind: "neutral", text: "—" },
    diy: { kind: "neutral", text: "$44K–$244K (if it works)" },
    us: { kind: "pos", text: "$20K–$220K" },
  },
  {
    label: "Reliability",
    hire: { kind: "neutral", text: "Depends" },
    diy: { kind: "neg", text: "Breaks at the edges" },
    us: { kind: "pos", text: "Production-grade" },
  },
  {
    label: "Maintenance",
    hire: { kind: "neutral", text: "On you" },
    diy: { kind: "neg", text: "On you" },
    us: { kind: "pos", text: "Included" },
  },
  {
    label: "Cancel anytime",
    hire: { kind: "neg", text: "No" },
    diy: { kind: "neutral", text: "n/a" },
    us: { kind: "pos", text: "Yes" },
  },
];

export function ComparisonSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="The math"
          title="Hire, DIY, or subscribe."
          description="The three ways small businesses handle this work today, side by side. The numbers are conservative — most full-time hires cost more, most off-the-shelf workflows break sooner."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mt-16 transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          {/* Mobile: stacked cards (one per column). Desktop: real table. */}
          <div className="grid gap-6 lg:hidden">
            <ColumnCard
              label="Hire someone"
              kind="neutral"
              rows={ROWS.map((r) => ({ label: r.label, cell: r.hire }))}
            />
            <ColumnCard
              label="DIY tools"
              kind="neutral"
              rows={ROWS.map((r) => ({ label: r.label, cell: r.diy }))}
            />
            <ColumnCard
              label="Buildroom"
              kind="us"
              rows={ROWS.map((r) => ({ label: r.label, cell: r.us }))}
            />
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-border bg-background shadow-sm lg:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-secondary">
                  <th className="w-[22%] px-6 py-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {/* corner cell */}
                  </th>
                  <th className="w-[26%] px-6 py-5 text-base font-semibold text-foreground">
                    Hire someone
                  </th>
                  <th className="w-[26%] px-6 py-5 text-base font-semibold text-foreground">
                    DIY tools
                  </th>
                  <th className="w-[26%] bg-primary/5 px-6 py-5 text-base font-semibold text-primary">
                    Buildroom
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={cn(
                      "border-t border-border",
                      i % 2 === 1 && "bg-secondary/40",
                    )}
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-sm font-medium text-foreground"
                    >
                      {row.label}
                    </th>
                    <CellTd cell={row.hire} />
                    <CellTd cell={row.diy} />
                    <CellTd cell={row.us} highlight />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function CellTd({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <td
      className={cn(
        "px-6 py-5 align-top text-sm leading-relaxed",
        highlight ? "bg-primary/5 text-foreground" : "text-muted-foreground",
      )}
    >
      <div className="flex items-start gap-2.5">
        <CellIcon kind={cell.kind} />
        <span>{cell.text}</span>
      </div>
    </td>
  );
}

function CellIcon({ kind }: { kind: Cell["kind"] }) {
  if (kind === "pos")
    return <Check className="mt-0.5 size-4 shrink-0 text-primary" />;
  if (kind === "neg")
    return <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />;
  return <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/70" />;
}

function ColumnCard({
  label,
  kind,
  rows,
}: {
  label: string;
  kind: "neutral" | "us";
  rows: ReadonlyArray<{ label: string; cell: Cell }>;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-background p-6 shadow-sm",
        kind === "us" ? "border-primary/40 bg-primary/5" : "border-border",
      )}
    >
      <h3
        className={cn(
          "mb-5 text-base font-semibold",
          kind === "us" ? "text-primary" : "text-foreground",
        )}
      >
        {label}
      </h3>
      <dl className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-col gap-1">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {r.label}
            </dt>
            <dd className="flex items-start gap-2 text-sm leading-relaxed text-foreground">
              <CellIcon kind={r.cell.kind} />
              <span>{r.cell.text}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
