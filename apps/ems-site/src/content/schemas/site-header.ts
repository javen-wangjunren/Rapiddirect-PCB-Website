// ============================================================
// Site Header Schema
// 定义 Header 全部数据模型，供后台编辑器 + 前台渲染 + Normalize 使用
// ============================================================

/**
 * 服务卡片（Capabilities / Solutions 共用）
 */
const cardSchema = {
  label: 'string',
  href: 'string'
} as const;

/**
 * Capabilities 菜单：一个 tab 的结构
 */
const capTabSchema = {
  tab_label: 'string',    // sidebar 按钮文案 & 右侧面板标题
  is_muted: 'boolean',    // 灰显（如 Value-Added）
  cards: {
    type: 'array' as const,
    items: cardSchema
  },
  image_url: 'string'     // 右侧联动图片
} as const;

/**
 * Capabilities 菜单：一级分类（section）
 */
const capSectionSchema = {
  section_label: 'string', // "Mechanical Manufacturing" / "Electronics Manufacturing"
  tabs: {
    type: 'array' as const,
    items: capTabSchema
  }
} as const;

/**
 * Capabilities 菜单：底部 CTA
 */
const capFooterSchema = {
  browse_all_href: 'string',  // "Browse all capabilities →" 名称固定
  get_quote_href: 'string'    // "Get Instant Quote →" 名称固定
} as const;

// ════════════════════════════════════════════════════════════
// Solutions 菜单
// ════════════════════════════════════════════════════════════

/**
 * Solutions 步骤（Timeline 样式）
 * 步号不存储，按数组顺序渲染（step_number 已废弃）
 */
const solStepSchema = {
  title: 'string',
  desc: 'string',
  href: 'string'
} as const;

/**
 * Solutions 菜单：一个 tab 的结构
 * panel_style: 'timeline' | 'card'
 */
const solTabSchema = {
  tab_label: 'string',         // sidebar 按钮文案 & 右侧面板标题
  panel_style: 'string',       // 'timeline' | 'card'
  panel_desc: 'string',        // 面板描述
  // Timeline 样式
  steps: {
    type: 'array' as const,
    items: solStepSchema
  },
  // Card 样式
  cards: {
    type: 'array' as const,
    items: cardSchema
  },
  // CTA
  cta1_label: 'string',        // 第一个 CTA 文案（个性化）
  cta1_href: 'string',
  cta2_href: 'string',         // 第二个 CTA 固定 "Get Instant Quote"
  image_url: 'string'
} as const;

// ════════════════════════════════════════════════════════════
// Industries 菜单
// ════════════════════════════════════════════════════════════

const industryItemSchema = {
  label: 'string',
  href: 'string',
  icon_svg: 'string'
} as const;

const caseStudySchema = {
  image_url: 'string',
  tag: 'string',
  title: 'string',
  cta_label: 'string',
  cta_href: 'string'
} as const;

// ════════════════════════════════════════════════════════════
// Platform 菜单
// ════════════════════════════════════════════════════════════

const platformLinkSchema = {
  label: 'string',
  href: 'string'
} as const;

const platformCardSchema = {
  image_url: 'string',
  title: 'string',
  description: 'string',
  links: {
    type: 'array' as const,
    items: platformLinkSchema
  },
  list_style: 'string',  // 'simple' | 'timeline'
  cta_label: 'string',
  cta_href: 'string'
} as const;

// ════════════════════════════════════════════════════════════
// Resources 菜单
// ════════════════════════════════════════════════════════════

const resourceLinkSchema = { label: 'string', href: 'string' } as const;

const resourceServiceItemSchema = { title: 'string', desc: 'string', href: 'string' } as const;

const resourceSectionSchema = {
  section_title: 'string',
  link_style: 'string',
  links: { type: 'array' as const, items: resourceLinkSchema },
  service_items: { type: 'array' as const, items: resourceServiceItemSchema },
  footer_label: 'string',
  footer_href: 'string'
} as const;

// ════════════════════════════════════════════════════════════
// About 菜单
// ════════════════════════════════════════════════════════════

