import { useMemo, useState } from 'react';

import { getAssetPath, getSupabaseImageUrl, isLikelyImageUrl } from '../../lib/assets';
import type { PcbProcessContent } from '../../types/pcb-process';

type Props = {
  data: PcbProcessContent;
};

export function PcbProcessSection(props: Props) {
  const stages = props.data.stages ?? [];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = useMemo(() => stages[activeIndex] ?? stages[0] ?? null, [stages, activeIndex]);

  if (!activeStage) return null;

  const rawImageSrc = activeStage.image_url ? getAssetPath(activeStage.image_url) : '';
  const imageSrc = rawImageSrc ? getSupabaseImageUrl(rawImageSrc, { width: 1200, quality: 75 }) : '';

  return (
    <section className="bg-[#f8f9fa] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.5px] text-[#1a1a1a]">{props.data.title}</h2>
          <p className="mt-4 text-base leading-7 text-[#666666]">{props.data.desc}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#eaeaea] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]">
          <div className="border-b border-[#eaeaea] bg-[#fcfcfc]">
            <div className="p-4 sm:hidden">
              <label className="sr-only" htmlFor="pcb-process-stage">
                Process Stage
              </label>
              <select
                id="pcb-process-stage"
                className="w-full rounded-lg border border-[#eaeaea] bg-white px-3 py-2 text-sm font-semibold text-[#1a1a1a] shadow-sm outline-none ring-[#ef533f]/20 focus:ring-2"
                value={String(activeIndex)}
                onChange={(e) => setActiveIndex(Number(e.target.value))}
              >
                {stages.map((stage, idx) => (
                  <option key={`${stage.stage_name}-${idx}`} value={String(idx)}>
                    {stage.stage_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="hidden sm:flex">
              {stages.map((stage, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={`${stage.stage_name}-${idx}`}
                    type="button"
                    className={`relative flex-1 px-4 py-4 text-center text-sm font-semibold transition ${
                      active ? 'bg-white text-[#ef533f]' : 'text-[#666666] hover:text-[#ef533f]'
                    }`}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {stage.stage_name}
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] w-full ${active ? 'bg-[#ef533f]' : 'bg-transparent'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-10 p-10 lg:grid-cols-[1.2fr_1fr]">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#eaeaea] bg-[#f3f4f6] shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
                {imageSrc && isLikelyImageUrl(imageSrc) ? (
                  <img
                    src={imageSrc}
                    srcSet={`${getSupabaseImageUrl(rawImageSrc, { width: 600, quality: 75 })} 600w, ${getSupabaseImageUrl(rawImageSrc, { width: 900, quality: 75 })} 900w, ${getSupabaseImageUrl(rawImageSrc, { width: 1200, quality: 75 })} 1200w, ${getSupabaseImageUrl(rawImageSrc, { width: 1600, quality: 80 })} 1600w`}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#94a3b8]">[ Image ]</div>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit rounded-md bg-[#fff1ef] px-3 py-1 text-xs font-bold uppercase tracking-[0.4px] text-[#ef533f]">
                {activeStage.stage_name}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#1a1a1a]">{activeStage.process_name}</h3>

              <ul className="mt-5 space-y-3">
                {activeStage.process_desc.map((item, idx) => (
                  <li key={`${item}-${idx}`} className="flex gap-3 text-sm leading-6 text-[#666666]">
                    <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#ef533f] text-[11px] font-bold text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-lg border border-[#eaeaea] bg-[#f8f9fa] px-5 py-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]">
                <div className="text-sm font-semibold text-[#1a1a1a]">{activeStage.expert_advice.title}</div>
                <p className="mt-2 text-sm leading-6 text-[#666666]">{activeStage.expert_advice.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
