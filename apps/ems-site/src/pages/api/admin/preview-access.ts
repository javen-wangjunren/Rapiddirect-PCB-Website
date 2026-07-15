import { createClient } from '@supabase/supabase-js';
import type { APIRoute } from 'astro';

import { setPreviewGrantCookie } from '../../../lib/preview-auth';
import { serverEnv } from '../../../lib/env/server';
import { getPageBundleByIdForAdmin } from '../../../lib/supabase/adminQueries';
import { isPreviewableTemplateType } from '../../../lib/supabase/preview';
import { createServerAdminSupabaseClient } from '../../../lib/supabase/serverAdmin';

export const prerender = false;

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const GET: APIRoute = async () => {
  return json({ ok: false, message: 'Use POST to create preview access.' }, 405);
};

export const POST: APIRoute = async ({ request, cookies }) => {
  if (!serverEnv.supabaseUrl || !serverEnv.supabaseAnonKey || !serverEnv.previewSigningSecret) {
    return json({ ok: false, message: 'Preview access is not configured.' }, 500);
  }

  let pageId = '';
  let accessToken = '';

  try {
    const body = await request.json();
    pageId = typeof body?.pageId === 'string' ? body.pageId.trim() : '';
    accessToken = typeof body?.accessToken === 'string' ? body.accessToken.trim() : '';
  } catch {
    pageId = '';
    accessToken = '';
  }

  if (!pageId || !accessToken) {
    return json({ ok: false, message: 'Missing preview access payload.' }, 400);
  }

  const supabase = createClient(serverEnv.supabaseUrl, serverEnv.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });

  const userRes = await supabase.auth.getUser(accessToken);
  const userId = userRes.data.user?.id ?? '';
  if (userRes.error || !userId) {
    return json({ ok: false, message: 'Invalid session.' }, 403);
  }

  const adminSupabase = createServerAdminSupabaseClient();
  if (!adminSupabase) {
    return json({ ok: false, message: 'Preview access is not configured.' }, 500);
  }

  const bundle = await getPageBundleByIdForAdmin(adminSupabase, pageId);
  if (!bundle?.page || !isPreviewableTemplateType(bundle.page.template_type)) {
    return json({ ok: false, message: 'This template does not support preview.' }, 403);
  }

  const ok = setPreviewGrantCookie(cookies, {
    pageId,
    userId,
    exp: Date.now() + 1000 * 60 * 10
  });

  if (!ok) {
    return json({ ok: false, message: 'Failed to issue preview grant.' }, 500);
  }

  return json({ ok: true }, 200);
};
