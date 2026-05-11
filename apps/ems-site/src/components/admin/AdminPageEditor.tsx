import { useEffect, useMemo, useRef, useState } from 'react';

import { emsHomeDefaults } from '../../content/defaults/ems';
import { pcbAssemblyDefaults } from '../../content/defaults/pcb-assembly';
import { normalizeEmsHomeContentJson } from '../../content/normalize/ems';
import { normalizePcbAssemblyContentJson } from '../../content/normalize/pcb-assembly';
import { emsHomeSchema } from '../../content/schemas/ems';
import { pcbAssemblySchema } from '../../content/schemas/pcb-assembly';
import { getAssetPath } from '../../lib/assets';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { getPageBundleBySlugForAdmin, saveAdminBundle } from '../../lib/supabase/adminQueries';
import type { TemplateType } from '../../types/page';
import type { JsonValue } from '../../utils/jsonTree';
import { deepMerge, isObject } from '../../utils/jsonTree';
import EmsEditorContentModules from './EmsEditorContentModules';
import PcbAssemblyEditorContentModules from './PcbAssemblyEditorContentModules';
import EmsEditorSeoCard, { type SeoDraft } from './EmsEditorSeoCard';
import { EditorTemplate } from './templates/EditorTemplate';
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardTitle, ConfirmDialog, Input, Select, Tabs, ToastProvider, useToast } from './ui';

type LoadState = 'loading' | 'ready' | 'error';

export interface AdminPageEditorProps {
  initialSlug: string;
}

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

export default function AdminPageEditor(props: AdminPageEditorProps) {
  return (
    <ToastProvider>
      <AdminPageEditorInner initialSlug={props.initialSlug} />
    </ToastProvider>
  );
}

type EditorTab = 'content' | 'seo' | 'settings';

