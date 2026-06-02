import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');
const asBoolean = (value: unknown) => (typeof value === 'boolean' ? value : undefined);

const normalizeChildLinks = (input: unknown, parentOpenInNewTab: boolean) => {
  if (!Array.isArray(input)) return [] as { label: string; href: string; openInNewTab: boolean }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    const childOpenInNewTab = asBoolean(obj.openInNewTab);
    return {
      label: asString(obj.label),
      href: asString(obj.href),
      openInNewTab: childOpenInNewTab ?? parentOpenInNewTab
    };
  });
};

const normalizeNavItems = (input: unknown) => {
  if (!Array.isArray(input))
    return [] as {
      label: string;
      href: string;
      openInNewTab: boolean;
      children: { label: string; href: string; openInNewTab: boolean }[];
    }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    const parentOpenInNewTab = asBoolean(obj.openInNewTab) ?? false;
    return {
      label: asString(obj.label),
      href: asString(obj.href),
      openInNewTab: parentOpenInNewTab,
      children: normalizeChildLinks(obj.children, parentOpenInNewTab)
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
