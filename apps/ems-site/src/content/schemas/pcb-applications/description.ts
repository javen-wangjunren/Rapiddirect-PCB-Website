export const pcbApplicationsDescriptionSchema = {
  header: {
    title: 'string'
  },
  definition: {
    lead_desc: 'string',
    benefits: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string'
      }
    },
    image_url: 'string',
    image_alt: 'string'
  },
  standards: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        icon_svg: 'string',
        title: 'string',
        description: 'string'
      }
    }
  },
  categories: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        title: 'string',
        image_url: 'string'
      }
    }
  }
} as const;
