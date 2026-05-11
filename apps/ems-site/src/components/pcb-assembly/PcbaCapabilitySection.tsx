import { useEffect, useMemo, useRef, useState } from 'react';

import { getAssetPath } from '../../lib/assets';
import type { PcbaCapabilityContent } from '../../types/pcb-assembly';

type Props = {
  data: PcbaCapabilityContent;
};

const isImageUrl = (value?: string) => {
  if (!value) return false;
  const v = value.toLowerCase();
  return (
    v.startsWith('data:image/') ||
    v.endsWith('.png') ||
    v.endsWith('.jpg') ||
    v.endsWith('.jpeg') ||
    v.endsWith('.webp') ||
    v.endsWith('.gif') ||
    v.endsWith('.svg') ||
    v.includes('/storage/v1/object/')
  );
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const normalizeTabId = (value: string) => value.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-_]/g, '');

const getTabId = (tab: { id?: string; label?: string }, idx: number) =>
  (tab.id?.trim() ? tab.id.trim() : '') || normalizeTabId(tab.label ?? '') || `tab-${idx}`;

export function PcbaCapabilitySection(props: Props) {
  const tabs = Array.isArray(props.data.tabs) ? props.data.tabs : [];
  const gallery = Array.isArray(props.data.gallery) ? props.data.gallery : [];
  const defaultTabId = getTabId(tabs[0] ?? {}, 0);
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  useEffect(() => {
    if (!tabs.some((t, idx) => getTabId(t, idx) === activeTabId)) setActiveTabId(defaultTabId);
  }, [defaultTabId, activeTabId, tabs]);

  const activeTab = useMemo(
    () => tabs.find((t, idx) => getTabId(t, idx) === activeTabId) ?? tabs[0] ?? null,
    [tabs, activeTabId]
  );

  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = () => {
    const el = galleryRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = clamp(el.scrollLeft, 0, maxScroll);
    setCanPrev(left > 2);
    setCanNext(left < maxScroll - 2);
  };

  useEffect(() => {
    updateNav();
    const el = galleryRef.current;
    if (!el) return;
    const onScroll = () => updateNav();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateNav();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const scrollByStep = (direction: -1 | 1) => {
    const el = galleryRef.current;
    if (!el) return;
    const firstCard = el.querySelector<HTMLElement>('[data-gallery-card]');
    const cardWidth = firstCard?.offsetWidth ?? 280;
    const gap = 24;
    const step = cardWidth + gap;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.5px] text-[#1a1a1a]">{props.data.title}</h2>
          <p className="mt-4 text-base leading-7 text-[#666666]">{props.data.desc}</p>
        </div>

        <div className="relative mt-12">
          <button
            type="button"
            aria-label="Previous"
            className="absolute left-[-14px] top-[calc(50%-20px)] hidden h-10 w-10 items-center justify-center rounded-full border border-[#eaeaea] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-[1px] disabled:cursor-default disabled:opacity-35 md:flex"
            onClick={() => scrollByStep(-1)}
            disabled={!canPrev}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={galleryRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:pb-6"
          >
            {gallery.map((item, idx) => {
              const src = item.image_url ? getAssetPath(item.image_url) : '';
              return (
                <div
                  key={`${item.name}-${idx}`}
                  data-gallery-card
                  className="group w-[280px] flex-none overflow-hidden rounded-xl border border-[#eaeaea] bg-white shadow-[0_4px_15px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] max-md:w-[85%]"
                >
                  <div className="flex h-[180px] w-full items-center justify-center bg-[#f0f2f5]">
                    {src && isImageUrl(src) ? (
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="px-6 text-center text-sm font-medium text-[#94a3b8]">[ Image ]</div>
                    )}
                  </div>
                  <div className="px-5 py-5">
                    <div className="text-lg font-bold text-[#1a1a1a]">{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next"
            className="absolute right-[-14px] top-[calc(50%-20px)] hidden h-10 w-10 items-center justify-center rounded-full border border-[#eaeaea] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)] transition hover:-translate-y-[1px] disabled:cursor-default disabled:opacity-35 md:flex"
            onClick={() => scrollByStep(1)}
            disabled={!canNext}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-10 rounded-2xl bg-[#111111] p-10 text-white shadow-[0_20px_40px_rgba(0,0,0,0.10)] max-md:px-5 max-md:py-8">
          <div className="flex gap-8 overflow-x-auto border-b border-[#333333] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((t, idx) => {
              const tabId = getTabId(t, idx);
              const active = tabId === activeTabId;
              return (
                <button
                  key={tabId}
                  type="button"
                  className={`relative whitespace-nowrap pb-4 text-lg font-semibold transition ${
                    active ? 'text-white' : 'text-[#888888] hover:text-white'
                  }`}
                  onClick={() => setActiveTabId(tabId)}
                >
                  {t.label}
                  {active ? <span className="absolute bottom-[-1px] left-0 h-[3px] w-full rounded-t bg-[#ef533f]" /> : null}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {(activeTab?.cards ?? []).slice(0, 3).map((card, idx) => {
              const iconSrc = card.icon_url ? getAssetPath(card.icon_url) : '';
              const items = Array.isArray((card as any)?.body?.items) ? ((card as any).body.items as string[]) : [];
              return (
                <div
                  key={`${card.title}-${idx}`}
                  className="rounded-xl border border-[#333333] bg-[#1f1f1f] p-6 transition hover:border-[#ef533f]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    {iconSrc && isImageUrl(iconSrc) ? (
                      <img src={iconSrc} alt="" className="h-6 w-6" />
                    ) : (
                      <div className="h-6 w-6 text-[#ef533f]">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <line x1="9" y1="1" x2="9" y2="4" />
                          <line x1="15" y1="1" x2="15" y2="4" />
                          <line x1="9" y1="20" x2="9" y2="23" />
                          <line x1="15" y1="20" x2="15" y2="23" />
                        </svg>
                      </div>
                    )}
                    <div className="text-lg font-semibold">{card.title}</div>
                  </div>

                  <ul className="space-y-2 text-sm leading-6 text-[#e0e0e0]">
                    {items.map((it, i) => (
                      <li key={`${it}-${i}`} className="flex items-start gap-2">
                        <span className="mt-[1px] text-lg leading-none text-[#ef533f]">•</span>
                        <span className="min-w-0">{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
