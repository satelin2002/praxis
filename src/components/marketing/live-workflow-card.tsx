"use client";

import * as React from "react";
import {
  Check,
  FileText,
  Inbox,
  Loader2,
  Mail,
  MessageSquareText,
  Phone,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Workflow {
  id: string;
  type: string;
  timeOffset: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: ReadonlyArray<string>;
}

const WORKFLOWS: ReadonlyArray<Workflow> = [
  {
    id: "inbound-call",
    type: "Inbound call",
    timeOffset: 0,
    icon: Phone,
    title: 'Sarah J. — "AC stopped working"',
    lines: [
      "Call answered",
      "Issue qualified — urgent",
      "Booking 3pm appointment",
      "Tech notified",
    ],
  },
  {
    id: "new-lead",
    type: "New lead",
    timeOffset: 2,
    icon: Inbox,
    title: "marcus@buildco.com",
    lines: [
      "Enriched — Series B fintech",
      "ICP score: 87/100",
      "Drafting first-touch email",
      "Queued in HubSpot",
    ],
  },
  {
    id: "support-inbox",
    type: "Support inbox",
    timeOffset: 4,
    icon: Mail,
    title: '"Where\'s my order #4291?"',
    lines: [
      "Order looked up",
      "Tracking found — out for delivery",
      "Drafting reply with ETA",
      "Sent + ticket closed",
    ],
  },
  {
    id: "booking-request",
    type: "Booking request",
    timeOffset: 7,
    icon: MessageSquareText,
    title: '"Can I book a facial Friday?"',
    lines: [
      "Calendar checked",
      "3 slots available",
      "Confirming with customer",
      "Booked · 11am Friday",
    ],
  },
  {
    id: "contract-intake",
    type: "Contract intake",
    timeOffset: 9,
    icon: FileText,
    title: "Vendor MSA — 14 pages",
    lines: [
      "Clauses extracted",
      "Risk flags identified (3)",
      "Drafting summary for review",
      "Routed to associate",
    ],
  },
  {
    id: "job-complete",
    type: "Job complete",
    timeOffset: 11,
    icon: Wrench,
    title: "Service call closed",
    lines: [
      "Customer satisfaction confirmed",
      "Sending review request",
      "Sent via SMS + email",
      "Tracking in dashboard",
    ],
  },
];

const STAGE_DURATIONS = ["0.4s", "1.1s", "0.7s", "0.6s"] as const;

const BASE_HOUR_24 = 14;
const BASE_MINUTE = 14;
const STAGE_TICK_MS = 750;
const COMPLETE_HOLD_MS = 1100;
const EXIT_MS = 400;
const REDUCED_MOTION_HOLD_MS = 8000;

type LineStatus = "queued" | "running" | "done";

function formatTime(offsetMinutes: number) {
  const total = BASE_MINUTE + offsetMinutes;
  const minute = total % 60;
  const hour24 = BASE_HOUR_24 + Math.floor(total / 60);
  const hour12 = ((hour24 - 1) % 12) + 1;
  const meridiem = hour24 < 12 ? "am" : "pm";
  return `${hour12}:${String(minute).padStart(2, "0")}${meridiem}`;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function LiveWorkflowCard({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [stage, setStage] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  const flow = WORKFLOWS[index]!;
  const allDone = stage >= flow.lines.length;

  React.useEffect(() => {
    if (paused) return;

    if (reducedMotion) {
      const t = window.setTimeout(() => {
        setIndex((i) => (i + 1) % WORKFLOWS.length);
      }, REDUCED_MOTION_HOLD_MS);
      return () => window.clearTimeout(t);
    }

    if (exiting) {
      const t = window.setTimeout(() => {
        setIndex((i) => (i + 1) % WORKFLOWS.length);
        setStage(0);
        setExiting(false);
      }, EXIT_MS);
      return () => window.clearTimeout(t);
    }

    if (allDone) {
      const t = window.setTimeout(() => setExiting(true), COMPLETE_HOLD_MS);
      return () => window.clearTimeout(t);
    }

    const t = window.setTimeout(() => setStage((s) => s + 1), STAGE_TICK_MS);
    return () => window.clearTimeout(t);
  }, [stage, index, paused, allDone, exiting, reducedMotion]);

  const Icon = flow.icon;

  const lineStatuses: ReadonlyArray<LineStatus> = flow.lines.map((_, i) => {
    if (reducedMotion || allDone) return "done";
    if (i < stage) return "done";
    if (i === stage) return "running";
    return "queued";
  });

  const showComplete = reducedMotion || allDone;
  const automationLabel = `automation #${String(index + 1).padStart(2, "0")}`;

  return (
    <div
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn("relative w-full max-w-md", className)}
    >
      {/* Stack of two phantom cards behind the active one — implies a queue
          of work always running. Static; only the active card animates. */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 -bottom-3 -z-20 rounded-2xl border border-border/40 bg-background/30 shadow-sm"
      />
      <div
        aria-hidden
        className="absolute inset-x-4 top-3 -bottom-1 -z-10 rounded-2xl border border-border/50 bg-background/55 shadow-sm"
      />

      <div
        key={index}
        className={cn(
          "lwc-card relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12),0_4px_16px_-4px_rgba(0,0,0,0.06)]",
          exiting ? "lwc-exit" : "lwc-enter",
        )}
      >
        {/* Subtle top accent line — primary fades in/out across the card top */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.62 0.166 152 / 0.4), transparent)",
          }}
        />

        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span
                aria-hidden
                className="absolute inset-0 animate-status-ripple rounded-full bg-emerald-500"
              />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
              Live
            </span>
            <span className="ml-auto truncate font-mono text-xs text-muted-foreground">
              {flow.type} · {formatTime(flow.timeOffset)}
            </span>
          </div>

          <div className="mt-5 flex items-start gap-3">
            <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
              <Icon className="size-4.5" />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5 leading-tight">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/80">
                Workflow
              </span>
              <span className="truncate text-sm font-semibold text-foreground">
                {flow.title}
              </span>
            </div>
          </div>

          <ol className="mt-5 flex flex-col">
            {flow.lines.map((line, i) => {
              const status = lineStatuses[i]!;
              const isLast = i === flow.lines.length - 1;
              return (
                <li
                  key={`${flow.id}-${i}`}
                  className={cn(
                    "flex items-stretch gap-3 transition-opacity duration-300",
                    status === "queued" ? "opacity-40" : "opacity-100",
                  )}
                >
                  <div className="flex flex-col items-center pt-2">
                    <StatusIndicator status={status} />
                    {!isLast ? (
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1 w-px flex-1 transition-colors",
                          i < stage || reducedMotion || allDone
                            ? "bg-emerald-500/30"
                            : "bg-border",
                        )}
                      />
                    ) : null}
                  </div>

                  <div
                    className={cn(
                      "flex flex-1 items-center gap-3 rounded-md px-2.5 py-1.5 transition-all duration-300",
                      status === "running" &&
                        "bg-primary/5 ring-1 ring-primary/15",
                    )}
                  >
                    <span className="w-5 shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 truncate text-sm leading-tight transition-colors duration-300",
                        status === "queued"
                          ? "text-muted-foreground"
                          : status === "done"
                            ? "text-foreground/80"
                            : "text-foreground",
                      )}
                    >
                      {line}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 font-mono text-[10px] tabular-nums transition-opacity duration-300",
                        status === "done"
                          ? "text-muted-foreground/70 opacity-100"
                          : "opacity-0",
                      )}
                      aria-hidden={status !== "done"}
                    >
                      {STAGE_DURATIONS[i] ?? ""}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="flex items-center gap-2 border-t border-border/60 bg-secondary/30 px-5 py-3 sm:px-6">
          <span className="truncate font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">
            buildroom · {automationLabel}
          </span>
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 transition-all duration-300",
              showComplete
                ? "translate-x-0 opacity-100"
                : "translate-x-1 opacity-0",
            )}
            aria-hidden={!showComplete}
          >
            <Check className="size-3" strokeWidth={3} />
            Complete
          </span>
        </div>
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-1.5"
        aria-hidden
      >
        {WORKFLOWS.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full transition-all duration-500",
              i === index ? "w-5 bg-primary" : "w-1 bg-muted-foreground/25",
            )}
          />
        ))}
      </div>

      <style jsx>{`
        :global(.lwc-card.lwc-enter) {
          animation: lwc-enter 320ms cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }
        :global(.lwc-card.lwc-exit) {
          animation: lwc-exit 400ms cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        @keyframes lwc-enter {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes lwc-exit {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-10px) scale(0.99);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.lwc-card.lwc-enter),
          :global(.lwc-card.lwc-exit) {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

function StatusIndicator({ status }: { status: LineStatus }) {
  if (status === "done") {
    return (
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/25">
        <Check className="size-3" strokeWidth={3} />
      </span>
    );
  }
  if (status === "running") {
    return (
      <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30">
        <Loader2 className="size-3 animate-spin" />
      </span>
    );
  }
  return (
    <span className="inline-flex size-4 shrink-0 rounded-full border border-muted-foreground/30 bg-background" />
  );
}
