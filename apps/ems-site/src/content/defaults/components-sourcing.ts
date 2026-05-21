export const componentsSourcingDefaults = {
  hero: {
    title: 'Electronic Components Sourcing',
    background_image_url: '/assets/images/hero-bg.jpg',
    benefits: [
      {
        title: 'Verified Supply Chain',
        description: 'Sourcing through vetted channels with traceability support to reduce counterfeit risk.'
      },
      {
        title: 'BOM Validation',
        description: 'Cross-check alternates, lifecycle status, and package compatibility before purchasing.'
      },
      {
        title: 'Cost & Lead Time Optimization',
        description: 'Balance pricing, availability, and delivery dates to keep your build on schedule.'
      }
    ],
    benefit_conclusion:
      'Send us your BOM and target lead time — we’ll recommend the right sourcing plan for prototyping or production.',
    cta: {
      label: 'Request a Quote',
      href: '/ems/contact'
    }
  },
  source_capability: {
    title: 'Our Services & Sourcing Capabilities',
    description: 'One-stop electronic components sourcing supporting full BOM, small batches, and mass production.',
    core_services: [
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        title: 'Full BOM Sourcing',
        description:
          'End-to-end BOM procurement, supporting loose parts, turnkey assembly, samples, and mass production seamlessly.'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
        title: 'Alternative Components',
        description:
          'Professional cross-reference matching and drop-in replacement suggestions to avoid delays and save costs.'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
        title: 'Cost-down Solutions',
        description:
          'Multi-channel price comparison and structural BOM optimization to drastically reduce your overall material costs.'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
        title: 'Shortage & Obsolete',
        description: 'Global sourcing network to quickly locate allocated, obsolete, and hard-to-find electronic components.'
      }
    ],
    categories: {
      title: 'Components We Source',
      items: [
        { title: 'Integrated Circuits (IC)', image_placeholder: '[ Image: Integrated Circuits / Microchips ]' },
        { title: 'Resistors, Capacitors, Inductors', image_placeholder: '[ Image: Resistors, Capacitors, Inductors ]' },
        { title: 'Connectors', image_placeholder: '[ Image: Connectors & Terminals ]' },
        { title: 'Sensors', image_placeholder: '[ Image: Electronic Sensors ]' },
        { title: 'Diodes & Transistors', image_placeholder: '[ Image: Diodes & Transistors ]' },
        { title: 'PCB Related Components', image_placeholder: '[ Image: PCB Related Components ]' }
      ]
    },
    supply_chain: {
      title: 'Global Trusted Network',
      items: [
        { title: 'Authorized Manufacturers (OEM)', description: 'Direct sourcing from original factories for absolute authenticity.' },
        {
          title: 'Tier-1 Distributors',
          description: 'Partnered with global franchised distributors like Digi-Key, Mouser, and Arrow.'
        },
        { title: 'Verified Spot Market', description: 'Rigorous vendor auditing to source shortage parts safely.' }
      ]
    },
    brands: {
      title: 'Brands We Support',
      items: [
        { name: 'Texas Instruments' },
        { name: 'STMicroelectronics' },
        { name: 'Infineon' },
        { name: 'NXP' },
        { name: 'Analog Devices' },
        { name: 'Microchip' },
        { name: 'ON Semiconductor' }
      ],
      more_label: '+ 500\nMore Brands'
    }
  },
  source_process: {
    title: 'Our Sourcing Process',
    description: 'A transparent and controlled 7-step workflow ensuring original parts and on-time delivery.',
    steps: [
      {
        id: 'step-1',
        nav_label: 'Submit BOM',
        badge: 'Step 01',
        title: 'Submit Your BOM',
        description:
          'Upload your Bill of Materials (BOM) in Excel or CSV format. Our intelligent system and procurement engineers will instantly begin analyzing your part numbers for availability and lifecycle status.',
        image_placeholder: '[ Real Photo: A clear engineering BOM file displayed on a high-res laptop screen ]'
      },
      {
        id: 'step-2',
        nav_label: 'Review & RFQ',
        badge: 'Step 02',
        title: 'BOM Review & RFQ',
        description:
          'Our senior procurement engineers meticulously review every line item, verifying MPNs (Manufacturer Part Numbers) and packaging types to provide a precise Request for Quote without any ambiguity.',
        image_placeholder: '[ Real Photo: A senior procurement engineer reviewing technical specs on dual monitors ]'
      },
      {
        id: 'step-3',
        nav_label: 'Supplier Matching',
        badge: 'Step 03',
        title: 'Supplier Matching',
        description:
          'We leverage our vetted global supply chain network to match your needs with authorized manufacturers and Tier-1 distributors, ensuring 100% original component sourcing and mitigating counterfeit risks.',
        image_placeholder: '[ Real Photo: Close-up of professional procurement software dashboard matching suppliers ]'
      },
      {
        id: 'step-4',
        nav_label: 'Price & Lead Time',
        badge: 'Step 04',
        title: 'Price & Lead Time Confirmation',
        description:
          'You will receive a comprehensive report detailing real-time pricing and confirmed lead times. For long-lead items, we proactively offer reliable, cost-down cross-reference alternatives for your approval.',
        image_placeholder: '[ Real Photo: A formal quotation report document showing transparent price breakdowns ]'
      },
      {
        id: 'step-5',
        nav_label: 'Order Procurement',
        badge: 'Step 05',
        title: 'Order & Procurement',
        description:
          'Upon your final confirmation, our purchasing department executes the orders immediately. Our advanced ERP system tracks the logistics of every single reel and tray until it reaches our secure facility.',
        image_placeholder: '[ Real Photo: Purchasing staff executing orders with PO documents on the desk ]'
      },
      {
        id: 'step-6',
        nav_label: 'IQC Inspection',
        badge: 'Step 06',
        title: 'IQC Incoming Inspection',
        description:
          'The most crucial stage. We conduct 100% incoming quality control (IQC) in our ESD-safe labs, utilizing X-ray anti-counterfeit testing, visual verification, and exact quantity counts before inventory storage.',
        image_placeholder: '[ Real Photo: IQC inspector wearing anti-static gloves using a digital microscope ]'
      },
      {
        id: 'step-7',
        nav_label: 'Delivery / PCBA',
        badge: 'Step 07',
        title: 'Delivery or PCBA Transfer',
        description:
          'Verified components are either professionally vacuum-packed with desiccant for worldwide shipment, or seamlessly transferred directly to our internal SMT production lines for immediate PCB assembly.',
        image_placeholder: '[ Real Photo: Vacuum-sealed component reels with professional traceability labels ]'
      }
    ]
  },
  source_quality_control: {
    tag: 'Zero Defect Policy',
    title: 'Rigorous Quality Assurance',
    lead: 'We mitigate supply chain risks through strict vendor auditing and state-of-the-art IQC testing, ensuring every component is authentic, traceable, and reliable.',
    trust_badges: [
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        label: '100% Authentic Guarantee'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
        label: 'Traceability System'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        label: 'Anti-Counterfeit Measures'
      }
    ],
    items: [
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',
        title: 'Authorized Channels First',
        description:
          'We prioritize sourcing directly from original manufacturers (OEMs) and franchised tier-1 distributors to guarantee part origin.'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
        title: 'Strict Supplier Auditing',
        description:
          'All spot-market vendors undergo a rigorous multi-tier rating system and continuous performance evaluation before approval.'
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
        title: 'Comprehensive IQC Inspection',
        description:
          'Our dedicated Incoming Quality Control (IQC) lab visually and physically inspects 100% of incoming materials against strict datasheets.',
        is_highlighted: true
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
        title: 'Anti-Counterfeit Testing',
        description:
          'Equipped with state-of-the-art X-ray inspection, decapsulation testing, and electrical parameter validation to eliminate fake or refurbished components.'
      }
    ],
    visual: {
      image_placeholder:
        '[ Real Photo: Focus Image ]\n\nA high-quality photo of a QC engineer wearing an anti-static uniform, carefully inspecting a reel of components using a digital microscope or X-ray machine in a clean lab environment.',
      floating_card: {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        title: 'Passed IQC Testing',
        subtitle: 'Ready for PCBA Production'
      }
    }
  },
  source_solutions: {
    title: 'Key Solutions',
    description: 'We solve your toughest component sourcing challenges',
    cards: [
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
        title: 'Shortage & Obsolete Components Support',
        points: [
          'Global hard-to-find parts sourcing',
          'Obsolete component cross-reference & alternatives',
          'Long-lead parts reservation & stock support',
          'End-of-life (EOL) lifecycle management'
        ],
        value_box: {
          icon_svg:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
          text: 'Secure critical components to keep your production on track.'
        }
      },
      {
        icon_svg:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
        title: 'Cost Optimization & BOM Solutions',
        points: [
          'Multi-supplier price comparison',
          'High-cost component replacement proposals',
          'BOM rationalization & integration',
          'Bulk purchasing cost-down benefits'
        ],
        value_box: {
          icon_svg:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
          text: 'Lower your total material cost without compromising quality.'
        }
      }
    ]
  },
  industry: {
    title: 'Industries We Serve',
    description: "Specialized PCB solutions tailored to your industry's unique requirements",
    items: [
      {
        tab: {
          id: 'automotive',
          name: 'Automotive',
          icon_url: '/assets/icons/industry/moccppwh-hgq3v1b.svg'
        },
        card: {
          title: 'Driving Innovation in Automotive Electronics',
          description: {
            paragraph:
              'Advanced PCB solutions for the next generation of intelligent vehicles, from EV powertrains to autonomous driving systems.',
            list: [
              'High-reliability automotive-grade PCBs',
              'Thermal management for EV systems',
              'ADAS and sensor integration'
            ]
          },
          cta: {
            label: 'Learn More',
            href: '#automotive'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      },
      {
        tab: {
          id: 'medical_devices',
          name: 'Medical Devices',
          icon_url: '/assets/icons/industry/moccppwh-e2k7lay.svg'
        },
        card: {
          title: 'Reliable Electronics for Medical Devices',
          description: {
            paragraph: 'PCB solutions designed for strict compliance and long-term reliability in medical applications.',
            list: [
              'High-precision manufacturing',
              'Traceability & documentation support',
              'Stable supply chain for critical components'
            ]
          },
          cta: {
            label: 'Learn More',
            href: '#medical-devices'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      },
      {
        tab: {
          id: 'consumer_electronics',
          name: 'Consumer Electronics',
          icon_url: '/assets/icons/industry/moccppwi-pxjtcjy.svg'
        },
        card: {
          title: 'Fast Turnaround for Consumer Products',
          description: {
            paragraph: 'From prototypes to mass production, we support rapid iteration and scalable delivery.',
            list: ['DFM-friendly design support', 'Prototype to volume ramp', 'Quality control for high yield']
          },
          cta: {
            label: 'Learn More',
            href: '#consumer-electronics'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      },
      {
        tab: {
          id: 'industrial_automation',
          name: 'Industrial Automation',
          icon_url: '/assets/icons/industry/moccppwi-apqk1ey.svg'
        },
        card: {
          title: 'Durable PCBs for Industrial Automation',
          description: {
            paragraph: 'Solutions engineered for demanding environments and continuous operation.',
            list: ['Robust materials selection', 'Signal integrity for control systems', 'Consistent quality at scale']
          },
          cta: {
            label: 'Learn More',
            href: '#industrial-automation'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      },
      {
        tab: {
          id: 'telecommunications',
          name: 'Telecommunications',
          icon_url: '/assets/icons/industry/moccppwi-dnhnbhu.svg'
        },
        card: {
          title: 'High-Performance Boards for Connectivity',
          description: {
            paragraph: 'Support for high-frequency, high-speed applications where performance matters.',
            list: ['Impedance control', 'High-speed stackups', 'Quality assurance for critical networks']
          },
          cta: {
            label: 'Learn More',
            href: '#telecommunications'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      },
      {
        tab: {
          id: 'aerospace',
          name: 'Aerospace',
          icon_url: '/assets/icons/industry/moccppwi-eihm471.svg'
        },
        card: {
          title: 'Precision for Aerospace Applications',
          description: {
            paragraph: 'Process discipline and quality control to support mission-critical electronics.',
            list: ['Strict process control', 'Inspection & testing', 'Reliable manufacturing partners']
          },
          cta: {
            label: 'Learn More',
            href: '#aerospace'
          },
          image_url: '/assets/images/industry/moccppwk-mqfh927.png'
        }
      }
    ]
  },
  why_choose_us: {
    title: 'Why Choose RapidDirect',
    desc: 'We merge advanced electronics design with robust mechanical prototyping, ensuring your product is optimized for manufacturing from day one.',
    advantages: [
      {
        title: 'Mechanical-Electronic',
        highlight: 'Synergy',
        desc: 'We validate your PCB layout against your CNC or Injection Molded enclosure in real-time. No more "it doesn’t fit" surprises during assembly.',
        icon_url:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>'
      },
      {
        title: 'Hardware-Speed',
        highlight: 'Prototyping',
        desc: 'Sync your PCB fabrication with mechanical parts. Get your entire functional prototype in one shipment, cutting weeks off your NPI cycle.',
        icon_url:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>'
      },
      {
        title: 'Zero-Friction',
        highlight: 'Logistics',
        desc: 'Eliminate the cost and risk of shipping parts between multiple factories. We handle the integration, you handle the innovation.',
        icon_url:
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M10 6.5h4" /><path d="M10 17.5h4" /><path d="M6.5 10v4" /><path d="M17.5 10v4" /></svg>'
      }
    ],
    stats_bar: {
      stats: [
        {
          number: '24h',
          label: 'Quote Turnaround'
        },
        {
          number: '99.8%',
          label: 'On-Time Delivery'
        },
        {
          number: '100%',
          label: 'DFM Checked'
        }
      ],
      button: {
        text: 'Start Your Project',
        href: '/ems/contact'
      }
    }
  },
  faq: {
    title: 'Rapiddirect FAQs',
    items: [
      {
        question: 'How do I confirm my design can be manufactured reliably?',
        answer:
          'Share your Gerber/BOM and requirements. We run a DFM review and provide actionable feedback to improve manufacturability before production.'
      },
      {
        question: 'What makes RapidDirect different from other manufacturing platforms or intermediaries?',
        answer:
          'We focus on integrated delivery across electronics and supporting processes, with clear engineering feedback loops to reduce iteration time and risk.'
      },
      {
        question: 'How fast can Rapiddirect deliver?',
        answer:
          'Lead time depends on complexity and quantity. We support both prototyping and production workflows and will confirm schedule after DFM review.'
      },
      {
        question: 'What surface finishes and colors are available?',
        answer:
          'We support common finishes and solder mask options. Tell us your target application and we can recommend a suitable combination.'
      },
      {
        question: 'Do you offer material certificates or test reports?',
        answer:
          'Yes. Depending on project requirements, we can provide relevant certificates and test/inspection reports as part of delivery documentation.'
      },
      {
        question: 'Do your materials and processes comply with RoHS, REACH, or other EU standards?',
        answer:
          'We can support compliance requirements and documentation for major standards. Please specify required standards during quotation.'
      },
      {
        question: 'What if my parts do not meet the required specifications?',
        answer:
          'We follow a quality control process and will investigate any issues with traceability. Contact us with details and we will provide resolution options.'
      }
    ]
  },
  quote_form: {
    title: 'Get Free Quote Now',
    description: 'Leave your contact information and project details, we will contact you ASAP!',
    background_image_url: '/images/equipment/mocddrz4-ndqh1rn.png',
    name_field: {
      label: 'Name',
      placeholder: 'John Smith',
      required: true
    },
    company_field: {
      label: 'Company',
      placeholder: 'Your Company Inc.',
      required: true
    },
    email_field: {
      label: 'Email Address',
      placeholder: 'john@example.com',
      required: true
    },
    phone_field: {
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      required: true
    },
    message_field: {
      label: 'Message',
      placeholder: 'Please specify your requirements, quantity, delivery timeline, or any special requests...',
      required: true
    },
    upload: {
      label: 'Attachment',
      optional_text: '(Optional)',
      button_text: 'Click to upload or drag and drop',
      help_text: 'Supported formats: ZIP, RAR, PDF, Gerber (Max 20MB)'
    },
    submit_label: 'SUBMIT REQUEST'
  }
};
