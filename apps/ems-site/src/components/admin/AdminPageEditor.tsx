import { useEffect, useMemo, useRef, useState } from 'react';

import { TEMPLATE_REGISTRY, TEMPLATE_OPTIONS, TEMPLATES_WITH_SCHEMA } from '../../registry/templateRegistry';
import { getAssetPath } from '../../lib/assets';
import { buildPublishedPageHref, canViewPublishedPage } from '../../lib/page-access';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { buildPreviewHref, isPreviewableTemplateType } from '../../lib/supabase/preview';
import { createPageForAdmin, deletePageForAdmin, duplicatePageForAdmin, getPageBundleBySlugForAdmin, saveAdminBundle } from '../../lib/supabase/adminQueries';
import type { TemplateType } from '../../types/page';
import type { JsonValue } from '../../utils/jsonTree';
import { deepMerge, isObject, pruneEmpty } from '../../utils/jsonTree';
import EmsEditorSeoCard, { type SeoDraft } from './EmsEditorSeoCard';
import { EditorTemplate } from './templates/EditorTemplate';
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, ConfirmDialog, Input, Select, Tabs, ToastProvider, useToast } from './ui';

type LoadState = 'loading' | 'ready' | 'error';

export interface AdminPageEditorProps {
  initialSlug: string;
  createIfMissing?: {
    title: string;
    template_type: TemplateType;
  };
}

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

const buildDuplicateTitle = (title: string, attempt: number) => {
  const baseTitle = title.trim() || 'Untitled';
  return attempt === 1 ? `${baseTitle} Copy` : `${baseTitle} Copy ${attempt}`;
};

const buildDuplicateSlug = (slug: string, attempt: number) => {
  const normalized = normalizeSlug(slug) || '/page/';
  const trimmed = normalized.slice(0, -1);
  const lastSlashIndex = trimmed.lastIndexOf('/');
  const parentPath = lastSlashIndex >= 0 ? trimmed.slice(0, lastSlashIndex + 1) : '/';
  const basename = trimmed.slice(lastSlashIndex + 1) || 'page';
  const suffix = attempt === 1 ? '-copy' : `-copy-${attempt}`;
  return normalizeSlug(`${parentPath}${basename}${suffix}`);
};

export default function AdminPageEditor(props: AdminPageEditorProps) {
  return (
    <ToastProvider>
      <AdminPageEditorInner initialSlug={props.initialSlug} createIfMissing={props.createIfMissing} />
    </ToastProvider>
  );
}

type EditorTab = 'content' | 'seo' | 'settings';

