export const heroSchema = {
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
} as const;

