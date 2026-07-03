alter table public.seo_meta
add column if not exists service_schema jsonb not null default '{}'::jsonb;

