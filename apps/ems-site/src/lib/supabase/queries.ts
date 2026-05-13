import type { SupabaseClient } from '@supabase/supabase-js';

import type { PageContentRecord } from '../../types/content';
import type { PageRecord } from '../../types/page';
import type { SeoMeta } from '../../types/seo';

export interface PageBundle {
  page: (PageRecord & { id: string }) | null;
  content: PageContentRecord | null;
  seo: SeoMeta | null;
}

export const getPublishedPageBundleBySlug = async (
  supabase: SupabaseClient,
  slug: string
): Promise<PageBundle | null> => {
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
    .eq('status', 'published')
    .limit(1)
    .maybeSingle();

  if (pageRes.error || !pageRes.data) {
    return null;
  }

  const page = pageRes.data as PageRecord & { id: string };

  const [contentRes, seoRes] = await Promise.all([
    supabase.from('page_content').select('content_json').eq('page_id', page.id).maybeSingle(),
    supabase
      .from('seo_meta')
      .select('meta_title,meta_description,canonical_url,og_title,og_description,og_image,noindex')
      .eq('page_id', page.id)
      .maybeSingle()
  ]);

  const content = contentRes.error ? null : (contentRes.data as PageContentRecord | null);
  const seo = seoRes.error ? null : (seoRes.data as SeoMeta | null);

  return {
    page,
    content,
    seo
  };
};
