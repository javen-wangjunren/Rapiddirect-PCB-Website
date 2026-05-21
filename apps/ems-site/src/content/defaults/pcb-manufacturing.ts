import { emsHomeDefaults } from './ems';

export const pcbManufacturingDefaults = {
  hero: {
    title: 'PCB Manufacturing Services',
    background_image_url: '',
    benefits: [
      {
        title: 'IPC Class 2/3 Quality',
        description: 'Strict process control with AOI, X-Ray, and electrical testing for every batch.'
      },
      {
        title: 'Fast Prototypes',
        description: 'Accelerated builds with stable lead times for prototypes and production.'
      },
      {
        title: 'One-Stop Support',
        description: 'Engineering review, fabrication, and delivery with transparent communication.'
      }
    ],
    benefit_conclusion: 'Need manufacturing guidance? Share your files and we’ll recommend the best stack-up and process.',
    cta: { href: '#quote', label: 'Get a Quote' }
  },
  capability: {
    title: 'Our Capabilities',
    description:
      'From standard designs to complex high-density architectures, we offer a complete spectrum of PCB manufacturing technologies.',
    items: [
      {
        title: 'Standard PCB',
        description:
          'Conventional PCB solutions including single-layer, double-layer, and multi-layer boards (up to 32 layers) tailored for general electronic applications and consumer devices.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'Flexible PCB',
        description:
          'Bendable and space-saving Polyimide (PI) solutions. Ideal for compact devices, wearables, and dynamic applications requiring continuous flexing.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'Rigid-Flex PCB',
        description:
          'A hybrid combination of rigid and flex board technologies. It eliminates the need for connectors, significantly improving reliability for complex 3D electronic packaging.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'Advanced PCB',
        description:
          'High-end PCB solutions leveraging cutting-edge technologies, including thick copper, ultra-large backplanes, and embedded components for specialized industrial use.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'HDI PCB',
        description:
          'High-Density Interconnect boards featuring microvias, blind, and buried vias. Perfect for miniaturized, high-performance electronics like smartphones and IoT devices.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'RF PCB',
        description:
          'Engineered with specialized low-loss materials (e.g., Rogers, Taconic) and strict impedance control to minimize signal loss in high-frequency communications and radar systems.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'Metal Core PCB',
        description:
          'Featuring an aluminum or copper base for superior thermal management. Widely used in high-power LED lighting, automotive headlights, and power converters.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      },
      {
        title: 'Ceramic PCB',
        description:
          'Offers exceptional thermal conductivity and electrical insulation. Built to withstand extreme temperatures and environments, ideal for aerospace and high-power modules.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
        cta: { href: '#' }
      }
    ]
  },
  tech_table: {
    title: 'Process Capabilities',
    description:
      'From rapid prototyping to volume production, our facilities are equipped to handle the most demanding specifications.',
    columns: {
      col_1: 'Item',
      col_2: 'Mass Production',
      col_3: 'Sample/Prototype'
    },
    rows: [
      { col_1: 'Layers', col_2: '4-16 Layers', col_3: '4-24 Layers' },
      { col_1: 'Board Thickness Range', col_2: '0.6-3.2mm', col_3: '0.4-6.0mm' },
      { col_1: 'Stack-up (Max)', col_2: '4+N+4', col_3: 'Any layer interconnected' },
      { col_1: 'Laser Hole (Min)', col_2: '4mil (0.1mm)', col_3: '3mil (0.075mm)' },
      { col_1: 'Laser Technology', col_2: 'CO2 Laser Machine', col_3: 'CO2 Laser Machine' },
      { col_1: 'TG Value', col_2: '170°C', col_3: '170°C' },
      { col_1: 'Hole Copper', col_2: '12-18µm', col_3: '12-18µm' },
      { col_1: 'Impedance Tolerance', col_2: '+/-10%', col_3: '+/-7%' },
      { col_1: 'Layer Alignment', col_2: '+/-3mil', col_3: '+/-2mil' },
      { col_1: 'Solder Mask Alignment', col_2: '+/-2mil', col_3: '+/-1mil' },
      { col_1: 'Track Width/Spacing (Min)', col_2: '2.5/2.5mil', col_3: '2.5/2.5mil' },
      { col_1: 'Annular Ring (Min)', col_2: '2.5mil', col_3: '2.5mil' },
      { col_1: 'Through Hole Diameter (Min)', col_2: '8mil (0.2mm)', col_3: '6mil (0.15mm)' },
      { col_1: 'Blind Via Diameter (Min)', col_2: '4.0mil', col_3: '3.0mil' },
      { col_1: 'Dielectric Thickness (Min)', col_2: '3.0mil', col_3: '2.0mil' },
      { col_1: 'Pad Size (Min)', col_2: '12mil', col_3: '10mil' },
      { col_1: 'Blind Via Aspect Ratio', col_2: '1:1', col_3: '1.2:1' }
    ]
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
  quality: emsHomeDefaults.quality,
  industry: emsHomeDefaults.industry,
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
  product_gallery: {
    title: 'Our Capabilities Showcase',
    description:
      'From simple rigid boards to complex multi-layer HDI and rigid-flex circuits. Explore our diverse manufacturing experience across industries.',
    tabs: [
      {
        label: 'HDI PCB',
        items: [
          {
            title: '10-Layer HDI Board',
            subtitle: 'Industrial Control Systems',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '10 Layers' },
              { label: 'Material', value: 'FR-4 TG170' },
              { label: 'HDI Structure', value: '2+N+2 (Blind/Buried)' },
              { label: 'Min Trace/Space', value: '3mil / 3mil' },
              { label: 'Surface Finish', value: 'ENIG' }
            ]
          },
          {
            title: 'Consumer Electronics PCBA',
            subtitle: 'Smart Home Devices',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '6 Layers' },
              { label: 'HDI Structure', value: '1+N+1' },
              { label: 'BGA Pitch', value: '0.4mm' },
              { label: 'Surface Finish', value: 'OSP' }
            ]
          }
        ]
      },
      {
        label: 'High Frequency',
        items: [
          {
            title: 'Rogers High Frequency Board',
            subtitle: 'Telecommunications',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '4 Layers' },
              { label: 'Material', value: 'Rogers 4350B + FR4' },
              { label: 'Board Thickness', value: '1.6mm' },
              { label: 'Impedance Control', value: '±5%' },
              { label: 'Application', value: 'Telecom Base Station' }
            ]
          },
          {
            title: 'Radar Antenna PCB',
            subtitle: 'Aerospace & Defense',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '2 Layers' },
              { label: 'Material', value: 'Taconic RF-35' },
              { label: 'Min Trace/Space', value: '4mil / 4mil' },
              { label: 'Surface Finish', value: 'Immersion Silver' }
            ]
          }
        ]
      },
      {
        label: 'Heavy Copper',
        items: [
          {
            title: '4oz Heavy Copper PCB',
            subtitle: 'Power Supply / Automotive',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '6 Layers' },
              { label: 'Copper Thickness', value: '4 oz (Outer/Inner)' },
              { label: 'Min Hole Size', value: '0.3mm' },
              { label: 'Solder Mask', value: 'Matte Black' },
              { label: 'Application', value: 'Automotive EV Charger' }
            ]
          }
        ]
      },
      {
        label: 'Rigid-Flex',
        items: [
          {
            title: '8-Layer Rigid-Flex Circuit',
            subtitle: 'Medical Devices',
            image_url: '',
            specs: [
              { label: 'Layer Count', value: '8 Layers (6 Rigid + 2 Flex)' },
              { label: 'Material', value: 'PI + FR-4' },
              { label: 'Stiffener', value: 'Stainless Steel / PI' },
              { label: 'Surface Finish', value: 'Hard Gold Plating' },
              { label: 'Application', value: 'Medical Endoscope' }
            ]
          }
        ]
      }
    ]
  },
  faq: emsHomeDefaults.faq,
  quote_form: emsHomeDefaults.quote_form
};
