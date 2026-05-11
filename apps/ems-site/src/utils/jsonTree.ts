export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

export const deepMerge = (fallback: JsonValue, input: JsonValue): JsonValue => {
  if (Array.isArray(fallback)) {
    return Array.isArray(input) ? input : fallback;
  }

  if (isObject(fallback)) {
    if (!isObject(input)) return fallback as JsonValue;
    const out: Record<string, JsonValue> = { ...(fallback as Record<string, JsonValue>) };
    for (const key of Object.keys(input)) {
      const fv = (fallback as Record<string, JsonValue>)[key];
      const iv = (input as Record<string, JsonValue>)[key];
      if (fv === undefined) {
        out[key] = iv;
      } else {
        out[key] = deepMerge(fv, iv);
      }
    }
    return out;
  }

  return input ?? fallback;
};

const cloneContainer = (value: JsonValue): JsonValue => {
  if (Array.isArray(value)) return [...value];
  if (isObject(value)) return { ...(value as Record<string, JsonValue>) };
  return value;
};

export const setAtPath = (root: JsonValue, path: (string | number)[], value: JsonValue): JsonValue => {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  const nextRoot = cloneContainer(root);

  if (typeof head === 'number') {
    const arr = Array.isArray(nextRoot) ? (nextRoot as JsonValue[]) : [];
    const next = arr[head] ?? null;
    const updated = setAtPath(next as JsonValue, rest, value);
    const out = [...arr];
    out[head] = updated;
    return out;
  }

  const obj = isObject(nextRoot) ? (nextRoot as Record<string, JsonValue>) : {};
  const next = obj[head] ?? null;
  return {
    ...obj,
    [head]: setAtPath(next as JsonValue, rest, value)
  };
};

