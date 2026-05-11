const normalizeAssetPath = (path: string): string => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const getAssetPath = (path?: string | null): string => {
  if (typeof path !== 'string' || !path) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL ?? '/';
  const baseNormalized = base.endsWith('/') ? base : `${base}/`;
  const pathNormalized = normalizeAssetPath(path);
  return `${baseNormalized}${pathNormalized}`;
};

export const getHref = (href?: string | null): string => {
  if (typeof href !== 'string' || !href) return '';
  if (href.startsWith('#')) return href;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href)) return href;
  return getAssetPath(href);
};
