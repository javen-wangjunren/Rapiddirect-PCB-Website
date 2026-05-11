create extension if not exists pgcrypto;

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  template_type text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_content (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null unique references public.pages(id) on delete cascade,
  content_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.seo_meta (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null unique references public.pages(id) on delete cascade,
  meta_title text not null default '',
  meta_description text not null default '',
  canonical_url text not null default '',
  og_title text,
  og_description text,
  og_image text,
  noindex boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.pages enable row level security;
alter table public.page_content enable row level security;
alter table public.seo_meta enable row level security;

drop policy if exists pages_public_read_published on public.pages;
create policy pages_public_read_published
  on public.pages
  for select
  using (status = 'published');

drop policy if exists page_content_public_read_published on public.page_content;
create policy page_content_public_read_published
  on public.page_content
  for select
  using (exists (select 1 from public.pages p where p.id = page_id and p.status = 'published'));

drop policy if exists seo_meta_public_read_published on public.seo_meta;
create policy seo_meta_public_read_published
  on public.seo_meta
  for select
  using (exists (select 1 from public.pages p where p.id = page_id and p.status = 'published'));

