import { Logo } from "@/components/shared/logo";

/**
 * Route-level loading. Subtle by design — a centered logo + a faint
 * pulse line. No spinners (looks dated against the rest of the site).
 */
export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading"
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background"
    >
      <Logo size={36} />
      <div className="relative h-px w-32 overflow-hidden rounded-full bg-border/60">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-shimmer-sweep rounded-full bg-primary/50" />
      </div>
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
        loading
      </span>
    </main>
  );
}
