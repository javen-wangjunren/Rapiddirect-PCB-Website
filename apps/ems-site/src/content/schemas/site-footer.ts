export const siteFooterSchema = {
  logo_url: 'string',
  company_info: {
    phones: 'array',
    email: 'string',
    address_lines: 'array'
  },
  social_links: {
    type: 'array',
    items: {
      platform: 'string',
      href: 'string'
    }
  },
  menus: {
    capabilities: {
      title: 'string',
      links: {
        type: 'array',
        items: {
          label: 'string',
          href: 'string'
        }
      }
    },
    resources: {
      title: 'string',
      links: {
        type: 'array',
        items: {
          label: 'string',
          href: 'string'
        }
      }
    },
    about: {
      title: 'string',
      links: {
        type: 'array',
        items: {
          label: 'string',
          href: 'string'
        }
      }
    }
  },
  footer_bottom: {
    copyright: 'string',
    legal_links: {
      type: 'array',
      items: {
        label: 'string',
        href: 'string'
      }
    }
  }
} as const;
