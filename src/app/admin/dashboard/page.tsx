import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, LogOut, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { isAdmin } from "@/lib/admin-session";
import { getServerClient } from "@/lib/supabase/server";

import { logoutAction } from "@/app/actions/admin";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

interface Lead {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
}

interface Subscriber {
  id: string;
  created_at: string;
  email: string;
  status: string;
}

export default async function AdminDashboardPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const supabase = await getServerClient();
  let leads: ReadonlyArray<Lead> = [];
  let subscribers: ReadonlyArray<Subscriber> = [];
  let stubMode = false;

  if (supabase) {
    const [leadsRes, subsRes] = await Promise.all([
      supabase
        .from("leads")
        .select("id, created_at, name, email, company, message")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("subscribers")
        .select("id, created_at, email, status")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);
    leads = (leadsRes.data ?? []) as Lead[];
    subscribers = (subsRes.data ?? []) as Subscriber[];
  } else {
    stubMode = true;
  }

  return (
    <div className="min-h-svh bg-background text-foreground antialiased">
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-300 items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo size={24} />
            <span className="font-semibold tracking-tight">buildroom.ai admin</span>
          </Link>
          <span className="ml-3 font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
            internal
          </span>

          <form action={logoutAction} className="ml-auto">
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-300 flex-col gap-10 px-4 py-12 sm:px-6">
        {stubMode ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-300">
            <strong className="font-semibold">Stub mode — </strong>
            no Supabase env vars detected. Form submissions are logged to the
            server console. Wire up{" "}
            <code className="font-mono text-xs">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            and{" "}
            <code className="font-mono text-xs">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            in <code className="font-mono text-xs">.env.local</code> to start
            persisting leads and subscribers.
          </div>
        ) : null}

        <Section title="Leads" icon={<Inbox className="size-4" />} count={leads.length}>
          {leads.length === 0 ? (
            <Empty>
              No leads yet. Submissions from the home-page contact form will
              appear here.
            </Empty>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/40 text-muted-foreground">
                  <tr>
                    <Th>received</Th>
                    <Th>name</Th>
                    <Th>email</Th>
                    <Th>company</Th>
                    <Th>message</Th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr
                      key={l.id}
                      className="border-t border-border/40 align-top hover:bg-card/40"
                    >
                      <Td className="whitespace-nowrap font-mono text-xs text-muted-foreground/80">
                        {new Date(l.created_at).toLocaleString()}
                      </Td>
                      <Td className="font-medium">{l.name}</Td>
                      <Td className="font-mono text-xs">{l.email}</Td>
                      <Td className="text-muted-foreground">
                        {l.company ?? "—"}
                      </Td>
                      <Td className="max-w-md whitespace-pre-wrap text-muted-foreground">
                        {l.message}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section
          title="Subscribers"
          icon={<Mail className="size-4" />}
          count={subscribers.length}
        >
          {subscribers.length === 0 ? (
            <Empty>No subscribers yet.</Empty>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border/60">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/40 text-muted-foreground">
                  <tr>
                    <Th>added</Th>
                    <Th>email</Th>
                    <Th>status</Th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr
                      key={s.id}
                      className="border-t border-border/40 hover:bg-card/40"
                    >
                      <Td className="whitespace-nowrap font-mono text-xs text-muted-foreground/80">
                        {new Date(s.created_at).toLocaleString()}
                      </Td>
                      <Td className="font-mono text-xs">{s.email}</Td>
                      <Td className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {s.status}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}

function Section({
  title,
  icon,
  count,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="inline-flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 tabular-nums">
          · {count}
        </span>
      </div>
      {children}
    </section>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-4 py-2.5 font-mono text-xs uppercase tracking-wider">
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 ${className ?? ""}`}>{children}</td>;
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border/60 bg-card/30 p-10 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
