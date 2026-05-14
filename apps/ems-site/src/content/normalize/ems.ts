import type { JsonValue } from '../../utils/jsonTree.ts';
import { isObject } from '../../utils/jsonTree.ts';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const asStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string') as string[];
};

const normalizeServiceDescription = (input: unknown) => {
  if (typeof input === 'string') {
    return { kind: 'paragraph', text: input, items: [] as string[] };
  }

  if (Array.isArray(input)) {
    const list = input.filter((v) => typeof v === 'string') as string[];
    if (list.length === 1) {
      return { kind: 'paragraph', text: list[0] ?? '', items: [] as string[] };
    }
    return { kind: 'list', text: '', items: list };
  }

  if (isObject(input)) {
    const kindRaw = (input as any).kind;
    const items = asStringArray((input as any).items);
    const text = asString((input as any).text);

    const kind =
      kindRaw === 'list' || kindRaw === 'paragraph'
        ? kindRaw
        : items.length > 0
          ? 'list'
          : 'paragraph';

    if (kind === 'list') return { kind, text: '', items };
    return { kind, text, items: [] as string[] };
  }

  return { kind: 'paragraph', text: '', items: [] as string[] };
};

const normalizeServiceItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const cta = isObject(obj.cta) ? obj.cta : {};

  return {
    name: asString(obj.name),
    image_url: asString(obj.image_url),
    description: normalizeServiceDescription(obj.description),
    cta: {
      label: asString(cta.label),
      href: asString(cta.href)
    }
  };
};

export const normalizeEmsHomeServices = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeServiceItem)
  };
};

export const normalizeEmsHomeContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const services = normalizeEmsHomeServices((input as any).services);
  return { ...(input as any), services } as any;
};
