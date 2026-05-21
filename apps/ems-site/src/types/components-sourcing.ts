export interface ComponentsSourcingCoreServiceItem {
  icon_svg: string;
  title: string;
  description: string;
}

export interface ComponentsSourcingCategoryItem {
  title: string;
  image_placeholder: string;
  image_url?: string;
}

export interface ComponentsSourcingSupplyChannelItem {
  title: string;
  description: string;
}

export interface ComponentsSourcingBrandItem {
  name: string;
  logo_url?: string;
}

export interface ComponentsSourcingSourceCapabilityContent {
  title: string;
  description: string;
  core_services: ReadonlyArray<ComponentsSourcingCoreServiceItem>;
  categories: {
    title: string;
    items: ReadonlyArray<ComponentsSourcingCategoryItem>;
  };
  supply_chain: {
    title: string;
    items: ReadonlyArray<ComponentsSourcingSupplyChannelItem>;
  };
  brands: {
    title: string;
    items: ReadonlyArray<ComponentsSourcingBrandItem>;
    more_label?: string;
  };
}

export interface ComponentsSourcingProcessStep {
  id: string;
  nav_label: string;
  badge: string;
  title: string;
  description: string;
  image_placeholder: string;
  image_url?: string;
}

export interface ComponentsSourcingSourceProcessContent {
  title: string;
  description: string;
  steps: ReadonlyArray<ComponentsSourcingProcessStep>;
}

export interface ComponentsSourcingQualityBadgeItem {
  icon_svg: string;
  label: string;
}

export interface ComponentsSourcingQualityListItem {
  icon_svg: string;
  title: string;
  description: string;
  is_highlighted?: boolean;
}

export interface ComponentsSourcingQualityFloatingCard {
  icon_svg: string;
  title: string;
  subtitle: string;
}

export interface ComponentsSourcingSourceQualityControlContent {
  tag: string;
  title: string;
  lead: string;
  trust_badges: ReadonlyArray<ComponentsSourcingQualityBadgeItem>;
  items: ReadonlyArray<ComponentsSourcingQualityListItem>;
  visual: {
    image_placeholder: string;
    image_url?: string;
    floating_card: ComponentsSourcingQualityFloatingCard;
  };
}

export interface ComponentsSourcingSolutionCard {
  icon_svg: string;
  title: string;
  points: ReadonlyArray<string>;
  value_box: {
    icon_svg: string;
    text: string;
  };
}

export interface ComponentsSourcingSourceSolutionsContent {
  title: string;
  description: string;
  cards: ReadonlyArray<ComponentsSourcingSolutionCard>;
}
