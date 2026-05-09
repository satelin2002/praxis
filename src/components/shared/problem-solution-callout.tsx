import { AlertTriangle, ChevronDown, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ProblemSolutionCalloutProps {
  problem: string;
  solution: string;
  className?: string;
}

/**
 * Two-card "Problem → Solution" callout, used at the top of every
 * insight post. Cards stagger-fade in (problem first), the arrow
 * draws between them, and each icon pulses subtly.
 *
 * Animation timings + keyframes live in globals.css under the
 * `.ps-callout`, `.ps-arrow-path`, and `.ps-icon` selectors so the
 * markup stays simple and SSR renders the static structure.
 */
export function ProblemSolutionCallout({
  problem,
  solution,
  className,
}: ProblemSolutionCalloutProps) {
  return (
    <div
      className={cn(
        "grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-4",
        className,
      )}
    >
      {/* Problem card */}
      <div className="ps-callout problem-card relative flex flex-col gap-3 overflow-hidden rounded-xl border border-amber-500/40 bg-amber-500/5 p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="ps-icon inline-flex size-8 items-center justify-center rounded-md bg-amber-500/15 text-amber-700">
            <AlertTriangle className="size-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-amber-700">
            The problem
          </span>
        </div>
        <p className="text-base leading-relaxed text-foreground">{problem}</p>
      </div>

      {/* Arrow — desktop (md+): horizontal between cards. Mobile:
          chevron-down below the problem card. */}
      <div className="hidden items-center justify-center md:flex">
        <svg
          width="44"
          height="20"
          viewBox="0 0 44 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 10 H38 M30 4 L38 10 L30 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ps-arrow-path text-primary"
          />
        </svg>
      </div>
      <div
        aria-hidden
        className="ps-callout flex items-center justify-center md:hidden"
        style={{ animationDelay: "280ms" }}
      >
        <ChevronDown className="size-5 text-primary" />
      </div>

      {/* Solution card */}
      <div className="ps-callout solution-card relative flex flex-col gap-3 overflow-hidden rounded-xl border border-primary/40 bg-primary/5 p-5 sm:p-6">
        <div className="flex items-center gap-2.5">
          <span className="ps-icon inline-flex size-8 items-center justify-center rounded-md bg-primary/15 text-primary">
            <CheckCircle2 className="size-4" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            The fix
          </span>
        </div>
        <p className="text-base leading-relaxed text-foreground">{solution}</p>
      </div>
    </div>
  );
}
