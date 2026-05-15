#!/usr/bin/env node
/**
 * Generate clean placeholder hero images for blog posts using `sharp`
 * (already in node_modules via Next.js).
 *
 *   Run:    node scripts/generate-blog-placeholders.mjs
 *   Output: 1200×675 PNGs at public/blog/<slug>.png
 *
 * Designed to look intentional, not "broken image." Subtle warm
 * background, brand eyebrow, post title, small "Placeholder" tag.
 * Once you run scripts/generate-blog-images.mjs with a real Grok
 * API key, the photographic versions overwrite these.
 *
 * Posts are read by importing the same data the site uses — keeps
 * placeholders in sync if you add or rename posts.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "blog");

// Import posts via tsx-free approach: read + parse the slug + title
// fields directly so we don't need a TS loader.
async function loadPosts() {
  const src = await fs.readFile(
    path.join(ROOT, "src", "lib", "posts.ts"),
    "utf8",
  );
  // Match each {slug: "...", title: "..."} pair in declaration order.
  // The posts.ts file uses double-quoted strings consistently.
  const slugRe = /slug:\s*"([^"]+)"/g;
  const titleRe = /title:\s*"([^"]+)"|title:\s*\n\s*"([^"]+)"/g;
  const slugs = [];
  let m;
  while ((m = slugRe.exec(src)) !== null) slugs.push(m[1]);
  const titles = [];
  while ((m = titleRe.exec(src)) !== null) titles.push(m[1] || m[2]);
  if (slugs.length !== titles.length) {
    throw new Error(
      `Slug/title count mismatch: ${slugs.length} slugs, ${titles.length} titles`,
    );
  }
  return slugs.map((slug, i) => ({ slug, title: titles[i] }));
}

// Escape XML/HTML in titles so weird characters don't break the SVG.
function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Wrap title into lines that fit a max character width.
function wrap(text, maxChars) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if (cur.length + w.length + 1 <= maxChars) {
      cur = cur ? `${cur} ${w}` : w;
    } else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

/**
 * Build the SVG markup for one placeholder card.
 * 1200×675 (16:9). Warm-bone background, near-black title, subtle
 * green accent stripe in the lower right, mono eyebrow up top.
 */
function buildSvg(title) {
  const W = 1200;
  const H = 675;
  const lines = wrap(title, 26);
  const lineHeight = 76;
  const titleStartY = H / 2 - ((lines.length - 1) * lineHeight) / 2;

  const titleTspans = lines
    .map(
      (line, i) =>
        `<tspan x="80" y="${titleStartY + i * lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAF9F6"/>
      <stop offset="100%" stop-color="#EDE9DF"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22C55E" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#15803D" stop-opacity="0.92"/>
    </linearGradient>
  </defs>

  <!-- background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- subtle dot pattern (top-left to centre) -->
  <g fill="#16A34A" fill-opacity="0.12">
    ${Array.from({ length: 6 }, (_, r) =>
      Array.from({ length: 12 }, (_, c) =>
        `<circle cx="${80 + c * 40}" cy="${80 + r * 40}" r="2"/>`,
      ).join(""),
    ).join("")}
  </g>

  <!-- diagonal accent stripe, bottom-right -->
  <polygon points="${W - 360},${H} ${W},${H - 360} ${W},${H}" fill="url(#accent)"/>
  <polygon points="${W - 420},${H} ${W - 30},${H - 360} ${W - 30},${H - 280}" fill="#16A34A" fill-opacity="0.18"/>

  <!-- top eyebrow -->
  <text x="80" y="90"
        font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="20" font-weight="600" letter-spacing="3"
        fill="#16A34A">
    WORKFLOW CREW &#183; INSIGHTS
  </text>

  <!-- title -->
  <text font-family="Inter, system-ui, sans-serif"
        font-size="64" font-weight="700" letter-spacing="-1.2"
        fill="#121212">
    ${titleTspans}
  </text>

  <!-- placeholder hint, bottom-left -->
  <text x="80" y="${H - 50}"
        font-family="ui-monospace, SFMono-Regular, Menlo, monospace"
        font-size="14" font-weight="500" letter-spacing="2"
        fill="#525252">
    PLACEHOLDER &#183; REPLACE VIA SCRIPTS/GENERATE-BLOG-IMAGES.MJS
  </text>

  <!-- brand wordmark, bottom-right -->
  <text x="${W - 80}" y="${H - 50}"
        text-anchor="end"
        font-family="Inter, system-ui, sans-serif"
        font-size="18" font-weight="700" letter-spacing="-0.3"
        fill="#FFFFFF">
    tryworkflowcrew.com
  </text>
</svg>`;
}

async function main() {
  const posts = await loadPosts();
  await fs.mkdir(OUT_DIR, { recursive: true });

  console.log(`Generating ${posts.length} placeholders → ${path.relative(ROOT, OUT_DIR)}`);

  for (const post of posts) {
    const svg = buildSvg(post.title);
    const outPath = path.join(OUT_DIR, `${post.slug}.png`);
    process.stdout.write(`  ${post.slug} … `);
    try {
      await sharp(Buffer.from(svg))
        .png({ compressionLevel: 9 })
        .toFile(outPath);
      const stat = await fs.stat(outPath);
      console.log(`✓ ${Math.round(stat.size / 1024)}KB`);
    } catch (err) {
      console.log("✗");
      console.error(`    ${err instanceof Error ? err.message : err}`);
      process.exitCode = 1;
    }
  }

  console.log(
    "\nDone. Commit the PNGs in public/blog/ to ship them. They'll be\n" +
      "overwritten next time you run scripts/generate-blog-images.mjs with\n" +
      "a real XAI_API_KEY set.",
  );
}

main().catch((err) => {
  console.error("\n✗ fatal:", err);
  process.exit(1);
});