const aboutLinkGroupSchema = {
  group_title: 'string',
  links: { type: 'array' as const, items: { label: 'string', href: 'string' } }
} as const;

// ============================================================
// 顶层 Schema
// ============================================================
export const siteHeaderSchema = {
  logo_url: 'string',
  cta_text: 'string',
  cta_href: 'string',
  nav_items: {
    type: 'array' as const,
    items: {
      label: 'string',
      mega_type: 'string',
      sections: { type: 'array' as const, items: capSectionSchema },
      footer: capFooterSchema,
      tabs: { type: 'array' as const, items: solTabSchema },
      industries_header_title: 'string',
      industries_browse_href: 'string',
      industries: { type: 'array' as const, items: industryItemSchema },
      case_study: caseStudySchema,
      platform_cards: { type: 'array' as const, items: platformCardSchema },
      resource_sections: { type: 'array' as const, items: resourceSectionSchema },
      about_banner_image_url: 'string',
      about_banner_title: 'string',
      about_banner_desc: 'string',
      about_link_groups: { type: 'array' as const, items: aboutLinkGroupSchema }
    }
  }
} as const;

// ============================================================
// TypeScript 类型导出
// ============================================================

export interface CardData {
  label: string;
  href: string;
}

export interface CapTabData {
  tab_label: string;
  is_muted: boolean;
  cards: CardData[];
  image_url: string;
}

export interface CapSectionData {
  section_label: string;
  tabs: CapTabData[];
}

export interface CapFooterData {
  browse_all_href: string;
  get_quote_href: string;
}

// ── Solutions ──

export interface SolStepData {
  title: string;
  desc: string;
  href: string;
}

export type SolPanelStyle = 'timeline' | 'card';

export interface SolTabData {
  tab_label: string;
  panel_style: SolPanelStyle;
  panel_desc: string;
  steps: SolStepData[];       // Timeline 样式（步号按数组顺序）
  cards: CardData[];          // Card 样式
  cta1_label: string;
  cta1_href: string;
  cta2_href: string;
  image_url: string;
}

// ── Industries ──

export interface IndustryItemData {
  label: string;
  href: string;
  icon_svg: string;
}

export interface CaseStudyData {
  image_url: string;
  tag: string;
  title: string;
  cta_label: string;
  cta_href: string;
}

// ── Platform ──

export interface PlatformLinkData {
  label: string;
  href: string;
}

export type PlatformListStyle = 'simple' | 'timeline';

export interface PlatformCardData {
  image_url: string;
  title: string;
  description: string;
  links: PlatformLinkData[];
  list_style: PlatformListStyle;
  cta_label: string;
  cta_href: string;
}

// ── Resources ──

export interface ResourceLinkData {
  label: string;
  href: string;
}

export interface ResourceServiceItemData {
  title: string;
  desc: string;
  href: string;
}

export type ResourceLinkStyle = 'simple' | 'service';

export interface ResourceSectionData {
  section_title: string;
  link_style: ResourceLinkStyle;
  links: ResourceLinkData[];
  service_items: ResourceServiceItemData[];
  footer_label: string;
  footer_href: string;
}

// ── About ──

export interface AboutLinkGroupData {
  group_title: string;
  links: { label: string; href: string }[];
}

// ── Nav Item ──

export type MegaType = 'capabilities' | 'solutions' | 'industries' | 'platform' | 'resources' | 'about';

export interface NavItemData {
  label: string;
  mega_type: MegaType;
  // Capabilities
  sections: CapSectionData[];
  footer: CapFooterData;
  // Solutions
  tabs: SolTabData[];
  // Industries
  industries_header_title: string;
  industries_browse_href: string;
  industries: IndustryItemData[];
  case_study: CaseStudyData;
  // Platform
  platform_cards: PlatformCardData[];
  // Resources
  resource_sections: ResourceSectionData[];
  // About
  about_banner_image_url: string;
  about_banner_title: string;
  about_banner_desc: string;
  about_link_groups: AboutLinkGroupData[];
}

export interface SiteHeaderData {
  logo_url: string;
  cta_text: string;
  cta_href: string;
  nav_items: NavItemData[];
}