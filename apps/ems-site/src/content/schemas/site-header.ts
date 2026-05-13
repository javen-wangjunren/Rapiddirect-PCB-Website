export const siteHeaderSchema = {
  logo_url: 'string',
  cta_text: 'string',
  cta_href: 'string',
  nav_items: {
    type: 'array',
    items: {
      label: 'string',
      href: 'string',
      children: {
        type: 'array',
        items: {
          label: 'string',
          href: 'string'
        }
      }
    }
  }
} as const;
