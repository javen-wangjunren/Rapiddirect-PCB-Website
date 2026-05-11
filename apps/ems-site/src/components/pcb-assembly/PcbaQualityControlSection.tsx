import { useEffect, useRef, useState } from 'react';

import { getAssetPath } from '../../lib/assets';
import type { PcbaQualityControlContent, QcProcessStep } from '../../types/pcb-assembly';

type Props = {
  data: PcbaQualityControlContent;
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

const StepIcon = (props: { step: QcProcessStep; highlighted: boolean }) => {
  const svgClass = 'h-[26px] w-[26px]';

  if (props.step.icon_url) {
    const src = getAssetPath(props.step.icon_url);
    if (isImageUrl(src)) return <img src={src} alt="" className="h-[26px] w-[26px]" />;
  }

  const key = props.step.short_name.toLowerCase();

  if (key.includes('iqc')) {
    return (
      <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <circle cx="16" cy="15" r="3" fill={props.highlighted ? '#ffffff' : '#ffffff'} />
        <line x1="18.1" y1="17.1" x2="21" y2="20" />
      </svg>
    );
  }

  if (key.includes('ipqc') || key.includes('fai')) {
    return (
      <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  }

  if (key.includes('fqc')) {
    return (
      <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
        <path d="M12 15l2 2 4-4" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={svgClass} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <line x1="5" y1="7" x2="11" y2="7" />
      <line x1="5" y1="10" x2="9" y2="10" />
    </svg>
  );
};

export function PcbaQualityControlSection(props: Props) {
  const steps = (props.data.process ?? []).slice(0, 4);
  const equipment = props.data.equipment;

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateNav = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    const left = clamp(el.scrollLeft, 0, maxScroll);
    setCanPrev(left > 2);
    setCanNext(left < maxScroll - 2);
  };

  useEffect(() => {
    updateNav();
    const el = trackRef.current;
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
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('[data-equip-card]');
    const w = first?.offsetWidth ?? 360;
    const gap = 24;
    el.scrollBy({ left: direction * (w + gap), behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.5px] text-[#1a1a1a]">{props.data.title}</h2>
          <p className="mt-4 text-base leading-7 text-[#666666]">{props.data.desc}</p>
        </div>

        <div className="relative mt-16 flex gap-0 max-lg:flex-col max-lg:gap-10">
          <div className="relative flex w-full justify-between max-lg:flex-col max-lg:gap-10">
            <div className="absolute left-[50px] right-[50px] top-[30px] h-[2px] bg-[#eaeaea] max-lg:bottom-0 max-lg:left-[50px] max-lg:right-auto max-lg:top-0 max-lg:h-auto max-lg:w-[2px]" />
            {steps.map((step, idx) => {
              const highlighted = Boolean(step.highlight);
              return (
                <div
                  key={`${step.short_name}-${idx}`}
                  className="relative z-[2] flex-1 px-4 text-center max-lg:flex max-lg:flex-none max-lg:gap-6 max-lg:px-0 max-lg:text-left"
                >
                  <div
                    className={`mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 transition max-lg:mx-0 max-lg:mb-0 ${
                      highlighted
                        ? 'border-[#ef533f] bg-[#ef533f] text-white shadow-[0_0_0_6px_#fff0ed] scale-[1.05]'
                        : 'border-[#eaeaea] bg-white text-[#666666] hover:border-[#ef533f] hover:text-[#ef533f]'
                    }`}
                  >
                    <StepIcon step={step} highlighted={highlighted} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-lg font-bold transition ${highlighted ? 'text-[#ef533f]' : 'text-[#1a1a1a]'}`}>{step.short_name}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.5px] text-[#666666]">{step.full_name}</div>
                    <div className="mt-3 text-sm leading-6 text-[#666666]">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 rounded-2xl border border-[#eaeaea] bg-white px-10 py-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] max-md:px-5">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#1a1a1a]">{equipment.title}</h3>
          </div>

          <div className="relative isolate mt-10">
            <button
              type="button"
              aria-label="Previous"
              className="absolute left-[-12px] top-[40%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1a1a1a] shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition hover:border-[#ef533f] hover:text-[#ef533f] hover:shadow-[0_6px_20px_rgba(239,83,63,0.20)] disabled:cursor-default disabled:opacity-35 md:flex"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div
              ref={trackRef}
              className="relative z-0 flex gap-6 overflow-x-auto scroll-smooth pb-5 [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {equipment.items.map((it, idx) => {
                const src = it.image_url ? getAssetPath(it.image_url) : '';
                return (
                  <div
                    key={`${it.name}-${idx}`}
                    data-equip-card
                    className="flex w-[calc(33.333%-16px)] flex-none scroll-snap-start flex-col max-lg:w-[calc(50%-12px)] max-md:w-[85%]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[#eaeaea] bg-[#f4f6f9]">
                      {src && isImageUrl(src) ? (
                        <img src={src} alt="" className="h-full w-full object-cover transition duration-500 hover:scale-[1.05]" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#94a3b8]">[ Image ]</div>
                      )}
                    </div>
                    <div className="mt-5 text-center text-lg font-bold text-[#1a1a1a]">{it.name}</div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Next"
              className="absolute right-[-12px] top-[40%] z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1a1a1a] shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition hover:border-[#ef533f] hover:text-[#ef533f] hover:shadow-[0_6px_20px_rgba(239,83,63,0.20)] disabled:cursor-default disabled:opacity-35 md:flex"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
