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
  },
  simulation: {
    title: 'string',
    description: 'string',
    tabs: {
      type: 'array',
      items: {
        name: 'string',
        icon_svg: 'string',
        panel: {
          image_url: 'string',
          title: 'string',
          description: 'string',
          benefits: 'array'
        }
      }
    },
    footer: {
      description: 'string',
      cta: {
        label: 'string',
        href: 'string'
      }
    }
  },
  deliverables: {
    title: 'string',
    description: 'string',
    groups: {
      type: 'array',
      items: {
        icon_svg: 'string',
        title: 'string',
        items: {
          type: 'array',
          items: {
            icon_svg: 'string',
            title: 'string',
            format_tag: 'string',
            description: 'string'
          }
        }
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
  cta: {
    title: 'string',
    description: 'string',
    primary_button: {
      label: 'string',
      href: 'string'
    },
    secondary_button: {
      label: 'string',
      href: 'string'
    },
    trust_badges: {
      type: 'array',
      items: {
        label: 'string'
      }
    }
  }
};
