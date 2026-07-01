import { emsHomeDefaults } from './ems';

export const pcbApplicationsDefaults = {
  hero: {
    title: 'PCB Applications',
    background_image_url: '/assets/images/hero-bg.jpg',
    benefits: [
      {
        title: 'Application-focused engineering',
        description: 'Design and manufacturing guidance tailored to the functional and reliability needs of your end use.'
      },
      {
        title: 'Material & stackup selection',
        description: 'Choose laminates, copper weight, and stackups aligned with thermal, impedance, and mechanical constraints.'
      },
      {
        title: 'Process-driven quality',
        description: 'IPC-aligned inspection and test coverage to keep yield stable from prototype to volume production.'
      }
    ],
    benefit_conclusion: 'Explore how we support different PCB application scenarios with consistent quality and fast delivery.',
    cta: {
      label: 'Request a Quote',
      href: '/ems/contact'
    }
  },
  overview: {
    tag: 'APPLICATION OVERVIEW',
    title: 'Built for real-world requirements',
    description:
      'Every application has its own constraints. We help you make the right engineering trade-offs across performance, reliability, and cost.',
    points: ['Reliability targets & environment constraints', 'DFM/DFT and test strategy recommendations', 'Delivery plan: prototype → pilot → mass'],
    cta: {
      label: 'Talk to an Engineer',
      href: '/ems/contact'
    }
  },
  capability: {
    title: 'Manufacturing capabilities for demanding applications',
    description:
      'From stackup guidance to process control, we support application-specific PCBs with stable yield and traceable quality.',
    items: [
      {
        title: 'Material & stackup selection',
        description: 'Choose laminates and copper weights to match thermal, impedance, and reliability targets.',
        image_url: ''
      },
      {
        title: 'DFM & yield optimization',
        description: 'Design reviews and process tuning to reduce risk before you scale into volume production.',
        image_url: ''
      },
      {
        title: 'Inspection & test coverage',
        description: 'AOI, flying probe, and electrical testing strategies aligned with your application constraints.',
        image_url: ''
      }
    ]
  },
  advantage: {
    title: '4 Core Advantages of HDI PCB',
    description: "Maximize your board's real estate and performance with advanced High Density Interconnects.",
    items: [
      {
        title: '1. Ultra-High Routing Density',
        description: 'Smaller board sizes via microvias and blind/buried structures',
        image_url: ''
      },
      {
        title: '2. Elite Signal Integrity',
        description: 'Less parasitic capacitance/inductance for high-speed signals',
        image_url: ''
      },
      {
        title: '3. Enhanced Thermal Reliability',
        description: 'Microvias resist extreme thermal/mechanical stresses',
        image_url: ''
      },
      {
        title: '4. Cost-Effective for Complex BOMs',
        description: 'Reduce layer counts to lower overall production costs',
        image_url: ''
      }
    ]
  },
  tech_table: {
    title: 'Process Capabilities',
    description: 'From rapid prototyping to volume production, our facilities handle demanding PCB specifications.',
    columns: {
      col_1: 'Item',
      col_2: 'Mass Production',
      col_3: 'Sample/Prototype'
    },
    rows: [
      { col_1: 'Layers', col_2: '4-16 Layers', col_3: '4-24 Layers' },
      { col_1: 'Board Thickness Range', col_2: '0.6-3.2mm', col_3: '0.4-6.0mm' },
      { col_1: 'Impedance Tolerance', col_2: '+/-10%', col_3: '+/-7%' },
      { col_1: 'Track Width/Spacing (Min)', col_2: '2.5/2.5mil', col_3: '2.5/2.5mil' }
    ]
  },
  faq: emsHomeDefaults.faq,
  quote_form: emsHomeDefaults.quote_form,
  description: {
    header: {
      title: 'What Are Medical-Grade PCBs?'
    },
    definition: {
      lead_desc:
        'Medical-grade PCBs are ultra-reliable circuit boards built to strict healthcare compliance standards, eliminating trace-level failure risks for diagnostic, therapeutic and wearable medical devices. All boards follow strict design rules to deliver stable long-term operation in clinical environments.',
      benefits: [
        {
          title: 'Continuous Stable Operation',
          description: 'Optimized multi-layer layouts support 24/7 running under strict physiological & electrical loads.'
        },
        {
          title: 'Sterilization Compatible Materials',
          description: 'Specially selected substrates resist repeated high-temperature disinfection cycles.'
        }
      ],
      image_url: '',
      image_alt: 'Medical grade PCB for diagnostic devices'
    },
    standards: {
      title: 'Core Mandatory Medical Industry Standards',
      items: [
        {
          title: 'Strict Reliability Grading',
          description:
            'Fully compliant with IPC-A-610 Class 3 for life-critical medical equipment, delivering zero-downtime performance for long-term support devices.',
          icon_svg:
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
        },
        {
          title: 'Complete Audit Traceability',
          description:
            'Full batch traceability records including material COA, AOI logs and cleanroom files, meeting FDA & CE audit requirements.',
          icon_svg:
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>'
        },
        {
          title: 'Multi-Cycle Harsh Resistance',
          description:
            'High-Tg substrates & premium surface finishes withstand autoclave sterilization and wide temperature fluctuations.',
          icon_svg:
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>'
        }
      ]
    },
    categories: {
      title: 'Typical Medical Devices Using Our PCBs',
      items: [
        { title: 'Wearable monitors & hearing aids', image_url: '' },
        { title: 'Portable diagnostic testers (ECG / Blood glucose)', image_url: '' },
        { title: 'Endoscopes & minimally invasive surgical tools', image_url: '' },
        { title: 'MRI / CT / Ultrasound imaging equipment', image_url: '' },
        { title: 'Implantable sensors & pacemaker boards', image_url: '' },
        { title: 'Ventilators & life support control systems', image_url: '' }
      ]
    }
  }
};
