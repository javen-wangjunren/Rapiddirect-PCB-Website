export const emsHomeSchema = {
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
  faq: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        question: 'string',
        answer: 'string'
      }
    }
  },
  quote_form: {
    title: 'string',
    description: 'string',
    background_image_url: 'string',
    name_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean'
    },
    company_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean'
    },
    email_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean'
    },
    phone_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean'
    },
    message_field: {
      label: 'string',
      placeholder: 'string',
      required: 'boolean'
    },
    upload: {
      label: 'string',
      optional_text: 'string',
      button_text: 'string',
      help_text: 'string'
    },
    submit_label: 'string'
  }
} as const;
