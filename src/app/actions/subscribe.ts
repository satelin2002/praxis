"use server";

import { z } from "zod";

import { getServerClient } from "@/lib/supabase/server";

const SubscribeSchema = z.object({
  email: z.string().email("Enter a valid email").max(200),
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.string().optional().or(z.literal("")),
});

export type SubscribeState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

export async function submitSubscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = SubscribeSchema.safeParse({
    email: formData.get("email"),
    website: formData.get("website"),
    startedAt: formData.get("startedAt"),
  });
  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Enter a valid email.",
    };
  }

  const elapsed = Number(parsed.data.startedAt)
    ? Date.now() - Number(parsed.data.startedAt)
    : null;

  if (
    parsed.data.website ||
    (elapsed !== null && elapsed >= 0 && elapsed < 1200)
  ) {
    return { status: "ok" };
  }

  const supabase = await getServerClient();
  if (!supabase) {
    console.info("[subscribe] (stub) email received:", parsed.data.email);
    return { status: "ok" };
  }

  const { error } = await supabase
    .from("subscribers")
    .upsert(
      { email: parsed.data.email, source: "site_footer" },
      { onConflict: "email" },
    );

  if (error) {
    console.error("[subscribe] supabase upsert failed:", error);
    return {
      status: "error",
      message: "Couldn't subscribe right now — try again in a moment.",
    };
  }
  return { status: "ok" };
}
