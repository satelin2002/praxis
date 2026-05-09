import type { Metadata } from "next";
import { notFound } from "next/navigation";

/*
 * Insights is intentionally OFF until real engagement-driven posts exist.
 *
 *  - `generateStaticParams` returns no slugs  → no pages pre-rendered
 *  - `dynamicParams = false`                  → any slug 404s in production
 *  - the page component calls `notFound()`    → dev mode 404s as well
 *
 * The full post-rendering implementation (header, body renderer, JSON-LD
 * schema, Problem→Solution callout, hero image) is preserved in git
 * history. Restoring it is a one-commit revert when real posts ship.
 */

export async function generateStaticParams(): Promise<
  Array<{ slug: string }>
> {
  return [];
}

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
};

export default async function InsightPostPage(): Promise<never> {
  notFound();
}
