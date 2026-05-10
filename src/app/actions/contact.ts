"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getServerClient } from "@/lib/supabase/server";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email").max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  workflowType: z.string().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Tell us a little about your project (10 chars+)")
    .max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.string().optional().or(z.literal("")),
});

export type ContactFormState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    workflowType: formData.get("workflowType"),
    message: formData.get("message"),
    website: formData.get("website"),
    startedAt: formData.get("startedAt"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message:
        parsed.error.issues[0]?.message ?? "Some fields look off — please check.",
    };
  }

  const data = parsed.data;
  const elapsed = Number(data.startedAt)
    ? Date.now() - Number(data.startedAt)
    : null;

  if (data.website || (elapsed !== null && elapsed >= 0 && elapsed < 1200)) {
    return { status: "ok" };
  }

  const h = await headers();
  const ua = h.get("user-agent") ?? null;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    null;

  const supabase = await getServerClient();
  if (!supabase) {
    // Stub mode — log to server console so you can see the lead in dev.
    console.info("[contact] (stub) lead received:", {
      ...data,
      workflowType: data.workflowType || null,
      ua,
      ip,
      receivedAt: new Date().toISOString(),
    });
    return { status: "ok" };
  }

  const { error } = await supabase.from("leads").insert({
    name: data.name,
    email: data.email,
    company: data.company || null,
    message: data.workflowType
      ? `[Workflow: ${data.workflowType}]\n\n${data.message}`
      : data.message,
    source: "site_contact",
    ip,
    user_agent: ua,
  });

  if (error) {
    console.error("[contact] supabase insert failed:", error);
    return {
      status: "error",
      message: "Couldn't send right now — email hello@tryworkflowcrew.com instead.",
    };
  }

  // Side-effect: ping the operator. Wrapped in try/catch so a Resend
  // outage never breaks the user-facing submission — the lead is
  // already safely persisted in Supabase by this point.
  await notifyOperator({
    name: data.name,
    email: data.email,
    company: data.company || null,
    workflowType: data.workflowType || null,
    message: data.message,
  });

  return { status: "ok" };
}

interface OperatorNotification {
  name: string;
  email: string;
  company: string | null;
  workflowType: string | null;
  message: string;
}

/**
 * POST a notification to the operator's inbox via Resend's HTTP API
 * after a contact submission lands in Supabase. Pure side effect:
 * never throws, never blocks success of the parent action.
 *
 * Configure with:
 *   RESEND_API_KEY     from https://resend.com/api-keys
 *   RESEND_TO_EMAIL    your real inbox (where leads should land)
 *   RESEND_FROM_EMAIL  optional — sender. Defaults to Resend's
 *                      onboarding sandbox address until you've
 *                      verified tryworkflowcrew.com in Resend.
 *
 * If any required env var is missing, this no-ops silently and the
 * lead still persists in Supabase — operator just has to check
 * Supabase manually until they wire Resend.
 */
async function notifyOperator(submission: OperatorNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !toEmail) {
    return; // not configured yet — silent no-op
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Workflow Crew <onboarding@resend.dev>";

  const subject = `New lead: ${submission.name}${
    submission.company ? ` (${submission.company})` : ""
  }`;

  const escape = (s: string): string =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const html = `<!doctype html>
<html><body style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px;margin:24px auto;color:#111">
  <h2 style="margin:0 0 16px;font-size:18px">New contact submission</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    <tr><td style="padding:6px 12px 6px 0;color:#525252;width:120px">Name</td><td>${escape(submission.name)}</td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#525252">Email</td><td><a href="mailto:${escape(submission.email)}">${escape(submission.email)}</a></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#525252">Company</td><td>${escape(submission.company ?? "—")}</td></tr>
    ${submission.workflowType ? `<tr><td style="padding:6px 12px 6px 0;color:#525252">Workflow</td><td>${escape(submission.workflowType)}</td></tr>` : ""}
  </table>
  <hr style="border:0;border-top:1px solid #E0DCD0;margin:20px 0" />
  <p style="white-space:pre-wrap;font-size:14px;line-height:1.55;color:#111">${escape(submission.message)}</p>
</body></html>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: submission.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(
        "[contact] resend non-2xx:",
        res.status,
        body.slice(0, 300),
      );
    }
  } catch (err) {
    console.error("[contact] resend request failed:", err);
  }
}
