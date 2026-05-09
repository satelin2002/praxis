"use server";

import { cookies } from "next/headers";

import {
  ADMIN_COOKIE,
  createAdminToken,
  verifyAdminToken,
} from "@/lib/admin-cookie";

/**
 * Stub admin gating. Until Supabase Auth is wired up, the admin area
 * is protected by a single password compared to ADMIN_PASSWORD (set
 * in .env.local). When Supabase Auth comes online, replace these
 * functions with `supabase.auth.getUser()` checks — the seam is the
 * `requireAdmin()` boolean.
 */

export async function adminLogin(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    console.warn(
      "[admin] ADMIN_PASSWORD env var not set — login will reject everything.",
    );
    return false;
  }
  if (password !== expected) return false;

  const session = createAdminToken();
  if (!session) return false;

  (await cookies()).set(ADMIN_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: session.maxAge,
  });
  return true;
}

export async function adminLogout(): Promise<void> {
  (await cookies()).delete(ADMIN_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  return verifyAdminToken((await cookies()).get(ADMIN_COOKIE)?.value);
}
