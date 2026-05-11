begin;

create index if not exists pages_updated_at_idx on public.pages (updated_at desc);
create index if not exists pages_status_updated_at_idx on public.pages (status, updated_at desc);

create index if not exists media_assets_created_at_idx on public.media_assets (created_at desc);
create index if not exists media_assets_updated_at_idx on public.media_assets (updated_at desc);

commit;

