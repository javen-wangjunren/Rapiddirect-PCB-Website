import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

// ── 基础类型安全函数 ──
const asString = (value: unknown) => (typeof value === 'string' ? value : '');
const asBoolean = (value: unknown) => (typeof value === 'boolean' ? value : false);

// ── 服务卡片 ──
const normalizeCard = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { label: asString(obj.label), href: asString(obj.href) };
};

const normalizeCards = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeCard);
};

// ── Capabilities Tab ──
const normalizeCapTab = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    tab_label: asString(obj.tab_label),
    is_muted: asBoolean(obj.is_muted),
    cards: normalizeCards(obj.cards),
    image_url: asString(obj.image_url)
  };
};

const normalizeCapTabs = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeCapTab);
};

// ── Capabilities Section ──
const normalizeCapSection = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    section_label: asString(obj.section_label),
    tabs: normalizeCapTabs(obj.tabs)
  };
};

const normalizeCapSections = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeCapSection);
};

// ── Capabilities Footer ──
const normalizeCapFooter = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    browse_all_href: asString(obj.browse_all_href),
    get_quote_href: asString(obj.get_quote_href)
  };
};

// ── Solutions Step ──
const normalizeSolStep = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    title: asString(obj.title),
    desc: asString(obj.desc),
    href: asString(obj.href)
  };
};

const normalizeSolSteps = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeSolStep);
};

// 兼容旧值：'npi' → 'timeline'，'manufacturing' → 'card'
const normalizeSolPanelStyle = (value: unknown): 'timeline' | 'card' => {
  const v = asString(value);
  if (v === 'npi') return 'timeline';
  if (v === 'manufacturing') return 'card';
  return v === 'card' ? 'card' : 'timeline';
};

// ── Solutions Tab ──
const normalizeSolTab = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    tab_label: asString(obj.tab_label),
    panel_style: normalizeSolPanelStyle(obj.panel_style),
    panel_desc: asString(obj.panel_desc),
    steps: normalizeSolSteps(obj.steps),
    cards: normalizeCards(obj.cards),
    cta1_label: asString(obj.cta1_label),
    cta1_href: asString(obj.cta1_href),
    cta2_href: asString(obj.cta2_href),
    image_url: asString(obj.image_url)
  };
};

const normalizeSolTabs = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeSolTab);
};

// ── Industries ──

const normalizeIndustryItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    label: asString(obj.label),
    href: asString(obj.href),
    icon_svg: asString(obj.icon_svg)
  };
};

const normalizeIndustries = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeIndustryItem);
};

const normalizeCaseStudy = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    image_url: asString(obj.image_url),
    tag: asString(obj.tag),
    title: asString(obj.title),
    cta_label: asString(obj.cta_label),
    cta_href: asString(obj.cta_href)
  };
};

// ── Platform ──

const normalizePlatformLink = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { label: asString(obj.label), href: asString(obj.href) };
};

const normalizePlatformLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizePlatformLink);
};

const normalizePlatformCard = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    image_url: asString(obj.image_url),
    title: asString(obj.title),
    description: asString(obj.description),
    links: normalizePlatformLinks(obj.links),
    list_style: asString(obj.list_style),
    cta_label: asString(obj.cta_label),
    cta_href: asString(obj.cta_href)
  };
};

const normalizePlatformCards = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizePlatformCard);
};

// ── Resources ──

const normalizeResourceLink = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { label: asString(obj.label), href: asString(obj.href) };
};

const normalizeResourceLinks = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeResourceLink);
};

const normalizeResourceServiceItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { title: asString(obj.title), desc: asString(obj.desc), href: asString(obj.href) };
};

const normalizeResourceServiceItems = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeResourceServiceItem);
};

const normalizeResourceSection = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    section_title: asString(obj.section_title),
    link_style: asString(obj.link_style),
    links: normalizeResourceLinks(obj.links),
    service_items: normalizeResourceServiceItems(obj.service_items),
    footer_label: asString(obj.footer_label),
    footer_href: asString(obj.footer_href)
  };
};

const normalizeResourceSections = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeResourceSection);
};

// ── About ──

const normalizeAboutLinkGroup = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    group_title: asString(obj.group_title),
    links: normalizeResourceLinks(obj.links)
  };
};

const normalizeAboutLinkGroups = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeAboutLinkGroup);
};

// ── Nav Item ──
const normalizeNavItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    label: asString(obj.label),
    mega_type: asString(obj.mega_type),
    sections: normalizeCapSections(obj.sections),
    footer: normalizeCapFooter(obj.footer),
    tabs: normalizeSolTabs(obj.tabs),
    industries_header_title: asString(obj.industries_header_title),
    industries_browse_href: asString(obj.industries_browse_href),
    industries: normalizeIndustries(obj.industries),
    case_study: normalizeCaseStudy(obj.case_study),
    platform_cards: normalizePlatformCards(obj.platform_cards),
    resource_sections: normalizeResourceSections(obj.resource_sections),
    about_banner_image_url: asString(obj.about_banner_image_url),
    about_banner_title: asString(obj.about_banner_title),
    about_banner_desc: asString(obj.about_banner_desc),
    about_link_groups: normalizeAboutLinkGroups(obj.about_link_groups)
  };
};

const normalizeNavItems = (input: unknown) => {
  if (!Array.isArray(input)) return [];
  return input.map(normalizeNavItem);
};

// ── 顶层入口 ──
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