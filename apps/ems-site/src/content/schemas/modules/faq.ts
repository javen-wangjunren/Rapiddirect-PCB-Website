export const faqSchema = {
  title: 'string',
  items: {
    type: 'array',
    items: {
      question: 'string',
      answer: 'string'
    }
  }
} as const;

