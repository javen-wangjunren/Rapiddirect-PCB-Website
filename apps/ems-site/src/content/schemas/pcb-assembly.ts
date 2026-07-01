import { faqSchema } from './modules/faq';
import { heroSchema } from './modules/hero';

export const pcbAssemblySchema = {
  hero: heroSchema,
  capability: {
    title: 'string',
    desc: 'string',
    gallery: {
      type: 'array',
      items: {
        image_url: 'string',
        name: 'string'
      }
    },
    tabs: {
      type: 'array',
      items: {
        label: 'string',
        cards: {
          type: 'array',
          items: {
            icon_url: 'string',
            title: 'string',
            body: {
              items: 'array'
            }
          }
        }
      }
    }
  },
  quality: {
    title: 'string',
    desc: 'string',
    process: {
      type: 'array',
      items: {
        icon_url: 'string',
        short_name: 'string',
        full_name: 'string',
        desc: 'string',
        highlight: 'boolean'
      }
    },
    equipment: {
      title: 'string',
      items: {
        type: 'array',
        items: {
          image_url: 'string',
          name: 'string'
        }
      }
    }
  },
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
  reviews: {
    title: 'string',
    desc: 'string',
    reviews: {
      type: 'array',
      items: {
        image_url: 'string',
        customer_avatar_url: 'string',
        customer_name: 'string',
        customer_industry: 'string',
        title: 'string',
        content: 'string'
      }
    },
    cta: {
      text: 'string',
      href: 'string'
    }
  },
  faq: faqSchema
} as const;
