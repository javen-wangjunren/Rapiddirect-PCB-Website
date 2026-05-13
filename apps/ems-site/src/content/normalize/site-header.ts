import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const normalizeChildLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [] as { label: string; href: string }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    return { label: asString(obj.label), href: asString(obj.href) };
  });
};

const normalizeNavItems = (input: unknown) => {
  if (!Array.isArray(input)) return [] as { label: string; href: string; children: { label: string; href: string }[] }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    return {
      label: asString(obj.label),
      href: asString(obj.href),
      children: normalizeChildLinks(obj.children)
    };
  });
};

export const normalizeSiteHeaderContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const obj = input as any;
  return {
    ...obj,
    logo_url: asString(obj.logo_url),
    cta_text: asString(obj.cta_text),
    cta_href: asString(obj.cta_href),
    nav_items: normalizeNavItems(obj.nav_items)
  } as any;
};
