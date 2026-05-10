"use client";

import * as React from "react";
import { useActionState } from "react";
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { useFadeIn } from "./utils";

const INITIAL: ContactFormState = { status: "idle" };

const WORKFLOW_OPTIONS = [
  "Lead handling",
  "Customer support",
  "Sales operations",
  "Internal ops",
  "Scheduling & booking",
  "Custom workflow",
] as const;

export function ContactSection() {
  const { ref, visible } = useFadeIn();
  const [state, action, pending] = useActionState(submitContact, INITIAL);
  const startedAtRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (state.status === "error") {
      toast.error(state.message);
    } else if (state.status === "ok") {
      toast.success("Thanks — we'll be in touch within a business day.");
    }
  }, [state]);

  const markStarted = React.useCallback(() => {
    if (startedAtRef.current && !startedAtRef.current.value) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-border/40 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(800px circle at 50% 20%, oklch(0.62 0.166 152 / 0.08), transparent 60%)",
        }}
      />

      <div
        data-fade
        className={cn(
          "mx-auto grid w-full max-w-272 gap-10 transition-all duration-700 ease-out lg:grid-cols-[1fr_1.2fr] lg:gap-16",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono text-xs uppercase tracking-wider text-primary">
            Discovery call
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Tell us what&rsquo;s eating your team&rsquo;s time.
          </h2>
          <p className="text-balance text-base text-muted-foreground sm:text-lg">
            Book a free 30-minute call. We&rsquo;ll listen, ask hard questions,
            and tell you honestly whether AI can fix it — and whether
            we&rsquo;re the right team to build it.
          </p>

          <ul className="mt-2 flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" />
              Free 30-min call · no commitment
            </li>
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              NDA on request · sensitive data welcome
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail className="size-4 text-primary" />
              Or email{" "}
              <a
                href="mailto:hello@tryworkflowcrew.com"
                className="text-info underline-offset-4 hover:underline"
              >
                hello@tryworkflowcrew.com
              </a>
            </li>
          </ul>
        </div>

        <form
          action={action}
          onFocusCapture={markStarted}
          onPointerEnter={markStarted}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-8"
          aria-busy={pending}
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
          <input ref={startedAtRef} type="hidden" name="startedAt" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Avery Chen"
                required
                disabled={pending || state.status === "ok"}
              />
            </Field>
            <Field>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="avery@company.com"
                required
                disabled={pending || state.status === "ok"}
              />
            </Field>
          </div>

          <Field>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Company, Inc."
              disabled={pending || state.status === "ok"}
            />
          </Field>

          <Field>
            <Label htmlFor="workflowType">Workflow type</Label>
            <select
              id="workflowType"
              name="workflowType"
              disabled={pending || state.status === "ok"}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-base text-foreground shadow-xs transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue=""
            >
              <option value="">Select one</option>
              {WORKFLOW_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field>
            <Label htmlFor="message">What workflow do you want to automate?</Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={5}
              minLength={10}
              maxLength={2000}
              placeholder="A few sentences on the workflow eating your team's time. The more specific, the better."
              disabled={pending || state.status === "ok"}
            />
          </Field>

          <Button
            type="submit"
            size="lg"
            className="group mt-2 w-full"
            disabled={pending || state.status === "ok"}
          >
            {state.status === "ok" ? (
              <>
                <CheckCircle2 className="size-4" />
                Message received
              </>
            ) : (
              <>
                {pending ? "Sending…" : "Book a free 30-min call"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground/80">
            We&rsquo;ll reply within one business day. By submitting you agree
            to be contacted about this enquiry.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1.5">{children}</div>;
}
