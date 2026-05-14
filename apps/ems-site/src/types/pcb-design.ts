export interface PcbDesignToolItem {
  logo_url: string;
  alt_text: string;
}

export interface PcbDesignSpecItem {
  icon_svg: string;
  name: string;
  value: string;
  sub_value: string;
}

export interface PcbDesignCapabilityContent {
  tag: string;
  title_prefix: string;
  title_highlight: string;
  description: string;
  tools_label: string;
  tools: ReadonlyArray<PcbDesignToolItem>;
  specs: ReadonlyArray<PcbDesignSpecItem>;
}

export interface PcbDesignWorkflowStep {
  tag: string;
  title: string;
  description: string;
}

export interface PcbDesignWorkflowStage {
  id: string;
  label: string;
  bg_color: string;
  is_mfg?: boolean;
  left_title?: string;
  image_placeholder?: string;
  image_url?: string;
  image_alt?: string;
  steps?: ReadonlyArray<PcbDesignWorkflowStep>;
  mfg_title?: string;
  mfg_description?: string;
  mfg_cta?: {
    label: string;
    href: string;
  };
}

export interface PcbDesignWorkflowContent {
  title: string;
  description: string;
  stages: ReadonlyArray<PcbDesignWorkflowStage>;
}

export interface PcbDesignSimulationPanel {
  image_placeholder: string;
  image_url?: string;
  title: string;
  description: string;
  benefits: ReadonlyArray<string>;
}

export interface PcbDesignSimulationTab {
  id: string;
  icon_svg: string;
  name: string;
  panel: PcbDesignSimulationPanel;
}

export interface PcbDesignSimulationContent {
  title: string;
  description: string;
  tabs: ReadonlyArray<PcbDesignSimulationTab>;
  footer: {
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
}

export interface PcbDesignProcessItem {
  icon: string;
  title: string;
  description: string;
  tags: ReadonlyArray<string>;
  image_url?: string;
}

export interface PcbDesignProcessBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface PcbDesignProcessContent {
  title: string;
  description: string;
  items: ReadonlyArray<PcbDesignProcessItem>;
  trust_base: {
    title: string;
    benefits: ReadonlyArray<PcbDesignProcessBenefit>;
    cta?: {
      label: string;
      href: string;
    };
  };
}

export interface PcbDesignDeliverableItem {
  icon_svg: string;
  title: string;
  format_tag: string;
  description: string;
}

export interface PcbDesignDeliverableGroup {
  icon_svg: string;
  title: string;
  items: ReadonlyArray<PcbDesignDeliverableItem>;
}

export interface PcbDesignDeliverablesContent {
  title: string;
  description: string;
  groups: ReadonlyArray<PcbDesignDeliverableGroup>;
}

export interface PcbDesignCtaContent {
  title: string;
  description: string;
  primary_button: {
    label: string;
    href: string;
  };
  secondary_button: {
    label: string;
    href: string;
  };
  trust_badges: ReadonlyArray<{
    icon_svg: string;
    label: string;
  }>;
}
