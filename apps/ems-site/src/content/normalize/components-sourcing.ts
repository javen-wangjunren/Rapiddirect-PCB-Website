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

const normalizeSourceCapabilityCoreService = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    icon_svg: asString(obj.icon_svg),
    title: asString(obj.title),
    description: asString(obj.description)
  };
};

const normalizeSourceCapabilityCategory = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    title: asString(obj.title),
    image_placeholder: asString(obj.image_placeholder),
    image_url: asString(obj.image_url) || undefined
  };
};

const normalizeSourceCapabilityChannel = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    title: asString(obj.title),
    description: asString(obj.description)
  };
};

const normalizeSourceCapabilityBrand = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    name: asString(obj.name),
    logo_url: asString(obj.logo_url) || undefined
  };
};

const normalizeSourceCapability = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const legacyAdvantage = isObject(obj.advantage) ? (obj.advantage as any) : {};
  const coreServices = Array.isArray(obj.core_services) ? obj.core_services : [];
  const categoriesObj = isObject(obj.categories) ? (obj.categories as any) : {};
  const categoryItems = Array.isArray(categoriesObj.items) ? categoriesObj.items : [];
  const supplyObj = isObject(obj.supply_chain) ? (obj.supply_chain as any) : {};
  const channels = Array.isArray(supplyObj.items) ? supplyObj.items : [];
  const brandsObj = isObject(obj.brands) ? (obj.brands as any) : {};
  const brandItems = Array.isArray(brandsObj.items) ? brandsObj.items : [];

  const legacyTitle = asString(legacyAdvantage.title);
  const legacyDescription = asString(legacyAdvantage.description);

  return {
    title: legacyTitle || asString(obj.title),
    description: legacyDescription || asString(obj.description),
    core_services: coreServices.map(normalizeSourceCapabilityCoreService),
    categories: {
      title: asString(categoriesObj.title),
      items: categoryItems.map(normalizeSourceCapabilityCategory)
    },
    supply_chain: {
      title: asString(supplyObj.title),
      items: channels.map(normalizeSourceCapabilityChannel)
    },
    brands: {
      title: asString(brandsObj.title),
      items: brandItems.map(normalizeSourceCapabilityBrand),
      more_label: asString(brandsObj.more_label) || undefined
    }
  };
};

const normalizeSourceProcessStep = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    id: asString(obj.id),
    nav_label: asString(obj.nav_label),
    badge: asString(obj.badge),
    title: asString(obj.title),
    description: asString(obj.description),
    image_placeholder: asString(obj.image_placeholder),
    image_url: asString(obj.image_url) || undefined
  };
};

const normalizeSourceProcess = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const steps = Array.isArray(obj.steps) ? obj.steps : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    steps: steps.map(normalizeSourceProcessStep)
  };
};

const normalizeQualityBadge = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    icon_svg: asString(obj.icon_svg),
    label: asString(obj.label)
  };
};

const normalizeQualityItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    icon_svg: asString(obj.icon_svg),
    title: asString(obj.title),
    description: asString(obj.description),
    is_highlighted: typeof obj.is_highlighted === 'boolean' ? obj.is_highlighted : undefined
  };
};

const normalizeQualityFloatingCard = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    icon_svg: asString(obj.icon_svg),
    title: asString(obj.title),
    subtitle: asString(obj.subtitle)
  };
};

const normalizeSourceQualityControl = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const trustBadges = Array.isArray(obj.trust_badges) ? obj.trust_badges : [];
  const items = Array.isArray(obj.items) ? obj.items : [];
  const visual = isObject(obj.visual) ? (obj.visual as any) : {};
  const floating = isObject(visual.floating_card) ? (visual.floating_card as any) : {};

  return {
    tag: asString(obj.tag),
    title: asString(obj.title),
    lead: asString(obj.lead),
    trust_badges: trustBadges.map(normalizeQualityBadge),
    items: items.map(normalizeQualityItem),
    visual: {
      image_placeholder: asString(visual.image_placeholder),
      image_url: asString(visual.image_url) || undefined,
      floating_card: normalizeQualityFloatingCard(floating)
    }
  };
};

const normalizeSourceSolutionCard = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const points = Array.isArray(obj.points) ? obj.points : [];
  const valueBox = isObject(obj.value_box) ? (obj.value_box as any) : {};

  return {
    icon_svg: asString(obj.icon_svg),
    title: asString(obj.title),
    points: points.map(asString),
    value_box: {
      icon_svg: asString(valueBox.icon_svg),
      text: asString(valueBox.text)
    }
  };
};

