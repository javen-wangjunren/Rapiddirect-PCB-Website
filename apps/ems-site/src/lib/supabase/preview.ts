import type { TemplateType } from '../../types/page';

export const EMS_PREVIEW_QUERY_PARAM = 'preview';
export const EMS_PREVIEW_PAGE_ID_QUERY_PARAM = 'page_id';
export const EMS_PREVIEW_COOKIE_NAME = 'ems_preview_grant';
export const EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS = 60 * 10;

const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

const PREVIEWABLE_TEMPLATE_TYPES: TemplateType[] = [
  'ems_home',
  'components_sourcing',
  'pcb_assembly',
  'pcb_design',
  'pcb_manufacturing',
  'pcb_board_manufacturing',
  'pcb_applications'
];

export const isPreviewRequest = (url: URL) => {
  const value = url.searchParams.get(EMS_PREVIEW_QUERY_PARAM)?.trim().toLowerCase();
  return value === 'true' || value === '1';
};

export const getPreviewPageId = (url: URL) => {
  const pageId = url.searchParams.get(EMS_PREVIEW_PAGE_ID_QUERY_PARAM)?.trim();
  return pageId || '';
};

export const buildPreviewHref = (pageId: string) => {
  const params = new URLSearchParams({
    [EMS_PREVIEW_PAGE_ID_QUERY_PARAM]: pageId,
    [EMS_PREVIEW_QUERY_PARAM]: 'true'
  });
  return `${basePath}/preview/?${params.toString()}`;
};

export const isPreviewableTemplateType = (templateType?: TemplateType | null) => {
  return Boolean(templateType && PREVIEWABLE_TEMPLATE_TYPES.includes(templateType));
};
