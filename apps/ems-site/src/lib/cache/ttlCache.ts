export type TtlValue<T> = {
  value: T;
  ttlMs: number;
};

export const createTtlCache = <T>() => {
  type Entry = { value: T; expiresAt: number };

  const entries = new Map<string, Entry>();
  const inflight = new Map<string, Promise<TtlValue<T>>>();

  const get = (key: string): T | undefined => {
    const entry = entries.get(key);
    if (!entry) return undefined;
    if (Date.now() >= entry.expiresAt) {
      entries.delete(key);
      return undefined;
    }
    return entry.value;
  };

  const set = (key: string, v: TtlValue<T>) => {
    entries.set(key, { value: v.value, expiresAt: Date.now() + Math.max(0, v.ttlMs) });
  };

  const getOrSet = async (key: string, producer: () => Promise<TtlValue<T>>): Promise<T> => {
    const cached = get(key);
    if (cached !== undefined) return cached;

    const existing = inflight.get(key);
    if (existing) {
      const v = await existing;
      return v.value;
    }

    const p = producer().finally(() => {
      inflight.delete(key);
    });
    inflight.set(key, p);

    const v = await p;
    set(key, v);
    return v.value;
  };

  return { get, set, getOrSet };
};

