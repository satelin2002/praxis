"use server";

import { redirect } from "next/navigation";

import { adminLogin, adminLogout } from "@/lib/admin-session";

export async function loginAction(
  _prev: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const password = String(formData.get("password") ?? "");
  const ok = await adminLogin(password);
  if (!ok) {
    return { error: "Invalid password." };
  }
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await adminLogout();
  redirect("/admin/login");
}
