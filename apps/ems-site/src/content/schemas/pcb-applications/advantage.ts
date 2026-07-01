export const pcbApplicationsAdvantageSchema = {
  title: 'string',
  description: 'string',
  items: {
    type: 'array',
    items: {
      image_url: 'string',
      title: 'string',
      description: 'string'
    }
  }
} as const;
