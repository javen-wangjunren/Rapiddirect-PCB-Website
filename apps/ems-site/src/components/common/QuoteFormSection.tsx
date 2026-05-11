import React from 'react';

import { env } from '../../lib/env';
import { getAssetPath } from '../../lib/assets';

type FieldConfig = {
  label: string;
  placeholder: string;
  required: boolean;
};

type QuoteFormContent = {
  title: string;
  description: string;
  background_image_url: string;
  name_field: FieldConfig;
  company_field: FieldConfig;
  email_field: FieldConfig;
  phone_field: FieldConfig;
  message_field: FieldConfig;
  upload: {
    label: string;
    optional_text: string;
    button_text: string;
    help_text: string;
  };
  submit_label: string;
};

export function QuoteFormSection({ data }: { data: QuoteFormContent }) {
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [fileName, setFileName] = React.useState<string>('');

  React.useEffect(() => {
    const existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData(formRef.current);
      const endpoint = env.contactEndpoint ?? '/api/contact';

      const res = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
      }

      setStatus('success');
      formRef.current.reset();
      setFileName('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-slate-50" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${getAssetPath(data.background_image_url)})` }}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-black/85" />

      <div className="relative mx-auto w-full max-w-3xl px-6">
        <div className="rounded-2xl bg-white px-6 py-10 shadow-[0_30px_60px_rgba(0,0,0,0.15)] sm:px-12">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              {data.title}
            </h2>
            <p className="mt-3 text-sm text-slate-600">{data.description}</p>
          </div>

          <form ref={formRef} onSubmit={onSubmit} className="mt-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-slate-900">
                  {data.name_field.label}{' '}
                  {data.name_field.required && <span className="text-[#ef533f]">*</span>}
                </label>
                <input
                  name="name"
                  required={data.name_field.required}
                  placeholder={data.name_field.placeholder}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ef533f] focus:ring-4 focus:ring-[#ef533f]/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900">
                  {data.company_field.label}{' '}
                  {data.company_field.required && <span className="text-[#ef533f]">*</span>}
                </label>
                <input
                  name="company"
                  required={data.company_field.required}
                  placeholder={data.company_field.placeholder}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ef533f] focus:ring-4 focus:ring-[#ef533f]/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900">
                  {data.email_field.label}{' '}
                  {data.email_field.required && <span className="text-[#ef533f]">*</span>}
                </label>
                <input
                  name="email"
                  type="email"
                  required={data.email_field.required}
                  placeholder={data.email_field.placeholder}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ef533f] focus:ring-4 focus:ring-[#ef533f]/10"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-900">
                  {data.phone_field.label}{' '}
                  {data.phone_field.required && <span className="text-[#ef533f]">*</span>}
                </label>
                <input
                  name="phone"
                  type="tel"
                  required={data.phone_field.required}
                  placeholder={data.phone_field.placeholder}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ef533f] focus:ring-4 focus:ring-[#ef533f]/10"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-xs font-bold text-slate-900">
                {data.message_field.label}{' '}
                {data.message_field.required && <span className="text-[#ef533f]">*</span>}
              </label>
              <textarea
                name="message"
                required={data.message_field.required}
                placeholder={data.message_field.placeholder}
                className="mt-2 min-h-[120px] w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#ef533f] focus:ring-4 focus:ring-[#ef533f]/10"
              />
            </div>

            <div className="mt-6">
              <label className="text-xs font-bold text-slate-900">
                {data.upload.label}{' '}
                <span className="font-medium text-slate-500">{data.upload.optional_text}</span>
              </label>

              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-[#ef533f] hover:bg-[#fff0ed]">
                <input
                  type="file"
                  name="attachment"
                  className="hidden"
                  onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
                />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#ef533f]">
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 8l-5-5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 3v12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-900">
                  {fileName ? fileName : data.upload.button_text}
                </span>
                <span className="text-xs text-slate-600">{data.upload.help_text}</span>
              </label>
            </div>

            {env.turnstileSiteKey && (
              <div className="mt-6 flex justify-center">
                <div className="cf-turnstile" data-sitekey={env.turnstileSiteKey} />
              </div>
            )}

            {status === 'success' && (
              <p className="mt-4 text-sm font-medium text-emerald-700">
                Submitted successfully. We will contact you ASAP.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm font-medium text-red-700">
                {errorMessage || 'Submission failed.'}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-8 w-full rounded-lg bg-[#ef533f] px-6 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(239,83,63,0.20)] transition hover:bg-[#d64734] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Submitting...' : data.submit_label}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
