type TurnstileVerifyResponse = {
  success: boolean;
  'error-codes'?: string[];
};

type Env = {
  ALLOWED_ORIGIN?: string;
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  TO_EMAIL: string;
};

const escapeHtml = (value: string): string => {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

const hasLengthWithin = (value: string, max: number): boolean => {
  return value.length <= max;
};

const json = (data: unknown, init?: ResponseInit) => {
  const headers = new Headers(init?.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  return new Response(JSON.stringify(data), { ...init, headers });
};

const withCors = (res: Response, origin: string | null) => {
  const headers = new Headers(res.headers);
  if (origin) headers.set('access-control-allow-origin', origin);
  headers.set('access-control-allow-methods', 'POST, OPTIONS');
  headers.set('access-control-allow-headers', 'content-type');
  headers.set('access-control-max-age', '86400');
  return new Response(res.body, { status: res.status, headers });
};

const base64FromArrayBuffer = (buf: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buf);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
};

const verifyTurnstile = async (secret: string, token: string, ip?: string) => {
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip) body.set('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body
  });

  const data = (await res.json()) as TurnstileVerifyResponse;
  return data;
};

const sendResendEmail = async (apiKey: string, payload: unknown) => {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to send email');
  }

  return res.json();
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
const origin = request.headers.get('origin');
const allowedOrigins = new Set(
  String(env.ALLOWED_ORIGIN ?? '')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
);
const corsOrigin = origin && allowedOrigins.has(origin) ? origin : null;


    if (request.method === 'OPTIONS') {
      return withCors(new Response(null, { status: 204 }), corsOrigin);
    }

    if (request.method !== 'POST') {
      return withCors(json({ error: 'Method not allowed' }, { status: 405 }), corsOrigin);
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.includes('multipart/form-data')) {
      return withCors(json({ error: 'Expected multipart/form-data' }, { status: 400 }), corsOrigin);
    }

    const form = await request.formData();

    const name = String(form.get('name') ?? '').trim();
    const company = String(form.get('company') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const token =
      String(form.get('cf-turnstile-response') ?? '').trim() ||
      String(form.get('turnstileToken') ?? '').trim();

    if (!token) {
      return withCors(json({ error: 'Missing Turnstile token' }, { status: 400 }), corsOrigin);
    }

    if (!name || !company || !email || !phone || !message) {
      return withCors(json({ error: 'Missing required fields' }, { status: 400 }), corsOrigin);
    }

    if (
      !hasLengthWithin(name, 100) ||
      !hasLengthWithin(company, 150) ||
      !hasLengthWithin(email, 150) ||
      !hasLengthWithin(phone, 50) ||
      !hasLengthWithin(message, 5000)
    ) {
      return withCors(json({ error: 'Field too long' }, { status: 400 }), corsOrigin);
    }

    const ip = request.headers.get('cf-connecting-ip') ?? undefined;
    const verify = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip);
    if (!verify.success) {
      return withCors(
        json(
          {
            error: 'Turnstile verification failed',
            codes: verify['error-codes'] ?? []
          },
          { status: 400 }
        ),
        corsOrigin
      );
    }

    const attachment = form.get('attachment');
    const attachments: Array<{ filename: string; content: string; content_type?: string }> = [];
    if (attachment instanceof File && attachment.size > 0) {
      if (attachment.size > 20 * 1024 * 1024) {
        return withCors(json({ error: 'Attachment too large (max 20MB)' }, { status: 400 }), corsOrigin);
      }
      const buf = await attachment.arrayBuffer();
      const rawFilename = String(attachment.name || 'attachment');
      const safeFilename = rawFilename.replaceAll('\u0000', '').replaceAll('\r', '').replaceAll('\n', '').slice(0, 200);
      attachments.push({
        filename: safeFilename,
        content: base64FromArrayBuffer(buf),
        content_type: attachment.type || undefined
      });
    }

    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    const subject = `EMS Quote Request - ${name}`;
    const text = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      '',
      'Message:',
      message
    ].join('\n');

    const html = [
      `<h2>EMS Quote Request</h2>`,
      `<p><strong>Name:</strong> ${safeName}</p>`,
      `<p><strong>Company:</strong> ${safeCompany}</p>`,
      `<p><strong>Email:</strong> ${safeEmail}</p>`,
      `<p><strong>Phone:</strong> ${safePhone}</p>`,
      `<hr />`,
      `<p><strong>Message</strong></p>`,
      `<p>${safeMessage.replaceAll('\n', '<br />')}</p>`
    ].join('');

    const payload: Record<string, unknown> = {
      from: env.FROM_EMAIL,
      to: [env.TO_EMAIL],
      reply_to: email,
      subject,
      text,
      html
    };

    if (attachments.length) payload.attachments = attachments;

    await sendResendEmail(env.RESEND_API_KEY, payload);

    return withCors(json({ ok: true }), corsOrigin);
  }
};
