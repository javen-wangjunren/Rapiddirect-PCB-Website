export type TemplateType = 'ems_home' | 'ems_service' | 'pcb_assembly';

export interface PageRecord {
  slug: string;
  title: string;
  template_type: TemplateType;
  status: 'draft' | 'published';
}
