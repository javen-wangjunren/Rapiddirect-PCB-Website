import { emsHomeSchema } from './ems';
import { faqSchema } from './modules/faq';
import { heroSchema } from './modules/hero';
import { pcbManufacturingSchema } from './pcb-manufacturing';

export const pcbBoardManufacturingSchema = {
  hero: heroSchema,
  introduction: {
    title: 'string',
    description: 'string',
    image_url: 'string',
    features: {
      type: 'array',
      items: {
        title: 'string',
        description: 'string'
      }
    }
  },
  stackup: {
    title: 'string',
    description: 'string',
    cta: {
      label: 'string',
      href: 'string'
    },
    items: {
      type: 'array',
      items: {
        thumb_image_url: 'string',
        title: 'string',
        tag: 'string',
        structural_features: 'string',
        target_applications: 'string'
      }
    }
  },
  advantage: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        tab_title: 'string',
        tab_description: 'string',
        image_url: 'string'
      }
    }
  },
  tech_table: pcbManufacturingSchema.tech_table
  ,
  slider: {
    title: 'string',
    description: 'string',
    items: {
      type: 'array',
      items: {
        image_url: 'string',
        image_title: 'string'
      }
    }
  },
  equipment: emsHomeSchema.equipment
  ,
  faq: faqSchema
};
