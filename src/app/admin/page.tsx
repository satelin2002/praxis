import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin-session";

export default async function AdminIndex() {
  redirect((await isAdmin()) ? "/admin/dashboard" : "/admin/login");
}
