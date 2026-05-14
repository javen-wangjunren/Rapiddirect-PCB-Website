export const pcbDesignProcessItemIcons = {
  prototyping:
    '<svg class="h-6 w-6 text-[#ef533f] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',
  fabrication:
    '<svg class="h-6 w-6 text-[#ef533f] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
  assembly:
    '<svg class="h-6 w-6 text-[#ef533f] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>',
  sourcing:
    '<svg class="h-6 w-6 text-[#ef533f] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>',
  production:
    '<svg class="h-6 w-6 text-[#ef533f] mb-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
} as const;

export type PcbDesignProcessItemIcon = keyof typeof pcbDesignProcessItemIcons;

export const pcbDesignProcessBenefitIcons = {
  workflow:
    '<svg class="h-[18px] w-[18px] text-[#ef533f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
  timing:
    '<svg class="h-[18px] w-[18px] text-[#ef533f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
  cost:
    '<svg class="h-[18px] w-[18px] text-[#ef533f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
  quality:
    '<svg class="h-[18px] w-[18px] text-[#ef533f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
} as const;

export type PcbDesignProcessBenefitIcon = keyof typeof pcbDesignProcessBenefitIcons;

const normalizeSvg = (input: string) => {
  return input.replace(/\s+/g, ' ').trim();
};

const itemSvgToIcon = (() => {
  const out: Record<string, PcbDesignProcessItemIcon> = {};
  for (const [key, svg] of Object.entries(pcbDesignProcessItemIcons)) {
    out[normalizeSvg(svg)] = key as PcbDesignProcessItemIcon;
  }
  return out;
})();

const benefitSvgToIcon = (() => {
  const out: Record<string, PcbDesignProcessBenefitIcon> = {};
  for (const [key, svg] of Object.entries(pcbDesignProcessBenefitIcons)) {
    out[normalizeSvg(svg)] = key as PcbDesignProcessBenefitIcon;
  }
  return out;
})();

export const resolvePcbDesignProcessItemIcon = (input: unknown): PcbDesignProcessItemIcon | '' => {
  if (typeof input !== 'string' || !input.trim()) return '';
  if (input in pcbDesignProcessItemIcons) return input as PcbDesignProcessItemIcon;
  return itemSvgToIcon[normalizeSvg(input)] ?? '';
};

export const resolvePcbDesignProcessBenefitIcon = (input: unknown): PcbDesignProcessBenefitIcon | '' => {
  if (typeof input !== 'string' || !input.trim()) return '';
  if (input in pcbDesignProcessBenefitIcons) return input as PcbDesignProcessBenefitIcon;
  return benefitSvgToIcon[normalizeSvg(input)] ?? '';
};

export const getPcbDesignProcessItemIconSvg = (icon: unknown): string => {
  const key = resolvePcbDesignProcessItemIcon(icon);
  return key ? pcbDesignProcessItemIcons[key] : '';
};

export const getPcbDesignProcessBenefitIconSvg = (icon: unknown): string => {
  const key = resolvePcbDesignProcessBenefitIcon(icon);
  return key ? pcbDesignProcessBenefitIcons[key] : '';
};
