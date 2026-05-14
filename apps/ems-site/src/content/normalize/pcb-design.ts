import { resolvePcbDesignProcessBenefitIcon, resolvePcbDesignProcessItemIcon } from '../icons/pcb-design-process';

export function normalizePcbDesignContentJson(data: any) {
  if (!data) return {};

  const tools = Array.isArray(data.capability?.tools) ? data.capability.tools : [];
  const workflowStages = Array.isArray(data.workflow?.stages) ? data.workflow.stages : [];
  const simulationTabs = Array.isArray(data.simulation?.tabs) ? data.simulation.tabs : [];
  const processItems = Array.isArray(data.process?.items) ? data.process.items : [];
  const processBenefits = Array.isArray(data.process?.trust_base?.benefits) ? data.process.trust_base.benefits : [];
  const ctaBadges = Array.isArray(data.cta?.trust_badges) ? data.cta.trust_badges : [];

  const slugifyStageId = (input: string) => {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_.]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^[-.]+|[-.]+$/g, '');
  };

  const sanitizeLimitedHtml = (input: any) => {
    if (typeof input !== 'string') return '';
    const allowedTags = new Set(['span', 'br', 'strong', 'em']);
    return input.replace(/<\/?([a-zA-Z0-9-]+)(\s[^>]*)?>/g, (raw, tagName, attrs) => {
      const tag = String(tagName || '').toLowerCase();
      if (!allowedTags.has(tag)) return '';
      const isClosing = raw.startsWith('</');
      if (tag === 'br') return '<br />';
      if (isClosing) return `</${tag}>`;
      if (tag !== 'span') return `<${tag}>`;
      const classMatch = String(attrs || '').match(/\bclass\s*=\s*("([^"]*)"|'([^']*)')/i);
      const classValue = classMatch ? (classMatch[2] ?? classMatch[3] ?? '').trim() : '';
      return classValue ? `<span class="${classValue}">` : '<span>';
    });
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
      tabs: simulationTabs.map((tab: any, index: number) => {
        const id = typeof tab?.id === 'string' && tab.id.trim() ? tab.id : `panel-${index + 1}`;
        const panel = tab?.panel && typeof tab.panel === 'object' ? tab.panel : {};
        const benefits = Array.isArray(panel?.benefits) ? panel.benefits : [];
        return {
          ...(tab && typeof tab === 'object' ? tab : {}),
          id,
          name: typeof tab?.name === 'string' ? tab.name : '',
          icon_svg: typeof tab?.icon_svg === 'string' ? tab.icon_svg : '',
          panel: {
            ...(panel as any),
            image_placeholder: typeof panel?.image_placeholder === 'string' ? panel.image_placeholder : '',
            image_url: typeof panel?.image_url === 'string' ? panel.image_url : '',
            title: typeof panel?.title === 'string' ? panel.title : '',
            description: sanitizeLimitedHtml(panel?.description),
            benefits: benefits.map((b: any) => (typeof b === 'string' ? b : '')).filter(Boolean),
          },
        };
      }),
    },
    process: {
      ...data.process,
      title: typeof data.process?.title === 'string' ? data.process.title : '',
      description: typeof data.process?.description === 'string' ? data.process.description : '',
      items: processItems.map((item: any) => {
        const tags = Array.isArray(item?.tags) ? item.tags : [];
        return {
          ...(item && typeof item === 'object' ? item : {}),
          icon: resolvePcbDesignProcessItemIcon(item?.icon ?? item?.icon_svg),
          title: typeof item?.title === 'string' ? item.title : '',
          description: sanitizeLimitedHtml(item?.description),
          tags: tags.map((t: any) => (typeof t === 'string' ? t : '')).filter(Boolean),
          image_url: typeof item?.image_url === 'string' ? item.image_url : '',
        };
      }),
      trust_base: {
        ...data.process?.trust_base,
        title: typeof data.process?.trust_base?.title === 'string' ? data.process.trust_base.title : '',
        benefits: processBenefits.map((benefit: any) => ({
          ...(benefit && typeof benefit === 'object' ? benefit : {}),
          icon: resolvePcbDesignProcessBenefitIcon(benefit?.icon ?? benefit?.icon_svg),
          title: typeof benefit?.title === 'string' ? benefit.title : '',
          description: typeof benefit?.description === 'string' ? benefit.description : '',
        })),
        cta: data.process?.trust_base?.cta && typeof data.process.trust_base.cta === 'object'
          ? {
              label: typeof data.process.trust_base.cta?.label === 'string' ? data.process.trust_base.cta.label : '',
              href: typeof data.process.trust_base.cta?.href === 'string' ? data.process.trust_base.cta.href : '',
            }
          : undefined,
      },
    },
    deliverables: {
      ...data.deliverables,
      title: typeof data.deliverables?.title === 'string' ? data.deliverables.title : '',
      description: typeof data.deliverables?.description === 'string' ? data.deliverables.description : '',
      groups: (Array.isArray(data.deliverables?.groups) ? data.deliverables.groups : []).map((group: any) => {
        const items = Array.isArray(group?.items) ? group.items : [];
        return {
          ...(group && typeof group === 'object' ? group : {}),
          icon_svg: typeof group?.icon_svg === 'string' ? group.icon_svg : '',
          title: typeof group?.title === 'string' ? group.title : '',
          items: items.map((item: any) => ({
            ...(item && typeof item === 'object' ? item : {}),
            icon_svg: typeof item?.icon_svg === 'string' ? item.icon_svg : '',
            title: typeof item?.title === 'string' ? item.title : '',
            format_tag: typeof item?.format_tag === 'string' ? item.format_tag : '',
            description: sanitizeLimitedHtml(item?.description),
          })),
        };
      }),
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
      title: sanitizeLimitedHtml(data.cta?.title),
      description: typeof data.cta?.description === 'string' ? data.cta.description : '',
      primary_button: data.cta?.primary_button && typeof data.cta.primary_button === 'object'
        ? {
            label: typeof data.cta.primary_button?.label === 'string' ? data.cta.primary_button.label : '',
            href: typeof data.cta.primary_button?.href === 'string' ? data.cta.primary_button.href : '',
          }
        : { label: '', href: '' },
      secondary_button: data.cta?.secondary_button && typeof data.cta.secondary_button === 'object'
        ? {
            label: typeof data.cta.secondary_button?.label === 'string' ? data.cta.secondary_button.label : '',
            href: typeof data.cta.secondary_button?.href === 'string' ? data.cta.secondary_button.href : '',
          }
        : { label: '', href: '' },
      trust_badges: ctaBadges.map((b: any) => ({
        ...(b && typeof b === 'object' ? b : {}),
        label: typeof b?.label === 'string' ? b.label : '',
        icon_svg: typeof b?.icon_svg === 'string' ? b.icon_svg : '',
      })),
    },
  };
}
