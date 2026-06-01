import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  const pathname = context.url.pathname;
  const contentType = response.headers.get('content-type') ?? '';

  const isAstroAsset = pathname.startsWith('/ems/_astro/') || pathname.startsWith('/_astro/');
  const isApi = pathname.startsWith('/api/');
  const isEmsHtml = pathname.startsWith('/ems/') && contentType.includes('text/html');
  const isAdmin = pathname.startsWith('/ems/admin') || pathname.startsWith('/ems/login');

  if (isAstroAsset) {
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  if (isApi) {
    const headers = new Headers(response.headers);
    headers.set('cache-control', 'no-store');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  if (isEmsHtml) {
    const headers = new Headers(response.headers);
    if (isAdmin) {
      headers.set('cache-control', 'private, no-cache, max-age=0, must-revalidate');
    } else {
      headers.set('cache-control', 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400');
    }
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  const isEmsStaticAsset =
    pathname.startsWith('/ems/') &&
    (/\.(?:png|jpe?g|webp|avif|svg|gif|ico|css|js|mjs|map|woff2?|ttf|otf|eot)$/i.test(pathname) ||
      pathname.startsWith('/ems/images/') ||
      pathname.startsWith('/ems/icons/') ||
      pathname.startsWith('/ems/assets/'));

  if (isEmsStaticAsset) {
    const headers = new Headers(response.headers);
    const base = pathname.split('/').pop() ?? '';
    const [name] = base.split('.');
    const likelyHashed = Boolean(name && /^[a-z0-9]{6,}-[a-z0-9]{6,}$/i.test(name));

    if (likelyHashed) {
      headers.set('cache-control', 'public, max-age=31536000, immutable');
    } else {
      headers.set('cache-control', 'public, max-age=604800');
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  return response;
};
