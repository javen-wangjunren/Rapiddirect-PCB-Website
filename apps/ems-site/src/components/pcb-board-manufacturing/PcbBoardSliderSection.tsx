import React from 'react';

import { getSupabaseImageUrl } from '../../lib/assets';

export type PcbBoardSliderItem = {
  image_url: string;
  image_title: string;
};

export type PcbBoardSliderContent = {
  title: string;
  description: string;
  items: PcbBoardSliderItem[];
};

type Props = {
  data: PcbBoardSliderContent;
};

export function PcbBoardSliderSection({ data }: Props) {
  const items = Array.isArray(data.items) ? data.items : [];
  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  const getScrollStep = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 340;
    const firstCard = viewport.querySelector<HTMLElement>('[data-pcb-board-slider-card]');
    return firstCard ? firstCard.offsetWidth + 20 : 340;
  }, []);

  const onPrev = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
  }, [getScrollStep]);

  const onNext = React.useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
  }, [getScrollStep]);

  if (!data.title && items.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-slate-950 sm:text-5xl">{data.title}</h2>
          <p className="mx-auto my-[30px] max-w-[850px] text-base leading-8 text-slate-600 sm:text-lg">{data.description}</p>
        </div>

        <div ref={viewportRef} className="pcb-board-slider-viewport mt-12">
          <div className="pcb-board-slider-track">
            {items.map((item, index) => {
              const imgSrc = item.image_url ? getSupabaseImageUrl(item.image_url, { width: 900, quality: 82, resize: 'contain' }) : '';
              const placeholder = item.image_title;
              return (
                <div key={`${item.image_title}-${index}`} className="pcb-board-slider-card" data-pcb-board-slider-card>
                  <div className="pcb-board-slider-image">
                    {imgSrc ? (
                      <img src={imgSrc} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <div className="pcb-board-slider-image-placeholder">{placeholder}</div>
                    )}
                  </div>

                  <div className="pcb-board-slider-meta">
                    <h3>{item.image_title}</h3>
                    <svg className="pcb-board-slider-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button type="button" className="pcb-board-slider-control" aria-label="Previous" onClick={onPrev}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button type="button" className="pcb-board-slider-control" aria-label="Next" onClick={onNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .pcb-board-slider-viewport {
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 10px 0 26px;
          margin: 0 -24px;
          padding-left: 24px;
          padding-right: 24px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
        }

        .pcb-board-slider-viewport::-webkit-scrollbar {
          display: none;
        }

        .pcb-board-slider-track {
          display: flex;
          gap: 20px;
          min-width: 100%;
        }

        .pcb-board-slider-card {
          flex: 0 0 calc(25% - 15px);
          min-width: 280px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .pcb-board-slider-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
          border-color: #cbd5e1;
        }

        .pcb-board-slider-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f0f2f5;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pcb-board-slider-image img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 16px;
        }

        .pcb-board-slider-image-placeholder {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 500;
          text-align: center;
          padding: 20px;
          line-height: 1.4;
        }

        .pcb-board-slider-meta {
          padding: 22px 18px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .pcb-board-slider-meta h3 {
          font-size: 15px;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
        }

        .pcb-board-slider-arrow {
          width: 16px;
          height: 16px;
          color: #94a3b8;
          margin-top: 2px;
          flex-shrink: 0;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .pcb-board-slider-card:hover .pcb-board-slider-arrow {
          color: #f25537;
          transform: translateX(3px) rotate(-45deg);
        }

        .pcb-board-slider-control {
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: #f0f2f5;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .pcb-board-slider-control:hover {
          background: #f25537;
          border-color: #f25537;
          color: #ffffff;
          transform: translateY(-1px);
        }

        .pcb-board-slider-control svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 1200px) {
          .pcb-board-slider-card {
            flex-basis: calc(33.333% - 14px);
          }
        }

        @media (max-width: 768px) {
          .pcb-board-slider-card {
            flex-basis: calc(50% - 10px);
          }
        }

        @media (max-width: 480px) {
          .pcb-board-slider-card {
            flex-basis: 82%;
          }
        }
      `}</style>
    </section>
  );
}
