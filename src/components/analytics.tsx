import Script from "next/script";

/**
 * Analytics. Renders zero, one, or both providers based on which
 * env vars are set:
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN     → load Plausible
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID    → load Google Analytics 4
 *
 * Plausible is privacy-friendly (no cookies, no PII, no consent
 * banner needed in EU). GA4 is the industry default but DOES set
 * first-party cookies and send IP + user-agent to Google. If you
 * turn on GA4, update /privacy ("What we collect" + "Cookies"
 * sections) to mention it explicitly.
 *
 * Custom-domain proxy for Plausible is supported via
 * NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL — default is plausible.io's
 * hosted script.
 */
export function Analytics() {
  return (
    <>
      <PlausibleAnalytics />
      <GoogleAnalytics />
    </>
  );
}

function PlausibleAnalytics() {
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

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
