import { faqSchema } from './modules/faq';
import { capabilitySchema } from './modules/capability';
import { heroSchema } from './modules/hero';
import { techTableSchema } from './modules/tech-table';

export const pcbManufacturingSchema = {
  hero: heroSchema,
  capability: capabilitySchema,
  tech_table: techTableSchema,
  process: {
    title: 'string',
    desc: 'string',
    stages: {
      type: 'array',
      items: {
        stage_name: 'string',
        image_url: 'string',
        process_name: 'string',
        process_desc: 'array',
        expert_advice: {
          title: 'string',
          desc: 'string'
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
  why_choose_us: {
    title: 'string',
    desc: 'string',
    advantages: {
      type: 'array',
      items: {
        icon_url: 'string',
        title: 'string',
        highlight: 'string',
        desc: 'string'
      }
    },
    stats_bar: {
      stats: {
        type: 'array',
        items: {
          number: 'string',
          label: 'string'
        }
      },
      button: {
        text: 'string',
        href: 'string'
      }
    }
  },
  product_gallery: {
    title: 'string',
    description: 'string',
    tabs: {
      type: 'array',
      items: {
        label: 'string',
        items: {
          type: 'array',
          items: {
            title: 'string',
            subtitle: 'string',
            image_url: 'string',
            specs: {
              type: 'array',
              items: {
                label: 'string',
                value: 'string'
              }
            }
          }
        }
      }
    }
  },
  faq: faqSchema
};
