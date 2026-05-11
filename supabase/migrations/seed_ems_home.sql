with upsert_page as (
  insert into public.pages (slug, title, template_type, status)
  values ('/ems/', 'EMS Home', 'ems_home', 'published')
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
  "hero": {
    "background_image_url": "/images/hero/moc9ggvp-amg66hj.png",
    "title": "ONE STOP SOLUTION",
    "benefits": [
      {
        "icon_key": "integrated_engineering",
        "title": "Integrated Engineering",
        "description": "From product design and concept to engineering validation."
      },
      {
        "icon_key": "high_precision_mfg",
        "title": "High-Precision Mfg",
        "description": "Certified PCBA production and advanced electronics assembly."
      },
      {
        "icon_key": "global_scm",
        "title": "Global SCM",
        "description": "Secure supply chain management and worldwide logistics."
      }
    ],
    "benefit_conclusion": "End-to-end EMS solutions optimizing your product development and rapid delivery.",
    "cta": {
      "label": "GET INSTANT QUOTE",
      "href": "#quote"
    }
  },
  "services": {
    "title": "Our Services",
    "description": "Comprehensive electronics manufacturing solutions from design to delivery",
    "items": [
      {
        "name": "PCB Design",
        "description": {
          "kind": "paragraph",
          "text": "Professional PCB design services tailored to your project needs"
        },
        "cta": {
          "label": "Quote Now",
          "href": "/pcb-design/"
        }
      },
      {
        "name": "PCB Manufacturing",
        "description": {
          "kind": "list",
          "items": [
            "Multilayer & HDI PCB",
            "Rigid, Flex & Rigid-Flex PCB",
            "Prototype & Mass Production",
            "Quality Control System"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "/pcb-manufacturing/"
        }
      },
      {
        "name": "PCB Assembly",
        "description": {
          "kind": "list",
          "items": [
            "SMT & DIP Assembly",
            "BGA Capability",
            "AOI / X-Ray Inspection",
            "Functional Testing"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "/pcb-assembly/"
        }
      },
      {
        "name": "Component Sourcing",
        "description": {
          "kind": "list",
          "items": [
            "Authorized Distributors",
            "BOM Review & Alternatives",
            "Obsolete Part Support",
            "Supply Chain Optimization"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "/components-sourcing/"
        }
      },
      {
        "name": "Mechanical & Enclosure Fabrication",
        "description": {
          "kind": "list",
          "items": [
            "CNC Machining",
            "Sheet Metal Enclosure",
            "Surface Treatment",
            "Housing Production"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "#quote"
        }
      },
      {
        "name": "Box Build & Final Assembly",
        "description": {
          "kind": "list",
          "items": [
            "Wiring & Cable Harness",
            "Sub-Assembly Integration",
            "Complete Product Assembly",
            "Labeling & Packaging"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "#quote"
        }
      },
      {
        "name": "Testing & Delivery",
        "description": {
          "kind": "list",
          "items": [
            "Functional Testing",
            "Burn-In & Aging Test",
            "Final Quality Inspection",
            "Global Shipping Support"
          ]
        },
        "cta": {
          "label": "Quote Now",
          "href": "#quote"
        }
      }
    ]
  },
  "quality": {
    "title": "Quality Control",
    "description": "Rigorous quality assurance at every stage - from pre-production planning to final delivery",
    "tabs": [
      {
        "id": "pre_production",
        "title": "Pre-Production",
        "icon_url": "/icons/quality-control/mocbk63g-mxl6407.svg",
        "content": {
          "left": {
            "image_url": "/images/quality-control/mocb5eou-4khbdtw.png",
            "icon_url": "/icons/quality-control/mocbk63g-0fnguw6.svg",
            "title": "Pre-Production",
            "description": "Quality Assurance Before Manufacturing"
          },
          "functions": [
            {
              "icon_url": "/icons/quality-control/mocbk63g-y2bummq.svg",
              "name": "Gerber / Drawing Review",
              "description": "Comprehensive file validation and design verification to ensure manufacturability"
            },
            {
              "icon_url": "/icons/quality-control/mocbk63g-vi7fb7g.svg",
              "name": "Premium Material Selection",
              "description": "Top-tier materials from trusted brands: Shengyi, Rogers, Isola, and other industry leaders"
            }
          ]
        }
      },
      {
        "id": "in_production",
        "title": "In-Production",
        "icon_url": "/icons/quality-control/mocbk63g-mr0ruiq.svg",
        "content": {
          "left": {
            "image_url": "/images/quality-control/mocb5eou-atpd7cd.png",
            "icon_url": "/icons/quality-control/mocbk63g-0fnguw6.svg",
            "title": "In-Production",
            "description": "Quality Monitoring During Manufacturing"
          },
          "functions": [
            {
              "icon_url": "/icons/quality-control/mocbk63g-y2bummq.svg",
              "name": "Process Control",
              "description": "In-line monitoring and control to ensure stable production quality"
            },
            {
              "icon_url": "/icons/quality-control/mocbk63g-vi7fb7g.svg",
              "name": "Inspection & Testing",
              "description": "AOI and other inspections performed throughout the production flow"
            }
          ]
        }
      },
      {
        "id": "after_production",
        "title": "After-Production",
        "icon_url": "/icons/quality-control/mocbk63g-3dfqz5h.svg",
        "content": {
          "left": {
            "image_url": "/images/quality-control/mocb5eou-6j294rd.png",
            "icon_url": "/icons/quality-control/mocbk63g-0fnguw6.svg",
            "title": "After-Production",
            "description": "Final Verification Before Delivery"
          },
          "functions": [
            {
              "icon_url": "/icons/quality-control/mocbk63g-y2bummq.svg",
              "name": "Final Quality Inspection",
              "description": "Final inspections and checks before shipment"
            },
            {
              "icon_url": "/icons/quality-control/mocbk63g-vi7fb7g.svg",
              "name": "Packaging & Traceability",
              "description": "Proper packaging and traceability to ensure safe delivery"
            }
          ]
        }
      }
    ],
    "advantages": [
      { "title": "100%", "description": "Inspection Coverage" },
      { "title": "ISO 9001", "description": "Certified Quality System" },
      { "title": "24/7", "description": "Quality Monitoring" }
    ]
  },
  "certification": {
    "title": "Honorary Qualification Certificate",
    "description": "IEC, CE, RoHS, and 98/101/EC certified, ensuring top-tier safety and performance.",
    "items": [
      {
        "icon_url": "/icons/certification/moccele3-oaq88x1.svg",
        "name": "ISO 9001",
        "description": "Quality",
        "time_icon_url": "/icons/certification/moccele3-52m7yuk.svg",
        "time_text": "2015"
      },
      {
        "icon_url": "/icons/certification/moccele3-oaq88x1.svg",
        "name": "ISO 14001",
        "description": "Environmental",
        "time_icon_url": "/icons/certification/moccele3-htlaceb.svg",
        "time_text": "2015"
      },
      {
        "icon_url": "/icons/certification/moccele3-2d0knes.svg",
        "name": "IATF 16949",
        "description": "Automotive",
        "time_icon_url": "/icons/certification/moccele3-9mgwn3n.svg",
        "time_text": "2023"
      },
      {
        "icon_url": "/icons/certification/moccele3-2d0knes.svg",
        "name": "UL Certified",
        "description": "Safety",
        "time_icon_url": "/icons/certification/moccele3-lc0h45c.svg",
        "time_text": "2023"
      },
      {
        "icon_url": "/icons/certification/moccele3-2d0knes.svg",
        "name": "RoHS",
        "description": "Compliance",
        "time_icon_url": "/icons/certification/moccele3-m2na6i4.svg",
        "time_text": "2024"
      },
      {
        "icon_url": "/icons/certification/moccele3-oaq88x1.svg",
        "name": "CE Marking",
        "description": "European",
        "time_icon_url": "/icons/certification/moccele3-owpi5pa.svg",
        "time_text": "2024"
      }
    ]
  },
  "industry": {
    "title": "Industries We Serve",
    "description": "Specialized PCB solutions tailored to your industry's unique requirements",
    "items": [
      {
        "tab": { "id": "automotive", "name": "Automotive", "icon_url": "/icons/industry/moccppwh-hgq3v1b.svg" },
        "card": {
          "title": "Driving Innovation in Automotive Electronics",
          "description": {
            "paragraph": "Advanced PCB solutions for the next generation of intelligent vehicles, from EV powertrains to autonomous driving systems.",
            "list": [
              "High-reliability automotive-grade PCBs",
              "Thermal management for EV systems",
              "ADAS and sensor integration"
            ]
          },
          "cta": { "label": "Learn More", "href": "#automotive" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      },
      {
        "tab": { "id": "medical_devices", "name": "Medical Devices", "icon_url": "/icons/industry/moccppwh-e2k7lay.svg" },
        "card": {
          "title": "Reliable Electronics for Medical Devices",
          "description": {
            "paragraph": "PCB solutions designed for strict compliance and long-term reliability in medical applications.",
            "list": [
              "High-precision manufacturing",
              "Traceability & documentation support",
              "Stable supply chain for critical components"
            ]
          },
          "cta": { "label": "Learn More", "href": "#medical-devices" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      },
      {
        "tab": { "id": "consumer_electronics", "name": "Consumer Electronics", "icon_url": "/icons/industry/moccppwi-pxjtcjy.svg" },
        "card": {
          "title": "Fast Turnaround for Consumer Products",
          "description": {
            "paragraph": "From prototypes to mass production, we support rapid iteration and scalable delivery.",
            "list": [
              "DFM-friendly design support",
              "Prototype to volume ramp",
              "Quality control for high yield"
            ]
          },
          "cta": { "label": "Learn More", "href": "#consumer-electronics" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      },
      {
        "tab": { "id": "industrial_automation", "name": "Industrial Automation", "icon_url": "/icons/industry/moccppwi-apqk1ey.svg" },
        "card": {
          "title": "Durable PCBs for Industrial Automation",
          "description": {
            "paragraph": "Solutions engineered for demanding environments and continuous operation.",
            "list": [
              "Robust materials selection",
              "Signal integrity for control systems",
              "Consistent quality at scale"
            ]
          },
          "cta": { "label": "Learn More", "href": "#industrial-automation" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      },
      {
        "tab": { "id": "telecommunications", "name": "Telecommunications", "icon_url": "/icons/industry/moccppwi-dnhnbhu.svg" },
        "card": {
          "title": "High-Performance Boards for Connectivity",
          "description": {
            "paragraph": "Support for high-frequency, high-speed applications where performance matters.",
            "list": [
              "Impedance control",
              "High-speed stackups",
              "Quality assurance for critical networks"
            ]
          },
          "cta": { "label": "Learn More", "href": "#telecommunications" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      },
      {
        "tab": { "id": "aerospace", "name": "Aerospace", "icon_url": "/icons/industry/moccppwi-eihm471.svg" },
        "card": {
          "title": "Precision for Aerospace Applications",
          "description": {
            "paragraph": "Process discipline and quality control to support mission-critical electronics.",
            "list": [
              "Strict process control",
              "Inspection & testing",
              "Reliable manufacturing partners"
            ]
          },
          "cta": { "label": "Learn More", "href": "#aerospace" },
          "image_url": "/images/industry/moccppwk-mqfh927.png"
        }
      }
    ]
  },
  "equipment": {
    "title": "Equipment",
    "description": "Advanced production equipment supporting stable quality, capacity, and reliable delivery.",
    "items": [
      {
        "image_url": "/images/equipment/mocddrz4-wo06njo.png",
        "title": "SMT Line",
        "description": "Surface Mount Technology",
        "parameter_label": "Capacity",
        "parameter_value": "45K CPH"
      },
      {
        "image_url": "/images/equipment/mocddrz4-ndqh1rn.png",
        "title": "AOI System",
        "description": "Automated Optical Inspection",
        "parameter_label": "Capacity",
        "parameter_value": "99.9% Accuracy"
      },
      {
        "image_url": "/images/equipment/mocddrz4-16z93ck.png",
        "title": "X-Ray Inspector",
        "description": "Advanced Quality Control",
        "parameter_label": "Capacity",
        "parameter_value": "10μm Resolution"
      },
      {
        "image_url": "/images/equipment/mocddrz4-hrono3t.png",
        "title": "Reflow Oven",
        "description": "Precision Soldering System",
        "parameter_label": "Capacity",
        "parameter_value": "10 Zones"
      },
      {
        "image_url": "/images/equipment/mocddrz4-wo06njo.png",
        "title": "Warehouse",
        "description": "Automated Storage System",
        "parameter_label": "Capacity",
        "parameter_value": "50K Units/Day"
      }
    ]
  },
  "why_choose_us": {
    "heading_prefix": "Why Choose",
    "heading_highlight": "RapidDirect",
    "sub_heading": "Synchronized Prototyping for Faster Launches",
    "description": "Time is your most expensive resource. By synchronizing PCB fabrication with mechanical prototyping (CNC, Sheet Metal, 3D Printing), we cut weeks off your development cycle. Real-time DFM for both electronics and mechanics ensures your design is optimized for mass production from day one.",
    "cards": [
      {
        "icon_url": "/icons/why-choose/mochqtw9-e5dkrdg.svg",
        "title": "Mechanical-Electronic Synergy",
        "description": "We validate your PCB layout against your CNC or Injection Molded enclosure in real-time. No more \\\"it doesn’t fit\\\" surprises during assembly."
      },
      {
        "icon_url": "/icons/why-choose/mochqtw9-zk9tmlj.svg",
        "title": "Hardware-Speed Prototyping",
        "description": "Sync your PCB fabrication with mechanical parts. Get your entire functional prototype in one shipment, cutting weeks off your NPI cycle."
      },
      {
        "icon_url": "/icons/why-choose/mochqtw9-g44gh2u.svg",
        "title": "Zero-Friction Logistics",
        "description": "Eliminate the cost and risk of shipping parts between multiple factories. We handle the integration, you handle the innovation."
      }
    ]
  },
  "order_process": {
    "title": "Order Process",
    "steps": [
      { "icon_url": "/icons/order-process/moci20k9-0273m4o.svg", "title": "Design Review & DFM Check" },
      { "icon_url": "/icons/order-process/moci20k9-kfex64c.svg", "title": "PCB Manufacturing" },
      { "icon_url": "/icons/order-process/moci20k9-ep6oz7h.svg", "title": "Components Procurement" },
      { "icon_url": "/icons/order-process/moci20k9-l5lac0u.svg", "title": "PCB Assembly" },
      { "icon_url": "/icons/order-process/moci20k9-bc3f77v.svg", "title": "Mechanical Fabrication" },
      { "icon_url": "/icons/order-process/moci20k9-sudxhob.svg", "title": "Box Build Assembly" },
      { "icon_url": "/icons/order-process/moci20k9-qrmaz0u.svg", "title": "Functional Testing" },
      { "icon_url": "/icons/order-process/moci20k9-r63tn4f.svg", "title": "Global Delivery" }
    ]
  },
  "faq": {
    "title": "Rapiddirect FAQs",
    "items": [
      {
        "question": "How do I confirm my design can be manufactured reliably?",
        "answer": "Share your Gerber/BOM and requirements. We run a DFM review and provide actionable feedback to improve manufacturability before production."
      },
      {
        "question": "What makes RapidDirect different from other manufacturing platforms or intermediaries?",
        "answer": "We focus on integrated delivery across electronics and supporting processes, with clear engineering feedback loops to reduce iteration time and risk."
      },
      {
        "question": "How fast can Rapiddirect deliver?",
        "answer": "Lead time depends on complexity and quantity. We support both prototyping and production workflows and will confirm schedule after DFM review."
      },
      {
        "question": "What surface finishes and colors are available?",
        "answer": "We support common finishes and solder mask options. Tell us your target application and we can recommend a suitable combination."
      },
      {
        "question": "Do you offer material certificates or test reports?",
        "answer": "Yes. Depending on project requirements, we can provide relevant certificates and test/inspection reports as part of delivery documentation."
      },
      {
        "question": "Do your materials and processes comply with RoHS, REACH, or other EU standards?",
        "answer": "We can support compliance requirements and documentation for major standards. Please specify required standards during quotation."
      },
      {
        "question": "What if my parts do not meet the required specifications?",
        "answer": "We follow a quality control process and will investigate any issues with traceability. Contact us with details and we will provide resolution options."
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
    "message_field": {
      "label": "Message",
      "placeholder": "Please specify your requirements, quantity, delivery timeline, or any special requests...",
      "required": true
    },
    "upload": {
      "label": "Attachment",
      "optional_text": "(Optional)",
      "button_text": "Click to upload or drag and drop",
      "help_text": "Supported formats: ZIP, RAR, PDF, Gerber (Max 20MB)"
    },
    "submit_label": "SUBMIT REQUEST"
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
  'EMS Home | RapidDirect',
  'RapidDirect EMS landing page under /ems/.',
  'https://rapiddirect.com/ems/',
  'EMS Home | RapidDirect',
  'RapidDirect EMS landing page under /ems/.',
  null,
  false
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

