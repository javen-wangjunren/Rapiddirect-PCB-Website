import type { APIRoute } from 'astro';

const brochureUrl =
  'https://chmclazqmmikwpdfuqwy.supabase.co/storage/v1/object/public/media/rapiddirect-ems-brochure--4mcjug.pdf';

export const prerender = false;

export const GET: APIRoute = async () => {
  return Response.redirect(brochureUrl, 302);
};
