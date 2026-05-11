import type { JsonValue } from '../../utils/jsonTree.ts';
import { isObject } from '../../utils/jsonTree.ts';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const asStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string') as string[];
};

const normalizeCapabilityCardBody = (input: unknown) => {
  if (Array.isArray(input)) {
    return { items: input.filter((v) => typeof v === 'string') as string[] };
  }
  if (isObject(input)) {
    return { items: asStringArray((input as any).items) };
  }
  return { items: [] as string[] };
};

const normalizeCapabilityCard = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    icon_url: asString(obj.icon_url),
    title: asString(obj.title),
    body: normalizeCapabilityCardBody(obj.body)
  };
};

const normalizeCapabilityTab = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const cardsInput = Array.isArray(obj.cards) ? obj.cards : [];
  return {
    label: asString(obj.label),
    cards: cardsInput.map(normalizeCapabilityCard)
  };
};

const normalizeCapabilityGalleryItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    image_url: asString(obj.image_url),
    name: asString(obj.name)
  };
};

export const normalizePcbAssemblyCapability = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const galleryInput = Array.isArray(obj.gallery) ? obj.gallery : [];
  const tabsInput = Array.isArray(obj.tabs) ? obj.tabs : [];
  return {
    title: asString(obj.title),
    desc: asString(obj.desc),
    gallery: galleryInput.map(normalizeCapabilityGalleryItem),
    tabs: tabsInput.map(normalizeCapabilityTab)
  };
};

const normalizeIndustryItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const tab = isObject(obj.tab) ? obj.tab : {};
  const card = isObject(obj.card) ? obj.card : {};
  const cta = isObject(card.cta) ? card.cta : {};
  const description = isObject(card.description) ? card.description : {};
  return {
    tab: {
      id: asString(tab.id),
      name: asString(tab.name),
      icon_url: asString(tab.icon_url)
    },
    card: {
      title: asString(card.title),
      description: {
        paragraph: asString(description.paragraph),
        list: asStringArray(description.list)
      },
      cta: {
        label: asString(cta.label),
        href: asString(cta.href)
      },
      image_url: asString(card.image_url)
    }
  };
};

const normalizeIndustry = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeIndustryItem)
  };
};

export const normalizePcbAssemblyContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const capability = normalizePcbAssemblyCapability((input as any).capability);
  const industry = normalizeIndustry((input as any).industry);
  return { ...(input as any), capability, industry } as any;
};
