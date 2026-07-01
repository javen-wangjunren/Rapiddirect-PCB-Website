export function normalizePcbApplicationsContentJson(data: any) {
  if (!data) return {};

  const asString = (input: unknown) => (typeof input === 'string' ? input : '');
  const asBool = (input: unknown) => Boolean(input);

  const heroBenefits = Array.isArray(data.hero?.benefits) ? data.hero.benefits : [];
  const overviewPoints = Array.isArray(data.overview?.points) ? data.overview.points : [];
  const capabilityItems = Array.isArray(data.capability?.items) ? data.capability.items : [];
  const advantageItems = Array.isArray(data.advantage?.items) ? data.advantage.items : [];
  const techTableRows = Array.isArray(data.tech_table?.rows) ? data.tech_table.rows : [];
  const faqItems = Array.isArray(data.faq?.items) ? data.faq.items : [];
  const quoteFormObj = data.quote_form && typeof data.quote_form === 'object' ? data.quote_form : {};
  const upload = (quoteFormObj as any).upload && typeof (quoteFormObj as any).upload === 'object' ? (quoteFormObj as any).upload : {};

  const normalizeQuoteField = (input: any) => {
    const obj = input && typeof input === 'object' ? input : {};
    return {
      label: asString(obj.label),
      placeholder: asString(obj.placeholder),
      required: asBool(obj.required)
    };
  };

  return {
    ...data,
    hero: {
      ...data.hero,
      title: typeof data.hero?.title === 'string' ? data.hero.title : '',
      background_image_url: typeof data.hero?.background_image_url === 'string' ? data.hero.background_image_url : undefined,
      benefits: heroBenefits.map((item: any) => ({
        ...(item && typeof item === 'object' ? item : {}),
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
      })),
      benefit_conclusion: typeof data.hero?.benefit_conclusion === 'string' ? data.hero.benefit_conclusion : '',
      cta:
        data.hero?.cta && typeof data.hero.cta === 'object'
          ? {
              label: typeof data.hero.cta?.label === 'string' ? data.hero.cta.label : '',
              href: typeof data.hero.cta?.href === 'string' ? data.hero.cta.href : '',
            }
          : { label: '', href: '' },
    },
    overview: {
      ...data.overview,
      tag: typeof data.overview?.tag === 'string' ? data.overview.tag : '',
      title: typeof data.overview?.title === 'string' ? data.overview.title : '',
      description: typeof data.overview?.description === 'string' ? data.overview.description : '',
      points: overviewPoints.map((p: any) => (typeof p === 'string' ? p : '')).filter(Boolean),
      cta:
        data.overview?.cta && typeof data.overview.cta === 'object'
          ? {
              label: typeof data.overview.cta?.label === 'string' ? data.overview.cta.label : '',
              href: typeof data.overview.cta?.href === 'string' ? data.overview.cta.href : '',
            }
          : undefined,
    },
    capability: {
      ...data.capability,
      title: typeof data.capability?.title === 'string' ? data.capability.title : '',
      description: typeof data.capability?.description === 'string' ? data.capability.description : '',
      items: capabilityItems.map((item: any) => ({
        ...(item && typeof item === 'object' ? item : {}),
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        image_url: typeof item?.image_url === 'string' ? item.image_url : undefined,
        cta:
          item?.cta && typeof item.cta === 'object'
            ? {
                href: typeof item.cta?.href === 'string' ? item.cta.href : '',
              }
            : undefined,
      })),
    },
    advantage: {
      ...data.advantage,
      title: typeof data.advantage?.title === 'string' ? data.advantage.title : '',
      description: typeof data.advantage?.description === 'string' ? data.advantage.description : '',
      items: advantageItems.map((item: any) => ({
        ...(item && typeof item === 'object' ? item : {}),
        title: typeof item?.title === 'string' ? item.title : '',
        description: typeof item?.description === 'string' ? item.description : '',
        image_url: typeof item?.image_url === 'string' ? item.image_url : undefined,
      })),
    },
    tech_table: {
      ...data.tech_table,
      title: typeof data.tech_table?.title === 'string' ? data.tech_table.title : '',
      description: typeof data.tech_table?.description === 'string' ? data.tech_table.description : '',
      columns:
        data.tech_table?.columns && typeof data.tech_table.columns === 'object'
          ? {
              col_1: typeof data.tech_table.columns?.col_1 === 'string' ? data.tech_table.columns.col_1 : '',
              col_2: typeof data.tech_table.columns?.col_2 === 'string' ? data.tech_table.columns.col_2 : '',
              col_3: typeof data.tech_table.columns?.col_3 === 'string' ? data.tech_table.columns.col_3 : '',
            }
          : { col_1: '', col_2: '', col_3: '' },
      rows: techTableRows.map((row: any) => ({
        ...(row && typeof row === 'object' ? row : {}),
        col_1: typeof row?.col_1 === 'string' ? row.col_1 : '',
        col_2: typeof row?.col_2 === 'string' ? row.col_2 : '',
        col_3: typeof row?.col_3 === 'string' ? row.col_3 : '',
      })),
    },
    faq: {
      ...data.faq,
      title: typeof data.faq?.title === 'string' ? data.faq.title : '',
      items: faqItems.map((item: any) => ({
        ...(item && typeof item === 'object' ? item : {}),
        question: typeof item?.question === 'string' ? item.question : '',
        answer: typeof item?.answer === 'string' ? item.answer : '',
      })),
    },
    quote_form: {
      ...quoteFormObj,
      title: asString((quoteFormObj as any).title),
      description: asString((quoteFormObj as any).description),
      background_image_url: asString((quoteFormObj as any).background_image_url),
      name_field: normalizeQuoteField((quoteFormObj as any).name_field),
      company_field: normalizeQuoteField((quoteFormObj as any).company_field),
      email_field: normalizeQuoteField((quoteFormObj as any).email_field),
      phone_field: normalizeQuoteField((quoteFormObj as any).phone_field),
      message_field: normalizeQuoteField((quoteFormObj as any).message_field),
      upload: {
        label: asString((upload as any).label),
        optional_text: asString((upload as any).optional_text),
        button_text: asString((upload as any).button_text),
        help_text: asString((upload as any).help_text)
      },
      submit_label: asString((quoteFormObj as any).submit_label)
    },
    description: {
      ...data.description,
      header: {
        title: typeof data.description?.header?.title === 'string' ? data.description.header.title : '',
      },
      definition: {
        ...data.description?.definition,
        lead_desc: typeof data.description?.definition?.lead_desc === 'string' ? data.description.definition.lead_desc : '',
        benefits: (Array.isArray(data.description?.definition?.benefits) ? data.description.definition.benefits : []).map(
          (item: any) => ({
            title: typeof item?.title === 'string' ? item.title : '',
            description: typeof item?.description === 'string' ? item.description : '',
          })
        ),
      },
      standards: {
        ...data.description?.standards,
        title: typeof data.description?.standards?.title === 'string' ? data.description.standards.title : '',
        items: (Array.isArray(data.description?.standards?.items) ? data.description.standards.items : []).map(
          (item: any) => ({
            title: typeof item?.title === 'string' ? item.title : '',
            description: typeof item?.description === 'string' ? item.description : '',
            icon_svg: typeof item?.icon_svg === 'string' ? item.icon_svg : '',
          })
        ),
      },
      categories: {
        ...data.description?.categories,
        title: typeof data.description?.categories?.title === 'string' ? data.description.categories.title : '',
        items: (Array.isArray(data.description?.categories?.items) ? data.description.categories.items : []).map(
          (item: any) => ({
            title: typeof item?.title === 'string' ? item.title : '',
            image_url: typeof item?.image_url === 'string' ? item.image_url : '',
          })
        ),
      },
    },
  };
}
