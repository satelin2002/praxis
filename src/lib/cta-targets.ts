/*
 * Single source of truth for CTA destinations across the site.
 *
 * Every Subscribe / Audit / Talk-to-us button reads from this file.
 * When the Cal.com (or Calendly) link is live, change `BOOKING_URL`
 * here ONCE — the header, hero, pricing tiers, sticky mobile CTA,
 * final CTA, and footer all pick it up automatically.
 *
 * Until then, all booking CTAs route to a pre-subjected mailto
 * fallback so prospects still reach a real inbox without seeing a
 * dead link.
 */

/**
 * Destination for "Book a free workflow audit" / "Discuss a pilot"
 * style CTAs. Live Calendly link.
 */
export const BOOKING_URL =
  "https://calendly.com/workflowcrew/free-workflow-audit";

/**
 * Plain mailto for "or email us" links.
 */
export const EMAIL_URL = "mailto:hello@buildroom.ai";

/**
 * The display address (used for visible link text where we want the
 * email to read as the address, not "click here").
 */
export const EMAIL_DISPLAY = "hello@buildroom.ai";

/**
 * `true` when {@link BOOKING_URL} is the mailto fallback rather than
 * a live calendar link. Components can use this to decorate CTAs
 * differently if they want — e.g. open in a new tab when it's a real
 * calendar URL but not when it's a mailto.
 */
export const IS_BOOKING_EXTERNAL = !BOOKING_URL.startsWith("mailto:");
