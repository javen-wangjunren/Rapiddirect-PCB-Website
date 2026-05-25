import { pruneEmpty } from '../../utils/jsonTree';

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const deepMerge = (fallback: unknown, input: unknown): unknown => {
  if (Array.isArray(fallback)) {
    return Array.isArray(input) ? input : fallback;
  }

  if (isRecord(fallback)) {
    if (!isRecord(input)) return fallback;
    const out: Record<string, unknown> = { ...fallback };
    for (const key of Object.keys(input)) {
      const fv = (fallback as Record<string, unknown>)[key];
      const iv = (input as Record<string, unknown>)[key];
      out[key] = fv === undefined ? iv : deepMerge(fv, iv);
    }
    return out;
  }

  return (input ?? fallback) as unknown;
};

export const mergeSectionFallback = <T extends Record<string, unknown>>(
  fallback: T,
  input: unknown
): T => {
  const cleaned = pruneEmpty(input);
  if (!isRecord(cleaned)) return fallback;

  const out: Record<string, unknown> = { ...fallback };
  for (const key of Object.keys(fallback)) {
    if (key in cleaned) {
      out[key] = deepMerge((fallback as any)[key], (cleaned as Record<string, unknown>)[key]);
    }
  }
  return out as T;
};
