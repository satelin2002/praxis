import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export const metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-background px-6 py-20 text-foreground">
      <div className="flex w-full max-w-md flex-col items-center gap-7 text-center">
        <Logo size={44} />

        <div className="font-mono text-xs uppercase tracking-wider text-primary">
          404 · not found
        </div>

        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          That page didn&rsquo;t make it to production.
        </h1>

        <p className="text-balance text-base text-muted-foreground">
          Either the URL is wrong, or it&rsquo;s a page we deleted on the way
          to a sharper site. Try one of these instead.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="group">
            <Link href="/">
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/insights">
              Read insights
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
