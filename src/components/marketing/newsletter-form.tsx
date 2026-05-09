"use client";

import * as React from "react";
import { useActionState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  submitSubscribe,
  type SubscribeState,
} from "@/app/actions/subscribe";

const INITIAL: SubscribeState = { status: "idle" };

/**
 * Tiny inline newsletter form. Lives in the marketing footer.
 * Submits to the existing `subscribe` server action — no new wiring,
 * just exposes it in the UI so the action stops being dead code.
 */
export function NewsletterForm() {
  const [state, action, pending] = useActionState(submitSubscribe, INITIAL);
  const startedAtRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (state.status === "error") toast.error(state.message);
  }, [state]);

  const success = state.status === "ok";
  const markStarted = React.useCallback(() => {
    if (startedAtRef.current && !startedAtRef.current.value) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <form
      action={action}
      onFocusCapture={markStarted}
      onPointerEnter={markStarted}
      className="flex flex-col gap-2"
      aria-busy={pending}
    >
      <label
        htmlFor="newsletter-email"
        className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80"
      >
        Field notes, in your inbox
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />
        <input ref={startedAtRef} type="hidden" name="startedAt" />
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          disabled={pending || success}
          className="h-10 flex-1"
        />
        <button
          type="submit"
          disabled={pending || success}
          aria-label={success ? "Subscribed" : "Subscribe"}
          className={cn(
            "inline-flex size-10 shrink-0 items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm transition-colors",
            "border-primary/40 hover:bg-primary/90",
            "disabled:cursor-not-allowed disabled:opacity-60",
            success && "bg-emerald-500/90 border-emerald-500/50 hover:bg-emerald-500/90",
          )}
        >
          {success ? (
            <CheckCircle2 className="size-4" />
          ) : (
            <ArrowRight className="size-4" />
          )}
        </button>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground/80">
        {success
          ? "Subscribed. We send field notes only when we ship something worth reading."
          : "One short note when we publish. No drip, no funnel."}
      </p>
    </form>
  );
}
