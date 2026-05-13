export type TemplateType = 'ems_home' | 'ems_service' | 'pcb_assembly' | 'pcb_design' | 'site_footer' | 'site_header';

export interface PageRecord {
  slug: string;
  title: string;
  template_type: TemplateType;
  status: 'draft' | 'published';
}
