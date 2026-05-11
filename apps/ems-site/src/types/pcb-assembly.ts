export type PcbGalleryItem = {
  image_url?: string;
  name: string;
};

export type CapabilityCardBody = {
  items: string[];
};

export type CapabilityIntroCard = {
  icon_url?: string;
  title: string;
  body: CapabilityCardBody;
};

export type PcbaCapabilityTab = {
  label: string;
  id?: string;
  cards: CapabilityIntroCard[];
};

export type PcbaCapabilityContent = {
  title: string;
  desc: string;
  gallery: PcbGalleryItem[];
  tabs: PcbaCapabilityTab[];
};

export type QcProcessStep = {
  icon_url?: string;
  short_name: string;
  full_name: string;
  desc: string;
  highlight?: boolean;
};

export type EquipmentItem = {
  image_url?: string;
  name: string;
};

export type PcbaQualityControlContent = {
  title: string;
  desc: string;
  process: QcProcessStep[];
  equipment: {
    title: string;
    items: EquipmentItem[];
  };
};
