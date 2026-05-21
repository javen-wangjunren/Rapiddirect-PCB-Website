export const pcbManufacturingSchema = {
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
    description: 'string',
    items: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string',
        image_url: 'string',
        cta: {
          href: 'string'
        }
      }
    }
  },
  tech_table: {
    title: 'string',
    description: 'string',
    columns: {
      col_1: 'string',
      col_2: 'string',
      col_3: 'string'
    },
    rows: {
      type: 'array',
      items: {
        col_1: 'string',
        col_2: 'string',
        col_3: 'string'
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
};
