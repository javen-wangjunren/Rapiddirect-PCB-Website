begin;

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null unique,
  public_url text not null,
  title text not null default '',
  alt text not null default '',
  mime_type text,
  size bigint,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;

drop policy if exists media_assets_select_authenticated on public.media_assets;
create policy media_assets_select_authenticated
  on public.media_assets
  for select
  to authenticated
  using (true);

drop policy if exists media_assets_insert_authenticated on public.media_assets;
create policy media_assets_insert_authenticated
  on public.media_assets
  for insert
  to authenticated
  with check (true);

drop policy if exists media_assets_update_authenticated on public.media_assets;
create policy media_assets_update_authenticated
  on public.media_assets
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists media_assets_delete_authenticated on public.media_assets;
create policy media_assets_delete_authenticated
  on public.media_assets
  for delete
  to authenticated
  using (true);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.media_assets to authenticated;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true, name = excluded.name;

drop policy if exists storage_media_select_authenticated on storage.objects;
create policy storage_media_select_authenticated
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'media');

drop policy if exists storage_media_insert_authenticated on storage.objects;
create policy storage_media_insert_authenticated
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'media');

drop policy if exists storage_media_update_authenticated on storage.objects;
create policy storage_media_update_authenticated
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');

drop policy if exists storage_media_delete_authenticated on storage.objects;
create policy storage_media_delete_authenticated
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'media');

commit;
