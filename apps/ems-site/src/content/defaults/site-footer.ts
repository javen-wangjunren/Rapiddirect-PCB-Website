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
        { label: 'PCB Fabrication', href: '/pcb-manufacturing/' },
        { label: 'PCB Assembly (PCBA)', href: '/pcb-assembly/' },
        { label: 'PCB Design Services', href: '/pcb-design/' },
        { label: 'Component Sourcing', href: '/components-sourcing/' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'PCB Materials', href: '#' },
        { label: 'Surface Finishes', href: '#' },
        { label: 'Design Guidelines', href: '#' },
        { label: 'Blog', href: '#' }
      ]
    },
    about: {
      title: 'About',
      links: [
        { label: 'About RapidDirect', href: '#' },
        { label: 'Our Platform', href: '#' },
        { label: 'Quality Assurance', href: '#' },
        { label: 'Certifications', href: '#' },
        { label: 'Contact Us', href: '#quote' }
      ]
    }
  },
  footer_bottom: {
    copyright: 'Copyright © 2025 Shenzhen Rapid Direct Co., Ltd. All rights reserved',
    legal_links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Terms and Conditions', href: '#' },
      { label: 'Consent Preferences', href: '#' }
    ]
  }
} as const;
