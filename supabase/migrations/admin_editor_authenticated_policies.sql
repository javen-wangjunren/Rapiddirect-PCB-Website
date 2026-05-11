begin;

grant usage on schema public to authenticated;

grant select, insert, update on public.pages to authenticated;
grant select, insert, update on public.page_content to authenticated;
grant select, insert, update on public.seo_meta to authenticated;

alter table public.pages enable row level security;
alter table public.page_content enable row level security;
alter table public.seo_meta enable row level security;

drop policy if exists pages_select_authenticated on public.pages;
create policy pages_select_authenticated on public.pages
for select
to authenticated
using (true);

drop policy if exists pages_write_authenticated on public.pages;
create policy pages_write_authenticated on public.pages
for insert
to authenticated
with check (true);

drop policy if exists pages_update_authenticated on public.pages;
create policy pages_update_authenticated on public.pages
for update
to authenticated
using (true)
with check (true);

drop policy if exists page_content_select_authenticated on public.page_content;
create policy page_content_select_authenticated on public.page_content
for select
to authenticated
using (true);

drop policy if exists page_content_write_authenticated on public.page_content;
create policy page_content_write_authenticated on public.page_content
for insert
to authenticated
with check (true);

drop policy if exists page_content_update_authenticated on public.page_content;
create policy page_content_update_authenticated on public.page_content
for update
to authenticated
using (true)
with check (true);

drop policy if exists seo_meta_select_authenticated on public.seo_meta;
create policy seo_meta_select_authenticated on public.seo_meta
for select
to authenticated
using (true);

drop policy if exists seo_meta_write_authenticated on public.seo_meta;
create policy seo_meta_write_authenticated on public.seo_meta
for insert
to authenticated
with check (true);

drop policy if exists seo_meta_update_authenticated on public.seo_meta;
create policy seo_meta_update_authenticated on public.seo_meta
for update
to authenticated
using (true)
with check (true);

commit;

