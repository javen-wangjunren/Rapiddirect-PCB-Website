import { useEffect, useMemo, useState } from 'react';

import { getAssetPath } from '../../lib/assets';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import { createPageForAdmin, listPagesForAdminPaged, type AdminPageListItem } from '../../lib/supabase/adminQueries';
import type { TemplateType } from '../../types/page';
import { Badge, Button, Card, CardBody, Input, Modal, Pagination, Select, ToastProvider, useToast } from './ui';
import { cn } from './ui/cn';
import { ListTemplate } from './templates/ListTemplate';

type LoadState = 'loading' | 'ready' | 'error';

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

type StatusFilter = 'all' | 'published' | 'draft';

export default function AdminPagesIndex() {
  return (
    <ToastProvider>
      <AdminPagesIndexInner />
    </ToastProvider>
  );
}

function AdminPagesIndexInner() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const { push } = useToast();

  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [items, setItems] = useState<AdminPageListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [authed, setAuthed] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [createTitle, setCreateTitle] = useState('');
  const [createSlug, setCreateSlug] = useState('');
  const [createTemplateType, setCreateTemplateType] = useState<TemplateType>('ems_service');
  const [creating, setCreating] = useState(false);

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);
  const pageSize = 20;

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

      const params = new URLSearchParams(window.location.search);
      if (params.get('new') === '1') {
        setShowCreate(true);
      }
      setAuthed(true);
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const refresh = async () => {
    if (!supabase || !authed) return;
    setLoadState('loading');
    setLoadError(null);
    const status = statusFilter === 'all' ? undefined : statusFilter;
    const res = await listPagesForAdminPaged(supabase, { page, pageSize, status, query });
    if (!res.ok) {
      setLoadState('error');
      setLoadError(res.message);
      return;
    }

    const nextPageCount = Math.max(1, Math.ceil(res.total / pageSize));
    const safePage = Math.min(page, nextPageCount);
    if (safePage !== page) {
      setPage(safePage);
      return;
    }

    setItems(res.items);
    setTotal(res.total);
    setLoadState('ready');
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed, supabase, page, pageSize, query, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(total, start + pageSize);
  const pageItems = items;

  const empty =
    loadState === 'ready' && total === 0
      ? !query.trim() && statusFilter === 'all'
        ? {
            title: '还没有页面',
            description: '先创建一个 draft 页面，然后进入编辑器补全内容与 SEO。',
            action: (
              <Button variant="primary" onClick={() => setShowCreate(true)}>
                Add New Page
              </Button>
            )
          }
        : {
            title: '没有匹配的结果',
            description: '尝试清空关键词或切换状态筛选。',
            action: (
              <Button variant="secondary" onClick={() => setQuery('')}>
                清空搜索
              </Button>
            )
          }
      : undefined;

  const onCreate = async () => {
    if (!supabase) return;
    const normalized = normalizeSlug(createSlug);
    if (!createTitle.trim() || !normalized) {
      push({ kind: 'error', message: '请先填写 Title 与 Slug' });
      return;
    }
    setCreating(true);
    const res = await createPageForAdmin(supabase, {
      title: createTitle.trim(),
      slug: normalized,
      template_type: createTemplateType
    });
    setCreating(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    push({ kind: 'success', message: '页面已创建（draft）' });
    setCreateTitle('');
    setCreateSlug('');
    setShowCreate(false);
    await refresh();
    window.location.assign(getAssetPath(`/admin/pages/edit/?slug=${encodeURIComponent(normalized)}`));
  };

  return (
    <>
      <ListTemplate
        title="Pages"
        subtitle="管理 pages / seo_meta / page_content（原型）"
        primaryAction={
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            Add New Page
          </Button>
        }
        contentWrapper={false}
        filters={
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_220px]">
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">搜索</div>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索 title / slug"
                suffix={`${total}`}
              />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">状态</div>
              <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
                <option value="all">All</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </Select>
            </label>
          </div>
        }
        loading={loadState === 'loading'}
        error={loadState === 'error' ? loadError : null}
        onRetry={() => void refresh()}
        empty={empty}
        footer={
          total > pageSize ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-[var(--admin-fg-muted)]">
                {total === 0 ? '0' : `${start + 1}–${end}`} / {total}
              </div>
              {pageCount > 1 ? <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} /> : null}
            </div>
          ) : undefined
        }
      >
        <div className="space-y-3">
          {pageItems.map((item) => (
            <Card
              key={item.id}
              className={cn(
                'group',
                'transition',
                'hover:border-[var(--admin-fg-subtle)] hover:shadow-[var(--admin-shadow-sm)]'
              )}
            >
              <CardBody className="pt-[var(--admin-card-p)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        className="min-w-0 truncate text-sm font-semibold text-[var(--admin-fg)] hover:text-[var(--admin-primary)]"
                        href={getAssetPath(`/admin/pages/edit/?slug=${encodeURIComponent(item.slug)}`)}
                      >
                        {item.title}
                      </a>
                      <Badge variant={item.status === 'published' ? 'published' : 'draft'}>{item.status}</Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--admin-fg-muted)]">
                      <span className="font-mono text-[var(--admin-fg)]">{item.slug}</span>
                      <span className="text-[var(--admin-fg-subtle)]">·</span>
                      <span>{item.template_type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'hidden min-[1200px]:flex min-w-[170px] items-center justify-end gap-3 text-xs font-medium',
                        'opacity-0 pointer-events-none transition',
                        'group-hover:opacity-100 group-hover:pointer-events-auto',
                        'group-focus-within:opacity-100 group-focus-within:pointer-events-auto'
                      )}
                    >
                      <a
                        className="text-[var(--admin-primary)] hover:underline"
                        href={getAssetPath(`/admin/pages/edit/?slug=${encodeURIComponent(item.slug)}`)}
                      >
                        Edit
                      </a>
                      <a
                        className="text-[var(--admin-fg-muted)] hover:text-[var(--admin-fg)] hover:underline"
                        href={item.slug}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                      <button
                        type="button"
                        className="text-[var(--admin-fg-muted)] hover:text-[var(--admin-fg)] hover:underline"
                        onClick={() =>
                          void navigator.clipboard
                            .writeText(item.slug)
                            .then(() => push({ kind: 'success', message: '已复制 Path' }))
                            .catch(() => push({ kind: 'error', message: '复制失败，请手动复制' }))
                        }
                      >
                        Copy
                      </button>
                    </div>

                    <details className="relative inline-block min-[1200px]:hidden">
                      <summary
                        className={cn(
                          'inline-flex h-[var(--admin-control-sm)] w-[var(--admin-control-sm)] cursor-pointer list-none items-center justify-center rounded-[var(--admin-radius-sm)]',
                          'text-[var(--admin-fg-muted)] hover:bg-[var(--admin-surface-muted)]',
                          '[&::-webkit-details-marker]:hidden'
                        )}
                        aria-label="More"
                      >
                        ⋯
                      </summary>
                      <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] py-1 shadow-[var(--admin-shadow-md)]">
                        <a
                          className="block px-3 py-2 text-sm text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)]"
                          href={getAssetPath(`/admin/pages/edit/?slug=${encodeURIComponent(item.slug)}`)}
                          onClick={(e) => (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open')}
                        >
                          Edit
                        </a>
                        <a
                          className="block px-3 py-2 text-sm text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)]"
                          href={item.slug}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open')}
                        >
                          View
                        </a>
                        <button
                          type="button"
                          className="block w-full px-3 py-2 text-left text-sm text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)]"
                          onClick={(e) => {
                            (e.currentTarget.closest('details') as HTMLDetailsElement | null)?.removeAttribute('open');
                            void navigator.clipboard
                              .writeText(item.slug)
                              .then(() => push({ kind: 'success', message: '已复制 Path' }))
                              .catch(() => push({ kind: 'error', message: '复制失败，请手动复制' }));
                          }}
                        >
                          Copy Path
                        </button>
                      </div>
                    </details>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </ListTemplate>

      <Modal
        open={showCreate}
        onOpenChange={setShowCreate}
        title="Add New Page"
        description="创建 draft，并初始化 seo_meta / page_content"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowCreate(false)} disabled={creating}>
              Cancel
            </Button>
            <Button variant="primary" loading={creating} onClick={() => void onCreate()}>
              Create
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="block md:col-span-2">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Title</div>
            <Input value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} placeholder="例如：EMS Home" />
          </label>

          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Template</div>
            <Select value={createTemplateType} onChange={(e) => setCreateTemplateType(e.target.value as TemplateType)}>
              <option value="ems_home">ems_home</option>
              <option value="ems_service">ems_service</option>
              <option value="pcb_assembly">pcb_assembly</option>
              <option value="pcb_design">pcb_design</option>
            </Select>
          </label>

          <label className="block md:col-span-3">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Path</div>
            <Input value={createSlug} onChange={(e) => setCreateSlug(e.target.value)} placeholder="/ems/new-page/" />
            <div className="mt-1 text-xs text-[var(--admin-fg-muted)]">
              会自动补齐前后斜杠，例如输入 ems/test 会变成 /ems/test/
            </div>
          </label>
        </div>
      </Modal>
    </>
  );
}
