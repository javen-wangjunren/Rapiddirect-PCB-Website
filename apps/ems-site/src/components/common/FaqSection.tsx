import React from 'react';

import type { EmsHomeFaqContent } from '../../types/ems-home';

export function FaqSection({ data }: { data: EmsHomeFaqContent }) {
  const [openIndex, setOpenIndex] = React.useState<number>(0);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
          <div className="pt-2">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {data.title}
              <span className="ml-3 inline-block h-0.5 w-10 bg-[#ea543f] align-middle" />
            </h2>
          </div>

          <div className="space-y-3">
            {data.items.map((item, idx) => {
              const isOpen = idx === openIndex;
              return (
                <div key={`${item.question}-${idx}`} className="rounded-xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold leading-6 text-slate-900">
                      {item.question}
                    </span>
                    <span
                      className={[
                        'flex h-8 w-8 items-center justify-center rounded-full text-[#ea543f] transition',
                        isOpen ? 'rotate-180' : ''
                      ].join(' ')}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                        <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm leading-6 text-slate-600">{item.answer}</p>
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
