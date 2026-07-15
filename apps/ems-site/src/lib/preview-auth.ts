import { createHmac, timingSafeEqual } from 'node:crypto';

import type { AstroCookies } from 'astro';

import { serverEnv } from './env/server';
import { EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS, EMS_PREVIEW_COOKIE_NAME } from './supabase/preview';

type PreviewGrantPayload = {
  pageId: string;
  userId: string;
  exp: number;
};

const basePath = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '') || '/';
const previewCookiePath = `${basePath === '/' ? '' : basePath}/preview`;

const encodeBase64Url = (input: Buffer | string) => {
  return Buffer.from(input).toString('base64url');
};

const decodeBase64Url = (input: string) => {
  return Buffer.from(input, 'base64url');
};

const signValue = (value: string) => {
  const secret = serverEnv.previewSigningSecret;
  if (!secret) return '';
  return encodeBase64Url(createHmac('sha256', secret).update(value).digest());
};

export const createPreviewGrantToken = (payload: PreviewGrantPayload) => {
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(encodedPayload);
  if (!signature) return '';
  return `${encodedPayload}.${signature}`;
};

export const verifyPreviewGrantToken = (token?: string | null) => {
  if (!token || !serverEnv.previewSigningSecret) return null;
  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = signValue(encodedPayload);
  if (!expectedSignature) return null;

  const providedBuffer = decodeBase64Url(providedSignature);
  const expectedBuffer = decodeBase64Url(expectedSignature);
  if (providedBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload).toString('utf8')) as PreviewGrantPayload;
    if (!payload.pageId || !payload.userId || !payload.exp) return null;
    if (payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};

export const setPreviewGrantCookie = (cookies: AstroCookies, payload: PreviewGrantPayload) => {
  const token = createPreviewGrantToken(payload);
  if (!token) return false;

  cookies.set(EMS_PREVIEW_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: previewCookiePath,
    maxAge: EMS_PREVIEW_COOKIE_MAX_AGE_SECONDS
  });
  return true;
};

export const clearPreviewGrantCookie = (cookies: AstroCookies) => {
  cookies.delete(EMS_PREVIEW_COOKIE_NAME, {
    path: previewCookiePath
  });
};
