import React from 'react';

import type { EmsHomeIndustryContent } from '../../types/ems-home';
import { getAssetPath, getHref } from '../../lib/assets';

const orangeIconFilter =
  'brightness(0) saturate(100%) invert(43%) sepia(75%) saturate(2369%) hue-rotate(336deg) brightness(98%) contrast(93%)';
const whiteIconFilter = 'brightness(0) invert(1)';

export function IndustrySection({ data }: { data: EmsHomeIndustryContent }) {
  const [activeId, setActiveId] = React.useState<string>(data.items[0]?.tab.id ?? '');

  const active = data.items.find((x) => x.tab.id === activeId) ?? data.items[0];
  if (!active) return null;

  const activeImageSrc = active.card.image_url ? getAssetPath(active.card.image_url) : '';

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[1399px] px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{data.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">{data.description}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-3">
            {data.items.map((item) => {
              const isActive = item.tab.id === activeId;
              const tabIconSrc = item.tab.icon_url ? getAssetPath(item.tab.icon_url) : '';
              return (
                <button
                  key={item.tab.id}
                  type="button"
                  onClick={() => setActiveId(item.tab.id)}
                  className={[
                    'flex w-full items-center gap-4 rounded-[15px] px-5 py-4 text-left transition',
                    isActive
                      ? 'bg-[#ea543f] shadow-[0_11px_16px_-3px_rgba(234,84,63,0.20),0_4px_6px_-4px_rgba(234,84,63,0.20)]'
                      : 'border border-slate-200 bg-[#f9fafb] hover:bg-white'
                  ].join(' ')}
                >
                  <span className={['flex h-[51px] w-[51px] items-center justify-center rounded-[11px]', isActive ? 'bg-white/20' : 'bg-white'].join(' ')}>
                    {tabIconSrc ? (
                      <img
                        src={tabIconSrc}
                        alt=""
                        className="h-[26px] w-[26px]"
                        style={{ filter: isActive ? whiteIconFilter : orangeIconFilter }}
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

          <div className="overflow-hidden rounded-[15px] bg-[#e3e2e7] p-8 sm:p-9">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_450px] lg:items-start">
              <div>
                <h3 className="text-[26px] font-semibold leading-10 tracking-[0.4px] text-slate-900">{active.card.title}</h3>
                <p className="mt-6 text-[17px] leading-[26px] text-slate-600">{active.card.description.paragraph}</p>

                <ul className="mt-10 space-y-3">
                  {active.card.description.list.map((text, idx) => (
                    <li key={`${text}-${idx}`} className="flex items-start gap-3 text-[19px] leading-[30px] text-slate-700">
                      <span className="mt-[11px] h-[6px] w-[6px] flex-none rounded-full bg-[#ea543f]" />
                      <span className="min-w-0">{text}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getHref(active.card.cta.href)}
                  className="mt-10 inline-flex items-center justify-center gap-3 rounded-[11px] bg-[#ea543f] px-9 py-4 text-[19px] font-medium leading-[30px] text-white shadow-[0_11px_16px_-3px_rgba(234,84,63,0.25),0_4px_6px_-4px_rgba(234,84,63,0.25)] transition hover:bg-[#d84c39] focus:outline-none focus:ring-2 focus:ring-[#ea543f]/50 focus:ring-offset-2"
                >
                  <span className="text-white">{active.card.cta.label}</span>
                  <img
                    src={getAssetPath('/icons/industry/moccppwi-o23suxz.svg')}
                    alt=""
                    className="h-[21px] w-[21px]"
                    style={{ filter: whiteIconFilter }}
                  />
                </a>
              </div>

              {activeImageSrc ? (
                <img src={activeImageSrc} alt="" className="h-[450px] w-[450px] rounded-[20px] object-cover" />
              ) : (
                <div className="h-[450px] w-[450px] rounded-[20px] bg-white/60" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
