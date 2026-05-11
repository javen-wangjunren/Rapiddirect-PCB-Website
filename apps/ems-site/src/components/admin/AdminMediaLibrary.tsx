import { useEffect, useMemo, useRef, useState } from 'react';

import { getHref } from '../../lib/assets';
import { createAdminSupabaseClient } from '../../lib/supabase/adminClient';
import {
  createMediaFolder,
  deleteMediaAssetRow,
  getPublicUrlForPath,
  listMediaAssetsPaged,
  listMediaFolders,
  moveMediaObject,
  removeMediaObjects,
  type MediaAssetRow,
  type MediaFolderRow,
  uploadMediaFile,
  updateMediaAssetPath,
  upsertMediaAsset
} from '../../lib/supabase/adminMedia';
import { ListTemplate } from './templates/ListTemplate';
import { Button, Card, CardBody, CardHeader, CardTitle, ConfirmDialog, Input, Modal, Pagination, Select, ToastProvider, useToast } from './ui';
import { cn } from './ui/cn';

type LoadState = 'loading' | 'ready' | 'error';

const getBaseName = (path: string) => {
  const idx = path.lastIndexOf('/');
  return idx >= 0 ? path.slice(idx + 1) : path;
};

const joinPath = (a: string, b: string) => {
  const left = a.replace(/\/+$/g, '');
  const right = b.replace(/^\/+?/g, '');
  if (!left) return right;
  if (!right) return left;
  return `${left}/${right}`;
};

const addSuffixBeforeExt = (fileName: string, suffix: string) => {
  const dot = fileName.lastIndexOf('.');
  if (dot <= 0) return `${fileName}${suffix}`;
  return `${fileName.slice(0, dot)}${suffix}${fileName.slice(dot)}`;
};

const isLikelyImage = (mimeType?: string) => {
  if (!mimeType) return false;
  return mimeType.startsWith('image/');
};

const formatDateTime = (input?: string) => {
  if (!input) return '';
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleString();
};

const formatBytes = (bytes?: number | null) => {
  if (!bytes) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = bytes;
  let idx = 0;
  while (v >= 1024 && idx < units.length - 1) {
    v /= 1024;
    idx += 1;
  }
  return `${v.toFixed(idx === 0 ? 0 : 1)} ${units[idx]}`;
};

export default function AdminMediaLibrary() {
  return (
    <ToastProvider>
      <AdminMediaLibraryInner />
    </ToastProvider>
  );
}

type FolderFilter = 'all' | 'unfiled' | string; // string => folder id

