begin;

alter table public.media_assets
  add column if not exists folder_id uuid null references public.media_folders(id) on delete set null;

update public.media_assets ma
set folder_id = mf.id
from lateral (
  select f.id
  from public.media_folders f
  where ma.path like f.path || '/%'
  order by length(f.path) desc
  limit 1
) mf
where ma.folder_id is null;

create index if not exists media_assets_folder_id_created_at_idx on public.media_assets (folder_id, created_at desc);
create index if not exists media_assets_folder_id_idx on public.media_assets (folder_id);

commit;

