"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("[error.tsx] uncaught render error:", error);
  }, [error]);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-20 text-foreground">
      <div className="flex w-full max-w-md flex-col items-center gap-7 text-center">
        <Logo size={44} />

        <div className="font-mono text-xs uppercase tracking-wider text-primary">
          something broke
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          That render didn&rsquo;t survive contact with production.
        </h1>

        <p className="text-balance text-base text-muted-foreground">
          A page-level error. Try refreshing — and if it keeps happening,
          email{" "}
          <a
            href="mailto:hello@buildroom.ai"
            className="text-info underline-offset-4 hover:underline"
          >
            hello@buildroom.ai
          </a>
          .
        </p>

        {error.digest ? (
          <code className="rounded-md border border-border/60 bg-card/40 px-3 py-1.5 font-mono text-xs text-muted-foreground/80">
            ref: {error.digest}
          </code>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg" className="group">
            <RefreshCw className="size-4 transition-transform group-hover:rotate-90" />
            Try again
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
