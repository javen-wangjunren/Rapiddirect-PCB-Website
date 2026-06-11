import React from 'react';

import { getSupabaseImageUrl } from '../../lib/assets';

type AdvantageItem = {
  tab_title: string;
  tab_description: string;
  image_url?: string;
};

export type PcbBoardAdvantageContent = {
  eyebrow?: string;
  title: string;
  description: string;
  items: AdvantageItem[];
};

type Props = {
  data: PcbBoardAdvantageContent;
};

const normalizeId = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');

const getItemId = (item: AdvantageItem, index: number) =>
  normalizeId(item.tab_title) || `advantage-${index + 1}`;

export function PcbBoardAdvantageSection({ data }: Props) {
  const items = Array.isArray(data.items) ? data.items : [];
  if (items.length === 0) return null;

  const defaultItemId = getItemId(items[0] ?? { tab_title: '' }, 0);
  const [activeItemId, setActiveItemId] = React.useState(defaultItemId);
  const preloadedRef = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (!items.some((item, index) => getItemId(item, index) === activeItemId)) {
      setActiveItemId(defaultItemId);
    }
  }, [activeItemId, defaultItemId, items]);

  React.useEffect(() => {
    const sources = items
      .map((item) => (item.image_url ? getSupabaseImageUrl(item.image_url, { width: 1280, quality: 80 }) : ''))
      .filter(Boolean);

    sources.forEach((src) => {
      if (preloadedRef.current.has(src)) return;
      preloadedRef.current.add(src);
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    });
  }, [items]);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-5xl">{data.title}</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">{data.description}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-stretch">
          <div role="tablist" aria-orientation="vertical" className="flex flex-col gap-3">
            {items.map((item, index) => {
              const itemId = getItemId(item, index);
              const isActive = itemId === activeItemId;

              return (
                <button
                  key={itemId}
                  id={`pcb-board-advantage-tab-${itemId}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`pcb-board-advantage-panel-${itemId}`}
                  onClick={() => setActiveItemId(itemId)}
                  onMouseEnter={() => setActiveItemId(itemId)}
                  onFocus={() => setActiveItemId(itemId)}
                  className={[
                    'group relative overflow-hidden rounded-2xl border px-5 py-5 text-left transition-all duration-300',
                    isActive
                      ? 'border-[#ffd9d2] bg-[#fff5f3] shadow-[0_14px_30px_rgba(239,83,63,0.08)]'
                      : 'border-slate-200 bg-white hover:border-[#ffd9d2] hover:bg-[#fffaf9]'
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'absolute inset-y-0 left-0 w-1 origin-center rounded-r-full bg-[#ef533f] transition-transform duration-300',
                      isActive ? 'scale-y-100' : 'scale-y-0'
                    ].join(' ')}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className={[
                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-extrabold transition-colors duration-300',
                        isActive ? 'bg-[#ef533f] text-white' : 'bg-slate-100 text-slate-500'
                      ].join(' ')}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="min-w-0">
                      <h3
                        className={[
                          'text-lg font-extrabold tracking-[-0.02em] transition-colors duration-300',
                          isActive ? 'text-[#ef533f]' : 'text-slate-950'
                        ].join(' ')}
                      >
                        {item.tab_title}
                      </h3>
                      <p
                        className={[
                          'overflow-hidden text-sm leading-6 text-slate-600 transition-all duration-300',
                          isActive ? 'mt-2 max-h-24 opacity-100' : 'mt-0 max-h-0 opacity-0 lg:max-h-0'
                        ].join(' ')}
                      >
                        {item.tab_description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-slate-200 shadow-[0_20px_40px_rgba(15,23,42,0.06)] aspect-4/3 lg:aspect-auto lg:min-h-[520px]">
            {items.map((item, index) => {
              const itemId = getItemId(item, index);
              const isActive = itemId === activeItemId;
              const src768 = item.image_url ? getSupabaseImageUrl(item.image_url, { width: 768, quality: 75 }) : '';
              const src1280 = item.image_url ? getSupabaseImageUrl(item.image_url, { width: 1280, quality: 80 }) : '';
              const src1600 = item.image_url ? getSupabaseImageUrl(item.image_url, { width: 1600, quality: 82 }) : '';
              const placeholder = item.tab_title;

              return (
                <div
                  key={itemId}
                  id={`pcb-board-advantage-panel-${itemId}`}
                  role="tabpanel"
                  aria-labelledby={`pcb-board-advantage-tab-${itemId}`}
                  aria-hidden={isActive ? undefined : true}
                  className={[
                    'absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out',
                    isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                  ].join(' ')}
                >
                  {src1280 ? (
                    <img
                      src={src1280}
                      srcSet={`${src768} 768w, ${src1280} 1280w, ${src1600} 1600w`}
                      sizes="(max-width: 1023px) 100vw, 58vw"
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      loading={isActive ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  ) : null}

                  {src1280 ? null : (
                    <div className="relative z-10 max-w-[80%] rounded-xl bg-white/85 px-6 py-5 text-center text-sm font-semibold leading-6 text-slate-500">
                      {placeholder}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
