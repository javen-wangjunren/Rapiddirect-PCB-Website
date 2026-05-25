begin;

grant delete on public.pages to authenticated;
grant delete on public.page_content to authenticated;
grant delete on public.seo_meta to authenticated;

drop policy if exists pages_delete_authenticated on public.pages;
create policy pages_delete_authenticated on public.pages
for delete
to authenticated
using (true);

drop policy if exists page_content_delete_authenticated on public.page_content;
create policy page_content_delete_authenticated on public.page_content
for delete
to authenticated
using (true);

drop policy if exists seo_meta_delete_authenticated on public.seo_meta;
create policy seo_meta_delete_authenticated on public.seo_meta
for delete
to authenticated
using (true);

commit;
