import type { SupabaseClient } from '@supabase/supabase-js';

import type { PageRecord } from '../../types/page';
import type { SeoMeta } from '../../types/seo';
import type { PageContentRecord } from '../../types/content';

export interface AdminPageBundle {
  page: (PageRecord & { id: string }) | null;
  content: PageContentRecord | null;
  seo: (SeoMeta & { noindex?: boolean }) | null;
}

export interface AdminPageListItem {
  id: string;
  slug: string;
  title: string;
  template_type: PageRecord['template_type'];
  status: PageRecord['status'];
  updated_at?: string;
  created_at?: string;
}

export interface AdminPageListQuery {
  page: number;
  pageSize: number;
  status?: PageRecord['status'];
  query?: string;
}

export const listPagesForAdmin = async (
  supabase: SupabaseClient
): Promise<{ ok: true; items: AdminPageListItem[] } | { ok: false; message: string }> => {
  const res = await supabase
    .from('pages')
    .select('id,slug,title,template_type,status,updated_at,created_at')
    .order('updated_at', { ascending: false });

  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, items: (res.data ?? []) as AdminPageListItem[] };
};

export const listPagesForAdminPaged = async (
  supabase: SupabaseClient,
  input: AdminPageListQuery
): Promise<{ ok: true; items: AdminPageListItem[]; total: number } | { ok: false; message: string }> => {
  const safePage = Number.isFinite(input.page) ? Math.max(1, Math.floor(input.page)) : 1;
  const safePageSize = Number.isFinite(input.pageSize) ? Math.max(1, Math.min(100, Math.floor(input.pageSize))) : 20;
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  let q = supabase
    .from('pages')
    .select('id,slug,title,template_type,status,updated_at,created_at', { count: 'exact' })
    .order('updated_at', { ascending: false })
    .range(from, to);

  if (input.status) {
    q = q.eq('status', input.status);
  }

  const keyword = input.query?.trim();
  if (keyword) {
    const escaped = keyword.replace(/[%_]/g, '\\$&');
    const pat = `%${escaped}%`;
    q = q.or(`title.ilike.${pat},slug.ilike.${pat}`);
  }

  const res = await q;
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, items: (res.data ?? []) as AdminPageListItem[], total: res.count ?? 0 };
};

export const getPageBundleBySlugForAdmin = async (
  supabase: SupabaseClient,
  slug: string
): Promise<AdminPageBundle | null> => {
  const trimmed = slug.trim();
  const candidates = Array.from(
    new Set([
      trimmed,
      trimmed.endsWith('/') ? trimmed.slice(0, -1) : `${trimmed}/`
    ].filter(Boolean))
  );
  const pageRes = await supabase
    .from('pages')
    .select('id,slug,title,template_type,status')
    .in('slug', candidates)
    .limit(1)
    .maybeSingle();

  if (pageRes.error || !pageRes.data) return null;

  const page = pageRes.data as PageRecord & { id: string };

  const [contentRes, seoRes] = await Promise.all([
    supabase.from('page_content').select('content_json').eq('page_id', page.id).maybeSingle(),
    supabase
      .from('seo_meta')
      .select('meta_title,meta_description,canonical_url,og_title,og_description,og_image,noindex')
      .eq('page_id', page.id)
      .maybeSingle()
  ]);

  return {
    page,
    content: contentRes.error ? null : (contentRes.data as PageContentRecord | null),
    seo: seoRes.error ? null : (seoRes.data as (SeoMeta & { noindex?: boolean }) | null)
  };
};

export interface SaveAdminBundleInput {
  pageId: string;
  page: Pick<PageRecord, 'title' | 'slug' | 'template_type' | 'status'>;
  seo: Pick<SeoMeta, 'meta_title' | 'meta_description' | 'canonical_url' | 'og_title' | 'og_description' | 'og_image'> & {
    noindex?: boolean;
  };
  contentJson: unknown;
}

export interface CreateAdminPageInput {
  title: string;
  slug: string;
  template_type: PageRecord['template_type'];
}

export const createPageForAdmin = async (
  supabase: SupabaseClient,
  input: CreateAdminPageInput
): Promise<{ ok: true; pageId: string } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();

  const pageInsertRes = await supabase
    .from('pages')
    .insert({
      title: input.title,
      slug: input.slug,
      template_type: input.template_type,
      status: 'draft',
      updated_at: nowIso
    })
    .select('id')
    .single();

  if (pageInsertRes.error || !pageInsertRes.data) {
    return { ok: false, message: pageInsertRes.error?.message ?? '创建 pages 记录失败' };
  }

  const pageId = (pageInsertRes.data as { id: string }).id;

  const [contentRes, seoRes] = await Promise.all([
    supabase.from('page_content').insert({ page_id: pageId, content_json: {}, updated_at: nowIso }),
    supabase.from('seo_meta').insert({
      page_id: pageId,
      meta_title: '',
      meta_description: '',
      canonical_url: '',
      og_title: '',
      og_description: '',
      og_image: '',
      noindex: false,
      updated_at: nowIso
    })
  ]);

  if (contentRes.error) return { ok: false, message: contentRes.error.message };
  if (seoRes.error) return { ok: false, message: seoRes.error.message };

  return { ok: true, pageId };
};

export const saveAdminBundle = async (
  supabase: SupabaseClient,
  input: SaveAdminBundleInput
): Promise<{ ok: true } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();

  const pageUpdateRes = await supabase
    .from('pages')
    .update({
      title: input.page.title,
      slug: input.page.slug,
      template_type: input.page.template_type,
      status: input.page.status,
      updated_at: nowIso
    })
    .eq('id', input.pageId);

  if (pageUpdateRes.error) {
    return { ok: false, message: pageUpdateRes.error.message };
  }

  const contentUpsertRes = await supabase.from('page_content').upsert({
    page_id: input.pageId,
    content_json: input.contentJson,
    updated_at: nowIso
  }, { onConflict: 'page_id' });

  if (contentUpsertRes.error) {
    return { ok: false, message: contentUpsertRes.error.message };
  }

  const seoUpsertRes = await supabase.from('seo_meta').upsert({
    page_id: input.pageId,
    meta_title: input.seo.meta_title,
    meta_description: input.seo.meta_description,
    canonical_url: input.seo.canonical_url,
    og_title: input.seo.og_title,
    og_description: input.seo.og_description,
    og_image: input.seo.og_image,
    noindex: input.seo.noindex ?? false,
    updated_at: nowIso
  }, { onConflict: 'page_id' });

  if (seoUpsertRes.error) {
    return { ok: false, message: seoUpsertRes.error.message };
  }

  return { ok: true };
};
