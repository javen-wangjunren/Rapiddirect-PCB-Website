import { useEffect, useMemo, useState } from 'react';

import { emsHomeDefaults } from '../../content/defaults/ems';
import { emsHomeSchema } from '../../content/schemas/ems';
import { normalizeEmsHomeContentJson } from '../../content/normalize/ems';
import { getAssetPath } from '../../lib/assets';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { getPageBundleBySlugForAdmin, saveAdminBundle } from '../../lib/supabase/adminQueries';
import type { TemplateType } from '../../types/page';
import type { JsonValue } from '../../utils/jsonTree';
import { deepMerge, isObject } from '../../utils/jsonTree';
import EmsEditorContentModules from './EmsEditorContentModules';
import EmsEditorHeader from './EmsEditorHeader';
import EmsEditorPublishSidebar from './EmsEditorPublishSidebar';
import EmsEditorSeoCard, { type SeoDraft } from './EmsEditorSeoCard';

type LoadState = 'loading' | 'ready' | 'error';

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

export default function EmsPageEditor() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);

  const [pageId, setPageId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('/ems/');
  const [templateType, setTemplateType] = useState<TemplateType>('ems_home');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [seo, setSeo] = useState<SeoDraft>({
    meta_title: '',
    meta_description: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    noindex: false
  });

  const [contentJson, setContentJson] = useState<JsonValue>(deepMerge(emsHomeDefaults as any, {} as any) as JsonValue);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ kind: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!supabase) {
        setLoadState('error');
        setLoadError('缺少 PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY 环境变量');
        return;
      }

      const sessionRes = await supabase.auth.getSession();
      if (cancelled) return;
      if (!sessionRes.data.session) {
        window.location.assign(getAssetPath('/login/'));
        return;
      }

      const bundle = await getPageBundleBySlugForAdmin(supabase, '/ems/');
      if (cancelled) return;
      if (!bundle?.page) {
        setLoadState('error');
        setLoadError('未找到 /ems/ 对应的 pages 记录');
        return;
      }

      setPageId(bundle.page.id);
      setTitle(bundle.page.title ?? '');
      setSlug(bundle.page.slug ?? '/ems/');
      setTemplateType((bundle.page.template_type ?? 'ems_home') as TemplateType);
      setStatus((bundle.page.status as any) ?? 'draft');

      setSeo({
        meta_title: bundle.seo?.meta_title ?? '',
        meta_description: bundle.seo?.meta_description ?? '',
        canonical_url: bundle.seo?.canonical_url ?? '',
        og_title: bundle.seo?.og_title ?? '',
        og_description: bundle.seo?.og_description ?? '',
        og_image: bundle.seo?.og_image ?? '',
        noindex: Boolean((bundle.seo as any)?.noindex)
      });

      const raw = (bundle.content?.content_json ?? {}) as any;
      const merged = deepMerge(emsHomeDefaults as any, (isObject(raw) ? raw : {}) as any) as JsonValue;
      setContentJson(normalizeEmsHomeContentJson(merged));

      setDirty(false);
      setLoadState('ready');
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const canPublish = title.trim().length > 0 && normalizeSlug(slug).length > 0;
  const previewHref = normalizeSlug(slug) || '/ems/';

  const onTitleChange = (value: string) => {
    setTitle(value);
    setDirty(true);
  };

  const onSlugCommit = (value: string) => {
    setSlug(value);
    setDirty(true);
  };

  const onSeoChange = (next: SeoDraft) => {
    setSeo(next);
    setDirty(true);
  };

  const onStatusChange = (next: 'draft' | 'published') => {
    setStatus(next);
    setDirty(true);
  };

  const onTemplateTypeChange = (next: TemplateType) => {
    setTemplateType(next);
    setDirty(true);
  };

  const onModuleChange = (key: keyof typeof emsHomeSchema, next: JsonValue) => {
    const obj = (isObject(contentJson) ? (contentJson as any) : {}) as Record<string, JsonValue>;
    setContentJson({ ...obj, [key]: next } as any);
    setDirty(true);
  };

  const doSave = async (nextStatus?: 'draft' | 'published') => {
    if (!supabase) return;
    if (!pageId) return;
    const normalized = normalizeSlug(slug);
    if (!title.trim() || !normalized) {
      setToast({ kind: 'error', message: '请先填写 Title 与 Slug' });
      return;
    }
    setSaving(true);
    const res = await saveAdminBundle(supabase, {
      pageId,
      page: {
        title: title.trim(),
        slug: normalized,
        template_type: templateType,
        status: nextStatus ?? status
      },
      seo: {
        meta_title: seo.meta_title,
        meta_description: seo.meta_description,
        canonical_url: seo.canonical_url,
        og_title: seo.og_title,
        og_description: seo.og_description,
        og_image: seo.og_image,
        noindex: seo.noindex
      },
      contentJson: normalizeEmsHomeContentJson(contentJson)
    });
    setSaving(false);
    if (!res.ok) {
      setToast({ kind: 'error', message: res.message });
      return;
    }
    if (nextStatus) setStatus(nextStatus);
    setDirty(false);
    setToast({ kind: 'success', message: '已保存' });
  };

  if (loadState === 'loading') {
    return (
      <div className="rounded-md border border-[#dcdcde] bg-white p-6">
        <div className="h-6 w-40 animate-pulse rounded bg-[#f0f0f1]" />
        <div className="mt-4 h-9 w-full animate-pulse rounded bg-[#f0f0f1]" />
        <div className="mt-3 h-9 w-2/3 animate-pulse rounded bg-[#f0f0f1]" />
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {loadError ?? '加载失败'}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 min-[1200px]:grid-cols-[minmax(0,1fr)_320px]">
      <div className="min-w-0 space-y-4">
        <EmsEditorHeader
          title={title}
          onTitleChange={onTitleChange}
          slug={slug}
          onSlugCommit={onSlugCommit}
          dirty={dirty}
          saving={saving}
        />

        <EmsEditorContentModules contentJson={contentJson} onModuleChange={onModuleChange} />

        <EmsEditorSeoCard seo={seo} onSeoChange={onSeoChange} pageTitle={title} slug={slug} />

        <div className="rounded-md border border-[#dcdcde] bg-white px-4 py-3 text-sm text-[#646970]">
          本编辑器仅用于 EMS 页面内容管理；不包含 pcb-assembly 相关字段与模块。
        </div>
      </div>

      <div className="space-y-4">
        <div className="sticky top-4 space-y-4">
          <EmsEditorPublishSidebar
            status={status}
            onStatusChange={onStatusChange}
            templateType={templateType}
            onTemplateTypeChange={onTemplateTypeChange}
            previewHref={previewHref}
            saving={saving}
            canPublish={canPublish}
            onSaveDraft={() => void doSave('draft')}
            onPublish={() => void doSave('published')}
            onQuickSave={() => void doSave()}
            onTrash={() => setToast({ kind: 'error', message: '原型阶段不开放删除功能' })}
          />

          {toast ? (
            <div
              className={`rounded-md border px-4 py-3 text-sm ${
                toast.kind === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">{toast.message}</div>
                <button type="button" className="text-xs underline" onClick={() => setToast(null)}>
                  关闭
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