const normalizeSourceSolutions = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const cards = Array.isArray(obj.cards) ? obj.cards : [];
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    cards: cards.map(normalizeSourceSolutionCard)
  };
};

const normalizeIndustryItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const tab = isObject(obj.tab) ? obj.tab : {};
  const card = isObject(obj.card) ? obj.card : {};
  const cta = isObject((card as any).cta) ? (card as any).cta : {};
  const description = isObject((card as any).description) ? (card as any).description : {};
  return {
    tab: {
      id: asString((tab as any).id),
      name: asString((tab as any).name),
      icon_url: asString((tab as any).icon_url)
    },
    card: {
      title: asString((card as any).title),
      description: {
        paragraph: asString((description as any).paragraph),
        list: asStringArray((description as any).list)
      },
      cta: {
        label: asString((cta as any).label),
        href: asString((cta as any).href)
      },
      image_url: asString((card as any).image_url)
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

const normalizeWhyChooseUsAdvantage = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    title: asString(obj.title),
    highlight: asString(obj.highlight),
    desc: asString(obj.desc),
    icon_url: asString(obj.icon_url)
  };
};

const normalizeWhyChooseUs = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const advantages = Array.isArray(obj.advantages) ? obj.advantages : [];
  const statsBar = isObject(obj.stats_bar) ? obj.stats_bar : {};
  const stats = Array.isArray((statsBar as any).stats) ? (statsBar as any).stats : [];
  const button = isObject((statsBar as any).button) ? (statsBar as any).button : {};

  return {
    title: asString(obj.title),
    desc: asString(obj.desc),
    advantages: advantages.map(normalizeWhyChooseUsAdvantage),
    stats_bar: {
      stats: stats.map((s: any) => ({
        number: asString(s?.number),
        label: asString(s?.label)
      })),
      button: {
        text: asString((button as any).text),
        href: asString((button as any).href)
      }
    }
  };
};

const normalizeFaqItem = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    question: asString(obj.question),
    answer: asString(obj.answer)
  };
};

const normalizeFaq = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const items = Array.isArray(obj.items) ? obj.items : [];
  return {
    title: asString(obj.title),
    items: items.map(normalizeFaqItem)
  };
};

const normalizeQuoteFormField = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  return {
    label: asString(obj.label),
    placeholder: asString(obj.placeholder),
    required: typeof obj.required === 'boolean' ? obj.required : false
  };
};

const normalizeQuoteForm = (input: unknown) => {
  const obj = isObject(input) ? (input as any) : {};
  const upload = isObject(obj.upload) ? obj.upload : {};
  return {
    title: asString(obj.title),
    description: asString(obj.description),
    background_image_url: asString(obj.background_image_url),
    name_field: normalizeQuoteFormField(obj.name_field),
    company_field: normalizeQuoteFormField(obj.company_field),
    email_field: normalizeQuoteFormField(obj.email_field),
    phone_field: normalizeQuoteFormField(obj.phone_field),
    message_field: normalizeQuoteFormField(obj.message_field),
    upload: {
      label: asString((upload as any).label),
      optional_text: asString((upload as any).optional_text),
      button_text: asString((upload as any).button_text),
      help_text: asString((upload as any).help_text)
    },
    submit_label: asString(obj.submit_label)
  };
};

export const normalizeComponentsSourcingContentJson = (input: JsonValue): JsonValue => {
  if (!isObject(input)) return input;
  const hero = normalizeHero((input as any).hero);
  const source_capability = normalizeSourceCapability((input as any).source_capability);
  const source_process = normalizeSourceProcess((input as any).source_process);
  const source_quality_control = normalizeSourceQualityControl((input as any).source_quality_control);
  const source_solutions = normalizeSourceSolutions((input as any).source_solutions);
  const industry = normalizeIndustry((input as any).industry);
  const why_choose_us = normalizeWhyChooseUs((input as any).why_choose_us);
  const faq = normalizeFaq((input as any).faq);
  const quote_form = normalizeQuoteForm((input as any).quote_form);
  return { ...(input as any), hero, source_capability, source_process, source_quality_control, source_solutions, industry, why_choose_us, faq, quote_form } as any;
};
