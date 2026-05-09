-- buildroom.ai · Supabase schema
--
-- Apply via: Supabase SQL Editor → paste & run, or via supabase CLI.
-- All tables protected by RLS. Public-facing forms use a service role
-- via server actions; reads from the marketing site are restricted to
-- published content only.

-- ───────── leads (discovery-call form submissions) ─────────
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text         not null,
  email       text         not null,
  company     text,
  message     text,
  source      text         not null default 'site_contact',
  ip          text,
  user_agent  text
);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

alter table public.leads enable row level security;

-- Anonymous insert allowed (public form). No reads from anon.
create policy "leads_insert_any"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- Authenticated admins can read.
create policy "leads_select_admin"
  on public.leads for select
  to authenticated
  using (true);

-- ───────── subscribers (newsletter / lightweight email capture) ─────────
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  email       text         not null unique,
  status      text         not null default 'pending', -- pending | confirmed | unsubscribed
  source      text         not null default 'site_footer'
);
create index if not exists subscribers_status_idx on public.subscribers (status);

alter table public.subscribers enable row level security;

create policy "subscribers_insert_any"
  on public.subscribers for insert
  to anon, authenticated
  with check (true);

create policy "subscribers_select_admin"
  on public.subscribers for select
  to authenticated
  using (true);

-- ───────── posts (insights / blog) ─────────
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  slug          text         not null unique,
  title         text         not null,
  excerpt       text         not null,
  body          text         not null,                  -- markdown or plain text
  tag           text         not null default 'Field notes',
  read_minutes  int          not null default 5,
  status        text         not null default 'draft',  -- draft | published
  published_at  timestamptz
);
create index if not exists posts_published_at_idx on public.posts (published_at desc);
create index if not exists posts_status_idx on public.posts (status);

alter table public.posts enable row level security;

-- Anyone can read published posts.
create policy "posts_select_published"
  on public.posts for select
  to anon, authenticated
  using (status = 'published');

-- Only authenticated admins can write.
create policy "posts_modify_admin"
  on public.posts for all
  to authenticated
  using (true)
  with check (true);

-- ───────── updated_at trigger for posts ─────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute procedure public.set_updated_at();
