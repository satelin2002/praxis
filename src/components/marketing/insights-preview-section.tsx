import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { getPosts } from "@/lib/posts";
import { tagColorClass } from "@/lib/tag-color";
import { cn } from "@/lib/utils";

export async function InsightsPreviewSection() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <section
      id="insights"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Insights"
          title="Writing on what we ship."
          description="Field notes from real engagements — what worked, what didn't, what we learned. The kind of post we'd send a prospect to settle whether we're for real."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-border/60 bg-background/40 p-6 transition-colors hover:border-primary/40 hover:bg-background/70"
            >
              <div className="relative -mx-1 aspect-[4/3] overflow-hidden rounded-lg border border-border/50 bg-secondary">
                <Image
                  src={p.image ?? "/images/praxis-og.png"}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-wider",
                    tagColorClass(p.tag),
                  )}
                >
                  {p.tag}
                </span>
                <span aria-hidden className="text-muted-foreground/40">
                  ·
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                  {p.readMinutes} min
                </span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {p.title}
              </h3>
              <p className="flex-1 text-base leading-relaxed text-muted-foreground">
                {p.excerpt}
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-primary">
                read
                <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild variant="outline" size="lg" className="group">
            <Link href="/insights">
              All insights
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
