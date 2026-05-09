# Praxis

Marketing site for Praxis — production-grade AI agents for B2B teams.

Built with Next.js 16 (App Router) + Tailwind v4 + shadcn-style primitives,
running in **stub mode** until Supabase is wired up. Form submissions log to
the server console; the admin dashboard renders the Supabase warning banner.

## Stack

- **Framework**: Next.js 16, React 19, TypeScript, App Router
- **Styling**: Tailwind v4 (`@theme inline` + OKLCH tokens), `tw-animate-css`
- **UI**: hand-rolled shadcn-style primitives (Button, Badge, Card, Input,
  Textarea, Label, Accordion) under `src/components/ui/`
- **Theming**: dark by default, blue (`#3B82F6`) single accent — see
  `src/app/globals.css` for the full token set
- **Fonts**: Inter (sans), Spline Sans Mono (mono), Excon (display, via
  Fontshare)
- **Backend**: Supabase (`@supabase/ssr`) — leads, subscribers, posts. Schema
  in `src/lib/supabase/schema.sql`. Stubbed until env vars are set.
- **Forms**: React 19 `useActionState` + server actions. Validation via Zod.
- **Auth**: stub admin gate (single `ADMIN_PASSWORD` env var). Replace with
  Supabase Auth when ready.

## Routes

| Path                       | Type    | Notes                                      |
| -------------------------- | ------- | ------------------------------------------ |
| `/`                        | static  | Marketing landing (10 sections)            |
| `/insights`                | static  | Blog index, mock posts in `lib/posts.ts`   |
| `/insights/[slug]`         | SSG     | Pre-rendered for each mock post            |
| `/admin`                   | dynamic | Redirects to `/admin/login` or `/dashboard` |
| `/admin/login`             | dynamic | Stub password gate                         |
| `/admin/dashboard`         | dynamic | Lists leads + subscribers from Supabase    |

## Getting started

```bash
npm install
cp .env.example .env.local       # optional — fill in values to leave stub mode
npm run dev                       # http://localhost:3000
```

The site runs without any environment variables. In stub mode:

- Contact form submissions log to the dev server console as
  `[contact] (stub) lead received: …`
- Newsletter signups log as `[subscribe] (stub) email received: …`
- The admin dashboard renders an amber banner explaining stub mode

## Wiring up Supabase

1. **Create a project** at [supabase.com](https://supabase.com).
2. **Run the schema**: open the project's SQL editor and paste
   `src/lib/supabase/schema.sql`. This creates `leads`, `subscribers`, and
   `posts` with row-level-security policies appropriate for a public-facing
   marketing form + authenticated admin reads.
3. **Set env vars** in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
   ADMIN_PASSWORD=<generate with: openssl rand -base64 32>
   ```
4. **Restart the dev server.** The stub-mode warning disappears; submissions
   persist; the admin dashboard reads from Postgres.

When you're ready to swap the password gate for real Supabase Auth, the seam
is `src/lib/admin-session.ts` — replace `isAdmin()` with a
`supabase.auth.getUser()` check and the dashboard already uses it.

## Migrating posts to Supabase

`src/lib/posts.ts` exposes `getPosts()` / `getPost(slug)` against an in-memory
list. Each function has a comment marker (`SUPABASE SEAM`) showing the
equivalent Supabase query — replace the function bodies, keep the signatures,
and the routes will pick up the change with no other edits.

## Scripts

```bash
npm run dev        # turbopack dev server
npm run build      # production build
npm run start      # production server
npm run lint       # eslint, max-warnings 0
```

## Design system

Colors, fonts, and animations are defined in
[`src/app/globals.css`](src/app/globals.css). The palette is deliberately
restrained: a single blue accent on near-black surfaces, four-step gray
hierarchy, no neon, no rainbow gradients. Shared marketing primitives
(`useFadeIn`, `SectionHeading`, `BackgroundOrbs`) live under
`src/components/marketing/utils.ts` and `src/components/shared/`.

## Deploy on Vercel

```bash
vercel
```

Set the same env vars (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ADMIN_PASSWORD`,
`NEXT_PUBLIC_SITE_URL`) in the Vercel project settings before promoting to
production.
