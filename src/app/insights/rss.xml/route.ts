const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://buildroom.ai";

export const revalidate = 3600;

/*
 * Insights is intentionally OFF until real engagement-driven posts exist.
 * The RSS feed renders as an empty channel so any subscriber that hit it
 * before sees zero items rather than fabricated content. When real posts
 * land, restore the `getPosts()`-driven implementation from git history.
 */
export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>buildroom.ai · Insights</title>
    <link>${SITE_URL}/insights</link>
    <atom:link href="${SITE_URL}/insights/rss.xml" rel="self" type="application/rss+xml" />
    <description>Long-form posts from real engagements — publishing soon.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
