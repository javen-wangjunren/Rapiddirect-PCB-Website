export const siteFooterDefaults = {
  logo_url: '',
  company_info: {
    phones: ['+86 0755-85276703', '+86 158 0208 7464'],
    email: 'info@rapiddirect.com',
    address_lines: [
      'Building A12, Haosi Industrial Park',
      "Nanpu Road, Xinqiao Street, Bao'an District",
      'Shenzhen, China, 518104'
    ]
  },
  social_links: [
    { platform: 'facebook', href: '#' },
    { platform: 'x', href: '#' },
    { platform: 'youtube', href: '#' },
    { platform: 'linkedin', href: '#' }
  ],
  menus: {
    capabilities: {
      title: 'Capabilities',
      links: [
        { label: 'PCB Fabrication', href: '/pcb-manufacturing/', openInNewTab: false },
        { label: 'PCB Assembly (PCBA)', href: '/pcb-assembly/', openInNewTab: false },
        { label: 'PCB Design Services', href: '/pcb-design/', openInNewTab: false },
        { label: 'Component Sourcing', href: '/components-sourcing/', openInNewTab: false }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'PCB Materials', href: '#', openInNewTab: false },
        { label: 'Surface Finishes', href: '#', openInNewTab: false },
        { label: 'Design Guidelines', href: '#', openInNewTab: false },
        { label: 'Blog', href: '#', openInNewTab: false }
      ]
    },
    about: {
      title: 'About',
      links: [
        { label: 'About RapidDirect', href: '#', openInNewTab: false },
        { label: 'Our Platform', href: '#', openInNewTab: false },
        { label: 'Quality Assurance', href: '#', openInNewTab: false },
        { label: 'Certifications', href: '#', openInNewTab: false },
        { label: 'Contact Us', href: '#quote', openInNewTab: false }
      ]
    }
  },
  footer_bottom: {
    copyright: 'Copyright © 2025 Shenzhen Rapid Direct Co., Ltd. All rights reserved',
    legal_links: [
      { label: 'Privacy Policy', href: '#', openInNewTab: false },
      { label: 'Cookie Policy', href: '#', openInNewTab: false },
      { label: 'Terms and Conditions', href: '#', openInNewTab: false },
      { label: 'Consent Preferences', href: '#', openInNewTab: false }
    ]
  }
} as const;
