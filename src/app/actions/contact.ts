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
      message: "Couldn't send right now — email hello@buildroom.ai instead.",
    };
  }

  return { status: "ok" };
}
