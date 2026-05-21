import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';

const asString = (value: unknown) => (typeof value === 'string' ? value : '');

const asStringArray = (value: unknown) => {
  if (!Array.isArray(value)) return [];
  return value.filter((v) => typeof v === 'string') as string[];
};

const normalizeHeroBenefit = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { title: asString(obj.title), description: asString(obj.description) };
};

const normalizeCapabilityItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const cta = isObject(obj.cta) ? obj.cta : {};
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    image_url: asString(obj.image_url),
    cta: {
      href: asString((cta as any).href)
    }
  };
};

const normalizeCapability = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    items: itemsInput.map(normalizeCapabilityItem)
  };
};

const normalizeTechTableRow = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const col1 = asString(obj.col_1) || asString(obj.item);
  const col2 = asString(obj.col_2) || asString(obj.mass_production);
  const col3 = asString(obj.col_3) || asString(obj.sample_prototype);
  return {
    col_1: col1,
    col_2: col2,
    col_3: col3
  };
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

const normalizeHero = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const benefitsInput = Array.isArray(obj.benefits) ? obj.benefits : [];
  const cta = isObject(obj.cta) ? obj.cta : {};
  return {
    title: asString(obj.title),
    background_image_url: asString(obj.background_image_url),
    benefits: benefitsInput.map(normalizeHeroBenefit),
    benefit_conclusion: asString(obj.benefit_conclusion),
    cta: { href: asString((cta as any).href), label: asString((cta as any).label) }
  };
};

const normalizeProcessStage = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const expert = isObject(obj.expert_advice) ? obj.expert_advice : {};
  return {
    stage_name: asString(obj.stage_name),
    image_url: asString(obj.image_url),
    process_name: asString(obj.process_name),
    process_desc: asStringArray(obj.process_desc),
    expert_advice: {
      title: asString((expert as any).title),
      desc: asString((expert as any).desc)
    }
  };
};

const normalizeProcess = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const stagesInput = Array.isArray(obj.stages) ? obj.stages : [];
  return {
    title: asString(obj.title),
    desc: asString(obj.desc),
    stages: stagesInput.map(normalizeProcessStage)
  };
};

const normalizeQuality = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return obj;
};

const normalizeIndustry = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return obj;
};

const normalizeWhyChooseUs = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return obj;
};

const normalizeProductGallerySpec = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return { label: asString(obj.label), value: asString(obj.value) };
};

const normalizeProductGalleryItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const specsInput = Array.isArray(obj.specs) ? obj.specs : [];
  return {
    title: asString(obj.title),
    subtitle: asString(obj.subtitle),
    image_url: asString(obj.image_url),
    specs: specsInput.map(normalizeProductGallerySpec)
  };
};

const normalizeProductGalleryTab = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];
  return {
    label: asString(obj.label),
    items: itemsInput.map(normalizeProductGalleryItem)
  };
};

const normalizeProductGalleryFromLegacy = (obj: any) => {
  const filtersInput = Array.isArray(obj.filters) ? obj.filters : [];
  const itemsInput = Array.isArray(obj.items) ? obj.items : [];

  const valueToLabel = new Map<string, string>();
  filtersInput.forEach((f: any) => {
    if (!isObject(f)) return;
    const value = asString(f.value);
    const label = asString(f.label);
    if (!value || value === 'all') return;
    if (!label) return;
    valueToLabel.set(value, label);
  });

  const grouped = new Map<string, any[]>();
  itemsInput.forEach((i: any) => {
    if (!isObject(i)) return;
    const category = asString(i.category);
    if (!category) return;
    const list = grouped.get(category) ?? [];
    list.push(i);
    grouped.set(category, list);
  });

  const tabs = Array.from(grouped.entries()).map(([category, list]) => ({
    label: valueToLabel.get(category) ?? category,
    items: list.map((i) => {
      const next = { ...i };
      delete (next as any).category;
      return next;
    })
  }));

  return tabs;
};

const normalizeProductGallery = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const tabsInput = Array.isArray(obj.tabs) ? obj.tabs : normalizeProductGalleryFromLegacy(obj);
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    tabs: tabsInput.map(normalizeProductGalleryTab).filter((t: any) => t.label && Array.isArray(t.items))
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

const normalizeQuoteField = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    label: asString(obj.label),
    placeholder: asString(obj.placeholder),
    required: Boolean(obj.required)
  };
};

const normalizeQuoteForm = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const upload = isObject(obj.upload) ? obj.upload : {};
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    background_image_url: asString(obj.background_image_url),
    name_field: normalizeQuoteField(obj.name_field),
    company_field: normalizeQuoteField(obj.company_field),
    email_field: normalizeQuoteField(obj.email_field),
    phone_field: normalizeQuoteField(obj.phone_field),
    message_field: normalizeQuoteField(obj.message_field),
    upload: {
      label: asString((upload as any).label),
      optional_text: asString((upload as any).optional_text),
      button_text: asString((upload as any).button_text),
      help_text: asString((upload as any).help_text)
    },
    submit_label: asString(obj.submit_label)
  };
};

export const normalizePcbManufacturingContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const hero = normalizeHero((input as any).hero);
  const capability = normalizeCapability((input as any).capability);
  const tech_table = normalizeTechTable((input as any).tech_table);
  const process = normalizeProcess((input as any).process);
  const quality = normalizeQuality((input as any).quality);
  const industry = normalizeIndustry((input as any).industry);
  const why_choose_us = normalizeWhyChooseUs((input as any).why_choose_us);
  const product_gallery = normalizeProductGallery((input as any).product_gallery);
  const faq = normalizeFaq((input as any).faq);
  const quote_form = normalizeQuoteForm((input as any).quote_form);
  return {
    ...(input as any),
    hero,
    capability,
    tech_table,
    process,
    quality,
    industry,
    why_choose_us,
    product_gallery,
    faq,
    quote_form
  } as any;
};
