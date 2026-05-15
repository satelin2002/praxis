#!/usr/bin/env node
/**
 * Generate hero images for the blog posts in src/lib/posts.ts via the
 * xAI Grok API.
 *
 *   Setup:
 *     1. Get an xAI API key from https://console.x.ai → API Keys
 *     2. Set XAI_API_KEY in .env.local (or export it in your shell)
 *     3. Run:  node scripts/generate-blog-images.mjs
 *
 *   Cost:
 *     Roughly $0.07/image at the time of writing. Three posts = ~$0.21.
 *     Check current pricing at https://docs.x.ai/docs/pricing
 *
 *   Output:
 *     Writes PNGs to public/blog/<slug>.png. Re-running the script will
 *     overwrite existing files. Use the --only flag to regenerate a
 *     single post:
 *
 *       node scripts/generate-blog-images.mjs --only hvac-missed-lead-patterns
 *
 *   What this script does NOT do:
 *     - Doesn't deploy anywhere. Generated images are local files that
 *       get picked up by Next.js on the next build/commit. Commit the
 *       PNGs to git after running (they're product assets).
 *     - Doesn't crop or resize. Grok returns whatever aspect ratio the
 *       prompt asked for; we ask for 16:9 to match the post layout.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "blog");
const ENV_LOCAL = path.join(ROOT, ".env.local");

/* ── Per-post image prompts ──────────────────────────────────────
   Style brief: editorial photography. Concrete, real-world scenes
   tied to the post's subject. Avoid AI-art clichés (no glowing orbs,
   no robotic hands, no "neural network" visuals). Warm natural light.
   Composition that reads cleanly when used as a 16:9 hero card. */
const POSTS = [
  {
    slug: "hvac-missed-lead-patterns",
    prompt:
      "Editorial photograph of a small HVAC contractor's office at dusk: a desk with paperwork, a deskphone with a blinking voicemail light, work boots on the floor, and a wall calendar. Late-afternoon golden window light. Composition leaves negative space in the upper-right where text could overlay. Photorealistic, shallow depth of field, no people in frame, 16:9 aspect ratio.",
  },
  {
    slug: "hvac-estimate-followup-cadence",
    prompt:
      "Editorial photograph, top-down view: an HVAC estimate document on a kitchen table next to a half-empty coffee mug, an open notebook with a pen, and a smartphone showing a calendar app. Natural morning window light. Warm domestic feeling — the moment a homeowner is deciding. Photorealistic, no faces, no glowing screens, 16:9 aspect ratio.",
  },
  {
    slug: "hvac-inbox-audit-15-minutes",
    prompt:
      "Editorial photograph, top-down close-up of a contractor's smartphone resting on a worn workbench, screen showing a long list of missed calls and unread text-message notifications. Tools (a wrench, a meter, a clipboard) visible at the edges of the frame. Warm warehouse-style overhead lighting. Photorealistic, shallow focus on the phone, 16:9 aspect ratio.",
  },
  {
    slug: "real-estate-response-time-window",
    prompt:
      "Editorial photograph: an open laptop on a real estate agent's desk showing a property listing form submission with a fresh timestamp, a smartphone next to it with a missed-call notification, a small house keychain and a coffee cup. Morning natural light from a window with blurred residential street outside. Warm professional feeling, photorealistic, no faces, 16:9 aspect ratio.",
  },
  {
    slug: "dental-practice-no-show-cadence",
    prompt:
      "Editorial photograph of an empty dental operatory chair under soft morning light, clean professional environment, dental instrument tray visible to one side, large window in the background with daylight. Conveys quiet, unused capacity. Photorealistic, no people, no glowing screens, clean clinical aesthetic but warm not sterile, 16:9 aspect ratio.",
  },
  {
    slug: "law-firm-intake-automation",
    prompt:
      "Editorial photograph, slight overhead angle: an attorney's wooden desk with a yellow legal pad and pen, a single closed manila folder labeled INTAKE, a desk phone with the handset just placed down, and a reading lamp casting warm light across the scene. Soft afternoon light from a window on the left. Conveys quiet focus and order. Photorealistic, no faces, no monitors, 16:9 aspect ratio.",
  },
  {
    slug: "auto-repair-review-compounding",
    prompt:
      "Editorial photograph inside a clean independent auto repair shop: a customer's car keys resting on the service counter next to a printed invoice and a smartphone showing a text-message conversation. A repair bay with a vehicle on a lift visible softly in the blurred background. Natural workshop light, warm and earned. Photorealistic, no faces, no glowing screens, 16:9 aspect ratio.",
  },
];

// ── env loading ────────────────────────────────────────────────────
async function loadEnvLocal() {
  try {
    const raw = await fs.readFile(ENV_LOCAL, "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* .env.local optional */
  }
}

// ── Grok image API ─────────────────────────────────────────────────
async function generateImage({ prompt, apiKey, model }) {
  const res = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      n: 1,
      response_format: "url",
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `xAI API ${res.status}: ${body.slice(0, 400) || res.statusText}`,
    );
  }

  const json = await res.json();
  const url = json.data?.[0]?.url;
  if (!url) {
    throw new Error(
      `xAI response missing image URL: ${JSON.stringify(json).slice(0, 400)}`,
    );
  }

  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    throw new Error(
      `Image fetch ${imgRes.status} for url ${url}: ${imgRes.statusText}`,
    );
  }
  return Buffer.from(await imgRes.arrayBuffer());
}

// ── main ───────────────────────────────────────────────────────────
async function main() {
  await loadEnvLocal();

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    console.error(
      "✗ XAI_API_KEY is not set.\n" +
        "  Add it to .env.local (or export XAI_API_KEY=...) and re-run.\n" +
        "  Get a key at https://console.x.ai → API Keys",
    );
    process.exit(1);
  }

  const model = process.env.XAI_IMAGE_MODEL || "grok-2-image-1212";

  // Parse --only filter
  const onlyIdx = process.argv.indexOf("--only");
  const onlySlug = onlyIdx >= 0 ? process.argv[onlyIdx + 1] : null;

  const targets = onlySlug
    ? POSTS.filter((p) => p.slug === onlySlug)
    : POSTS;

  if (targets.length === 0) {
    console.error(
      `✗ No posts matched --only ${onlySlug}. Available slugs:\n` +
        POSTS.map((p) => `    ${p.slug}`).join("\n"),
    );
    process.exit(1);
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const post of targets) {
    const outPath = path.join(OUT_DIR, `${post.slug}.png`);
    process.stdout.write(`→ ${post.slug} … `);
    try {
      const buffer = await generateImage({
        prompt: post.prompt,
        apiKey,
        model,
      });
      await fs.writeFile(outPath, buffer);
      console.log(
        `✓ ${Math.round(buffer.byteLength / 1024)}KB → ${path.relative(ROOT, outPath)}`,
      );
    } catch (err) {
      console.log("✗");
      console.error(`  ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(
    "\nDone. Commit the PNGs in public/blog/ to git when you're happy with them.",
  );
}

main().catch((err) => {
  console.error("\n✗ fatal:", err);
  process.exit(1);
});
