import type { JsonValue } from '../../utils/jsonTree.ts';
import { isObject } from '../../utils/jsonTree.ts';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const normalizeStringList = (input: unknown) => {
  if (!Array.isArray(input)) return [] as string[];
  return input.filter((v) => typeof v === 'string') as string[];
};

const normalizeLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [] as { label: string; href: string }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    return { label: asString(obj.label), href: asString(obj.href) };
  });
};

const normalizeSocialLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [] as { platform: string; href: string }[];
  return input.map((item) => {
    const obj = isObject(item) ? (item as any) : {};
    return { platform: asString(obj.platform), href: asString(obj.href) };
  });
};

const normalizeMenu = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    title: asString(obj.title),
    links: normalizeLinks(obj.links)
  };
};

export const normalizeSiteFooterContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const obj = input as any;
  const companyInfo = isObject(obj.company_info) ? obj.company_info : {};
  const menus = isObject(obj.menus) ? obj.menus : {};
  const footerBottom = isObject(obj.footer_bottom) ? obj.footer_bottom : {};
  return {
    ...obj,
    logo_url: asString(obj.logo_url),
    company_info: {
      phones: normalizeStringList(companyInfo.phones),
      email: asString(companyInfo.email),
      address_lines: normalizeStringList(companyInfo.address_lines)
    },
    social_links: normalizeSocialLinks(obj.social_links),
    menus: {
      capabilities: normalizeMenu(menus.capabilities),
      resources: normalizeMenu(menus.resources),
      about: normalizeMenu(menus.about)
    },
    footer_bottom: {
      copyright: asString(footerBottom.copyright),
      legal_links: normalizeLinks(footerBottom.legal_links)
    }
  } as any;
};
