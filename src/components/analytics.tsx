import Script from "next/script";

/**
 * Plausible analytics — only mounts if NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 * is set. Privacy-friendly, no cookie banner needed in EU. Swap for
 * PostHog / GA / Posthog by replacing this component if you outgrow it.
 *
 * Custom-domain proxy is supported via NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL —
 * default is plausible.io's hosted script.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;

  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL ||
    "https://plausible.io/js/script.outbound-links.js";

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}
