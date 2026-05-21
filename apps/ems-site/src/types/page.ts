export type TemplateType =
  | 'ems_home'
  | 'ems_service'
  | 'pcb_assembly'
  | 'pcb_design'
  | 'pcb_manufacturing'
  | 'components_sourcing'
  | 'site_footer'
  | 'site_header';

export interface PageRecord {
  slug: string;
  title: string;
  template_type: TemplateType;
  status: 'draft' | 'published';
}
