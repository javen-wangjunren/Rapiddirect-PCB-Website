import { emsHomeDefaults } from './ems';

export const pcbBoardManufacturingDefaults = {
  hero: {
    title: 'PCB Board Manufacturing Services',
    background_image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
    benefits: [
      {
        title: 'Prototype To Production',
        description: 'Support fast-turn prototype builds and stable volume manufacturing with one workflow.'
      },
      {
        title: 'DFM-Driven Review',
        description: 'Validate stack-up, manufacturability, and process risks before fabrication starts.'
      },
      {
        title: 'Reliable Quality Control',
        description: 'Run inspection checkpoints for drilling, plating, solder mask, and final electrical testing.'
      }
    ],
    benefit_conclusion: 'Share your PCB requirements and we will help match the right material, layer stack, and fabrication process.',
    cta: {
      href: '/ems/contact',
      label: 'Request a Quote'
    }
  },
  introduction: {
    title: 'What is HDI PCB?',
    description:
      'High Density Interconnect (HDI) PCB is an advanced board technology built for compact layouts, faster signals, and higher I/O density. By using laser-drilled microvias, blind and buried vias, and fine-line routing, HDI structures help engineers reduce board size while maintaining electrical performance and manufacturability for demanding products.',
    image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
    image_alt: 'Close-up of a multilayer PCB board highlighting dense traces and via structures.',
    features: [
      {
        title: 'Microvia Integration',
        description: 'Laser microvias improve interlayer routing efficiency and free more surface area for dense component placement.'
      },
      {
        title: 'Advanced Stack-Up Support',
        description: 'Supports stacked, staggered, and any-layer interconnect structures for high-pin-count packages and compact systems.'
      },
      {
        title: 'Improved Signal Integrity',
        description: 'Shorter interconnect paths reduce parasitic effects and help high-speed designs maintain cleaner signal transmission.'
      }
    ]
  },
  stackup: {
    title: 'Common HDI PCB Stack-ups',
    description:
      'Click on any structural architecture cross-section below to explore technical parameters and target industrial applications.',
    cta: {
      href: '#quote',
      label: 'Get Instant Stack-up Quote'
    },
    items: [
      {
        thumb_image_url: '',
        title: 'HDI (1+2+1)',
        tag: 'Entry 4-Layer',
        structural_features:
          'Features 1 layer of laser-drilled microvias stacked on top of a standard buried mechanic via core. Provides an entry-level pitch breakout with minimized fabrication cycle time and cost parameters.',
        target_applications:
          'Perfectly optimized for mass-market consumer electronics, smart home terminal nodes, smart bands, and general high-volume IoT wearable units.'
      },
      {
        thumb_image_url: '',
        title: 'HDI (1+4+1)',
        tag: 'Standard 6-Layer',
        structural_features:
          'Escalated layer distribution with rigid symmetry. Employs precision laser microvias connecting external copper layers directly into a stable 4-layer core matrix, suppressing mechanical board warping.',
        target_applications:
          'Widely adapted within automotive smart sensor clusters, high-resolution cameras, medical diagnostic attachments, and high-frequency communication modules.'
      },
      {
        thumb_image_url: '',
        title: 'HDI (1+6+1)',
        tag: 'Standard 8-Layer',
        structural_features:
          'Deep internal plane distribution allowing for high-density signal trace separation. Maximizes shielding parameters with dedicated ground and power layers, minimizing cross-talk.',
        target_applications:
          'Industrial embedded computers, automation server motherboards, multi-antenna enterprise-grade wireless routers, and telemetry instruments.'
      },
      {
        thumb_image_url: '',
        title: 'HDI (2+2+2)',
        tag: 'Advanced 6-Layer',
        structural_features:
          'Features 2 layers of advanced laser-drilled microvias that can be either stacked or staggered. Offers elite escape routing tolerances required for ultra-fine pitch BGA packages down to 0.4mm.',
        target_applications:
          'Flagship high-tier smartphones, compact drone flight avionics computing modules, and ultra-dense handheld communication terminals.'
      },
      {
        thumb_image_url: '',
        title: 'HDI (2+4+2)',
        tag: 'Advanced 8-Layer',
        structural_features:
          'Incorporates stacked microvias with advanced copper paste or electroplating hole-filling. Minimizes signal loop pathways and eliminates stub inductance entirely for immaculate high-speed integrity.',
        target_applications:
          'AI edge-computing modules, high-capacity server solid-state storage arrays, ADAS autonomous driving vision systems, and high-spec RF arrays.'
      },
      {
        thumb_image_url: '',
        title: 'HDI (2+6+2)',
        tag: 'Premium 10-Layer',
        structural_features:
          'Elite manufacturing layout featuring high layer count stability paired with multi-layer laser microvia penetration. Capable of handling dense impedance tracking and complex mixed-signal layers smoothly.',
        target_applications:
          'High-throughput core network data switches, aerospace guidance modules, multi-spectral military radar controllers, and premium telecom infrastructure.'
      }
    ]
  },
  advantage: {
    title: '4 Core Advantages of HDI PCB',
    description:
      "Maximize your board's real estate and performance with advanced High Density Interconnect structures built for compact, high-speed electronic products.",
    items: [
      {
        tab_title: 'Ultra-High Routing Density',
        tab_description:
          'Microvias, blind vias, and fine-line routing free more surface area for dense component placement and miniaturized layouts.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
      },
      {
        tab_title: 'Elite Signal Integrity',
        tab_description:
          'Shorter interconnect paths reduce parasitic capacitance and inductance, helping high-speed signals stay cleaner and more stable.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
      },
      {
        tab_title: 'Enhanced Thermal Reliability',
        tab_description:
          'Laser-drilled microvias and optimized copper distribution improve structural stability under thermal cycling and continuous loading.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
      },
      {
        tab_title: 'Cost-Effective for Complex BOMs',
        tab_description:
          'HDI can reduce total layer count, connector usage, and board size, improving overall system cost for complex assemblies.',
        image_url: '/images/pcb-manufacturing/mp3q9g13-qkb0a40.png',
      }
    ]
  },
  tech_table: {
    title: 'HDI PCB Manufacturing Capabilities',
    description: 'Quick reference table for prototype, sample, and mass production options. Adjust values per product board type.',
    columns: {
      col_1: 'Capability',
      col_2: 'Mass Production',
      col_3: 'Prototype / Sample'
    },
    rows: [
      { col_1: 'Min. trace / space', col_2: '3/3 mil', col_3: '3/3 mil' },
      { col_1: 'Min. via / drill', col_2: '0.15 mm', col_3: '0.15 mm' },
      { col_1: 'Layer count', col_2: '2–16 layers', col_3: '2–16 layers' },
      { col_1: 'Min. finished thickness', col_2: '0.4 mm', col_3: '0.4 mm' },
      { col_1: 'Surface finish', col_2: 'ENIG / OSP / HASL', col_3: 'ENIG / OSP / HASL' }
    ]
  },
  slider: {
    title: 'Featured HDI Product Solutions',
    description:
      'Evolving from entry-level 1+N+1 up to highly complex Any-Layer interconnects. We support your transformation from rapid engineering prototypes to stable, mass-production absolute quality assurance.',
    items: [
      {
        image_url: '',
        image_title: 'Automotive communication 2nd-order HDI board'
      },
      {
        image_url: '',
        image_title: 'Semiconductor test 4th-order HDI board'
      },
      {
        image_url: '',
        image_title: '3rd-order industrial control HDI board'
      },
      {
        image_url: '',
        image_title: '3rd-order 5G IoT HDI PCB'
      },
      {
        image_url: '',
        image_title: '10-layer 2nd-order HDI board'
      }
    ]
  },
  equipment: emsHomeDefaults.equipment,
  faq: emsHomeDefaults.faq,
  quote_form: emsHomeDefaults.quote_form
};
