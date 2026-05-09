import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin-session";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Admin · sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin/dashboard");
  return <LoginForm />;
}
