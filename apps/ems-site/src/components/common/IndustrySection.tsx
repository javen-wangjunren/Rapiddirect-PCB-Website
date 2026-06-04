import React from 'react';

import type { EmsHomeIndustryContent } from '../../types/ems-home';
import { getAssetPath, getHref } from '../../lib/assets';

const orangeIconFilter =
  'brightness(0) saturate(100%) invert(43%) sepia(75%) saturate(2369%) hue-rotate(336deg) brightness(98%) contrast(93%)';
const whiteIconFilter = 'brightness(0) invert(1)';

export function IndustrySection({ data }: { data: EmsHomeIndustryContent }) {
  const [activeId, setActiveId] = React.useState<string>(data.items[0]?.tab.id ?? '');
  const preloadedRef = React.useRef<Set<string>>(new Set());
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const mobileTabsRef = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const mobileTabsViewportRef = React.useRef<HTMLDivElement | null>(null);

  const active = data.items.find((x) => x.tab.id === activeId) ?? data.items[0];
  if (!active) return null;

  const activeImageSrc = active.card.image_url ? getAssetPath(active.card.image_url) : '';

  const selectTab = React.useCallback((id: string, focusContent: boolean) => {
    setActiveId(id);
    if (!focusContent) return;
    window.requestAnimationFrame(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  React.useEffect(() => {
    const btn = mobileTabsRef.current.get(activeId);
    const viewport = mobileTabsViewportRef.current;
    if (!btn || !viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    if (maxScroll <= 2) return;
    const left = Math.max(0, Math.min(btn.offsetLeft, maxScroll));
    viewport.scrollTo({ left, behavior: 'smooth' });
  }, [activeId]);

  React.useEffect(() => {
    const urls = data.items
      .map((item) => (item.card.image_url ? getAssetPath(item.card.image_url) : ''))
      .filter(Boolean);

    const load = (src: string) => {
      if (preloadedRef.current.has(src)) return;
      preloadedRef.current.add(src);
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
    };

    if (activeImageSrc) load(activeImageSrc);

    const rest = urls.filter((u) => u !== activeImageSrc);
    const schedule = (cb: () => void) => {
      const w = window as any;
      if (typeof w?.requestIdleCallback === 'function') return w.requestIdleCallback(cb, { timeout: 1500 });
      return window.setTimeout(cb, 200);
    };

    const id = schedule(() => rest.forEach(load));
    return () => {
      const w = window as any;
      if (typeof w?.cancelIdleCallback === 'function') w.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, [data.items, activeImageSrc]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1399px] px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{data.description}</p>
        </div>

        <div className="mt-10 lg:hidden">
          <div
            ref={mobileTabsViewportRef}
            className="flex gap-3 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]"
            role="tablist"
            aria-label={data.title}
          >
            {data.items.map((item) => {
              const isActive = item.tab.id === activeId;
              const tabIconSrc = item.tab.icon_url ? getAssetPath(item.tab.icon_url) : '';
              return (
                <button
                  key={item.tab.id}
                  type="button"
                  onClick={() => selectTab(item.tab.id, true)}
                  ref={(el) => {
                    if (el) mobileTabsRef.current.set(item.tab.id, el);
                    else mobileTabsRef.current.delete(item.tab.id);
                  }}
                  className={[
                    'shrink-0 flex items-center gap-2 rounded-full px-4 py-2.5 text-left transition',
                    isActive
                      ? 'bg-[#ea543f] shadow-[0_11px_16px_-3px_rgba(234,84,63,0.20),0_4px_6px_-4px_rgba(234,84,63,0.20)]'
                      : 'border border-slate-200 bg-[#f9fafb] hover:bg-white'
                  ].join(' ')}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={['flex h-9 w-9 items-center justify-center rounded-full', isActive ? 'bg-white/20' : 'bg-white'].join(' ')}>
                    {tabIconSrc ? (
                      <img
                        src={tabIconSrc}
                        alt=""
                        className="h-5 w-5"
                        style={{ filter: isActive ? whiteIconFilter : orangeIconFilter }}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <span className={['whitespace-nowrap text-[14px] font-medium leading-5', isActive ? 'text-white' : 'text-slate-700'].join(' ')}>
                    {item.tab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[320px_1fr]">
          <div className="hidden space-y-3 lg:block" role="tablist" aria-label={data.title}>
            {data.items.map((item) => {
              const isActive = item.tab.id === activeId;
              const tabIconSrc = item.tab.icon_url ? getAssetPath(item.tab.icon_url) : '';
              return (
                <button
                  key={item.tab.id}
                  type="button"
                  onClick={() => selectTab(item.tab.id, false)}
                  className={[
                    'flex w-full items-center gap-4 rounded-[15px] px-5 py-4 text-left transition',
                    isActive
                      ? 'bg-[#ea543f] shadow-[0_11px_16px_-3px_rgba(234,84,63,0.20),0_4px_6px_-4px_rgba(234,84,63,0.20)]'
                      : 'border border-slate-200 bg-[#f9fafb] hover:bg-white'
                  ].join(' ')}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span
                    className={['flex h-[51px] w-[51px] items-center justify-center rounded-[11px]', isActive ? 'bg-white/20' : 'bg-white'].join(' ')}
                  >
                    {tabIconSrc ? (
                      <img
                        src={tabIconSrc}
                        alt=""
                        className="h-[26px] w-[26px]"
                        style={{ filter: isActive ? whiteIconFilter : orangeIconFilter }}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="h-[26px] w-[26px]" aria-hidden="true" />
                    )}
                  </span>
                  <span className={['text-[19px] font-medium leading-[30px]', isActive ? 'text-white' : 'text-slate-700'].join(' ')}>
                    {item.tab.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div ref={contentRef} className="scroll-mt-24 overflow-hidden rounded-[15px] bg-[#e3e2e7] p-6 sm:p-9" role="tabpanel">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_450px] lg:items-start">
              <div>
                <h3 className="text-[22px] font-semibold leading-8 tracking-[0.4px] text-slate-900 sm:text-[26px] sm:leading-10">
                  {active.card.title}
                </h3>
                <p className="mt-4 text-[15px] leading-6 text-slate-600 sm:mt-6 sm:text-[17px] sm:leading-[26px]">
                  {active.card.description.paragraph}
                </p>

                <ul className="mt-6 space-y-3 sm:mt-10">
                  {active.card.description.list.map((text, idx) => (
                    <li
                      key={`${text}-${idx}`}
                      className="flex items-start gap-3 text-[15px] leading-6 text-slate-700 sm:text-[19px] sm:leading-[30px]"
                    >
                      <span className="mt-2 h-[6px] w-[6px] flex-none rounded-full bg-[#ea543f] sm:mt-[11px]" />
                      <span className="min-w-0">{text}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getHref(active.card.cta.href)}
                  className="mt-7 inline-flex items-center justify-center gap-3 rounded-[11px] bg-[#ea543f] px-6 py-3 text-[15px] font-medium leading-6 text-white shadow-[0_11px_16px_-3px_rgba(234,84,63,0.25),0_4px_6px_-4px_rgba(234,84,63,0.25)] transition hover:bg-[#d84c39] focus:outline-none focus:ring-2 focus:ring-[#ea543f]/50 focus:ring-offset-2 sm:mt-10 sm:px-9 sm:py-4 sm:text-[19px] sm:leading-[30px]"
                >
                  <span className="text-white">{active.card.cta.label}</span>
                  <img
                    src={getAssetPath('/icons/industry/moccppwi-o23suxz.svg')}
                    alt=""
                    className="h-5 w-5 sm:h-[21px] sm:w-[21px]"
                    style={{ filter: whiteIconFilter }}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </div>

              {activeImageSrc ? (
                <img
                  key={activeId}
                  src={activeImageSrc}
                  alt=""
                  className="h-56 w-full rounded-[20px] object-cover sm:h-80 lg:h-[450px] lg:w-[450px]"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className="h-56 w-full rounded-[20px] bg-white/60 sm:h-80 lg:h-[450px] lg:w-[450px]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
