export const pcbDesignDefaults = {
  hero: {
    title: 'Custom PCB Design Services',
    background_image_url: '/assets/images/hero-bg.jpg',
    benefits: [
      {
        title: 'Accelerated Time-to-Market',
        description: 'Reduce design cycles with our agile development process and rapid prototyping capabilities.'
      },
      {
        title: 'Design for Manufacturability (DFM)',
        description: 'Ensure seamless transition from design to production, minimizing errors and delays.'
      },
      {
        title: 'High-Performance Engineering',
        description: 'Advanced routing, impedance control, and signal integrity optimization for complex applications.'
      }
    ],
    benefit_conclusion: 'Partner with RapidDirect to turn your electronic concepts into production-ready designs.',
    cta: {
      label: 'Request a Quote',
      href: '/ems/contact'
    }
  },
  services: {
    title: 'Comprehensive PCB Design Capabilities',
    description: 'From schematic capture to final layout, our end-to-end PCB design services ensure your product meets the highest standards of quality and performance.',
    items: [
      {
        name: 'Schematic Capture',
        description: {
          kind: 'paragraph',
          text: 'We translate your electronic concepts into detailed, logical schematics, ensuring all components and connections are accurately represented for flawless execution.'
        },
        cta: {
          label: 'Learn More',
          href: '/ems/pcb-design/schematic-capture'
        }
      },
      {
        name: 'PCB Layout & Routing',
        description: {
          kind: 'list',
          items: [
            'High-speed digital design',
            'Analog and mixed-signal layouts',
            'RF and microwave PCB design',
            'Rigid, flex, and rigid-flex boards'
          ]
        },
        cta: {
          label: 'Explore Layouts',
          href: '/ems/pcb-design/layout-routing'
        }
      },
      {
        name: 'Signal & Power Integrity',
        description: {
          kind: 'paragraph',
          text: 'Our engineers conduct rigorous SI/PI analysis to prevent cross-talk, EMI issues, and power distribution problems, ensuring reliable performance in demanding environments.'
        },
        cta: {
          label: 'View Analysis Services',
          href: '/ems/pcb-design/signal-integrity'
        }
      },
      {
        name: 'DFM/DFA Verification',
        description: {
          kind: 'list',
          items: [
            'Component clearance checks',
            'Thermal management analysis',
            'Solderability verification',
            'Cost-optimized material selection'
          ]
        },
        cta: {
          label: 'Discover DFM',
          href: '/ems/pcb-design/dfm-dfa'
        }
      }
    ]
  },
  capability: {
    tag: 'Engineering Excellence',
    title_prefix: 'PCB Design ',
    title_highlight: 'Capabilities.',
    description: 'Professional technical specifications and industry-standard design tools for reliable, high-performance PCB design.',
    tools_label: 'Design Software We Use:',
    tools: [
      { logo_url: '/assets/images/ems/pcb-design/altium-logo.svg', alt_text: 'Altium Designer logo' },
      { logo_url: '/assets/images/ems/pcb-design/cadence-logo.svg', alt_text: 'Cadence Allegro logo' },
      { logo_url: '/assets/images/ems/pcb-design/pads-logo.svg', alt_text: 'PADS logo' }
    ],
    specs: [
      {
        icon_svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>',
        name: 'Layer Count',
        value: '1 – 20+ Layers',
        sub_value: 'High-density multilayer support'
      },
      {
        icon_svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M4 17v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3M7 12h10"></path></svg>',
        name: 'Min Trace / Space',
        value: 'Customizable',
        sub_value: 'Fine pitch precision'
      },
      {
        icon_svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>',
        name: 'Via Types',
        value: 'Full Spectrum',
        sub_value: 'Blind, Buried & Microvias'
      },
      {
        icon_svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
        name: 'Impedance Control',
        value: 'Fully Supported',
        sub_value: 'TDR testing verification'
      },
      {
        icon_svg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
        name: 'High-Speed Interfaces',
        value: 'DDR, HDMI, PCIe, RF',
        sub_value: 'Signal & Power Integrity optimized'
      }
    ]
  },
  workflow: {
    title: 'PCB Design Workflow',
    description: 'From Idea to Production, Every Step Standardized & Transparent.',
    stages: [
      {
        label: 'Idea',
        bg_color: '#F5F0FF',
        layout: 'standard',
        steps: [
          {
            tag: 'Step 1',
            title: 'Project Requirement & Alignment',
            description: '与客户深度对齐项目目标、应用场景、性能指标、成本与交期要求，输出《项目需求规格书》，明确关键约束，确保设计方向100%匹配客户需求。'
          }
        ]
      },
      {
        label: 'PCB Design',
        bg_color: '#F0FFF0',
        layout: 'standard',
        steps: [
          {
            tag: 'Step 2',
            title: 'Schematic Design & Review',
            description: '根据需求完成电路原理图设计，同步进行设计规则自查与评审，提前排查功能缺陷与器件冲突。'
          },
          {
            tag: 'Step 3',
            title: 'PCB Layout & Component Placement',
            description: '基于原理图完成PCB布局布线，重点处理高速信号、阻抗控制与EMC相关走线，兼顾可制造性与散热需求。'
          }
        ]
      },
      {
        label: 'Validation & Sim',
        bg_color: '#F0F8FF',
        layout: 'standard',
        steps: [
          {
            tag: 'Step 4',
            title: 'Engineering Simulation & Verification',
            description: '针对关键链路进行SI/PI、EMC/EMI仿真与热分析，提前识别并解决信号串扰与散热隐患，降低项目风险。'
          },
          {
            tag: 'Step 5',
            title: 'DFM/DFA Review & Optimization',
            description: '开展可制造性（DFM）与可组装性（DFA）全流程评审，优化Gerber文件与BOM清单，降低量产不良率。'
          }
        ]
      },
      {
        label: 'Gerber Output',
        bg_color: '#FFFFFF',
        layout: 'standard',
        steps: [
          {
            tag: 'Step 6',
            title: 'Design File Finalization & Handover',
            description: '输出完整生产文件包，包含Gerber、BOM清单、坐标文件等，确保与生产要求完全兼容，直接对接生产流程。'
          }
        ]
      },
      {
        label: 'Manufacturing',
        bg_color: '#111111',
        layout: 'special',
        special_title: 'Seamless Manufacturing Integration',
        special_description: '我们提供从PCB打样、SMT组装到批量生产的一站式配套服务，设计完成后可无缝衔接生产环节，大幅缩短你的项目周期。',
        special_cta: {
          label: 'Get a Free Manufacturing Quote',
          href: '/ems/contact'
        }
      }
    ]
  },
  simulation: {
    title: 'Engineering & Simulation Services',
    description: 'Design Validation & Engineering Simulation to Reduce Risks, Ensure Performance, and Accelerate Time-to-Market',
    tabs: [
      {
        id: 'panel-1',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
        name: 'SI/PI Analysis',
        panel: {
          image_placeholder: '[ Visual: SI/PI Eye Diagram Simulation ]',
          title: 'SI/PI Analysis & Optimization',
          description: 'Validate high-speed signal paths and power delivery networks (PDN) to eliminate issues like signal reflection, crosstalk, voltage droop, and noise. We ensure stable performance for <span class="text-[#2563eb] font-semibold">DDR, PCIe, USB</span>, and other high-speed interfaces.',
          benefits: [
            'Eliminate high-speed design risks before prototyping',
            'Improve power stability and reduce noise interference'
          ]
        }
      },
      {
        id: 'panel-2',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m11.4 0l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"></path></svg>',
        name: 'EMI/EMC Simulation',
        panel: {
          image_placeholder: '[ Visual: Electromagnetic Radiation Heatmap ]',
          title: 'EMI/EMC Simulation & Pre-Compliance',
          description: 'Simulate electromagnetic radiation and susceptibility to identify potential EMC compliance issues early. We optimize routing, shielding, and grounding to meet <span class="text-[#2563eb] font-semibold">CE, FCC</span>, and other industry standards, reducing costly post-design rework.',
          benefits: [
            'Minimize electromagnetic interference',
            'Speed up regulatory compliance certification'
          ]
        }
      },
      {
        id: 'panel-3',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
        name: 'Thermal Analysis',
        panel: {
          image_placeholder: '[ Visual: PCB Thermal Distribution 3D Model ]',
          title: 'Thermal Analysis & Thermal Design',
          description: 'Perform thermal simulation to predict heat distribution and hotspots on <span class="text-[#2563eb] font-semibold">high-power PCBs</span>. We optimize copper pours, vias, and component placement to improve heat dissipation, preventing overheating and extending product lifespan.',
          benefits: [
            'Avoid thermal-related failures',
            'Optimize design for high-power applications'
          ]
        }
      },
      {
        id: 'panel-4',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
        name: 'Stack-up & Impedance',
        panel: {
          image_placeholder: '[ Visual: Multilayer Stack-up Profile ]',
          title: 'Stack-up Design & Impedance Control',
          description: 'Customize PCB layer stack-ups based on your performance and manufacturing requirements. We calculate and control <span class="text-[#2563eb] font-semibold">50Ω, 90Ω, 100Ω</span> differential/single-ended impedance for high-speed signals, ensuring consistent electrical performance.',
          benefits: [
            'Accurate impedance matching for high-speed designs',
            'Optimize stack-up for cost and manufacturability'
          ]
        }
      },
      {
        id: 'panel-5',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"></path></svg>',
        name: 'DFM/DFA Review',
        panel: {
          image_placeholder: '[ Visual: DFM/DFA Manufacturing Software Check ]',
          title: 'DFM/DFA Design for Manufacturing',
          description: 'Conduct full <span class="text-[#2563eb] font-semibold">DFM/DFA</span> checks to verify line width/spacing, via sizes, pad geometries, and component placement against PCB fabrication and SMT assembly rules. We eliminate design issues that would cause production defects.',
          benefits: [
            'Reduce production yield loss',
            'Ensure seamless handover to mass production'
          ]
        }
      },
      {
        id: 'panel-6',
        icon_svg: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
        name: 'DRC & LVS Checks',
        panel: {
          image_placeholder: '[ Visual: Schematic vs Layout Validation ]',
          title: 'DRC & LVS Design Rule Checks',
          description: 'Run comprehensive Design Rule Checks (<span class="text-[#2563eb] font-semibold">DRC</span>) and Layout Versus Schematic (<span class="text-[#2563eb] font-semibold">LVS</span>) verification to ensure your PCB layout exactly matches the schematic and adheres to all design rules. This catches errors early to avoid costly re-spins.',
          benefits: [
            'Eliminate layout vs schematic mismatches',
            'Ensure design rule compliance before prototyping'
          ]
        }
      }
    ],
    footer: {
      description: 'All simulations and engineering validations are fully documented with actionable optimization recommendations. Every design we deliver is pre-validated for performance, compliance, and manufacturability, ready to move directly to prototyping and mass production.',
      cta: {
        label: 'Talk to Our Simulation Engineer',
        href: '/ems/contact'
      }
    }
  },
  process: {
    title: 'One-Stop: From Design to Mass Production',
    description: 'Your Single Partner for PCB Prototyping, Manufacturing, Assembly & Full-Scale Production',
    items: [
      {
        icon: 'prototyping',
        title: 'Rapid PCB Prototyping',
        description: 'Fast-turn PCB prototyping with <span class="text-[#0066FF] font-semibold">24–72 hour</span> lead times, supporting multi-layer boards and HDI. Perfect for quick iteration before production.',
        tags: ['Fast Turnaround', 'Low MOQ Support'],
        image_url:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Photorealistic%20close-up%20of%20an%20electronics%20engineer%20inspecting%20a%20printed%20circuit%20board%20prototype%20under%20magnifier%2C%20modern%20clean%20lab%2C%20soft%20daylight%2C%20high%20detail%2C%20realistic%20colors&image_size=landscape_4_3',
      },
      {
        icon: 'fabrication',
        title: 'Precision PCB Fabrication',
        description: 'High-quality manufacturing for advanced technologies including <span class="text-[#0066FF] font-semibold">Rigid-Flex</span> and specialized substrates. Strict IPC-A-600 standard compliance.',
        tags: ['IPC Standards', 'Precision Etching'],
        image_url:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Photorealistic%20wide%20shot%20of%20automated%20PCB%20fabrication%20production%20line%20with%20conveyor%20and%20machines%2C%20clean%20factory%2C%20industrial%20lighting%2C%20high%20detail&image_size=landscape_4_3',
      },
      {
        icon: 'assembly',
        title: 'Full SMT & THT Assembly',
        description: 'Turnkey assembly for complex <span class="text-[#0066FF] font-semibold">fine-pitch</span> and mixed technology. Automated Optical Inspection (AOI) ensuring consistent quality.',
        tags: ['AOI Inspection', 'Mixed Technology'],
        image_url:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Photorealistic%20SMT%20pick%20and%20place%20machine%20placing%20components%20on%20a%20PCB%2C%20macro%20view%2C%20clean%20manufacturing%20floor%2C%20high%20detail%2C%20sharp%20focus&image_size=landscape_4_3',
      },
      {
        icon: 'sourcing',
        title: 'Component Sourcing',
        description: 'End-to-end procurement with traced sourcing and <span class="text-[#0066FF] font-semibold">BOM validation</span>. Supply chain risk mitigation with genuine components.',
        tags: ['Bom Validation', 'Genuine Traceability'],
        image_url:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Photorealistic%20warehouse%20shelves%20with%20labeled%20electronics%20component%20reels%20and%20trays%2C%20organized%20supply%20chain%2C%20clean%20lighting%2C%20high%20detail&image_size=landscape_4_3',
      },
      {
        icon: 'production',
        title: 'Flexible Production Runs',
        description: 'Scalable capacity from prototypes up to <span class="text-[#0066FF] font-semibold">100,000+ units</span>. Flexible MOQs with consistent quality across all volumes.',
        tags: ['Scalable Volume', 'Flexible Capacity'],
        image_url:
          'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Photorealistic%20quality%20control%20technician%20examining%20finished%20PCBA%20batch%20with%20inspection%20equipment%2C%20clean%20factory%2C%20high%20detail%2C%20realistic%20colors&image_size=landscape_4_3',
      }
    ],
    trust_base: {
      title: 'Why Choose Our One-Stop Production Service?',
      benefits: [
        {
          icon: 'workflow',
          title: 'Seamless Workflow',
          description: 'Design handled by the same team until delivery, eliminating miscommunication.'
        },
        {
          icon: 'timing',
          title: 'Controlled Lead Times',
          description: 'No supplier handovers. We optimize steps to stay on schedule.'
        },
        {
          icon: 'cost',
          title: 'Cost Efficiency',
          description: 'Unified production reduces overhead and eliminates hidden third-party fees.'
        },
        {
          icon: 'quality',
          title: 'Quality Consistency',
          description: 'Unified standards across all stages with full material traceability.'
        }
      ],
      cta: {
        label: 'Get a Custom Production Quote',
        href: '/ems/contact'
      }
    }
  },
  deliverables: {
    title: 'Project Deliverables',
    description: 'Everything you need for seamless prototyping and mass production.',
    groups: [
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>',
        title: 'Design Source Files',
        items: [
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline></svg>',
            title: 'Schematic Files',
            format_tag: 'Native + PDF',
            description: 'Complete circuit logic diagrams showing <span class="text-[#0066FF] font-semibold">power, signals, and control paths</span>, for review and future iteration.'
          },
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
            title: 'PCB Layout Files',
            format_tag: 'Altium / Cadence',
            description: 'Editable PCB design files with <span class="text-[#0066FF] font-semibold">full layer and routing data</span>, ready for later modifications.'
          }
        ]
      },
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>',
        title: 'Production-Ready Files',
        items: [
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
            title: 'Gerber Files',
            format_tag: 'RS-274X Standard',
            description: 'Universal industry-standard files for <span class="text-[#0066FF] font-semibold">all PCB layers</span>, explicitly required for manufacturing.'
          },
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>',
            title: 'NC Drill & Pick-and-Place',
            format_tag: 'Excellon / CSV',
            description: 'Coordinate files for <span class="text-[#0066FF] font-semibold">hole drilling and SMT automated assembly</span>, listing exact positions and orientations.'
          },
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path></svg>',
            title: 'BOM & Assembly Drawings',
            format_tag: 'Excel / PDF',
            description: 'Detailed component list and visual guides for <span class="text-[#0066FF] font-semibold">procurement, component placement, polarity</span>, and inspection.'
          }
        ]
      },
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        title: 'Optional Deliverables',
        items: [
          {
            icon_svg: '<svg class="text-[#333333] w-6 h-6 shrink-0 mt-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
            title: 'Physical Prototypes',
            format_tag: 'Bare / Assembled',
            description: 'Optional <span class="text-[#0066FF] font-semibold">physical PCBs for testing</span>, available as an add-on service to validate the design before full production.'
          }
        ]
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
            paragraph:
              'PCB solutions designed for strict compliance and long-term reliability in medical applications.',
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
            paragraph:
              'From prototypes to mass production, we support rapid iteration and scalable delivery.',
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
            paragraph:
              'Solutions engineered for demanding environments and continuous operation.',
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
            paragraph:
              'Support for high-frequency, high-speed applications where performance matters.',
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
            paragraph:
              'Process discipline and quality control to support mission-critical electronics.',
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
        icon_url: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>'
      },
      {
        title: 'Hardware-Speed',
        highlight: 'Prototyping',
        desc: 'Sync your PCB fabrication with mechanical parts. Get your entire functional prototype in one shipment, cutting weeks off your NPI cycle.',
        icon_url: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>'
      },
      {
        title: 'Zero-Friction',
        highlight: 'Logistics',
        desc: 'Eliminate the cost and risk of shipping parts between multiple factories. We handle the integration, you handle the innovation.',
        icon_url: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M10 6.5h4" /><path d="M10 17.5h4" /><path d="M6.5 10v4" /><path d="M17.5 10v4" /></svg>'
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
        answer: 'Share your Gerber/BOM and requirements. We run a DFM review and provide actionable feedback to improve manufacturability before production.'
      },
      {
        question: 'What makes RapidDirect different from other manufacturing platforms or intermediaries?',
        answer: 'We focus on integrated delivery across electronics and supporting processes, with clear engineering feedback loops to reduce iteration time and risk.'
      },
      {
        question: 'How fast can Rapiddirect deliver?',
        answer: 'Lead time depends on complexity and quantity. We support both prototyping and production workflows and will confirm schedule after DFM review.'
      },
      {
        question: 'What surface finishes and colors are available?',
        answer: 'We support common finishes and solder mask options. Tell us your target application and we can recommend a suitable combination.'
      },
      {
        question: 'Do you offer material certificates or test reports?',
        answer: 'Yes. Depending on project requirements, we can provide relevant certificates and test/inspection reports as part of delivery documentation.'
      },
      {
        question: 'Do your materials and processes comply with RoHS, REACH, or other EU standards?',
        answer: 'We can support compliance requirements and documentation for major standards. Please specify required standards during quotation.'
      },
      {
        question: 'What if my parts do not meet the required specifications?',
        answer: 'We follow a quality control process and will investigate any issues with traceability. Contact us with details and we will provide resolution options.'
      }
    ]
  },
  cta: {
    title: 'Ready to Turn Your PCB Design into <span class="text-[#ef533f]">Reality?</span>',
    description: 'Upload your Gerber files for a free DFM check and get a detailed quote within 2 hours. Have a complex project? Our senior engineers are on standby to discuss your specific requirements.',
    primary_button: {
      label: 'Start Your Project',
      href: '/ems/contact'
    },
    secondary_button: {
      label: 'Talk to an Engineer',
      href: '/ems/contact'
    },
    trust_badges: [
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
        label: 'Strict NDA Protection'
      },
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
        label: '100% Free DFM Check'
      },
      {
        icon_svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
        label: 'Quote Within 2 Hours'
      }
    ]
  }
};
