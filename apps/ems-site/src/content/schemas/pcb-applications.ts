import { faqSchema } from './modules/faq';
import { capabilitySchema } from './modules/capability';
import { heroSchema } from './modules/hero';
import { techTableSchema } from './modules/tech-table';
import { pcbApplicationsAdvantageSchema } from './pcb-applications/advantage';
import { pcbApplicationsDescriptionSchema } from './pcb-applications/description';

export const pcbApplicationsSchema = {
  hero: heroSchema,
  description: pcbApplicationsDescriptionSchema,
  capability: capabilitySchema,
  advantage: pcbApplicationsAdvantageSchema,
  tech_table: techTableSchema,
  faq: faqSchema
} as const;
