import type { ServiceSchema } from '../../utils/schemaOrg';

export interface SeoDraft {
  meta_title: string;
  meta_description: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image: string;
  noindex: boolean;
  service_schema: ServiceSchema;
}

export interface EmsEditorSeoCardProps {
  seo: SeoDraft;
  onSeoChange: (next: SeoDraft) => void;
  pageTitle: string;
  slug: string;
}

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

const parseCsvList = (input: string) =>
  input
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

const toCsvList = (input: readonly string[] | undefined) => (input?.length ? input.join(', ') : '');

export default function EmsEditorSeoCard({ seo, onSeoChange, pageTitle, slug }: EmsEditorSeoCardProps) {
  const service = seo.service_schema ?? {};

  return (
    <div className="rounded-md border border-[#dcdcde] bg-white">
      <div className="border-b border-[#dcdcde] px-4 py-2">
        <div className="text-sm font-semibold">SEO Settings</div>
      </div>
      <div className="grid grid-cols-1 gap-3 p-4">
        <label className="block">
          <div className="text-xs font-medium text-[#646970]">Meta Title</div>
          <input
            className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={seo.meta_title}
            onChange={(e) => onSeoChange({ ...seo, meta_title: e.target.value })}
          />
        </label>
        <label className="block">
          <div className="text-xs font-medium text-[#646970]">Meta Description</div>
          <textarea
            className="mt-1 min-h-24 w-full rounded-md border border-[#dcdcde] px-3 py-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={seo.meta_description}
            onChange={(e) => onSeoChange({ ...seo, meta_description: e.target.value })}
          />
          <div className="mt-1 text-xs text-[#646970]">{seo.meta_description.length} 字符</div>
        </label>
        <label className="block">
          <div className="text-xs font-medium text-[#646970]">Canonical URL</div>
          <input
            className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={seo.canonical_url}
            onChange={(e) => onSeoChange({ ...seo, canonical_url: e.target.value })}
          />
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <div className="text-xs font-medium text-[#646970]">OG Title</div>
            <input
              className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
              value={seo.og_title}
              onChange={(e) => onSeoChange({ ...seo, og_title: e.target.value })}
            />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[#646970]">OG Image</div>
            <input
              className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
              value={seo.og_image}
              onChange={(e) => onSeoChange({ ...seo, og_image: e.target.value })}
              placeholder="https://..."
            />
          </label>
        </div>
        <label className="block">
          <div className="text-xs font-medium text-[#646970]">OG Description</div>
          <textarea
            className="mt-1 min-h-20 w-full rounded-md border border-[#dcdcde] px-3 py-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={seo.og_description}
            onChange={(e) => onSeoChange({ ...seo, og_description: e.target.value })}
          />
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={seo.noindex}
            onChange={(e) => onSeoChange({ ...seo, noindex: e.target.checked })}
            className="h-4 w-4 rounded border-[#dcdcde]"
          />
          <span className="text-sm">Noindex</span>
        </label>

        <div className="mt-2 rounded-md border border-[#dcdcde] bg-[#fbfbfb] p-3">
          <div className="text-xs font-semibold text-[#1d2327]">Service Schema</div>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(service.enabled)}
                onChange={(e) => onSeoChange({ ...seo, service_schema: { ...service, enabled: e.target.checked } })}
                className="h-4 w-4 rounded border-[#dcdcde]"
              />
              <span className="text-sm">Enable Service JSON-LD</span>
            </label>

            <label className="block">
              <div className="text-xs font-medium text-[#646970]">Service Type</div>
              <input
                className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
                value={service.serviceType ?? ''}
                onChange={(e) => onSeoChange({ ...seo, service_schema: { ...service, serviceType: e.target.value } })}
                placeholder="e.g. PCB Assembly"
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-[#646970]">Category (CSV)</div>
              <input
                className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
                value={toCsvList(service.category)}
                onChange={(e) => onSeoChange({ ...seo, service_schema: { ...service, category: parseCsvList(e.target.value) } })}
                placeholder="e.g. Electronics Manufacturing Services, PCB Assembly"
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-[#646970]">Area Served (CSV)</div>
              <input
                className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
                value={toCsvList(service.areaServed)}
                onChange={(e) =>
                  onSeoChange({ ...seo, service_schema: { ...service, areaServed: parseCsvList(e.target.value) } })
                }
                placeholder="e.g. United States, Europe, Asia"
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-[#646970]">Audience Types (CSV)</div>
              <input
                className="mt-1 h-9 w-full rounded-md border border-[#dcdcde] px-3 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
                value={toCsvList(service.audienceTypes)}
                onChange={(e) =>
                  onSeoChange({
                    ...seo,
                    service_schema: { ...service, audienceTypes: parseCsvList(e.target.value) }
                  })
                }
                placeholder="e.g. Hardware startups, OEM engineering teams"
              />
            </label>

            <label className="block">
              <div className="text-xs font-medium text-[#646970]">Offer Description</div>
              <textarea
                className="mt-1 min-h-20 w-full rounded-md border border-[#dcdcde] px-3 py-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
                value={service.offerDescription ?? ''}
                onChange={(e) =>
                  onSeoChange({
                    ...seo,
                    service_schema: { ...service, offerDescription: e.target.value }
                  })
                }
              />
            </label>
          </div>
        </div>

        <div className="rounded-md border border-[#dcdcde] bg-[#fbfbfb] p-3">
          <div className="text-xs text-[#646970]">SERP 预览</div>
          <div className="mt-1 text-sm font-medium text-[#2271b1]">{seo.meta_title || pageTitle || '（未设置）'}</div>
          <div className="mt-0.5 text-xs text-[#646970]">www.rapiddirect.com{normalizeSlug(slug)}</div>
          <div className="mt-1 text-sm text-[#1d2327]">{seo.meta_description || '（未设置 meta description）'}</div>
        </div>
      </div>
    </div>
  );
}
