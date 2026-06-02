export const siteHeaderDefaults = {
  logo_url: '',
  cta_text: 'Get A Quote',
  cta_href: '#',
  nav_items: [
    { label: 'PCB Fabrication', href: '#', openInNewTab: false, children: [] },
    { label: 'PCB Assembly', href: '#', openInNewTab: false, children: [] },
    { label: 'PCB Design', href: '#', openInNewTab: false, children: [] },
    { label: 'Component Sourcing', href: '#', openInNewTab: false, children: [] },
    {
      label: 'Mechanical Services',
      href: '#',
      openInNewTab: false,
      children: [
        { label: 'CNC Machining', href: '#', openInNewTab: false },
        { label: '3D Printing', href: '#', openInNewTab: false },
        { label: 'Sheet Metal Fabrication', href: '#', openInNewTab: false },
        { label: 'Injection Molding', href: '#', openInNewTab: false }
      ]
    }
  ]
} as const;
