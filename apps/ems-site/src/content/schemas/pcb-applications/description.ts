export const pcbApplicationsDescriptionSchema = {
  header: {
    title: 'string'
  },
  definition: {
    text: 'string',
    highlights: {
      type: 'array',
      items: {
        strong: 'string',
        detail: 'string'
      }
    },
    image: {
      url: 'string',
      alt: 'string'
    }
  },
  standards: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        icon_key: 'string',
        title: 'string',
        description: 'string'
      }
    }
  },
  gallery: {
    title: 'string',
    items: {
      type: 'array',
      items: {
        title: 'string',
        image: {
          url: 'string',
          alt: 'string'
        }
      }
    }
  }
} as const;
