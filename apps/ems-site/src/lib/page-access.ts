import { getHref } from './assets';
import { isPreviewableTemplateType } from './supabase/preview';
import type { PageRecord, TemplateType } from '../types/page';

type PublishedPageAccessInput = {
  slug?: string | null;
  status?: PageRecord['status'] | null;
  templateType?: TemplateType | null;
};

const normalizeSlug = (input?: string | null) => {
  const trimmed = input?.trim() ?? '';
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');

export const canViewPublishedPage = ({ slug, status, templateType }: PublishedPageAccessInput) => {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) return false;
  if (status !== 'published') return false;
  if (normalizedSlug.includes('/_global/')) return false;
  return isPreviewableTemplateType(templateType);
};

export const buildPublishedPageHref = (slug?: string | null) => {
  const normalizedSlug = normalizeSlug(slug);
  if (!normalizedSlug) return '';
  if (basePath && basePath !== '/' && normalizedSlug === `${basePath}/`) return normalizedSlug;
  if (basePath && basePath !== '/' && normalizedSlug.startsWith(`${basePath}/`)) return normalizedSlug;
  return getHref(normalizedSlug);
};