function AdminPageEditorInner({ initialSlug, createIfMissing }: AdminPageEditorProps) {
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
    noindex: false,
    service_schema: {}
  });

  const [contentJson, setContentJson] = useState<JsonValue>({} as JsonValue);
  const [tab, setTab] = useState<EditorTab>('content');
  const scrollByTabRef = useRef<Record<EditorTab, number>>({ content: 0, seo: 0, settings: 0 });

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState(false);
  const [lastSavedMessage, setLastSavedMessage] = useState('');

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
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

      let bundle = await getPageBundleBySlugForAdmin(supabase, normalized);
      if (cancelled) return;
      if (!bundle?.page) {
        if (createIfMissing) {
          const created = await createPageForAdmin(supabase, {
            title: createIfMissing.title,
            slug: normalized,
            template_type: createIfMissing.template_type
          });
          if (cancelled) return;
          if (!created.ok) {
            setLoadState('error');
            setLoadError(created.message);
            return;
          }

          bundle = await getPageBundleBySlugForAdmin(supabase, normalized);
          if (cancelled) return;
        }

        if (!bundle?.page) {
          setLoadState('error');
          setLoadError(`未找到 ${normalized} 对应的 pages 记录`);
          return;
        }
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
        noindex: Boolean((bundle.seo as any)?.noindex),
        service_schema: (bundle.seo as any)?.service_schema ?? {}
      });

      const raw = (bundle.content?.content_json ?? {}) as any;
      const cleanedRaw = pruneEmpty(raw);
      const safeRaw = (isObject(cleanedRaw) ? cleanedRaw : {}) as any;
      const template = (bundle.page.template_type ?? 'ems_home') as TemplateType;
      const config = TEMPLATE_REGISTRY[template];
      if (config) {
        const merged = deepMerge(config.defaults as any, safeRaw as any) as JsonValue;
        setContentJson(config.normalize(merged));
      } else {
        setContentJson(safeRaw as any);
      }

      setDirty(false);
      setLastSavedMessage(bundle.page.status === 'published' ? '已发布并同步' : '草稿已保存');
      setLoadState('ready');
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase, initialSlug, createIfMissing]);

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

  useEffect(() => {
    const el = document.querySelector('[data-admin-scroll-container]');
    if (!(el instanceof HTMLElement)) return;
    const y = scrollByTabRef.current[tab] ?? 0;
    requestAnimationFrame(() => {
      el.scrollTop = y;
    });
  }, [tab]);

  const disableBeforeUnload = () => {
    const handler = beforeUnloadHandlerRef.current;
    if (!handler) return;
    window.removeEventListener('beforeunload', handler);
    beforeUnloadHandlerRef.current = null;
  };

  const normalizedSlug = normalizeSlug(slug);
  const canPublish = title.trim().length > 0 && normalizedSlug.length > 0;
  const permalink = normalizedSlug || normalizeSlug(initialSlug) || '/ems/';
  const previewEnabled = isPreviewableTemplateType(templateType);
  const publishedPageVisible = canViewPublishedPage({
    slug: permalink,
    status,
    templateType
  });
  const publishedPageHref = publishedPageVisible ? buildPublishedPageHref(permalink) : '';
  const previewHelpText = previewEnabled ? '' : '当前模板暂不支持独立整页预览';
  const headerStatusText = duplicating
    ? '正在复制页面...'
    : deleting
      ? '正在删除页面...'
      : saving
        ? '正在保存...'
        : dirty
          ? '未保存更改'
          : lastSavedMessage || (status === 'published' ? '已发布并同步' : '草稿已保存');
  const saveDraftLabel = status === 'published' ? 'Move to Draft' : 'Save Draft';
  const publishLabel = status === 'published' ? 'Update Published' : 'Publish';

  const hasSchema = TEMPLATES_WITH_SCHEMA.includes(templateType);

  const onContentKeyChange = (key: string, next: JsonValue) => {
    const obj = (isObject(contentJson) ? (contentJson as any) : {}) as Record<string, JsonValue>;
    setContentJson({ ...obj, [key]: next } as any);
    setDirty(true);
  };

  const onModuleChange = (key: string, next: JsonValue) => {
    onContentKeyChange(key, next);
  };

  const onContentReplace = (next: JsonValue) => {
    setContentJson(next);
    setDirty(true);
  };

  const doSave = async (nextStatus?: 'draft' | 'published') => {
    if (!supabase) return;
    if (!pageId) return;
    if (!title.trim() || !normalizedSlug) {
      push({ kind: 'error', message: '请先填写 Title 与 Slug' });
      return;
    }
    setSaving(true);
    const normalizedContent = TEMPLATE_REGISTRY[templateType]?.normalize?.(contentJson) ?? contentJson;

    const cleanedContent = pruneEmpty(normalizedContent);
    const safeContent = isObject(cleanedContent) ? cleanedContent : {};

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
        noindex: seo.noindex,
        service_schema: seo.service_schema
      },
      contentJson: safeContent
    });
    setSaving(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    if (nextStatus) setStatus(nextStatus);
    setDirty(false);
    const savedMessage = nextStatus === 'published' ? '已发布并同步' : nextStatus === 'draft' ? '草稿已保存' : '更改已保存';
    setLastSavedMessage(savedMessage);
    push({ kind: 'success', message: savedMessage });
  };

  const doDelete = async () => {
    if (!supabase) return;
    if (!pageId) return;
    setDeleting(true);
    const res = await deletePageForAdmin(supabase, pageId);
    setDeleting(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    disableBeforeUnload();
    setDirty(false);
    setLastSavedMessage('');
    push({ kind: 'success', message: '已删除页面' });
    window.location.assign(getAssetPath('/admin/pages/'));
  };

  const doDuplicate = async () => {
    if (!supabase || !pageId) return;

    setDuplicating(true);
    const normalizedContent = TEMPLATE_REGISTRY[templateType]?.normalize?.(contentJson) ?? contentJson;
    const cleanedContent = pruneEmpty(normalizedContent);
    const safeContent = isObject(cleanedContent) ? cleanedContent : {};

    let targetSlug = '';
    let targetTitle = '';
    let duplicateResult: Awaited<ReturnType<typeof duplicatePageForAdmin>> | null = null;

    for (let attempt = 1; attempt <= 20; attempt += 1) {
      targetSlug = buildDuplicateSlug(normalizedSlug || initialSlug || '/page/', attempt);
      targetTitle = buildDuplicateTitle(title, attempt);
      const existing = await getPageBundleBySlugForAdmin(supabase, targetSlug);
      if (existing?.page) continue;

      duplicateResult = await duplicatePageForAdmin(supabase, {
        title: targetTitle,
        slug: targetSlug,
        template_type: templateType,
        seo: {
          meta_title: seo.meta_title,
          meta_description: seo.meta_description,
          canonical_url: '',
          og_title: seo.og_title,
          og_description: seo.og_description,
          og_image: seo.og_image,
          noindex: seo.noindex,
          service_schema: seo.service_schema
        },
        contentJson: safeContent
      });

      if (duplicateResult.ok || !/duplicate|unique/i.test(duplicateResult.message)) break;
      duplicateResult = null;
    }

    setDuplicating(false);

    if (!duplicateResult?.ok) {
      push({ kind: 'error', message: duplicateResult?.message ?? '复制页面失败，请稍后重试' });
      return;
    }

    push({ kind: 'success', message: `已创建副本：${targetTitle}` });
    disableBeforeUnload();
    setDirty(false);
    window.location.assign(getAssetPath(`/admin/pages/edit/?slug=${encodeURIComponent(targetSlug)}`));
  };

  const onCopyPermalink = async () => {
    try {
      await navigator.clipboard.writeText(permalink);
      push({ kind: 'success', message: '已复制 Permalink' });
    } catch {
      push({ kind: 'error', message: '复制失败，请手动复制' });
    }
  };

  const onPreview = async () => {
    if (!supabase) {
      push({ kind: 'error', message: '预览不可用：Supabase 未初始化' });
      return;
    }
    if (!previewEnabled) {
      push({ kind: 'error', message: previewHelpText });
      return;
    }
    if (!pageId) {
      push({ kind: 'error', message: '预览失败：页面尚未初始化' });
      return;
    }

    const previewWindow = window.open('', '_blank');
    if (!previewWindow || previewWindow.closed) {
      push({ kind: 'error', message: '浏览器拦截了新窗口，请允许弹窗后重试' });
      return;
    }

    try {
      previewWindow.opener = null;
    } catch {}
    previewWindow.document.title = 'Opening preview...';
    previewWindow.document.body.innerHTML =
      '<p style="font-family: sans-serif; padding: 24px;">Preparing preview...</p>';

    try {
      const sessionRes = await supabase.auth.getSession();
      const accessToken = sessionRes.data.session?.access_token?.trim();
      if (!accessToken) {
        previewWindow.close();
        push({ kind: 'error', message: '预览失败：请重新登录后台后再试' });
        return;
      }

      const sessionRes2 = await fetch(getAssetPath('/api/admin/preview-access/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify({ pageId, accessToken })
      });

      if (!sessionRes2.ok) {
        previewWindow.close();
        push({ kind: 'error', message: '预览失败：无法建立预览授权' });
        return;
      }

      const targetUrl = new URL(buildPreviewHref(pageId), window.location.origin);
      previewWindow.location.href = targetUrl.toString();
    } catch {
      previewWindow.close();
      push({ kind: 'error', message: '预览失败：请稍后重试' });
    }
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
      <CardHeader className="flex-col gap-4 min-[960px]:flex-row">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Editing</CardTitle>
            <Badge variant={status === 'published' ? 'published' : 'draft'}>{status}</Badge>
            <span className="text-xs text-[var(--admin-fg-muted)]">{headerStatusText}</span>
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
              <Input value={permalink} readOnly />
              <Button variant="secondary" onClick={() => void onCopyPermalink()}>
                Copy
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 self-stretch min-[960px]:self-start">
          {publishedPageVisible ? (
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                window.open(publishedPageHref, '_blank', 'noopener,noreferrer');
              }}
            >
              View Live
            </Button>
          ) : null}
          <Button variant="secondary" disabled={!previewEnabled} onClick={() => void onPreview()}>
            Preview
          </Button>
          <Button variant="secondary" loading={saving} disabled={!canPublish} onClick={() => void doSave('draft')}>
            {saveDraftLabel}
          </Button>
          <Button variant="primary" loading={saving} disabled={!canPublish} onClick={() => void doSave('published')}>
            {publishLabel}
          </Button>
          <details className="relative">
            <summary className="inline-flex h-[var(--admin-control-md)] cursor-pointer list-none items-center justify-center rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 text-sm font-medium text-[var(--admin-fg)] shadow-[var(--admin-shadow-sm)] transition hover:bg-[var(--admin-surface-muted)] [&::-webkit-details-marker]:hidden">
              More
            </summary>
            <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] py-1 shadow-[var(--admin-shadow-md)]">
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!pageId || saving || deleting || duplicating}
                onClick={(e) => {
                  (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
                  void doDuplicate();
                }}
              >
                {duplicating ? 'Duplicating...' : 'Duplicate Page'}
              </button>
              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-sm text-[var(--admin-danger)] hover:bg-[var(--admin-surface-muted)] disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!pageId || saving || deleting || duplicating}
                onClick={(e) => {
                  (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
                  setDeleteConfirmOpen(true);
                }}
              >
                Delete Page
              </button>
            </div>
          </details>
        </div>
        {!previewEnabled ? <div className="mt-2 text-xs text-[var(--admin-fg-muted)]">{previewHelpText}</div> : null}
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
      onValueChange={(next) => {
        const el = document.querySelector('[data-admin-scroll-container]');
        if (el instanceof HTMLElement) scrollByTabRef.current[tab] = el.scrollTop;
        setTab(next);
      }}
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
              {TEMPLATE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </label>
          <div className="rounded-[var(--admin-radius-sm)] bg-[var(--admin-primary-soft)] px-3 py-2 text-xs text-[var(--admin-fg-muted)]">
            所有更改统一通过顶部操作栏保存与发布，不再提供局部保存入口。
          </div>
        </CardBody>
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
    const Editor = TEMPLATE_REGISTRY[templateType]?.ContentEditor;
    if (Editor) {
      return <Editor contentJson={contentJson} onModuleChange={onModuleChange} onContentReplace={onContentReplace} />;
    }
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
              原型阶段：`ems_home`、`components_sourcing`、`pcb_board_manufacturing`、`pcb_assembly`、`pcb_design`、`pcb_manufacturing`、`site_inquiry_form`、`site_footer`、`site_header` 支持
              schema 表单；其他模板仍使用 JSON 编辑占位。
              {!hasSchema ? '（当前模板无 schema）' : null}
            </CardBody>
          </Card>
        </div>
      </EditorTemplate>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="删除页面？"
        description={`将永久删除 “${title || 'Untitled'}” (${permalink})，并同步删除内容与 SEO。该操作不可撤销。`}
        confirmText="删除"
        cancelText="取消"
        intent="danger"
        loading={deleting}
        onConfirm={async () => {
          setDeleteConfirmOpen(false);
          await doDelete();
        }}
      />
    </>
  );
}
