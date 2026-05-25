export const componentsSourcingSchema = {
  hero: {
    background_image_url: 'string',
    title: 'string',
    benefits: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string',
      },
    },
    benefit_conclusion: 'string',
    cta: {
      label: 'string',
      href: 'string',
    },
  },
  source_capability: {
    title: 'string',
    description: 'string',
    core_services: {
      type: 'array',
      items: {
        icon_svg: 'string',
        title: 'string',
        description: 'string',
      },
    },
    categories: {
      title: 'string',
      items: {
        type: 'array',
        items: {
          title: 'string',
          image_placeholder: 'string',
          image_url: 'string',
        },
      },
    },
    supply_chain: {
      title: 'string',
      items: {
        type: 'array',
        items: {
          title: 'string',
          description: 'string',
        },
      },
    },
    brands: {
      title: 'string',
      items: {
        type: 'array',
        items: {
          name: 'string',
          logo_url: 'string',
        },
      },
      more_label: 'string',
    },
  },
  source_process: {
    title: 'string',
    description: 'string',
    steps: {
      type: 'array',
      items: {
        id: 'string',
        nav_label: 'string',
        badge: 'string',
        title: 'string',
        description: 'string',
        image_placeholder: 'string',
        image_url: 'string',
      },
    },
  },
  source_quality_control: {
    tag: 'string',
    title: 'string',
    lead: 'string',
    trust_badges: {
      type: 'array',
      items: {
        icon_svg: 'string',
        label: 'string',
      },
    },
    items: {
      type: 'array',
      items: {
        icon_svg: 'string',
        title: 'string',
        description: 'string',
        is_highlighted: 'boolean',
      },
    },
    visual: {
      image_url: 'string',
      image_placeholder: 'string',
      floating_card: {
        icon_svg: 'string',
        title: 'string',
        subtitle: 'string',
      },
    },
  },
  source_solutions: {
    title: 'string',
    description: 'string',
    cards: {
      type: 'array',
      items: {
        icon_svg: 'string',
        title: 'string',
        points: {
          type: 'array',
          items: 'string',
        },
        value_box: {
          icon_svg: 'string',
          text: 'string',
        },
      },
    },
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
          icon_url: 'string',
        },
        card: {
          title: 'string',
          description: {
            paragraph: 'string',
            list: 'array',
          },
          cta: {
            label: 'string',
            href: 'string',
          },
          image_url: 'string',
        },
      },
    },
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
        desc: 'string',
      },
    },
    stats_bar: {
      stats: {
        type: 'array',
        items: {
          number: 'string',
          label: 'string',
        },
      },
      button: {
        text: 'string',
        href: 'string',
      },
    },
  },
  faq: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        question: 'string',
        answer: 'string',
      },
    },
  },
  quote_form: {
    title: 'string',
    description: 'string',
    background_image_url: 'string',
    name_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
    },
    company_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
    },
    email_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
    },
    phone_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
    },
    message_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
    },
    upload: {
      label: 'string',
      optional_text: 'string',
      button_text: 'string',
      help_text: 'string',
    },
    submit_label: 'string',
  },
};
