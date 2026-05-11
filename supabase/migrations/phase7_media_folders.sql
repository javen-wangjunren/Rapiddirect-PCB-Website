begin;

create table if not exists public.media_folders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  parent_id uuid null references public.media_folders(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_folders enable row level security;

drop policy if exists media_folders_select_authenticated on public.media_folders;
create policy media_folders_select_authenticated
  on public.media_folders
  for select
  to authenticated
  using (true);

drop policy if exists media_folders_insert_authenticated on public.media_folders;
create policy media_folders_insert_authenticated
  on public.media_folders
  for insert
  to authenticated
  with check (true);

drop policy if exists media_folders_update_authenticated on public.media_folders;
create policy media_folders_update_authenticated
  on public.media_folders
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists media_folders_delete_authenticated on public.media_folders;
create policy media_folders_delete_authenticated
  on public.media_folders
  for delete
  to authenticated
  using (true);

grant usage on schema public to authenticated;
grant select, insert, update, delete on public.media_folders to authenticated;

commit;

