import type { APIRoute } from 'astro';

import { createSupabaseClient } from '../lib/supabase/client';
import type { PageRecord, TemplateType } from '../types/page';

const site = 'https://www.rapiddirect.com';

const ensureTrailingSlash = (value: string) => (value.endsWith('/') ? value : `${value}/`);

const buildUrlSetXml = (urls: Array<{ loc: string }>) => {
  const body = urls
    .map(({ loc }) => `<url><loc>${loc}</loc></url>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    body +
    `</urlset>`;
};

export const GET: APIRoute = async () => {
  const fallbackSlugs = [
    '/ems/',
    '/ems/pcb-design/',
    '/ems/pcb-manufacturing/',
    '/ems/pcb-assembly/',
    '/ems/components-sourcing/'
  ];

  const disallowedTemplateTypes = new Set<TemplateType>(['site_footer', 'site_header']);
  const slugs = new Set(fallbackSlugs.map(ensureTrailingSlash));

  const supabase = createSupabaseClient();
  if (supabase) {
    const pageRes = await supabase
      .from('pages')
      .select('slug,template_type,status')
      .eq('status', 'published')
      .like('slug', '/ems/%');

    const pages = (pageRes.error ? [] : (pageRes.data as PageRecord[])) ?? [];
    for (const page of pages) {
      if (!page?.slug) continue;
      if (disallowedTemplateTypes.has(page.template_type)) continue;
      if (page.slug.includes('/_global/')) continue;
      slugs.add(ensureTrailingSlash(page.slug));
    }
  }

  const urls = Array.from(slugs)
    .sort()
    .map((slug) => ({ loc: `${site}${slug}` }));

  return new Response(buildUrlSetXml(urls), {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  });
};

