-- phase14: 更新 Header content_json 为新 Mega Menu 结构
-- 直接覆盖写入新 Schema 默认值（含 Capabilities + Solutions）

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
  "cta_text": "Get instant quote",
  "cta_href": "#",
  "top_banner": {
    "notification_text": "Accelerate your innovation with RapidDirect's new AI capabilities.",
    "notification_link_text": "Explore AI Make Studio",
    "notification_link_href": "#",
    "login_text": "Log in",
    "login_href": "#",
    "languages": [
      { "code": "en", "label": "English" },
      { "code": "de", "label": "Deutsch" },
      { "code": "fr", "label": "Français" },
      { "code": "ja", "label": "日本語" }
    ]
  },
  "nav_items": [
    {
      "label": "Capabilities",
      "href": "#",
      "mega_type": "capabilities",
      "sections": [
        {
          "section_label": "Mechanical Manufacturing",
          "tabs": [
            {
              "tab_label": "Machining",
              "is_muted": false,
              "cards": [
                { "label": "CNC Machining", "href": "#" },
                { "label": "CNC Milling", "href": "#" },
                { "label": "CNC Turning", "href": "#" },
                { "label": "CNC Routing", "href": "#" },
                { "label": "5 Axis CNC Machining", "href": "#" },
                { "label": "Precision CNC", "href": "#" }
              ],
              "image_url": ""
            },
            {
              "tab_label": "Fabrication",
              "is_muted": false,
              "cards": [
                { "label": "Sheet Metal Fabrication", "href": "#" },
                { "label": "Laser Cutting", "href": "#" },
                { "label": "Metal Bending", "href": "#" },
                { "label": "Waterjet Cutting", "href": "#" },
                { "label": "Tube Laser Cutting", "href": "#" },
                { "label": "Custom Enclosure", "href": "#" },
                { "label": "Welding Services", "href": "#" }
              ],
              "image_url": ""
            },
            {
              "tab_label": "Molding",
              "is_muted": false,
              "cards": [
                { "label": "Injection Molding", "href": "#" },
                { "label": "Injection Mold Tooling", "href": "#" },
                { "label": "Overmolding", "href": "#" },
                { "label": "Insert Molding", "href": "#" },
                { "label": "Low Volume Injection Molding", "href": "#" }
              ],
              "image_url": ""
            },
            {
              "tab_label": "3D Printing",
              "is_muted": false,
              "cards": [
                { "label": "3D Printing Prototyping", "href": "#" },
                { "label": "SLA", "href": "#" },
                { "label": "SLS", "href": "#" },
                { "label": "SLM", "href": "#" },
                { "label": "FDM", "href": "#" },
                { "label": "MJF", "href": "#" },
                { "label": "DLP", "href": "#" },
                { "label": "FGF", "href": "#" }
              ],
              "image_url": ""
            },
            {
              "tab_label": "Value-Added",
              "is_muted": true,
              "cards": [
                { "label": "3D Printing", "href": "#" },
                { "label": "Die Casting", "href": "#" },
                { "label": "Vacuum Casting", "href": "#" },
                { "label": "Wire EDM", "href": "#" },
                { "label": "Aluminum Extrusion", "href": "#" }
              ],
              "image_url": ""
            }
          ]
        },
        {
          "section_label": "Electronics Manufacturing",
          "tabs": [
            {
              "tab_label": "Core Services",
              "is_muted": false,
              "cards": [
                { "label": "EMS", "href": "#" },
                { "label": "PCB Design", "href": "#" },
                { "label": "PCB Assembly", "href": "#" },
                { "label": "PCB Manufacturing", "href": "#" },
                { "label": "Components Sourcing", "href": "#" }
              ],
              "image_url": ""
            }
          ]
        }
      ],
      "footer": { "browse_all_href": "#", "get_quote_href": "#" },
      "tabs": [],
      "industries_header_title": "",
      "industries_browse_href": "",
      "industries": [],
      "case_study": { "image_url": "", "tag": "", "title": "", "cta_label": "", "cta_href": "" },
      "platform_cards": [],
      "resource_sections": [],
      "about_banner_image_url": "",
      "about_banner_title": "",
      "about_banner_desc": "",
      "about_link_groups": []
    },
    {
      "label": "Solutions",
      "href": "#",
      "mega_type": "solutions",
      "sections": [],
      "footer": { "browse_all_href": "", "get_quote_href": "" },
      "tabs": [
        {
          "tab_label": "NPI Solutions",
          "panel_style": "npi",
          "panel_desc": "A one-stop product innovation service covering design, prototyping, mass production, and packaging.",
          "steps": [
            { "step_number": "1", "title": "Design & Engineering", "desc": "Turn concepts into precision parts.", "href": "" },
            { "step_number": "2", "title": "Verification Phase", "desc": "Rigorous prototyping validation.", "href": "" },
            { "step_number": "3", "title": "Mass Production", "desc": "Scale into high-volume production.", "href": "" },
            { "step_number": "4", "title": "Packaging Phase", "desc": "Market-ready solutions.", "href": "" },
            { "step_number": "5", "title": "Service Package", "desc": "Choose the ideal NPI package—from feasibility to mass production.", "href": "" }
          ],
          "cards": [],
          "cta1_label": "Explore NPI solutions",
          "cta1_href": "#",
          "cta2_href": "#",
          "image_url": ""
        },
        {
          "tab_label": "Manufacturing Solutions",
          "panel_style": "manufacturing",
          "panel_desc": "A lighter entry point for teams that already know the manufacturing service they need and want to go straight to execution.",
          "steps": [],
          "cards": [
            { "label": "Rapid Prototyping", "href": "#" },
            { "label": "On Demand Manufacturing", "href": "#" },
            { "label": "Surface Finishing", "href": "#" },
            { "label": "Assembly", "href": "#" },
            { "label": "Industrial Automation", "href": "#" }
          ],
          "cta1_label": "Browse manufacturing services",
          "cta1_href": "#",
          "cta2_href": "#",
          "image_url": ""
        }
      ],
      "industries_header_title": "",
      "industries_browse_href": "",
      "industries": [],
      "case_study": { "image_url": "", "tag": "", "title": "", "cta_label": "", "cta_href": "" },
      "platform_cards": [],
      "resource_sections": [],
      "about_banner_image_url": "",
      "about_banner_title": "",
      "about_banner_desc": "",
      "about_link_groups": []
    },
    {
      "label": "Industries",
      "href": "#",
      "mega_type": "industries",
      "sections": [],
      "footer": { "browse_all_href": "", "get_quote_href": "" },
      "tabs": [],
      "industries_header_title": "Industries We Serve",
      "industries_browse_href": "#",
      "industries": [
        { "label": "Aerospace", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M13.13 22.19L11.5 18.36C10.07 15.3 8.46 12.35 6.7 9.53L3.13 4.2C2.7 3.56 3.34 2.76 4.04 3.08L9.75 5.67C12.8 7.05 15.63 8.84 18.15 11L21.72 14.12C22.25 14.58 22.06 15.43 21.4 15.62L17.2 16.8M13.13 22.19C12.86 22.82 11.97 22.7 11.87 22M13.13 22.19L17.2 16.8\"/></svg>" },
        { "label": "Medical Devices", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM13 17H11V13H7V11H11V7H13V11H17V13H13V17Z\"/></svg>" },
        { "label": "Automotive", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M18.92 6.01C18.72 5.42 18.16 5 17.5 5H6.5C5.84 5 5.28 5.42 5.08 6.01L3 12V20C3 20.55 3.45 21 4 21H5C5.55 21 6 20.55 6 20V19H18V20C18 20.55 18.45 21 19 21H20C20.55 21 21 20.55 21 20V12L18.92 6.01ZM6.85 7H17.14L18.22 10.11H5.77L6.85 7ZM19 17H5V12H19V17ZM7.5 16C8.33 16 9 15.33 9 14.5C9 13.67 8.33 13 7.5 13C6.67 13 6 13.67 6 14.5C6 15.33 6.67 16 7.5 16ZM16.5 16C17.33 16 18 15.33 18 14.5C18 13.67 17.33 13 16.5 13C15.67 13 15 13.67 15 14.5C15 15.33 15.67 16 16.5 16Z\"/></svg>" },
        { "label": "Communication", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16ZM7 9H17V11H7V9Z\"/></svg>" },
        { "label": "Robotics", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M12 2C10.9 2 10 2.9 10 4V6H6C4.9 6 4 6.9 4 8V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V8C20 6.9 19.1 6 18 6H14V4C14 2.9 13.1 2 12 2ZM7.5 11C8.33 11 9 11.67 9 12.5C9 13.33 8.33 14 7.5 14C6.67 14 6 13.33 6 12.5C6 11.67 6.67 11 7.5 11ZM16.5 11C17.33 11 18 11.67 18 12.5C18 13.33 17.33 14 16.5 14C15.67 14 15 13.33 15 12.5C15 11.67 15.67 11 16.5 11ZM8 16H16V18H8V16Z\"/></svg>" },
        { "label": "Electronics", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M9 14.998L11 15V19H13V15L15 14.998C16.1 14.998 17 14.1 17 13V8C17 6.9 16.1 6 15 6H9C7.9 6 7 6.9 7 8V13C7 14.1 7.9 14.998 9 14.998ZM9 8H15V13H9V8ZM13 2H11V4H13V2ZM19 10H21V12H19V10ZM3 10H5V12H3V10Z\"/></svg>" },
        { "label": "New Energy", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M12 3L2 12H5V20H19V12H22L12 3ZM12 7.7C14.1 7.7 15.8 9.4 15.8 11.5C15.8 13.6 14.1 15.3 12 15.3C9.9 15.3 8.2 13.6 8.2 11.5C8.2 9.4 9.9 7.7 12 7.7Z\"/></svg>" },
        { "label": "Consumer Goods", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M21 16V6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16ZM19 16H5V6H19V16ZM8 12L14 8V16L8 12Z\"/></svg>" },
        { "label": "Industrial Machinery", "href": "#", "icon_svg": "<svg viewBox=\"0 0 24 24\"><path d=\"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94Z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6Z\"/></svg>" }
      ],
      "case_study": {
        "image_url": "",
        "tag": "Case Studies",
        "title": "How We Support Complex Industry Programs",
        "cta_label": "See industry case studies",
        "cta_href": "#"
      },
      "platform_cards": [],
      "resource_sections": [],
      "about_banner_image_url": "",
      "about_banner_title": "",
      "about_banner_desc": "",
      "about_link_groups": []
    },
    {
      "label": "Our Platform",
      "href": "#",
      "mega_type": "platform",
      "sections": [],
      "footer": { "browse_all_href": "", "get_quote_href": "" },
      "tabs": [],
      "industries_header_title": "",
      "industries_browse_href": "",
      "industries": [],
      "case_study": { "image_url": "", "tag": "", "title": "", "cta_label": "", "cta_href": "" },
      "platform_cards": [
        {
          "image_url": "",
          "title": "Quote Platform",
          "description": "Instant quoting workflows and Teamspace account management for collaborative manufacturing.",
          "links": [
            { "label": "Instant Quote Platform", "href": "#" },
            { "label": "Teamspace Account", "href": "#" }
          ],
          "list_style": "simple",
          "cta_label": "",
          "cta_href": ""
        },
        {
          "image_url": "",
          "title": "AI Creator Lab",
          "description": "Our new AI generative model platform to turn ideas into manufacturable designs—fast.",
          "links": [
            { "label": "Describe Your Idea", "href": "#" },
            { "label": "Generate & Refine", "href": "#" },
            { "label": "Export & Produce", "href": "#" }
          ],
          "list_style": "timeline",
          "cta_label": "Start Creating",
          "cta_href": "#"
        }
      ],
      "resource_sections": [],
      "about_banner_image_url": "",
      "about_banner_title": "",
      "about_banner_desc": "",
      "about_link_groups": []
    },
    {
      "label": "Resources",
      "href": "#",
      "mega_type": "resources",
      "sections": [],
      "footer": { "browse_all_href": "", "get_quote_href": "" },
      "tabs": [],
      "industries_header_title": "",
      "industries_browse_href": "",
      "industries": [],
      "case_study": { "image_url": "", "tag": "", "title": "", "cta_label": "", "cta_href": "" },
      "platform_cards": [],
      "resource_sections": [
        {
          "section_title": "Knowledge Base",
          "link_style": "simple",
          "links": [
            { "label": "Blog", "href": "#" },
            { "label": "News", "href": "#" },
            { "label": "eBooks & Guides", "href": "#" },
            { "label": "Case Studies", "href": "#" },
            { "label": "Help Center", "href": "#" }
          ],
          "service_items": [],
          "footer_label": "",
          "footer_href": ""
        },
        {
          "section_title": "Materials by Service",
          "link_style": "service",
          "links": [],
          "service_items": [
            { "title": "CNC Machining", "desc": "Precision-machined metal and plastic parts with tight tolerances.", "href": "#" },
            { "title": "3D Printing", "desc": "Rapid prototyping and end-use parts in metals and plastics.", "href": "#" },
            { "title": "Injection Molding", "desc": "Production-grade molded parts with a wide range of materials.", "href": "#" },
            { "title": "Sheet Metal Fabrication", "desc": "Formed and cut metal parts for brackets, enclosures, and more.", "href": "#" },
            { "title": "Urethane Casting", "desc": "Low-volume production parts with silicone mold replicas.", "href": "#" }
          ],
          "footer_label": "View all materials by service",
          "footer_href": "#"
        },
        {
          "section_title": "Surface Finishes",
          "link_style": "simple",
          "links": [
            { "label": "As Machined", "href": "#" },
            { "label": "Bead Blasting", "href": "#" },
            { "label": "Anodizing", "href": "#" },
            { "label": "Powder Coating", "href": "#" },
            { "label": "Painting", "href": "#" },
            { "label": "Polishing", "href": "#" },
            { "label": "Brushing", "href": "#" },
            { "label": "Black Oxide", "href": "#" }
          ],
          "service_items": [],
          "footer_label": "View all surface finishes",
          "footer_href": "#"
        }
      ],
      "about_banner_image_url": "",
      "about_banner_title": "",
      "about_banner_desc": "",
      "about_link_groups": []
    },
    {
      "label": "About",
      "href": "#",
      "mega_type": "about",
      "sections": [],
      "footer": { "browse_all_href": "", "get_quote_href": "" },
      "tabs": [],
      "industries_header_title": "",
      "industries_browse_href": "",
      "industries": [],
      "case_study": { "image_url": "", "tag": "", "title": "", "cta_label": "", "cta_href": "" },
      "platform_cards": [],
      "resource_sections": [],
      "about_banner_image_url": "",
      "about_banner_title": "About Us",
      "about_banner_desc": "Empowering engineers to build a better world through faster manufacturing.",
      "about_link_groups": [
        {
          "group_title": "Our Company",
          "links": [
            { "label": "About Us", "href": "#" },
            { "label": "Quality Assurance", "href": "#" },
            { "label": "Testimonials", "href": "#" }
          ]
        },
        {
          "group_title": "Contact & Careers",
          "links": [
            { "label": "Contact Us", "href": "#" },
            { "label": "Careers", "href": "#" },
            { "label": "Sponsorship", "href": "#" }
          ]
        }
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
  noindex = excluded.noindex,
  updated_at = now();