export const techTableSchema = {
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
} as const;

