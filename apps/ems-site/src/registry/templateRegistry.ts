import type { JsonValue } from '../utils/jsonTree';
import type { TemplateType } from '../types/page';

/* ── Defaults ── */
import { emsHomeDefaults } from '../content/defaults/ems';
import { componentsSourcingDefaults } from '../content/defaults/components-sourcing';
import { contactUsDefaults } from '../content/defaults/contact-us';
import { pcbBoardManufacturingDefaults } from '../content/defaults/pcb-board-manufacturing';
import { pcbAssemblyDefaults } from '../content/defaults/pcb-assembly';
import { pcbApplicationsDefaults } from '../content/defaults/pcb-applications';
import { pcbDesignDefaults } from '../content/defaults/pcb-design';
import { pcbManufacturingDefaults } from '../content/defaults/pcb-manufacturing';
import { siteFooterDefaults } from '../content/defaults/site-footer';
import { siteHeaderDefaults } from '../content/defaults/site-header';
import { siteInquiryFormDefaults } from '../content/defaults/site-inquiry-form';

/* ── Normalize ── */
import { normalizeEmsHomeContentJson } from '../content/normalize/ems';
import { normalizeComponentsSourcingContentJson } from '../content/normalize/components-sourcing';
import { normalizeContactUsContentJson } from '../content/normalize/contact-us';
import { normalizePcbBoardManufacturingContentJson } from '../content/normalize/pcb-board-manufacturing';
import { normalizePcbAssemblyContentJson } from '../content/normalize/pcb-assembly';
import { normalizePcbApplicationsContentJson } from '../content/normalize/pcb-applications';
import { normalizePcbDesignContentJson } from '../content/normalize/pcb-design';
import { normalizePcbManufacturingContentJson } from '../content/normalize/pcb-manufacturing';
import { normalizeSiteFooterContentJson } from '../content/normalize/site-footer';
import { normalizeSiteHeaderContentJson } from '../content/normalize/site-header';
import { normalizeSiteInquiryFormContentJson } from '../content/normalize/site-inquiry-form';

/* ── Content Editors ── */
import EmsEditorContentModules from '../components/admin/EmsEditorContentModules';
import ComponentsSourcingEditorContentModules from '../components/admin/ComponentsSourcingEditorContentModules';
import ContactUsEditorContentModules from '../components/admin/ContactUsEditorContentModules';
import PcbBoardManufacturingEditorContentModules from '../components/admin/PcbBoardManufacturingEditorContentModules';
import PcbAssemblyEditorContentModules from '../components/admin/PcbAssemblyEditorContentModules';
import PcbApplicationsEditorContentModules from '../components/admin/PcbApplicationsEditorContentModules';
import PcbDesignEditorContentModules from '../components/admin/PcbDesignEditorContentModules';
import PcbManufacturingEditorContentModules from '../components/admin/PcbManufacturingEditorContentModules';
import SiteFooterEditorContentModules from '../components/admin/SiteFooterEditorContentModules';
import SiteHeaderEditorContentModules from '../components/admin/SiteHeaderEditorContentModules';
import SiteInquiryFormEditorContentModules from '../components/admin/SiteInquiryFormEditorContentModules';

export interface TemplateConfig {
  defaults: Record<string, unknown>;
  normalize: (data: any) => any;
  ContentEditor: React.ComponentType<{
    contentJson: JsonValue;
    onModuleChange: (key: string, next: JsonValue) => void;
    onContentReplace?: (next: JsonValue) => void;
  }> | null;
  label: string;
}

export const TEMPLATE_REGISTRY: Record<TemplateType, TemplateConfig> = {
  ems_home: {
    defaults: emsHomeDefaults,
    normalize: normalizeEmsHomeContentJson,
    ContentEditor: EmsEditorContentModules,
    label: 'ems_home'
  },
  components_sourcing: {
    defaults: componentsSourcingDefaults,
    normalize: normalizeComponentsSourcingContentJson,
    ContentEditor: ComponentsSourcingEditorContentModules,
    label: 'components_sourcing'
  },
  contact_us: {
    defaults: contactUsDefaults,
    normalize: normalizeContactUsContentJson,
    ContentEditor: ContactUsEditorContentModules,
    label: 'contact_us'
  },
  pcb_applications: {
    defaults: pcbApplicationsDefaults,
    normalize: normalizePcbApplicationsContentJson,
    ContentEditor: PcbApplicationsEditorContentModules,
    label: 'pcb_applications'
  },
  pcb_board_manufacturing: {
    defaults: pcbBoardManufacturingDefaults,
    normalize: normalizePcbBoardManufacturingContentJson,
    ContentEditor: PcbBoardManufacturingEditorContentModules,
    label: 'pcb_board_manufacturing'
  },
  pcb_assembly: {
    defaults: pcbAssemblyDefaults,
    normalize: normalizePcbAssemblyContentJson,
    ContentEditor: PcbAssemblyEditorContentModules,
    label: 'pcb_assembly'
  },
  pcb_design: {
    defaults: pcbDesignDefaults,
    normalize: normalizePcbDesignContentJson,
    ContentEditor: PcbDesignEditorContentModules,
    label: 'pcb_design'
  },
  pcb_manufacturing: {
    defaults: pcbManufacturingDefaults,
    normalize: normalizePcbManufacturingContentJson,
    ContentEditor: PcbManufacturingEditorContentModules,
    label: 'pcb_manufacturing'
  },
  site_footer: {
    defaults: siteFooterDefaults,
    normalize: normalizeSiteFooterContentJson,
    ContentEditor: SiteFooterEditorContentModules,
    label: 'site_footer'
  },
  site_header: {
    defaults: siteHeaderDefaults,
    normalize: normalizeSiteHeaderContentJson,
    ContentEditor: SiteHeaderEditorContentModules,
    label: 'site_header'
  },
  site_inquiry_form: {
    defaults: siteInquiryFormDefaults,
    normalize: normalizeSiteInquiryFormContentJson,
    ContentEditor: SiteInquiryFormEditorContentModules,
    label: 'site_inquiry_form'
  },
  ems_service: {
    defaults: {},
    normalize: (data) => data,
    ContentEditor: null,
    label: 'ems_service'
  }
};

/** 后台下拉选项列表 */
export const TEMPLATE_OPTIONS: { value: TemplateType; label: string }[] = (
  Object.entries(TEMPLATE_REGISTRY) as [TemplateType, TemplateConfig][]
).map(([value, config]) => ({ value, label: config.label }));

/** 有 Schema 编辑器的模板列表 */
export const TEMPLATES_WITH_SCHEMA: TemplateType[] = (
  Object.entries(TEMPLATE_REGISTRY) as [TemplateType, TemplateConfig][]
).filter(([, config]) => config.ContentEditor !== null)
  .map(([value]) => value);