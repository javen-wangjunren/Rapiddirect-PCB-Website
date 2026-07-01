import { faqSchema } from './modules/faq';
import { heroSchema } from './modules/hero';

export const emsHomeSchema = {
  hero: heroSchema,
  services: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        name: 'string',
        image_url: 'string',
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
  quality: {
    title: 'string',
    description: 'string',
    tabs: {
      type: 'array',
      items: {
        id: 'string',
        title: 'string',
        icon_url: 'string',
        content: {
          left: {
            image_url: 'string',
            icon_url: 'string',
            title: 'string',
            description: 'string'
          },
          functions: {
            type: 'array',
            items: {
              icon_url: 'string',
              name: 'string',
              description: 'string'
            }
          }
        }
      }
    },
    advantages: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string'
      }
    }
  },
  certification: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        icon_url: 'string',
        name: 'string',
        description: 'string',
        time_icon_url: 'string',
        time_text: 'string'
      }
    }
  },
  industry: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        tab: {
          id: 'string',
          name: 'string',
          icon_url: 'string'
        },
        card: {
          title: 'string',
          description: {
            paragraph: 'string',
            list: 'array'
          },
          cta: {
            label: 'string',
            href: 'string'
          },
          image_url: 'string'
        }
      }
    }
  },
  equipment: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        image_url: 'string',
        title: 'string',
        description: 'string',
        parameter_label: 'string',
        parameter_value: 'string'
      }
    }
  },
  why_choose_us: {
    heading_prefix: 'string',
    heading_highlight: 'string',
    sub_heading: 'string',
    description: 'string',
    cards: {
      type: 'array',
      items: {
        icon_url: 'string',
        title: 'string',
        description: 'string'
      }
    }
  },
  order_process: {
    title: 'string',
    steps: {
      type: 'array',
      items: {
        icon_url: 'string',
        title: 'string'
      }
    }
  },
  faq: faqSchema
} as const;
