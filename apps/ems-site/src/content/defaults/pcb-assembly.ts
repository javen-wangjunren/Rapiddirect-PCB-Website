import { emsHomeDefaults } from './ems';

export const pcbAssemblyDefaults = {
  hero: {
    title: 'PCB Assembly',
    background_image_url: '/images/hero/mocc9gyp-amg66hj.png',
    benefits: [
      { title: 'DFM Review', description: 'Manufacturability checks before production to reduce risk.' },
      { title: 'Fast Turnaround', description: 'Flexible lead times from prototype to low-volume runs.' },
      { title: 'Quality Control', description: 'Process control and inspection aligned with your requirements.' }
    ],
    benefit_conclusion: 'One team to assemble, verify, and deliver your boards reliably.',
    cta: { href: '#quote', label: 'GET A QUOTE' }
  },
  capability: {
    title: 'Comprehensive PCBA Capabilities',
    desc: 'From precise 01005 SMT placement to complex mixed-technology assemblies, we deliver fully tested boards ready for integration.',
    gallery: [
      { name: 'Surface Mount (SMT)', image_url: '' },
      { name: 'Through-Hole (THT)', image_url: '' },
      { name: 'Mixed Technology', image_url: '' },
      { name: 'Flex PCBA', image_url: '' },
      { name: 'Additional Services', image_url: '' }
    ],
    tabs: [
      {
        label: 'Technical Capabilities',
        cards: [
          {
            title: 'Component Types',
            icon_url: '',
            body: {
              items: [
                'Passive Components: Min 01005 size',
                'BGA & QFN: Down to 0.35mm pitch',
                'WLCSP: 0.35mm pitch supported',
                'POP (Package on Package) capability'
              ]
            }
          },
          {
            title: 'Board Specs Supported',
            icon_url: '',
            body: {
              items: [
                'Multi-layer PCB integration',
                'Single or double-sided placement',
                'Fine pitch component handling',
                'Hard metric connectors'
              ]
            }
          },
          {
            title: 'Wiring & Assembly',
            icon_url: '',
            body: {
              items: [
                'Cable & wire harness assembly',
                'Shield cover mounting (EMI)',
                'Conformal coating (Spray/Brush)',
                'Box Build integration'
              ]
            }
          }
        ]
      },
      {
        label: 'Production Volume',
        cards: [
          {
            title: 'Prototype Assembly',
            icon_url: '',
            body: {
              items: ['Quantity: 1 – 100 pcs', 'No MOQ (Minimum Order Quantity)', 'Ideal for NPI & Engineering Validation']
            }
          },
          {
            title: 'Low Volume Production',
            icon_url: '',
            body: {
              items: ['Quantity: 100 – 1,000 pcs', 'Dedicated agile production lines', 'Rapid ramp-up support']
            }
          },
          {
            title: 'Mass Production',
            icon_url: '',
            body: {
              items: ['Quantity: 1,000+ pcs', 'Automated AOI & ICT testing', 'Cost-optimized supply chain routing']
            }
          }
        ]
      },
      {
        label: 'Turnaround Times',
        cards: [
          {
            title: 'Quick Turn',
            icon_url: '',
            body: { items: ['Same-day processing', 'Applies to consigned components', 'Prioritized engineering support'] }
          },
          {
            title: 'Fast PCB Assembly',
            icon_url: '',
            body: { items: ['2 - 5 days delivery', 'Turnkey or Partial Turnkey', 'Standard prototyping speed'] }
          },
          {
            title: 'High Volume & Scheduled',
            icon_url: '',
            body: { items: ['10 days standard for High Volume', 'Scheduled Delivery / Call-offs', 'Inventory management options'] }
          }
        ]
      }
    ]
  },
  quality: {
    title: 'Closed-Loop Quality Control',
    desc: 'A rigorous 4-stage quality management system tailored for high-precision PCB manufacturing and PCBA assembly, ensuring zero defects from raw materials to final delivery.',
    process: [
      {
        short_name: 'IQC',
        full_name: 'Incoming Control',
        desc: 'Strict admission control for substrates, components, and chemicals. Preventing defective materials at the source.'
      },
      {
        short_name: 'IPQC & FAI',
        full_name: 'In-Process & First Article',
        desc: 'Mandatory First Article Inspection (FAI) combined with scheduled line patrolling for zero-deviation mass production.',
        highlight: true
      },
      {
        short_name: 'FQC',
        full_name: 'Final Quality Control',
        desc: 'Comprehensive visual and electrical validation to ensure every finished board meets IPC standards.'
      },
      {
        short_name: 'QA / OQC',
        full_name: 'Outgoing Assurance',
        desc: 'Final verification of packaging, barcode traceability, and pre-shipment sampling to close the quality loop.'
      }
    ],
    equipment: {
      title: 'Advanced Inspection Arsenal',
      items: [
        { name: 'FAI Tester', image_url: '' },
        { name: 'SPI System', image_url: '' },
        { name: 'AOI Machine', image_url: '' },
        { name: 'X-Ray Inspection', image_url: '' },
        { name: 'Flying Probe Tester', image_url: '' },
        { name: 'Impedance Tester', image_url: '' }
      ]
    }
  },
  process: {
    title: 'Precision PCB Manufacturing Process',
    desc: 'Explore our streamlined 5-stage production flow. We consolidate 14 complex sub-processes into a highly controlled, automated ecosystem.',
    stages: [
      {
        stage_name: '01. Pre-Production',
        image_url: '',
        process_name: 'Design Validation & Substrate Prep',
        process_desc: [
          'DFM Check: Engineering review of Gerber files to prevent manufacturability issues.',
          'Material Selection: Selecting premium Shengyi/Rogers Copper Clad Laminates (CCL).',
          'Substrate Baking: Baking boards to remove moisture and prevent delamination.'
        ],
        expert_advice: {
          title: 'Quality Control Checkpoint',
          desc: '100% automated DRC (Design Rule Checking) before any physical material is cut.'
        }
      },
      {
        stage_name: '02. Inner Layer',
        image_url: '',
        process_name: 'Inner Layer Core Formation',
        process_desc: [
          'LDI Printing: Laser Direct Imaging transfers the circuit pattern onto photoresist.',
          'UV Exposure: Hardening the desired circuit paths under precision UV light.',
          'Etching & Stripping: Removing unwanted copper to reveal the bare inner circuitry.'
        ],
        expert_advice: {
          title: 'Key Equipment',
          desc: 'Orbotech LDI Systems (Achieving 2mil/2mil min trace/space).'
        }
      },
      {
        stage_name: '03. Outer Layer',
        image_url: '',
        process_name: 'Lamination, Drilling & Plating',
        process_desc: [
          'Lamination: Pressing inner layers with prepreg under high temperature and vacuum.',
          'CNC Drilling: High-speed mechanical and laser drilling for vias.',
          'Copper Plating: Electroless plating to metalize hole walls for layer interconnection.'
        ],
        expert_advice: {
          title: 'Precision Metrics',
          desc: 'Drill hole position accuracy within ±0.05mm. Aspect ratio up to 12:1.'
        }
      },
      {
        stage_name: '04. Solder Mask & Finish',
        image_url: '',
        process_name: 'Solder Mask & Surface Finishing',
        process_desc: [
          'Solder Mask: Applying liquid photoimageable (LPI) mask to protect traces from oxidation.',
          'Silkscreen: Printing component designators and logos.',
          'Surface Finish: Applying ENIG, HASL, or OSP to exposed pads for optimal solderability.'
        ],
        expert_advice: {
          title: 'Compliance',
          desc: 'All surface finishes are 100% RoHS compliant and lead-free.'
        }
      },
      {
        stage_name: '05. Testing & QC',
        image_url: '',
        process_name: 'Final Inspection & Testing',
        process_desc: [
          'AOI & X-Ray: Automated Optical Inspection for surface defects; X-ray for internal via checks.',
          'Electrical Testing: Flying probe or bed-of-nails testing for shorts and opens.',
          'Final Routing & QA: V-scoring, routing to final dimensions, and vacuum packaging.'
        ],
        expert_advice: {
          title: 'Delivery Guarantee',
          desc: '100% electrically tested. Delivered with comprehensive outgoing quality control (OQC) reports.'
        }
      }
    ]
  },
  why_choose_us: {
    title: 'Why Partner With Us?',
    desc: 'We deliver more than just circuit boards — we deliver reliability, speed, and peace of mind through our streamlined manufacturing ecosystem.',
    advantages: [
      {
        icon_url: '',
        title: 'Strict Quality Control',
        highlight: '9-Stage Closed-Loop QC',
        desc: 'Fully equipped with SPI, AOI, X-Ray, and ICT testing. 100% electrical validation ensuring compliance with strict IPC and ISO standards.'
      },
      {
        icon_url: '',
        title: 'Fast Turnaround Time',
        highlight: '24H Prototype Lead Time',
        desc: 'Highly automated agile production lines. Get your prototypes shipped in as fast as 24 hours and reduce mass production cycles by 30%.'
      },
      {
        icon_url: '',
        title: 'True One-Stop Service',
        highlight: 'PCB + Components + Assembly',
        desc: 'Stop managing multiple vendors. We handle PCB fabrication, global parts sourcing, assembly, and final testing under one roof.'
      }
    ],
    stats_bar: {
      stats: [
        { number: '10+', label: 'Years Exp.' },
        { number: '5000+', label: 'Projects' },
        { number: '99.8%', label: 'Satisfaction' }
      ],
      button: { text: 'Get a Quote', href: '#quote' }
    }
  },
  industry: {
    title: 'Industries We Serve',
    description: 'From high-reliability industrial control to medical-grade assemblies, our PCBA team supports demanding products across multiple industries.',
    items: [
      {
        tab: { id: 'industrial', name: 'Industrial Control', icon_url: '/icons/industry/moccppwi-apqk1ey.svg' },
        card: {
          title: 'Industrial Control System',
          description: {
            paragraph: 'Stable assembly processes and inspection coverage to keep field devices running reliably in harsh environments.',
            list: ['AOI + X-Ray inspection coverage', 'Traceability and controlled processes', 'Support for mixed-technology assemblies']
          },
          cta: { label: 'Learn More', href: '#industrial' },
          image_url: ''
        }
      },
      {
        tab: { id: 'medical', name: 'Medical Devices', icon_url: '/icons/industry/moccppwh-e2k7lay.svg' },
        card: {
          title: 'Medical Rigid-Flex',
          description: {
            paragraph: 'Quality-driven production with disciplined process control for complex assemblies and strict documentation needs.',
            list: ['Fine-pitch placement support', 'Process checkpoints & reporting', 'Engineering support for NPI']
          },
          cta: { label: 'Learn More', href: '#medical' },
          image_url: ''
        }
      },
      {
        tab: { id: 'iot', name: 'IoT & Smart Home', icon_url: '/icons/industry/moccppwi-pxjtcjy.svg' },
        card: {
          title: 'Smart Home IoT',
          description: {
            paragraph: 'Fast iteration cycles and dependable quality, from prototypes to production ramp.',
            list: ['Quick-turn prototyping', 'Supply chain options', 'Functional test support']
          },
          cta: { label: 'Learn More', href: '#iot' },
          image_url: ''
        }
      }
    ]
  },
  reviews: {
    title: "Customers' Feedback",
    desc: 'Trusted by engineers and procurement teams worldwide. See what our clients have to say about our PCBA manufacturing quality and service.',
    reviews: [
      {
        image_url: '',
        customer_avatar_url: '',
        customer_name: 'Steve Fuller 🇬🇧',
        customer_industry: 'Industrial Control System',
        title: 'Fast Turnaround & Excellent Service',
        content:
          "Really easy service to use. I uploaded the Gerber's and had the PCBs in two weeks even with Christmas in the middle of the shipping time. Excellent..."
      },
      {
        image_url: '',
        customer_avatar_url: '',
        customer_name: 'Sophie Dupont 🇫🇷',
        customer_industry: 'Medical Devices',
        title: 'Flawless ISO 13485 Compliance',
        content:
          'We deal with very complex PCB assemblies for patient monitors. Their rigid-flex boards passed all compliance tests on the first try. The high-resolution...'
      },
      {
        image_url: '',
        customer_avatar_url: '',
        customer_name: 'Jason Reynolds 🇺🇸',
        customer_industry: 'IoT & Smart Home',
        title: 'Perfect BGA Assembly',
        content:
          'The conformal coating process and X-Ray inspection reports really make a difference. Our boards stay stable and corrosion-free, which means...'
      }
    ],
    cta: { text: 'Get Instant Quote', href: '#quote' }
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
        question: 'Do you support turnkey PCBA (components + assembly)?',
        answer:
          'Yes. We support turnkey, partial turnkey, and consigned assembly. BOM review and sourcing options are available based on your preferences.'
      },
      {
        question: 'What inspections and testing are available?',
        answer:
          'Typical coverage includes AOI, X-Ray, first-article inspection (FAI), electrical test, and functional testing depending on your product needs.'
      }
    ]
  },
  quote_form: emsHomeDefaults.quote_form
} as const;
