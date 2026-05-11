import React from 'react';

import type { EmsHomeQualityContent } from '../../types/ems-home';
import { getAssetPath } from '../../lib/assets';

export function QualityControlSection({ data }: { data: EmsHomeQualityContent }) {
  const [activeTabId, setActiveTabId] = React.useState<string>(data.tabs[0]?.id ?? '');

  const activeTab = data.tabs.find((tab) => tab.id === activeTabId) ?? data.tabs[0];

  if (!activeTab) return null;

  return (
    <section className="bg-[#F5F5F5] py-16 sm:py-20">
      <div className="mx-auto max-w-[1411px] px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {data.description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl bg-[#e3e2e7] p-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {data.tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              const iconUrl = getAssetPath(tab.icon_url);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTabId(tab.id)}
                  className={[
                    'flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition',
                    isActive ? 'bg-[#ea543f] text-white' : 'text-slate-900 hover:bg-white/70'
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 bg-current"
                    style={{
                      WebkitMaskImage: `url(${iconUrl})`,
                      maskImage: `url(${iconUrl})`,
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      WebkitMaskSize: 'contain',
                      maskSize: 'contain'
                    }}
                  />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)]">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full aspect-[8/5] lg:w-[800px] lg:shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getAssetPath(activeTab.content.left.image_url)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ea543f] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                    <img src={getAssetPath(activeTab.content.left.icon_url)} alt="" className="h-8 w-8" />
                  </div>
                  <div className="pt-1">
                    <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {activeTab.content.left.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-white/90">
                      {activeTab.content.left.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 items-center">
              <div className="w-full p-6 sm:p-8">
                {activeTab.content.functions.map((fn, idx) => (
                  <React.Fragment key={`${fn.name}-${idx}`}>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ea543f]/10 text-[#ea543f]">
                        <img src={getAssetPath(fn.icon_url)} alt="" className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-6 text-slate-900">{fn.name}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{fn.description}</p>
                      </div>
                    </div>
                    {idx < activeTab.content.functions.length - 1 && (
                      <div className="my-6 h-px bg-[#E2E8F0]" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.advantages.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="rounded-xl border border-[#e3e2e7] bg-[#e3e2e7] px-6 py-4 text-center"
            >
              <p className="text-xl font-semibold tracking-tight text-[#ea543f]">{item.title}</p>
              <p className="mt-1 text-xs text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
