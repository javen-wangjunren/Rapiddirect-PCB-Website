begin;

update public.page_content as pc
set
  content_json = jsonb_set(
    pc.content_json,
    '{hero,title}',
    to_jsonb('One-Stop Pcb Service'::text),
    true
  ),
  updated_at = now()
from public.pages as p
where pc.page_id = p.id
  and p.slug = '/ems/'
  and p.status = 'published';

commit;
