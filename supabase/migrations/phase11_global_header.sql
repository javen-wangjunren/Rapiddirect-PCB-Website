with upsert_page as (
  insert into public.pages (slug, title, template_type, status)
  values ('/ems/_global/header/', 'Global Header', 'site_header', 'published')
  on conflict (slug)
  do update set
    title = excluded.title,
    template_type = excluded.template_type,
    status = excluded.status,
    updated_at = now()
  returning id
),
upsert_content as (
  insert into public.page_content (page_id, content_json)
  select
    id,
    $json$
{
  "logo_url": "",
  "cta_text": "Get A Quote",
  "cta_href": "#",
  "nav_items": [
    { "label": "PCB Fabrication", "href": "#", "children": [] },
    { "label": "PCB Assembly", "href": "#", "children": [] },
    { "label": "PCB Design", "href": "#", "children": [] },
    { "label": "Component Sourcing", "href": "#", "children": [] },
    {
      "label": "Mechanical Services",
      "href": "#",
      "children": [
        { "label": "CNC Machining", "href": "#" },
        { "label": "3D Printing", "href": "#" },
        { "label": "Sheet Metal Fabrication", "href": "#" },
        { "label": "Injection Molding", "href": "#" }
      ]
    }
  ]
}
    $json$::jsonb
  from upsert_page
  on conflict (page_id)
  do update set
    content_json = excluded.content_json,
    updated_at = now()
  returning page_id
)
insert into public.seo_meta (page_id, meta_title, meta_description, canonical_url, og_title, og_description, og_image, noindex)
select
  page_id,
  '',
  '',
  '',
  '',
  '',
  null,
  true
from upsert_content
on conflict (page_id)
do update set
  meta_title = excluded.meta_title,
  meta_description = excluded.meta_description,
  canonical_url = excluded.canonical_url,
  og_title = excluded.og_title,
  og_description = excluded.og_description,
  og_image = excluded.og_image,
  noindex = excluded.noindex,
  updated_at = now();
