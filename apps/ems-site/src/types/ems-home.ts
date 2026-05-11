export interface HeroBenefitItem {
  icon_key?: string;
  title: string;
  description: string;
}

export interface HeroCta {
  label: string;
  href: string;
}

export interface EmsHomeHeroContent {
  background_image_url?: string;
  title: string;
  benefits: ReadonlyArray<HeroBenefitItem>;
  benefit_conclusion: string;
  cta: HeroCta;
}

export interface ServiceCta {
  label: string;
  href: string;
}

export type ServiceDescription =
  | {
      kind: 'paragraph';
      text: string;
    }
  | {
      kind: 'list';
      items: ReadonlyArray<string>;
    };

export interface ServiceItem {
  name: string;
  description: ServiceDescription;
  cta: ServiceCta;
}

export interface EmsHomeServicesContent {
  title: string;
  description: string;
  items: ReadonlyArray<ServiceItem>;
}

export interface QualityFunctionItem {
  icon_url: string;
  name: string;
  description: string;
}

export interface QualityLeftContent {
  image_url: string;
  icon_url: string;
  title: string;
  description: string;
}

export interface QualityTabContent {
  left: QualityLeftContent;
  functions: ReadonlyArray<QualityFunctionItem>;
}

export interface QualityTabItem {
  id: string;
  title: string;
  icon_url: string;
  content: QualityTabContent;
}

export interface QualityAdvantageItem {
  title: string;
  description: string;
}

export interface EmsHomeQualityContent {
  title: string;
  description: string;
  tabs: ReadonlyArray<QualityTabItem>;
  advantages: ReadonlyArray<QualityAdvantageItem>;
}

export interface CertificationItem {
  icon_url: string;
  name: string;
  description: string;
  time_icon_url: string;
  time_text: string;
}

export interface EmsHomeCertificationContent {
  title: string;
  description: string;
  items: ReadonlyArray<CertificationItem>;
}

export interface IndustryTabItem {
  id: string;
  name: string;
  icon_url: string;
}

export interface IndustryCardContent {
  title: string;
  description: {
    paragraph: string;
    list: ReadonlyArray<string>;
  };
  cta: {
    label: string;
    href: string;
  };
  image_url: string;
}

export interface IndustryTabContent {
  tab: IndustryTabItem;
  card: IndustryCardContent;
}

export interface EmsHomeIndustryContent {
  title: string;
  description: string;
  items: ReadonlyArray<IndustryTabContent>;
}

export interface EquipmentItem {
  image_url: string;
  title: string;
  description: string;
  parameter_label: string;
  parameter_value: string;
}

export interface EmsHomeEquipmentContent {
  title: string;
  description: string;
  items: ReadonlyArray<EquipmentItem>;
}

export interface WhyChooseUsCardItem {
  icon_url: string;
  title: string;
  description: string;
}

export interface EmsHomeWhyChooseUsContent {
  heading_prefix: string;
  heading_highlight: string;
  sub_heading: string;
  description: string;
  cards: ReadonlyArray<WhyChooseUsCardItem>;
}

export interface OrderProcessStepItem {
  icon_url: string;
  title: string;
}

export interface EmsHomeOrderProcessContent {
  title: string;
  steps: ReadonlyArray<OrderProcessStepItem>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EmsHomeFaqContent {
  title: string;
  items: ReadonlyArray<FaqItem>;
}
