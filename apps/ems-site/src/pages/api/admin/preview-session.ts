import type { APIRoute } from 'astro';

import {
  EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS,
  EMS_PREVIEW_COOKIE_NAME
} from '../../../lib/supabase/preview';

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const GET: APIRoute = async () => {
  return json(
    {
      ok: false,
      message: 'Use POST to create preview session.'
    },
    405
  );
};

export const POST: APIRoute = async ({ request, cookies }) => {
  let accessToken = '';

  try {
    const body = await request.json();
    accessToken = typeof body?.accessToken === 'string' ? body.accessToken.trim() : '';
  } catch {
    accessToken = '';
  }

  if (!accessToken) {
    return json({ ok: false, message: '缺少 access token' }, 400);
  }

  const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '/';
  cookies.set(EMS_PREVIEW_COOKIE_NAME, accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: basePath === '/' ? '/' : basePath,
    maxAge: EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS
  });

  return json({ ok: true }, 200);
};
