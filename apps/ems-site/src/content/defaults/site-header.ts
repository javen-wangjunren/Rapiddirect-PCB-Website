export const siteHeaderDefaults = {
  logo_url: '',
  cta_text: 'Get A Quote',
  cta_href: '#',
  nav_items: [
    { label: 'PCB Fabrication', href: '#', children: [] },
    { label: 'PCB Assembly', href: '#', children: [] },
    { label: 'PCB Design', href: '#', children: [] },
    { label: 'Component Sourcing', href: '#', children: [] },
    {
      label: 'Mechanical Services',
      href: '#',
      children: [
        { label: 'CNC Machining', href: '#' },
        { label: '3D Printing', href: '#' },
        { label: 'Sheet Metal Fabrication', href: '#' },
        { label: 'Injection Molding', href: '#' }
      ]
    }
  ]
} as const;
