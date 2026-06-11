import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const normalizeHeroBenefit = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { title: asString(obj.title), description: asString(obj.description) };
};

const normalizeHero = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const benefitsInput = Array.isArray(obj.benefits) ? obj.benefits : [];
  const cta = isObject(obj.cta) ? obj.cta : {};
  return {
    title: asString(obj.title),
    background_image_url: asString(obj.background_image_url) || undefined,
    benefits: benefitsInput.map(normalizeHeroBenefit),
    benefit_conclusion: asString(obj.benefit_conclusion),
    cta: { href: asString((cta as any).href), label: asString((cta as any).label) }
  };
};

const normalizeIntroductionFeature = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { title: asString(obj.title), description: asString(obj.description) };
};

const normalizeIntroduction = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const featuresInput = Array.isArray(obj.features) ? obj.features : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    image_url: asString(obj.image_url),
    features: featuresInput.map(normalizeIntroductionFeature)
  };
};

const normalizeStackupCta = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { href: asString(obj.href), label: asString(obj.label) };
};

const normalizeStackupItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    thumb_image_url: asString(obj.thumb_image_url),
    title: asString(obj.title),
    tag: asString(obj.tag),
    structural_features: asString(obj.structural_features),
    target_applications: asString(obj.target_applications)
  };
};

const normalizeStackup = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  const cta = normalizeStackupCta(obj.cta);
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    cta,
    items: itemsInput.map(normalizeStackupItem)
  };
};

const normalizeTechTableRow = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const col1 = asString(obj.col_1) || asString(obj.item);
  const col2 = asString(obj.col_2) || asString(obj.mass_production);
  const col3 = asString(obj.col_3) || asString(obj.sample_prototype);
  return { col_1: col1, col_2: col2, col_3: col3 };
};

const normalizeTechTable = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const columnsObj = isObject(obj.columns) ? (obj.columns as any) : {};
  const rowsInput = Array.isArray(obj.rows) ? obj.rows : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    columns: {
      col_1: asString(columnsObj.col_1) || 'Item',
      col_2: asString(columnsObj.col_2) || 'Mass Production',
      col_3: asString(columnsObj.col_3) || 'Sample/Prototype'
    },
    rows: rowsInput.map(normalizeTechTableRow)
  };
};

const normalizeSliderItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    image_url: asString(obj.image_url),
    image_title: asString(obj.image_title) || asString(obj.title)
  };
};

const normalizeSlider = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeSliderItem)
  };
};

const normalizeEquipmentItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    image_url: asString(obj.image_url),
    title: asString(obj.title),
    description: asString(obj.description),
    parameter_label: asString(obj.parameter_label),
    parameter_value: asString(obj.parameter_value)
  };
};

const normalizeEquipment = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeEquipmentItem)
  };
};

const normalizeFaqItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { question: asString(obj.question), answer: asString(obj.answer) };
};

const normalizeFaq = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return { title: asString(obj.title), items: itemsInput.map(normalizeFaqItem) };
};

const normalizeAdvantageItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    tab_title: asString(obj.tab_title),
    tab_description: asString(obj.tab_description),
    image_url: asString(obj.image_url)
  };
};

const normalizeAdvantage = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeAdvantageItem)
  };
};

export const normalizePcbBoardManufacturingContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const hero = normalizeHero((input as any).hero);
  const introduction = normalizeIntroduction((input as any).introduction);
  const stackup = normalizeStackup((input as any).stackup);
  const tech_table = normalizeTechTable((input as any).tech_table);
  const slider = normalizeSlider((input as any).slider);
  const equipment = normalizeEquipment((input as any).equipment);
  const faq = normalizeFaq((input as any).faq);
  const advantage = normalizeAdvantage((input as any).advantage);
  return { ...(input as any), hero, introduction, stackup, tech_table, slider, equipment, faq, advantage } as any;
};
