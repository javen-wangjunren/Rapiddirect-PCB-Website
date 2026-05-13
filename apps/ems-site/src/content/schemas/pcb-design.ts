export const pcbDesignSchema = {
  hero: {
    background_image_url: 'string',
    title: 'string',
    benefits: {
      type: 'array',
      items: {
        icon_key: 'string',
        title: 'string',
        description: 'string'
      }
    },
    benefit_conclusion: 'string',
    cta: {
      label: 'string',
      href: 'string'
    }
  },
  services: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        name: 'string',
        description: {
          kind: 'string',
          text: 'string',
          items: 'array'
        },
        cta: {
          label: 'string',
          href: 'string'
        }
      }
    }
  },
  capability: {
    tag: 'string',
    title_prefix: 'string',
    title_highlight: 'string',
    description: 'string',
    tools: {
      type: 'array',
      items: {
        logo_url: 'string'
      }
    },
    specs: {
      type: 'array',
      items: {
        icon_svg: 'string',
        name: 'string',
        value: 'string',
        sub_value: 'string'
      }
    }
  },
  workflow: {
    title: 'string',
    description: 'string',
    stages: {
      type: 'array',
      items: {
        label: 'string',
        bg_color: 'string',
        layout: 'string',
        image_url: 'string',
        steps: {
          type: 'array',
          items: {
            tag: 'string',
            title: 'string',
            description: 'string'
          }
        },
        special_title: 'string',
        special_description: 'string',
        special_cta: {
          label: 'string',
          href: 'string'
        }
      }
    }
  }
};
