export function normalizePcbDesignContentJson(data: any) {
  if (!data) return {};

  const tools = Array.isArray(data.capability?.tools) ? data.capability.tools : [];
  const workflowStages = Array.isArray(data.workflow?.stages) ? data.workflow.stages : [];

  const slugifyStageId = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_.]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^[-.]+|[-.]+$/g, '');
  };

  return {
    ...data,
    services: {
      ...data.services,
      items: Array.isArray(data.services?.items) ? data.services.items : [],
    },
    capability: {
      ...data.capability,
      tools_label: 'Design Software We Use:',
      tools: tools.map((tool: any) => ({
        ...(tool && typeof tool === 'object' ? tool : {}),
        logo_url: typeof tool?.logo_url === 'string' ? tool.logo_url : '',
        alt_text: typeof tool?.alt_text === 'string' ? tool.alt_text : '',
      })),
      specs: Array.isArray(data.capability?.specs) ? data.capability.specs : [],
    },
    workflow: {
      ...data.workflow,
      stages: workflowStages.map((stage: any, index: number) => {
        const label = typeof stage?.label === 'string' ? stage.label : '';
        const idBase = label ? slugifyStageId(label) : String(index + 1);
        const id = `stage-${idBase}`;
        const layoutRaw = typeof stage?.layout === 'string' ? stage.layout : '';
        const layout = layoutRaw === 'special' || stage?.is_mfg ? 'special' : 'standard';

        const specialCta = stage?.special_cta ?? stage?.mfg_cta;

        return {
          ...(stage && typeof stage === 'object' ? stage : {}),
          id,
          label,
          left_title: label,
          layout,
          bg_color: typeof stage?.bg_color === 'string' ? stage.bg_color : '#FFFFFF',
          steps: Array.isArray(stage?.steps) ? stage.steps : [],
          image_url: typeof stage?.image_url === 'string' ? stage.image_url : '',
          image_alt: typeof stage?.image_alt === 'string' ? stage.image_alt : '',
          image_placeholder: typeof stage?.image_placeholder === 'string' ? stage.image_placeholder : '',
          special_title: typeof stage?.special_title === 'string' ? stage.special_title : typeof stage?.mfg_title === 'string' ? stage.mfg_title : '',
          special_description:
            typeof stage?.special_description === 'string'
              ? stage.special_description
              : typeof stage?.mfg_description === 'string'
                ? stage.mfg_description
                : '',
          special_cta: {
            label: typeof specialCta?.label === 'string' ? specialCta.label : '',
            href: typeof specialCta?.href === 'string' ? specialCta.href : '',
          },
          is_mfg: layout === 'special',
          mfg_title: typeof stage?.mfg_title === 'string' ? stage.mfg_title : typeof stage?.special_title === 'string' ? stage.special_title : '',
          mfg_description:
            typeof stage?.mfg_description === 'string'
              ? stage.mfg_description
              : typeof stage?.special_description === 'string'
                ? stage.special_description
                : '',
          mfg_cta: {
            label: typeof specialCta?.label === 'string' ? specialCta.label : '',
            href: typeof specialCta?.href === 'string' ? specialCta.href : '',
          },
        };
      }),
    },
    simulation: {
      ...data.simulation,
      tabs: Array.isArray(data.simulation?.tabs) ? data.simulation.tabs : [],
    },
    process: {
      ...data.process,
      items: Array.isArray(data.process?.items) ? data.process.items : [],
      trust_base: {
        ...data.process?.trust_base,
        benefits: Array.isArray(data.process?.trust_base?.benefits) ? data.process.trust_base.benefits : [],
      },
    },
    deliverables: {
      ...data.deliverables,
      groups: Array.isArray(data.deliverables?.groups) ? data.deliverables.groups : [],
    },
    industry: {
      ...data.industry,
      items: Array.isArray(data.industry?.items) ? data.industry.items : [],
    },
    why_choose_us: {
      ...data.why_choose_us,
      advantages: Array.isArray(data.why_choose_us?.advantages) ? data.why_choose_us.advantages : [],
      stats_bar: {
        ...data.why_choose_us?.stats_bar,
        stats: Array.isArray(data.why_choose_us?.stats_bar?.stats) ? data.why_choose_us.stats_bar.stats : [],
      },
    },
    faq: {
      ...data.faq,
      items: Array.isArray(data.faq?.items) ? data.faq.items : [],
    },
    cta: {
      ...data.cta,
      trust_badges: Array.isArray(data.cta?.trust_badges) ? data.cta.trust_badges : [],
    },
  };
}
