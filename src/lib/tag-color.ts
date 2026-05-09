import type { Post } from "./posts";

/**
 * Tag color rule: Case study = green (primary), everything else = blue
 * (info). The split lets a buyer distinguish at a glance:
 *   green tag → real engagement we shipped (proof)
 *   blue tag  → principle / field note (thinking)
 *
 * Used by /insights index, /insights/[slug], and the Insights preview
 * section on the landing page.
 */
export function tagColorClass(tag: Post["tag"]): string {
  return tag === "Case study" ? "text-primary" : "text-info";
}
