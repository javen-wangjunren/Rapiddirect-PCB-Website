const normalizeAssetPath = (path: string): string => {
  return path.startsWith('/') ? path.slice(1) : path;
};

const isAbsoluteUrl = (value: string) => /^[a-z][a-z0-9+.-]*:/i.test(value);

export const getAssetPath = (path?: string | null): string => {
  if (typeof path !== 'string' || !path) return '';
  if (isAbsoluteUrl(path)) return path;
  const base = import.meta.env.BASE_URL ?? '/';
  const baseNormalized = base.endsWith('/') ? base : `${base}/`;
  const pathNormalized = normalizeAssetPath(path);
  return `${baseNormalized}${pathNormalized}`;
};

export const getHref = (href?: string | null): string => {
  if (typeof href !== 'string' || !href) return '';
  if (href.startsWith('#')) return href;
  if (isAbsoluteUrl(href)) return href;
  return getAssetPath(href);
};

type SupabaseImageTransform = {
  width?: number;
  height?: number;
  quality?: number;
  resize?: 'cover' | 'contain' | 'fill';
};

const parseSupabasePublicObjectUrl = (url: URL) => {
  const marker = '/storage/v1/object/public/';
  const idx = url.pathname.indexOf(marker);
  if (idx === -1) return null;
  const rest = url.pathname.slice(idx + marker.length);
  const slash = rest.indexOf('/');
  if (slash === -1) return null;
  const bucket = rest.slice(0, slash);
  const path = rest.slice(slash + 1);
  if (!bucket || !path) return null;
  return { bucket, path };
};

export const getSupabaseImageUrl = (src?: string | null, transform?: SupabaseImageTransform): string => {
  if (typeof src !== 'string' || !src) return '';
  if (!isAbsoluteUrl(src)) return getAssetPath(src);

  let url: URL;
  try {
    url = new URL(src);
  } catch {
    return src;
  }

  const parsed = parseSupabasePublicObjectUrl(url);
  if (!parsed) return src;

  const out = new URL(url.origin);
  out.pathname = `/storage/v1/render/image/public/${parsed.bucket}/${parsed.path}`;

  if (transform?.width) out.searchParams.set('width', String(transform.width));
  if (transform?.height) out.searchParams.set('height', String(transform.height));
  if (transform?.quality) out.searchParams.set('quality', String(transform.quality));
  if (transform?.resize) out.searchParams.set('resize', transform.resize);

  return out.toString();
};
