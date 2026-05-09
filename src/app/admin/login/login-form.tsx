"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/shared/logo";

import { loginAction } from "@/app/actions/admin";

const INITIAL: { error?: string } = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, INITIAL);

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4 py-16">
      <div className="flex w-full max-w-sm flex-col gap-8 rounded-2xl border border-border/60 bg-card/60 p-8 backdrop-blur-md">
        <div className="flex flex-col items-center gap-3">
          <Logo size={36} />
          <h1 className="text-xl font-semibold tracking-tight">
            buildroom.ai admin
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Stub auth — set <code className="font-mono text-xs">ADMIN_PASSWORD</code>{" "}
            in <code className="font-mono text-xs">.env.local</code>. Replace
            with Supabase Auth when ready.
          </p>
        </div>

        <form action={action} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              disabled={pending}
            />
          </div>
          {state?.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button type="submit" size="lg" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </div>
    </main>
  );
}