function AdminMediaLibraryInner() {
  const supabase = useMemo(() => createAdminSupabaseClient(), []);
  const { push } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const didInitialRefreshRef = useRef(false);

  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [items, setItems] = useState<MediaAssetRow[]>([]);
  const [total, setTotal] = useState(0);
  const [folders, setFolders] = useState<MediaFolderRow[]>([]);
  const [folderFilter, setFolderFilter] = useState<FolderFilter>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 24;
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<MediaAssetRow | null>(null);
  const [savingMeta, setSavingMeta] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderPath, setNewFolderPath] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [newFolderParentId, setNewFolderParentId] = useState<string>('');

  const [moveTargetId, setMoveTargetId] = useState<string>('');
  const [moving, setMoving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const selectedPublicUrl = useMemo(() => {
    if (!supabase || !selectedPath) return '';
    return getPublicUrlForPath(supabase, selectedPath);
  }, [supabase, selectedPath]);

  const activeFolder = useMemo(() => {
    if (folderFilter === 'all' || folderFilter === 'unfiled') return null;
    return folders.find((f) => f.id === folderFilter) ?? null;
  }, [folderFilter, folders]);

  const refreshFolders = async () => {
    if (!supabase) return;
    const foldersPromise = listMediaFolders(supabase);

    const cachedFolder =
      folderFilter !== 'all' && folderFilter !== 'unfiled' ? folders.find((f) => f.id === folderFilter) ?? null : null;

    if (folderFilter !== 'all' && folderFilter !== 'unfiled') {
      if (!cachedFolder) {
        const folderRes = await foldersPromise;
        if (!folderRes.ok) {
          setLoadState('error');
          setLoadError(folderRes.message);
          return;
        }
        setFolders(folderRes.items);
      }
    }

    const folderRes = await foldersPromise;
    if (!folderRes.ok) {
      setLoadState('error');
      setLoadError(folderRes.message);
      return;
    }
    setFolders(folderRes.items);
  };

  const refreshAssets = async (opts?: { preserveSelection?: boolean }) => {
    if (!supabase) return;
    setLoadState('loading');
    setLoadError(null);

    const folderId = folderFilter === 'all' || folderFilter === 'unfiled' ? undefined : folderFilter;
    const folderPath = folderId ? (folders.find((f) => f.id === folderId) ?? null)?.path : undefined;
    const res = await listMediaAssetsPaged(supabase, {
      page,
      pageSize,
      folderId,
      folderPath,
      unfiled: folderFilter === 'unfiled',
      query
    });
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

    if (!opts?.preserveSelection) {
      setSelectedPath(null);
      setSelectedMeta(null);
    }
  };

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
        window.location.assign(getHref('/login/'));
        return;
      }
      await Promise.all([refreshFolders(), refreshAssets()]);
      didInitialRefreshRef.current = true;
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  useEffect(() => {
    if (!selectedPath) {
      setSelectedMeta(null);
      return;
    }
    const fromList = items.find((i) => i.path === selectedPath) ?? null;
    if (fromList) {
      setSelectedMeta(fromList);
      return;
    }
  }, [selectedPath, items]);

  useEffect(() => {
    if (!supabase) return;
    if (!didInitialRefreshRef.current) return;
    void refreshAssets({ preserveSelection: true });
  }, [folderFilter, page, query]);

  const onUploadFiles = async (files: FileList | null) => {
    if (!supabase) return;
    if (!files || files.length === 0) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const folderPath = activeFolder ? activeFolder.path : '';
      const res = await uploadMediaFile(supabase, file, { folderPath });
      if (!res.ok) {
        push({ kind: 'error', message: res.message });
        continue;
      }
      const metaRes = await upsertMediaAsset(supabase, {
        path: res.path,
        public_url: res.publicUrl,
        title: '',
        alt: '',
        mime_type: res.mimeType || null,
        size: res.size,
        folder_id: activeFolder?.id ?? null
      });
      if (!metaRes.ok) {
        push({ kind: 'error', message: metaRes.message });
      } else {
        setSelectedPath(res.path);
        setSelectedMeta(metaRes.row);
        push({ kind: 'success', message: '上传成功' });
      }
    }
    setUploading(false);
    await Promise.all([refreshFolders(), refreshAssets({ preserveSelection: true })]);
  };

  const onCreateFolder = async () => {
    if (!supabase) return;
    setCreatingFolder(true);
    const parent = newFolderParentId ? folders.find((f) => f.id === newFolderParentId) ?? null : null;
    const fullPath = parent ? joinPath(parent.path, newFolderPath) : newFolderPath;
    const res = await createMediaFolder(supabase, {
      name: newFolderName,
      path: fullPath,
      parent_id: parent?.id ?? null
    });
    setCreatingFolder(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    push({ kind: 'success', message: '文件夹已创建' });
    setNewFolderName('');
    setNewFolderPath('');
    setNewFolderParentId('');
    setNewFolderOpen(false);
    setFolderFilter(res.row.id);
    await Promise.all([refreshFolders(), refreshAssets({ preserveSelection: true })]);
  };

  const onMoveSelected = async () => {
    if (!supabase || !selectedMeta || !selectedPath) return;
    setMoving(true);
    const base = getBaseName(selectedPath);
    const targetFolder = moveTargetId ? folders.find((f) => f.id === moveTargetId) ?? null : null;
    const desired = targetFolder ? joinPath(targetFolder.path, base) : base;

    const tryMove = async (toPath: string) => {
      const moveRes = await moveMediaObject(supabase, { fromPath: selectedPath, toPath });
      if (!moveRes.ok) return moveRes;
      const updateRes = await updateMediaAssetPath(supabase, {
        fromPath: selectedPath,
        toPath: moveRes.toPath,
        publicUrl: moveRes.publicUrl,
        folderId: moveTargetId ? moveTargetId : null
      });
      if (!updateRes.ok) return { ok: false as const, message: updateRes.message };
      return { ok: true as const, row: updateRes.row };
    };

    let result = await tryMove(desired);
    if (!result.ok && /exists|duplicate|conflict/i.test(result.message)) {
      const retryName = addSuffixBeforeExt(base, `--${Math.random().toString(36).slice(2, 8)}`);
      const retryPath = targetFolder ? joinPath(targetFolder.path, retryName) : retryName;
      result = await tryMove(retryPath);
    }

    setMoving(false);
    if (!result.ok) {
      push({ kind: 'error', message: result.message });
      return;
    }
    push({ kind: 'success', message: '已移动' });
    setSelectedPath(result.row.path);
    setSelectedMeta(result.row);
    await Promise.all([refreshFolders(), refreshAssets({ preserveSelection: true })]);
  };

  const onDeleteSelected = async () => {
    if (!supabase || !selectedPath) return;
    setDeleting(true);
    const storageRes = await removeMediaObjects(supabase, [selectedPath]);
    if (!storageRes.ok) {
      setDeleting(false);
      push({ kind: 'error', message: storageRes.message });
      return;
    }
    const rowRes = await deleteMediaAssetRow(supabase, selectedPath);
    setDeleting(false);
    if (!rowRes.ok) {
      push({ kind: 'error', message: rowRes.message });
      return;
    }
    push({ kind: 'success', message: '已删除' });
    setSelectedPath(null);
    setSelectedMeta(null);
    await Promise.all([refreshFolders(), refreshAssets()]);
  };

  const onCopyUrl = async () => {
    if (!selectedPublicUrl) return;
    try {
      await navigator.clipboard.writeText(selectedPublicUrl);
      push({ kind: 'success', message: '已复制链接' });
    } catch {
      push({ kind: 'error', message: '复制失败，请手动复制' });
    }
  };

  const onSaveMeta = async () => {
    if (!supabase || !selectedMeta) return;
    setSavingMeta(true);
    const res = await upsertMediaAsset(supabase, {
      path: selectedMeta.path,
      public_url: selectedPublicUrl || selectedMeta.public_url,
      title: selectedMeta.title ?? '',
      alt: selectedMeta.alt ?? '',
      mime_type: selectedMeta.mime_type ?? null,
      size: selectedMeta.size ?? null,
      folder_id: selectedMeta.folder_id ?? null
    });
    setSavingMeta(false);
    if (!res.ok) {
      push({ kind: 'error', message: res.message });
      return;
    }
    setSelectedMeta(res.row);
    push({ kind: 'success', message: '已保存' });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => {
      const hay = `${it.path} ${(it.title ?? '')} ${(it.alt ?? '')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  useEffect(() => {
    setPage(1);
  }, [query, folderFilter]);

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(total, start + pageSize);
  const pageItems = filtered;

  const empty =
    loadState === 'ready' && total === 0
      ? {
          title: !query.trim() && folderFilter === 'all' ? '暂无媒体文件' : '没有匹配的结果',
          description: !query.trim() && folderFilter === 'all' ? '先上传图片，再复制 Public URL 到页面字段中。' : '尝试调整关键词或切换文件夹。',
          action:
            !query.trim() && folderFilter === 'all' ? (
              <Button variant="primary" onClick={() => fileInputRef.current?.click()}>
                Upload
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => setQuery('')}>
                清空搜索
              </Button>
            )
        }
      : undefined;

  const folderOptions = useMemo(() => {
    const flat = folders
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((f) => ({ id: f.id, label: f.parent_id ? `— ${f.name}` : f.name }));
    return [
      { id: 'all' as const, label: 'All Media' },
      { id: 'unfiled' as const, label: 'Unfiled' },
      ...flat
    ];
  }, [folders]);

  const flatFolderOptions = useMemo(() => {
    const sorted = folders.slice().sort((a, b) => a.name.localeCompare(b.name));
    return sorted.map((f) => ({ id: f.id, label: f.parent_id ? `— ${f.name}` : f.name, path: f.path }));
  }, [folders]);

  const aside = (
    <div className="sticky top-4 space-y-[var(--admin-stack-gap)]">
      <Card>
        <CardHeader>
          <CardTitle>Attachment Details</CardTitle>
        </CardHeader>
        <CardBody className="space-y-5 pt-0">
          {!selectedPath ? (
            <div className="text-sm text-[var(--admin-fg-muted)]">选择一个媒体文件查看详情</div>
          ) : (
            <>
              <div className="overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-muted)]">
                {isLikelyImage(selectedMeta?.mime_type ?? undefined) ? (
                  <img src={selectedPublicUrl} alt="" className="h-48 w-full object-contain" />
                ) : (
                  <div className="flex h-48 items-center justify-center text-sm text-[var(--admin-fg-muted)]">No preview</div>
                )}
              </div>

              <div className="space-y-1 text-sm">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)]">File</div>
                <div className="break-all text-[var(--admin-fg)]">{selectedPath}</div>
                <div className="mt-2 text-xs text-[var(--admin-fg-muted)]">
                  {formatBytes(selectedMeta?.size)} {selectedMeta?.created_at ? `· ${formatDateTime(selectedMeta.created_at)}` : ''}
                </div>
              </div>

              <div className="h-px bg-[var(--admin-border)]" />

              <div className="space-y-2">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Public URL</div>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
                  <Input value={selectedPublicUrl} readOnly />
                  <Button variant="secondary" onClick={() => void onCopyUrl()}>
                    Copy
                  </Button>
                </div>
                <div className="text-xs text-[var(--admin-fg-muted)]">复制后粘贴到页面字段（image_url/icon_url 等）</div>
              </div>

              <div className="space-y-3">
                <label className="block">
                  <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Title</div>
                  <Input
                    value={selectedMeta?.title ?? ''}
                    onChange={(e) => setSelectedMeta((prev) => (prev ? { ...prev, title: e.target.value } : prev))}
                  />
                </label>
                <label className="block">
                  <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Alt</div>
                  <Input
                    value={selectedMeta?.alt ?? ''}
                    onChange={(e) => setSelectedMeta((prev) => (prev ? { ...prev, alt: e.target.value } : prev))}
                  />
                </label>

                <Button variant="primary" onClick={() => void onSaveMeta()} disabled={savingMeta || !selectedMeta} loading={savingMeta}>
                  Save Meta
                </Button>

                <div className="h-px bg-[var(--admin-border)]" />

                <div className="space-y-2">
                  <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Move to Folder</div>
                  <Select value={moveTargetId} onChange={(e) => setMoveTargetId(e.target.value)}>
                    <option value="">Unfiled</option>
                    {flatFolderOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                  <Button variant="secondary" disabled={moving || !selectedPath} loading={moving} onClick={() => void onMoveSelected()}>
                    Move
                  </Button>
                </div>

                <Button variant="danger" disabled={deleting || !selectedPath} onClick={() => setDeleteConfirmOpen(true)}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardBody className="pt-[var(--admin-card-p)] text-sm text-[var(--admin-fg-muted)]">
          本阶段仅提供上传、复制链接与元信息编辑；不改变页面数据结构。
        </CardBody>
      </Card>
    </div>
  );

  return (
    <>
      <ListTemplate
        title="Media Library"
        subtitle="上传并管理图片资源，复制 Public URL 到页面字段中"
        primaryAction={
          <Button variant="primary" onClick={() => fileInputRef.current?.click()} loading={uploading}>
            Upload
          </Button>
        }
        secondaryActions={
          <Button variant="secondary" onClick={() => setNewFolderOpen(true)}>
            New Folder
          </Button>
        }
        contentWrapper={false}
        filters={
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_320px]">
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">搜索</div>
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索 path / title / alt" suffix={`${total}`} />
            </label>
            <label className="block">
              <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">文件夹</div>
              <Select value={folderFilter} onChange={(e) => setFolderFilter(e.target.value as FolderFilter)}>
                {folderOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </label>
          </div>
        }
        loading={loadState === 'loading'}
        error={loadState === 'error' ? loadError : null}
        onRetry={() => void refreshAssets()}
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
        aside={aside}
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 min-[1200px]:grid-cols-4">
          {pageItems.map((row) => {
            const url = row.public_url || (supabase ? getPublicUrlForPath(supabase, row.path) : '');
            const mimetype = row.mime_type ?? undefined;
            const active = selectedPath === row.path;
            return (
              <button
                key={row.id}
                type="button"
                className={cn(
                  'group flex flex-col overflow-hidden rounded-[var(--admin-radius-md)] border bg-[var(--admin-surface)] text-left shadow-[var(--admin-shadow-sm)] transition',
                  active
                    ? 'border-[var(--admin-primary)] shadow-[0_0_0_3px_var(--admin-focus),var(--admin-shadow-sm)]'
                    : 'border-[var(--admin-border)] hover:border-[var(--admin-fg-subtle)]'
                )}
                onClick={() => setSelectedPath(row.path)}
              >
                <div className="flex aspect-square items-center justify-center bg-[var(--admin-surface-muted)]">
                  {isLikelyImage(mimetype) ? (
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-xs text-[var(--admin-fg-muted)]">File</div>
                  )}
                </div>
                <div className="px-3 py-2">
                  <div className="truncate text-xs font-medium text-[var(--admin-fg)]">{getBaseName(row.path)}</div>
                  <div className="mt-0.5 truncate text-[11px] text-[var(--admin-fg-muted)]">{row.path}</div>
                </div>
              </button>
            );
          })}
        </div>
      </ListTemplate>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        multiple
        onChange={(e) => void onUploadFiles(e.target.files)}
        disabled={uploading}
      />

      <Modal
        open={newFolderOpen}
        onOpenChange={setNewFolderOpen}
        title="New Folder"
        description="创建一个文件夹，用于生成上传路径前缀（原型：最多 2 层）"
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" onClick={() => setNewFolderOpen(false)} disabled={creatingFolder}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => void onCreateFolder()} loading={creatingFolder}>
              Create
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Parent</div>
            <Select value={newFolderParentId} onChange={(e) => setNewFolderParentId(e.target.value)}>
              <option value="">(none)</option>
              {folders
                .filter((f) => !f.parent_id)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
            </Select>
            <div className="mt-1 text-[11px] text-[var(--admin-fg-muted)]">第一版最多支持 2 层，仅可选择顶层作为父级</div>
          </label>
          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Name</div>
            <Input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} placeholder="EMS Home" />
          </label>
          <label className="block">
            <div className="mb-1 text-xs font-medium text-[var(--admin-fg-muted)]">Path</div>
            <Input value={newFolderPath} onChange={(e) => setNewFolderPath(e.target.value)} placeholder="ems-home" />
          </label>
        </div>
      </Modal>

      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="确认删除？"
        description="确认删除该媒体文件？此操作不可撤销。"
        intent="danger"
        confirmText={deleting ? 'Deleting…' : 'Delete'}
        onConfirm={async () => {
          await onDeleteSelected();
          setDeleteConfirmOpen(false);
        }}
        loading={deleting}
      />
    </>
  );
}
