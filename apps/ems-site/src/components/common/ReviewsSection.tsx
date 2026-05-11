import { useEffect, useRef, useState } from 'react';

import { getAssetPath, getHref } from '../../lib/assets';
import type { ReviewsContent } from '../../types/reviews';

type Props = {
  data: ReviewsContent;
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

export function ReviewsSection(props: Props) {
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
    const first = el.querySelector<HTMLElement>('[data-review-card]');
    const w = first?.offsetWidth ?? 420;
    const gap = 28;
    el.scrollBy({ left: direction * (w + gap), behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.5px] text-[#1a1a1a]">{props.data.title}</h2>
          <p className="mt-4 text-base leading-7 text-[#666666]">{props.data.desc}</p>
        </div>

        <div className="relative isolate mt-14">
          <button
            type="button"
            aria-label="Previous reviews"
            className="absolute left-[-25px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1a1a1a] shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition hover:border-[#ef533f] hover:text-[#ef533f] hover:shadow-[0_6px_20px_rgba(239,83,63,0.20)] disabled:cursor-default disabled:opacity-35 lg:flex"
            onClick={() => scrollByStep(-1)}
            disabled={!canPrev}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="15 18 9 12 15 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className="relative z-0 flex gap-7 overflow-x-auto scroll-smooth pt-2 pb-8 [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {props.data.reviews.map((r, idx) => {
              const imgSrc = r.image_url ? getAssetPath(r.image_url) : '';
              const avatarSrc = r.customer_avatar_url ? getAssetPath(r.customer_avatar_url) : '';
              return (
                <article
                  key={`${r.customer_name}-${idx}`}
                  data-review-card
                  className="group flex w-[calc(33.333%-18.666px)] flex-none scroll-snap-start flex-col overflow-hidden rounded-2xl border border-[#eaeaea] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition hover:-translate-y-2 hover:border-[#ffe0db] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] max-lg:w-[calc(50%-14px)] max-md:w-[85%]"
                >
                  <div className="relative h-[240px] bg-[#f4f6f9]">
                    <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#10b981] shadow-[0_4px_10px_rgba(0,0,0,0.10)] backdrop-blur-[4px]">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      Verified Purchase
                    </div>

                    {imgSrc && isImageUrl(imgSrc) ? (
                      <img src={imgSrc} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#94a3b8]">
                        [ Image ]
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col bg-white">
                    <div className="flex items-center justify-between gap-4 border-b border-[#f1f1f1] px-7 py-5">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="h-11 w-11 overflow-hidden rounded-full bg-[#f1f5f9]">
                          {avatarSrc && isImageUrl(avatarSrc) ? <img src={avatarSrc} alt="" className="h-full w-full object-cover" /> : null}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-base font-semibold text-[#1a1a1a]">{r.customer_name}</div>
                          <div className="truncate text-xs font-medium text-[#7c8798]">{r.customer_industry}</div>
                        </div>
                      </div>

                      <div className="flex flex-none items-center gap-1 text-[#f6b21a]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <div className="px-7 py-6">
                      <div className="text-lg font-bold text-[#1a1a1a]">“{r.title}”</div>
                      <p className="mt-4 text-sm leading-7 text-[#666666]">{r.content}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next reviews"
            className="absolute right-[-25px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#eaeaea] bg-white text-[#1a1a1a] shadow-[0_4px_15px_rgba(0,0,0,0.10)] transition hover:border-[#ef533f] hover:text-[#ef533f] hover:shadow-[0_6px_20px_rgba(239,83,63,0.20)] disabled:cursor-default disabled:opacity-35 lg:flex"
            onClick={() => scrollByStep(1)}
            disabled={!canNext}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="9 18 15 12 9 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={getHref(props.data.cta.href)}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#ef533f] px-10 py-5 text-sm font-bold text-white shadow-[0_12px_24px_rgba(239,83,63,0.25)] transition hover:bg-[#d64734] hover:shadow-[0_18px_30px_rgba(239,83,63,0.30)]"
          >
            <span>{props.data.cta.text}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14" strokeLinecap="round" />
              <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
