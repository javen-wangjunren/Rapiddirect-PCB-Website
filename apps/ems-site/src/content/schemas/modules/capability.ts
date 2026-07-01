export const capabilitySchema = {
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
} as const;
