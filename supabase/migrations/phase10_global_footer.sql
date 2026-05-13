with upsert_page as (
  insert into public.pages (slug, title, template_type, status)
  values ('/ems/_global/footer/', 'Global Footer', 'site_footer', 'published')
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
  "menus": {
    "capabilities": {
      "title": "Capabilities",
      "links": [
        { "label": "PCB Fabrication", "href": "/pcb-manufacturing/" },
        { "label": "PCB Assembly (PCBA)", "href": "/pcb-assembly/" },
        { "label": "PCB Design Services", "href": "/pcb-design/" },
        { "label": "Component Sourcing", "href": "/components-sourcing/" }
      ]
    },
    "resources": {
      "title": "Resources",
      "links": [
        { "label": "PCB Materials", "href": "#" },
        { "label": "Surface Finishes", "href": "#" },
        { "label": "Design Guidelines", "href": "#" },
        { "label": "Blog", "href": "#" }
      ]
    },
    "about": {
      "title": "About",
      "links": [
        { "label": "About RapidDirect", "href": "#" },
        { "label": "Our Platform", "href": "#" },
        { "label": "Quality Assurance", "href": "#" },
        { "label": "Certifications", "href": "#" },
        { "label": "Contact Us", "href": "#quote" }
      ]
    }
  }
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