function AdminPageEditorInner({ initialSlug }: AdminPageEditorProps) {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const { push } = useToast();

  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);

  const [pageId, setPageId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [slug, setSlug] = useState<string>(initialSlug);
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
  const [tab, setTab] = useState<EditorTab>('content');

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const beforeUnloadHandlerRef = useRef<((e: BeforeUnloadEvent) => void) | null>(null);

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

      const normalized = normalizeSlug(initialSlug);
      if (!normalized) {
        setLoadState('error');
        setLoadError('缺少 slug 参数');
        return;
      }

      const bundle = await getPageBundleBySlugForAdmin(supabase, normalized);
      if (cancelled) return;
      if (!bundle?.page) {
        setLoadState('error');
        setLoadError(`未找到 ${normalized} 对应的 pages 记录`);
        return;
      }

      setPageId(bundle.page.id);
      setTitle(bundle.page.title ?? '');
      setSlug(bundle.page.slug ?? normalized);
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
      const template = (bundle.page.template_type ?? 'ems_home') as TemplateType;
      if (template === 'ems_home') {
        const merged = deepMerge(emsHomeDefaults as any, (isObject(raw) ? raw : {}) as any) as JsonValue;
        setContentJson(normalizeEmsHomeContentJson(merged));
      } else if (template === 'pcb_assembly') {
        const merged = deepMerge(pcbAssemblyDefaults as any, (isObject(raw) ? raw : {}) as any) as JsonValue;
        setContentJson(normalizePcbAssemblyContentJson(merged));
      } else {
        const safeObj = isObject(raw) ? raw : {};
        setContentJson(safeObj as any);
      }

      setDirty(false);
      setLoadState('ready');
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase, initialSlug]);

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // `returnValue` is deprecated in TS DOM typings, but still required by browsers to trigger the native "Leave site?" dialog.
      (e as any).returnValue = '';
    };
    beforeUnloadHandlerRef.current = onBeforeUnload;
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
      if (beforeUnloadHandlerRef.current === onBeforeUnload) beforeUnloadHandlerRef.current = null;
    };
  }, [dirty]);

  const disableBeforeUnload = () => {
    const handler = beforeUnloadHandlerRef.current;
    if (!handler) return;
    window.removeEventListener('beforeunload', handler);
    beforeUnloadHandlerRef.current = null;
  };

  const normalizedSlug = normalizeSlug(slug);
  const canPublish = title.trim().length > 0 && normalizedSlug.length > 0;
  const previewHref = normalizedSlug || normalizeSlug(initialSlug) || '/ems/';

  const isEmsHome = templateType === 'ems_home';
  const isPcbAssembly = templateType === 'pcb_assembly';
  const hasSchema = isEmsHome || isPcbAssembly;

  const onContentKeyChange = (key: string, next: JsonValue) => {
    const obj = (isObject(contentJson) ? (contentJson as any) : {}) as Record<string, JsonValue>;
    setContentJson({ ...obj, [key]: next } as any);
    setDirty(true);
  };

  const onEmsHomeModuleChange = (key: keyof typeof emsHomeSchema, next: JsonValue) => {
    onContentKeyChange(String(key), next);
  };

  const onPcbAssemblyModuleChange = (key: keyof typeof pcbAssemblySchema, next: JsonValue) => {
    onContentKeyChange(String(key), next);
  };

  const doSave = async (nextStatus?: 'draft' | 'published') => {
    if (!supabase) return;
    if (!pageId) return;
    if (!title.trim() || !normalizedSlug) {
      push({ kind: 'error', message: '请先填写 Title 与 Slug' });
      return;
    }
    setSaving(true);
    const normalizedContent =
      templateType === 'ems_home'
        ? normalizeEmsHomeContentJson(contentJson)
        : templateType === 'pcb_assembly'
          ? normalizePcbAssemblyContentJson(contentJson)
          : contentJson;

    const res = await saveAdminBundle(supabase, {
      pageId,
      page: {
        title: title.trim(),
        slug: normalizedSlug,
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
      contentJson: normalizedContent
    });
    setSaving(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    if (nextStatus) setStatus(nextStatus);
    setDirty(false);
    push({ kind: 'success', message: nextStatus === 'published' ? '已发布' : '已保存' });
  };

  const onCopyPermalink = async () => {
    const permalink = previewHref;
    try {
      await navigator.clipboard.writeText(permalink);
      push({ kind: 'success', message: '已复制 Permalink' });
    } catch {
      push({ kind: 'error', message: '复制失败，请手动复制' });
    }
  };

  const onBack = () => {
    if (dirty) {
      setLeaveConfirmOpen(true);
      return;
    }
    window.location.assign(getAssetPath('/admin/pages/'));
  };

  if (loadState === 'loading') {
    return (
      <Card>
        <CardBody className="pt-[var(--admin-card-p)]">
          <div className="h-6 w-48 animate-pulse rounded-[var(--admin-radius-sm)] bg-[var(--admin-surface-muted)]" />
          <div className="mt-4 h-11 w-full animate-pulse rounded-[var(--admin-radius-sm)] bg-[var(--admin-surface-muted)]" />
          <div className="mt-3 h-9 w-2/3 animate-pulse rounded-[var(--admin-radius-sm)] bg-[var(--admin-surface-muted)]" />
        </CardBody>
      </Card>
    );
  }

  if (loadState === 'error') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardBody className="pt-[var(--admin-card-p)]">
          <div className="text-sm text-red-700">{loadError ?? '加载失败'}</div>
        </CardBody>
      </Card>
    );
  }

  const header = (
    <Card>
      <CardHeader>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Editing</CardTitle>
            <Badge variant={status === 'published' ? 'published' : 'draft'}>{status}</Badge>
            {dirty ? <span className="text-xs text-[var(--admin-fg-muted)]">未保存更改</span> : null}
          </div>
          <div className="mt-3">
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setDirty(true);
              }}
              placeholder="添加标题"
              className="h-[var(--admin-control-lg)] text-[var(--admin-text-lg)] font-semibold"
            />
          </div>
          <div className="mt-3 space-y-2">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Permalink</div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
              <Input value={previewHref} readOnly />
              <Button variant="secondary" onClick={() => void onCopyPermalink()}>
                Copy
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button variant="secondary" onClick={() => window.open(previewHref, '_blank', 'noreferrer')}>
            Preview
          </Button>
          <Button variant="secondary" loading={saving} disabled={!canPublish} onClick={() => void doSave('draft')}>
            Save Draft
          </Button>
          <Button variant="primary" loading={saving} disabled={!canPublish} onClick={() => void doSave('published')}>
            {status === 'published' ? 'Update' : 'Publish'}
          </Button>
        </div>
      </CardHeader>
    </Card>
  );

  const tabs = (
    <Tabs<EditorTab>
      items={[
        { value: 'content', label: 'Content' },
        { value: 'seo', label: 'SEO' },
        { value: 'settings', label: 'Settings' }
      ]}
      value={tab}
      onValueChange={setTab}
      ariaLabel="Editor Tabs"
    />
  );

  const sidebar = (
    <div className="sticky top-4 space-y-[var(--admin-stack-gap)]">
      <Card>
        <CardHeader>
          <CardTitle>Page Settings</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 pt-0">
          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Status</div>
            <Select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value as any);
                setDirty(true);
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
          </label>
          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Template</div>
            <Select
              value={templateType}
              onChange={(e) => {
                setTemplateType(e.target.value as any);
                setDirty(true);
              }}
            >
              <option value="ems_home">ems_home</option>
              <option value="ems_service">ems_service</option>
              <option value="pcb_assembly">pcb_assembly</option>
            </Select>
          </label>
        </CardBody>
        <CardFooter className="flex-col items-stretch justify-start gap-2">
          <Button variant="secondary" onClick={() => void doSave()} disabled={!canPublish} loading={saving}>
            Quick Save
          </Button>
          <Button variant="danger" onClick={() => push({ kind: 'info', message: '原型阶段不开放删除功能' })} disabled={saving}>
            Move to Trash
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const content = (() => {
    if (tab === 'seo') {
      return <EmsEditorSeoCard seo={seo} onSeoChange={(next) => (setSeo(next), setDirty(true))} pageTitle={title} slug={slug} />;
    }
    if (tab === 'settings') {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardBody className="space-y-4 pt-0">
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Path</div>
              <Input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setDirty(true);
                }}
                placeholder="/ems/xxx/"
              />
              <div className="mt-1 text-xs text-[var(--admin-fg-muted)]">保存时会自动补齐前后斜杠。</div>
            </label>
          </CardBody>
        </Card>
      );
    }

    // content tab
    if (isEmsHome) return <EmsEditorContentModules contentJson={contentJson} onModuleChange={onEmsHomeModuleChange} />;
    if (isPcbAssembly) return <PcbAssemblyEditorContentModules contentJson={contentJson} onModuleChange={onPcbAssemblyModuleChange} />;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 pt-0">
          <div className="text-sm text-[var(--admin-fg-muted)]">该模板暂无 schema 表单，当前暂不支持编辑。</div>
        </CardBody>
      </Card>
    );
  })();

  return (
    <>
      <EditorTemplate header={header} tabs={tabs} sidebar={sidebar}>
        <div className="space-y-[var(--admin-stack-gap)]">
          {content}
          <Card>
            <CardBody className="pt-[var(--admin-card-p)] text-sm text-[var(--admin-fg-muted)]">
              原型阶段：`ems_home` 与 `pcb_assembly` 支持 schema 表单；其他模板仍使用 JSON 编辑占位。
              {!hasSchema ? '（当前模板无 schema）' : null}
            </CardBody>
          </Card>
        </div>
      </EditorTemplate>

      <ConfirmDialog
        open={leaveConfirmOpen}
        onOpenChange={setLeaveConfirmOpen}
        title="离开页面？"
        description="当前有未保存更改，离开将丢失。"
        confirmText="仍要离开"
        cancelText="取消"
        intent="danger"
        onConfirm={() => {
          disableBeforeUnload();
          setDirty(false);
          window.location.assign(getAssetPath('/admin/pages/'));
        }}
      />
    </>
  );
}
