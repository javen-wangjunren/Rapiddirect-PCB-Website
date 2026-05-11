with upsert_page as (
  insert into public.pages (slug, title, template_type, status)
  values ('/ems/pcb-assembly/', 'PCB Assembly', 'pcb_assembly', 'published')
  on conflict (slug) do update
    set title = excluded.title,
        template_type = excluded.template_type,
        status = excluded.status,
        updated_at = now()
  returning id
),
upsert_content as (
  insert into public.page_content (page_id, content_json)
  select
    id,
    $$
    {
      "hero": {
        "title": "PCB Assembly",
        "background_image_url": "/images/hero/mocc9gyp-amg66hj.png",
        "benefits": [
          { "title": "DFM Review", "description": "Manufacturability checks before production to reduce risk." },
          { "title": "Fast Turnaround", "description": "Flexible lead times from prototype to low-volume runs." },
          { "title": "Quality Control", "description": "Process control and inspection aligned with your requirements." }
        ],
        "benefit_conclusion": "One team to assemble, verify, and deliver your boards reliably.",
        "cta": { "href": "#quote", "label": "GET A QUOTE" }
      },
      "capability": {
        "title": "Comprehensive PCBA Capabilities",
        "desc": "From precise 01005 SMT placement to complex mixed-technology assemblies, we deliver fully tested boards ready for integration.",
        "gallery": [
          { "name": "Surface Mount (SMT)", "image_url": "" },
          { "name": "Through-Hole (THT)", "image_url": "" },
          { "name": "Mixed Technology", "image_url": "" },
          { "name": "Flex PCBA", "image_url": "" },
          { "name": "Additional Services", "image_url": "" }
        ],
        "tabs": [
          {
            "id": "technical",
            "label": "Technical Capabilities",
            "cards": [
              {
                "title": "Component Types",
                "icon_url": "",
                "body": {
                  "kind": "list",
                  "items": [
                    "Passive Components: Min 01005 size",
                    "BGA & QFN: Down to 0.35mm pitch",
                    "WLCSP: 0.35mm pitch supported",
                    "POP (Package on Package) capability"
                  ]
                }
              },
              {
                "title": "Board Specs Supported",
                "icon_url": "",
                "body": {
                  "kind": "list",
                  "items": [
                    "Multi-layer PCB integration",
                    "Single or double-sided placement",
                    "Fine pitch component handling",
                    "Hard metric connectors"
                  ]
                }
              },
              {
                "title": "Wiring & Assembly",
                "icon_url": "",
                "body": {
                  "kind": "list",
                  "items": [
                    "Cable & wire harness assembly",
                    "Shield cover mounting (EMI)",
                    "Conformal coating (Spray/Brush)",
                    "Box Build integration"
                  ]
                }
              }
            ]
          }
        ]
      },
      "quality": {
        "title": "Closed-Loop Quality Control",
        "desc": "A rigorous 4-stage quality management system tailored for high-precision PCB manufacturing and PCBA assembly, ensuring zero defects from raw materials to final delivery.",
        "process": [
          {
            "short_name": "IQC",
            "full_name": "Incoming Control",
            "desc": "Strict admission control for substrates, components, and chemicals. Preventing defective materials at the source."
          },
          {
            "short_name": "IPQC & FAI",
            "full_name": "In-Process & First Article",
            "desc": "Mandatory First Article Inspection (FAI) combined with scheduled line patrolling for zero-deviation mass production.",
            "highlight": true
          },
          {
            "short_name": "FQC",
            "full_name": "Final Quality Control",
            "desc": "Comprehensive visual and electrical validation to ensure every finished board meets IPC standards."
          },
          {
            "short_name": "QA / OQC",
            "full_name": "Outgoing Assurance",
            "desc": "Final verification of packaging, barcode traceability, and pre-shipment sampling to close the quality loop."
          }
        ],
        "equipment": {
          "title": "Advanced Inspection Arsenal",
          "items": [
            { "name": "FAI Tester", "image_url": "" },
            { "name": "SPI System", "image_url": "" },
            { "name": "AOI Machine", "image_url": "" }
          ]
        }
      },
      "process": {
        "title": "Precision PCB Manufacturing Process",
        "desc": "Explore our streamlined 5-stage production flow. We consolidate 14 complex sub-processes into a highly controlled, automated ecosystem.",
        "stages": [
          {
            "stage_name": "01. Pre-Production",
            "image_url": "",
            "process_name": "Design Validation & Substrate Prep",
            "process_desc": [
              "DFM Check: Engineering review of Gerber files to prevent manufacturability issues.",
              "Material Selection: Selecting premium Shengyi/Rogers Copper Clad Laminates (CCL).",
              "Substrate Baking: Baking boards to remove moisture and prevent delamination."
            ],
            "expert_advice": {
              "title": "Quality Control Checkpoint",
              "desc": "100% automated DRC (Design Rule Checking) before any physical material is cut."
            }
          }
        ]
      },
      "why_choose_us": {
        "title": "Why Partner With Us?",
        "desc": "We deliver more than just circuit boards — we deliver reliability, speed, and peace of mind through our streamlined manufacturing ecosystem.",
        "advantages": [
          {
            "icon_url": "",
            "title": "Strict Quality Control",
            "highlight": "9-Stage Closed-Loop QC",
            "desc": "Fully equipped with SPI, AOI, X-Ray, and ICT testing. 100% electrical validation ensuring compliance with strict IPC and ISO standards."
          }
        ],
        "stats_bar": {
          "stats": [
            { "number": "10+", "label": "Years Exp." },
            { "number": "5000+", "label": "Projects" },
            { "number": "99.8%", "label": "Satisfaction" }
          ],
          "button": { "text": "Get a Quote", "href": "#quote" }
        }
      },
      "industry": {
        "title": "Industries We Serve",
        "description": "From high-reliability industrial control to medical-grade assemblies, our PCBA team supports demanding products across multiple industries.",
        "items": [
          {
            "tab": { "id": "industrial", "name": "Industrial Control", "icon_url": "/icons/industry/moccppwi-apqk1ey.svg" },
            "card": {
              "title": "Industrial Control System",
              "description": {
                "paragraph": "Stable assembly processes and inspection coverage to keep field devices running reliably in harsh environments.",
                "list": [
                  "AOI + X-Ray inspection coverage",
                  "Traceability and controlled processes",
                  "Support for mixed-technology assemblies"
                ]
              },
              "cta": { "label": "Learn More", "href": "#industrial" },
              "image_url": ""
            }
          }
        ]
      },
      "reviews": {
        "title": "Customers' Feedback",
        "desc": "Trusted by engineers and procurement teams worldwide. See what our clients have to say about our PCBA manufacturing quality and service.",
        "reviews": [
          {
            "image_url": "",
            "customer_avatar_url": "",
            "customer_name": "Steve Fuller 🇬🇧",
            "customer_industry": "Industrial Control System",
            "title": "Fast Turnaround & Excellent Service",
            "content": "Really easy service to use. I uploaded the Gerber's and had the PCBs in two weeks even with Christmas in the middle of the shipping time. Excellent..."
          }
        ],
        "cta": { "text": "Get Instant Quote", "href": "#quote" }
      },
      "faq": {
        "title": "Rapiddirect FAQs",
        "items": [
          {
            "question": "How do I confirm my design can be manufactured reliably?",
            "answer": "Share your Gerber/BOM and requirements. We run a DFM review and provide actionable feedback to improve manufacturability before production."
          }
        ]
      },
      "quote_form": {
        "title": "Get Free Quote Now",
        "description": "Leave your contact information and project details, we will contact you ASAP!",
        "background_image_url": "/images/equipment/mocddrz4-ndqh1rn.png",
        "name_field": { "label": "Name", "placeholder": "John Smith", "required": true },
        "company_field": { "label": "Company", "placeholder": "Your Company Inc.", "required": true },
        "email_field": { "label": "Email Address", "placeholder": "john@example.com", "required": true },
        "phone_field": { "label": "Phone Number", "placeholder": "+1 (555) 123-4567", "required": true },
        "message_field": { "label": "Message", "placeholder": "Please specify your requirements, quantity, delivery timeline, or any special requests...", "required": true },
        "upload": { "label": "Attachment", "optional_text": "(Optional)", "button_text": "Click to upload or drag and drop", "help_text": "Supported formats: ZIP, RAR, PDF, Gerber (Max 20MB)" },
        "submit_label": "SUBMIT REQUEST"
      }
    }
    $$::jsonb
  from upsert_page
  on conflict (page_id) do update
    set content_json = excluded.content_json,
        updated_at = now()
  returning page_id
)
insert into public.seo_meta (page_id, meta_title, meta_description, canonical_url)
select
  page_id,
  'PCB Assembly | RapidDirect',
  'PCB assembly service page under /ems/pcb-assembly/.',
  '/ems/pcb-assembly/'
from upsert_content
on conflict (page_id) do update
  set meta_title = excluded.meta_title,
      meta_description = excluded.meta_description,
      canonical_url = excluded.canonical_url,
      updated_at = now();

