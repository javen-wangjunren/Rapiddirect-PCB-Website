import type { APIRoute } from 'astro';

import {
  EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS,
  EMS_PREVIEW_COOKIE_NAME
} from '../../../lib/supabase/preview';

export const POST: APIRoute = async ({ request, cookies }) => {
  let accessToken = '';

  try {
    const body = await request.json();
    accessToken = typeof body?.accessToken === 'string' ? body.accessToken.trim() : '';
  } catch {
    accessToken = '';
  }

  if (!accessToken) {
    return new Response(JSON.stringify({ ok: false, message: '缺少 access token' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '/';
  cookies.set(EMS_PREVIEW_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: basePath === '/' ? '/' : basePath,
    maxAge: EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
