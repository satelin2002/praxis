import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPosts } from "@/lib/posts";
import { tagColorClass } from "@/lib/tag-color";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Patterns and playbooks for small businesses automating the work that's eating their team's time — written from what we actually see in the field.",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsIndexPage() {
  const posts = await getPosts();

  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <MarketingHeader />
      <main>
        <section className="px-4 pt-20 pb-10 sm:px-6 sm:pt-28 sm:pb-12">
          <div className="mx-auto w-full max-w-300">
            <SectionHeading
              eyebrow="Insights"
              title="Patterns from the field."
              description="What we see when we look at how small businesses actually run — written for owners and operators, not other AI engineers. New posts ship as we have something specific worth saying."
              align="left"
            />
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6 sm:pb-32">
          <div className="mx-auto w-full max-w-300">
            <ul className="flex flex-col gap-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/insights/${p.slug}`}
                    className="group flex flex-col gap-5 rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/40 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6"
                  >
                    {p.image ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-secondary sm:aspect-square sm:w-44 sm:shrink-0">
                        <Image
                          src={p.image}
                          alt=""
                          fill
                          sizes="(min-width: 640px) 176px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className={cn(
                            "font-mono text-xs uppercase tracking-wider",
                            tagColorClass(p.tag),
                          )}
                        >
                          {p.tag}
                        </span>
                        <span aria-hidden className="text-muted-foreground/30">
                          ·
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 tabular-nums">
                          {formatDate(p.publishedAt)}
                        </span>
                        <span aria-hidden className="text-muted-foreground/30">
                          ·
                        </span>
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                          {p.readMinutes} min
                        </span>
                      </div>

                      <h2 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {p.title}
                      </h2>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {p.excerpt}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                        Read post
                        <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
