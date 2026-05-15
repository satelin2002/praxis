import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { ProblemSolutionCallout } from "@/components/shared/problem-solution-callout";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, IS_BOOKING_EXTERNAL } from "@/lib/cta-targets";
import { getPost, getPosts, type Post } from "@/lib/posts";
import { tagColorClass } from "@/lib/tag-color";
import { cn } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tryworkflowcrew.com";

function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${post.slug}`,
    },
    image: post.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: "Workflow Crew", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Workflow Crew",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    articleSection: post.tag,
    timeRequired: `PT${post.readMinutes}M`,
  };
}

export async function generateStaticParams(): Promise<
  Array<{ slug: string }>
> {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function InsightPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(post)),
        }}
      />
      <MarketingHeader />
      <main className="px-4 py-16 sm:px-6 sm:py-24">
        <article className="mx-auto flex w-full max-w-3xl flex-col gap-10">
          <Link
            href="/insights"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-0.5" />
            All insights
          </Link>

          <header className="mx-auto flex w-full max-w-2xl flex-col gap-4 border-b border-border/40 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "font-mono text-xs uppercase tracking-wider",
                  tagColorClass(post.tag),
                )}
              >
                {post.tag}
              </span>
              <span aria-hidden className="text-muted-foreground/40">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70 tabular-nums">
                {formatDate(post.publishedAt)}
              </span>
              <span aria-hidden className="text-muted-foreground/40">
                ·
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                {post.readMinutes} min
              </span>
            </div>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="text-balance text-lg leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          </header>

          {post.image ? (
            <div className="relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-secondary shadow-sm">
              <Image
                src={post.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}

          <ProblemSolutionCallout
            problem={post.problem}
            solution={post.solution}
          />

          <BodyRenderer blocks={post.body} />

          <FooterCta />
        </article>
      </main>
      <MarketingFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * Body renderer
 *
 * Body strings carry a tiny markdown-marker convention:
 *   "## "  → h2
 *   "### " → h3
 *   "- "   → consecutive items batch into a <ul>
 *   "> "   → blockquote
 *   else   → paragraph
 *
 * Inline support: **bold**, `code`, [text](url).
 * No nested lists, no images, no tables. Keep it boring.
 * ───────────────────────────────────────────────────────────────── */

function BodyRenderer({ blocks }: { blocks: ReadonlyArray<string> }) {
  const groups = groupBlocks(blocks);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 text-base leading-relaxed text-foreground/90 sm:text-lg">
      {groups.map((group, i) => {
        if (group.type === "ul") {
          return (
            <ul
              key={i}
              className="flex flex-col gap-2 pl-1 marker:text-primary [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.65em] [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-primary"
            >
              {group.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (group.type === "h2") {
          return (
            <h2
              key={i}
              className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              <Inline text={group.text} />
            </h2>
          );
        }
        if (group.type === "h3") {
          return (
            <h3
              key={i}
              className="mt-4 text-lg font-semibold tracking-tight text-foreground sm:text-xl"
            >
              <Inline text={group.text} />
            </h3>
          );
        }
        if (group.type === "quote") {
          return (
            <blockquote
              key={i}
              className="border-l-4 border-primary/40 bg-primary/5 py-3 pl-5 pr-3 text-base italic leading-relaxed text-foreground/85"
            >
              <Inline text={group.text} />
            </blockquote>
          );
        }
        return (
          <p key={i}>
            <Inline text={group.text} />
          </p>
        );
      })}
    </div>
  );
}

type BodyGroup =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "p"; text: string };

function groupBlocks(blocks: ReadonlyArray<string>): BodyGroup[] {
  const out: BodyGroup[] = [];
  for (const raw of blocks) {
    if (raw.startsWith("## ")) {
      out.push({ type: "h2", text: raw.slice(3) });
    } else if (raw.startsWith("### ")) {
      out.push({ type: "h3", text: raw.slice(4) });
    } else if (raw.startsWith("- ")) {
      const item = raw.slice(2);
      const tail = out[out.length - 1];
      if (tail?.type === "ul") {
        tail.items.push(item);
      } else {
        out.push({ type: "ul", items: [item] });
      }
    } else if (raw.startsWith("> ")) {
      out.push({ type: "quote", text: raw.slice(2) });
    } else {
      out.push({ type: "p", text: raw });
    }
  }
  return out;
}

/* Minimal inline-markup renderer.
 *   **bold**         → <strong>
 *   `code`           → <code>
 *   [text](url)      → <a>
 * Anything else passes through as plain text. Order matters: links
 * first (because their URLs can contain * and `), then bold, then code. */
function Inline({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  const pattern =
    /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      nodes.push(text.slice(cursor, match.index));
    }
    if (match[1] && match[2]) {
      nodes.push(
        <a
          key={`a-${match.index}`}
          href={match[2]}
          className="text-info underline-offset-4 hover:underline"
        >
          {match[1]}
        </a>,
      );
    } else if (match[3]) {
      nodes.push(
        <strong key={`b-${match.index}`} className="font-semibold text-foreground">
          {match[3]}
        </strong>,
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={`c-${match.index}`}
          className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground"
        >
          {match[4]}
        </code>,
      );
    }
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return <>{nodes}</>;
}

function FooterCta() {
  return (
    <footer className="mx-auto mt-8 flex w-full max-w-2xl flex-col gap-4 border-t border-border/40 pt-8">
      <p className="text-base text-muted-foreground">
        If any of this sounds like your business and you want a free 15-minute
        audit on which of these gaps is costing you the most, book a call.
        I&rsquo;ll pull your Google Business Profile + public information and
        come to the call with a one-pager on what I&rsquo;d fix first.
      </p>
      <div>
        <Button asChild size="lg" className="group">
          <Link
            href={BOOKING_URL}
            target={IS_BOOKING_EXTERNAL ? "_blank" : undefined}
            rel={IS_BOOKING_EXTERNAL ? "noopener noreferrer" : undefined}
          >
            Book a free 15-min audit
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </footer>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
