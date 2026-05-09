/**
 * Server-side Supabase client. Stubbed until env vars are wired up.
 *
 * Replace the body of `getServerClient` with the standard
 * `@supabase/ssr` createServerClient pattern once SUPABASE_URL and
 * SUPABASE_ANON_KEY are set. Keep the seam: callers only know
 * about `getServerClient()` returning something they can `.from()`.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

let warned = false;

function isConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function getServerClient(): Promise<SupabaseClient | null> {
  if (!isConfigured()) {
    if (!warned && process.env.NODE_ENV !== "production") {
      console.warn(
        "[supabase] No NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY set — running in stub mode. Form submissions will be logged but not persisted.",
      );
      warned = true;
    }
    return null;
  }

  // Lazy-load to avoid bundling Supabase in the no-env stub path.
  const { createServerClient } = await import("@supabase/ssr");
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The "set" method was called from a Server Component. This can
            // be ignored if there's proxy refreshing user sessions.
          }
        },
      },
    },
  );
}
