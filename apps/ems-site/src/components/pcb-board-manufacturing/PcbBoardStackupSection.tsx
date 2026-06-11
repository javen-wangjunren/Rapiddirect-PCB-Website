import React from 'react';

export type StackupItem = {
  id?: string;
  /** 左侧 1:1 图卡展示的标签/占位文字 */
  thumb_label?: string;
  /** 若有工艺截面图，可直接给 URL（支持 public/ 下路径或 Supabase 路径） */
  thumb_image_url?: string;
  thumb_image_alt?: string;
  title: string;
  tag: string;
  is_high_tier?: boolean;
  structural_features: string;
  target_applications: string;
};

export type PcbBoardStackupContent = {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: {
    href: string;
    label: string;
  };
  items: StackupItem[];
};

type Props = {
  data: PcbBoardStackupContent;
};

const normalizeId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');

const getItemId = (item: StackupItem, index: number) =>
  (item.id?.trim() ? item.id.trim() : '') || normalizeId(item.title) || `stackup-${index + 1}`;

export function PcbBoardStackupSection({ data }: Props) {
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) return null;

  const defaultItemId = getItemId(items[0] ?? { title: '', tag: '', structural_features: '', target_applications: '' }, 0);
  const [activeItemId, setActiveItemId] = React.useState(defaultItemId);

  const activeIndex = React.useMemo(() => {
    const idx = items.findIndex((item, index) => getItemId(item, index) === activeItemId);
    return idx >= 0 ? idx : 0;
  }, [activeItemId, items]);

  const activeItem = items[activeIndex] ?? items[0]!;
  const activeKey = getItemId(activeItem, activeIndex);

  React.useEffect(() => {
    if (!items.some((item, index) => getItemId(item, index) === activeItemId)) {
      setActiveItemId(defaultItemId);
    }
  }, [activeItemId, defaultItemId, items]);

  return (
    <section className="bg-[#f8f9fa] py-20 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-5xl">{data.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{data.description}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,55%)_minmax(0,1fr)] lg:items-stretch">
          <div role="tablist" aria-label="HDI Stackup Gallery" className="grid grid-cols-3 gap-5 max-sm:grid-cols-2 max-sm:gap-3">
            {items.map((item, index) => {
              const itemId = getItemId(item, index);
              const isActive = itemId === activeItemId;
              const label = item.thumb_label?.trim() || `[ ${item.title} Diagram ]`;

              return (
                <button
                  key={itemId}
                  id={`pcb-stackup-tab-${itemId}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="pcb-stackup-panel"
                  onClick={() => setActiveItemId(itemId)}
                  onFocus={() => setActiveItemId(itemId)}
                  className={[
                    'group relative aspect-square overflow-hidden rounded-xl border bg-white p-0 text-left transition-all duration-300',
                    'hover:-translate-y-0.5 hover:border-slate-300',
                    isActive
                      ? 'border-[#ef533f] bg-[#fff5f3] shadow-[0_0_0_4px_rgba(239,83,63,0.15),0_10px_25px_rgba(239,83,63,0.06)]'
                      : 'border-slate-200'
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-0 transition-colors duration-300',
                      isActive ? 'bg-[#fff5f3]' : 'bg-slate-50'
                    ].join(' ')}
                  />

                  {item.thumb_image_url ? (
                    <img
                      src={item.thumb_image_url}
                      alt={item.thumb_image_alt ?? ''}
                      className="relative z-10 h-full w-full object-contain p-4"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="relative z-10 flex h-full w-full items-center justify-center px-4 text-center text-xs font-semibold text-slate-400">
                      {label}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)] max-sm:p-6">
            <div id="pcb-stackup-panel" role="tabpanel" aria-labelledby={`pcb-stackup-tab-${activeKey}`} className="flex grow flex-col">
              <div key={activeKey} className="flex grow flex-col animate-[pcbStackupFadeIn_0.4s_ease_forwards]">
                <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
                  <h3 className="text-2xl font-extrabold tracking-[-0.02em] text-slate-950">{activeItem.title}</h3>
                  <span
                    className="shrink-0 rounded bg-blue-50 px-2.5 py-1 text-xs font-extrabold text-[#0066FF]"
                  >
                    {activeItem.tag}
                  </span>
                </div>

                <div className="mt-7 space-y-7">
                  <div>
                    <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-black">Structural Features</h4>
                    <p className="mt-2 text-[15px] leading-7 text-slate-700">{activeItem.structural_features}</p>
                  </div>

                  <div>
                    <h4 className="text-[14px] font-bold uppercase tracking-[0.08em] text-black">Target Applications</h4>
                    <p className="mt-2 text-[15px] leading-7 text-slate-700">{activeItem.target_applications}</p>
                  </div>
                </div>
              </div>
            </div>

            {data.cta?.href ? (
              <a
                href={data.cta.href}
                className="mt-10 inline-flex items-center justify-center rounded-md bg-[#ef533f] px-5 py-4 text-base font-bold text-white shadow-[0_4px_14px_rgba(239,83,63,0.2)] transition hover:bg-[#d94527] hover:-translate-y-0.5"
              >
                {data.cta.label ?? 'Get Instant Stack-up Quote'}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pcbStackupFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
