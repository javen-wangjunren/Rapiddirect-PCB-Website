export const pcbAssemblySchema = {
  hero: {
    title: 'string',
    background_image_url: 'string',
    benefits: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string'
      }
    },
    benefit_conclusion: 'string',
    cta: {
      href: 'string',
      label: 'string'
    }
  },
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
