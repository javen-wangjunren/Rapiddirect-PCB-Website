import type { SupabaseClient } from '@supabase/supabase-js';

import { env } from '../env';

export type MediaAssetRow = {
  id: string;
  bucket: string;
  path: string;
  public_url: string;
  title: string;
  alt: string;
  mime_type: string | null;
  size: number | null;
  folder_id?: string | null;
  created_at: string;
  updated_at: string;
};

export type MediaFolderRow = {
  id: string;
  name: string;
  path: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
};

export type StorageObjectRow = {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
};

export const MEDIA_BUCKET = 'media';

let hasFolderIdColumn: boolean | null = env.mediaFolderIdEnabled ? null : false;

export type MediaAssetsQueryInput = {
  page: number;
  pageSize: number;
  folderId?: string;
  folderPath?: string;
  unfiled?: boolean;
  query?: string;
};

const slugifySegment = (input: string) => {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '');
};

const randomId = (len = 6) => {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789';
  let out = '';
  for (let i = 0; i < len; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
};

const normalizeFolderPath = (input: string) => {
  const trimmed = input.trim().replace(/^\/+|\/+$/g, '');
  if (!trimmed) return '';
  return trimmed
    .split('/')
    .map((seg) => slugifySegment(seg))
    .filter(Boolean)
    .join('/');
};

export const listMediaObjects = async (
  supabase: SupabaseClient
): Promise<{ ok: true; objects: StorageObjectRow[] } | { ok: false; message: string }> => {
  const res = await supabase.storage.from(MEDIA_BUCKET).list('', {
    limit: 200,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' }
  });

  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, objects: (res.data ?? []) as StorageObjectRow[] };
};

export const listMediaAssets = async (
  supabase: SupabaseClient,
  options?: { prefix?: string; unfiled?: boolean }
): Promise<{ ok: true; items: MediaAssetRow[] } | { ok: false; message: string }> => {
  const res = await listMediaAssetsPaged(supabase, {
    page: 1,
    pageSize: 200,
    folderPath: options?.prefix,
    unfiled: options?.unfiled
  });
  if (!res.ok) return res;
  return { ok: true, items: res.items };
};

export const listMediaAssetsPaged = async (
  supabase: SupabaseClient,
  input: MediaAssetsQueryInput
): Promise<{ ok: true; items: MediaAssetRow[]; total: number } | { ok: false; message: string }> => {
  const safePage = Number.isFinite(input.page) ? Math.max(1, Math.floor(input.page)) : 1;
  const safePageSize = Number.isFinite(input.pageSize) ? Math.max(1, Math.min(100, Math.floor(input.pageSize))) : 24;
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  const colsWithFolderId = 'id,path,public_url,title,alt,mime_type,size,folder_id,created_at,updated_at';
  const colsLegacy = 'id,path,public_url,title,alt,mime_type,size,created_at,updated_at';

  const keyword = input.query?.trim();

  const buildLegacyQuery = () => {
    let legacy = supabase.from('media_assets').select(colsLegacy, { count: 'exact' }).order('created_at', { ascending: false }).range(from, to);
    if (input.folderPath) {
      legacy = legacy.like('path', `${input.folderPath.replace(/\/+$/g, '')}/%`);
    }
    if (input.unfiled) {
      legacy = legacy.not('path', 'like', '%/%');
    }
    if (keyword) {
      const escaped = keyword.replace(/[%_]/g, '\\$&');
      const pat = `%${escaped}%`;
      legacy = legacy.or(`path.ilike.${pat},title.ilike.${pat},alt.ilike.${pat}`);
    }
    return legacy;
  };

  if (hasFolderIdColumn === false) {
    const legacyRes = await buildLegacyQuery();
    if (legacyRes.error) return { ok: false, message: legacyRes.error.message };
    return { ok: true, items: (legacyRes.data ?? []) as unknown as MediaAssetRow[], total: legacyRes.count ?? 0 };
  }

  let q = supabase
    .from('media_assets')
    .select(colsWithFolderId, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (input.unfiled) {
    q = q.is('folder_id', null);
  } else if (input.folderId) {
    q = q.eq('folder_id', input.folderId);
  }

  if (keyword) {
    const escaped = keyword.replace(/[%_]/g, '\\$&');
    const pat = `%${escaped}%`;
    q = q.or(`path.ilike.${pat},title.ilike.${pat},alt.ilike.${pat}`);
  }

  const res = await q;
  if (!res.error) {
    hasFolderIdColumn = true;
    return { ok: true, items: (res.data ?? []) as MediaAssetRow[], total: res.count ?? 0 };
  }

  if (!/folder_id/i.test(res.error.message)) return { ok: false, message: res.error.message };
  hasFolderIdColumn = false;

  const legacyRes = await buildLegacyQuery();
  if (legacyRes.error) return { ok: false, message: legacyRes.error.message };
  return { ok: true, items: (legacyRes.data ?? []) as unknown as MediaAssetRow[], total: legacyRes.count ?? 0 };
};

export const listMediaFolders = async (
  supabase: SupabaseClient
): Promise<{ ok: true; items: MediaFolderRow[] } | { ok: false; message: string }> => {
  const res = await supabase.from('media_folders').select('*').order('name', { ascending: true });
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, items: (res.data ?? []) as MediaFolderRow[] };
};

export const createMediaFolder = async (
  supabase: SupabaseClient,
  input: { name: string; path: string; parent_id?: string | null }
): Promise<{ ok: true; row: MediaFolderRow } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();
  const path = normalizeFolderPath(input.path);
  if (!path) return { ok: false, message: 'Folder path 不能为空' };
  const res = await supabase
    .from('media_folders')
    .insert({ name: input.name.trim() || path, path, parent_id: input.parent_id ?? null, updated_at: nowIso })
    .select('*')
    .single();
  if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '创建文件夹失败' };
  return { ok: true, row: res.data as MediaFolderRow };
};

export const updateMediaFolder = async (
  supabase: SupabaseClient,
  input: { id: string; name: string }
): Promise<{ ok: true; row: MediaFolderRow } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();
  const res = await supabase
    .from('media_folders')
    .update({ name: input.name.trim(), updated_at: nowIso })
    .eq('id', input.id)
    .select('*')
    .single();
  if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '更新文件夹失败' };
  return { ok: true, row: res.data as MediaFolderRow };
};

export const deleteMediaFolder = async (
  supabase: SupabaseClient,
  id: string
): Promise<{ ok: true } | { ok: false; message: string }> => {
  const res = await supabase.from('media_folders').delete().eq('id', id);
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true };
};

export const getPublicUrlForPath = (supabase: SupabaseClient, path: string) => {
  const res = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return res.data.publicUrl;
};

export const moveMediaObject = async (
  supabase: SupabaseClient,
  input: { fromPath: string; toPath: string }
): Promise<{ ok: true; toPath: string; publicUrl: string } | { ok: false; message: string }> => {
  const res = await supabase.storage.from(MEDIA_BUCKET).move(input.fromPath, input.toPath);
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, toPath: input.toPath, publicUrl: getPublicUrlForPath(supabase, input.toPath) };
};

export const removeMediaObjects = async (
  supabase: SupabaseClient,
  paths: string[]
): Promise<{ ok: true } | { ok: false; message: string }> => {
  const res = await supabase.storage.from(MEDIA_BUCKET).remove(paths);
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true };
};

export const updateMediaAssetPath = async (
  supabase: SupabaseClient,
  input: { fromPath: string; toPath: string; publicUrl: string; folderId?: string | null }
): Promise<{ ok: true; row: MediaAssetRow } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();
  if (hasFolderIdColumn === false) {
    const res = await supabase
      .from('media_assets')
      .update({ path: input.toPath, public_url: input.publicUrl, updated_at: nowIso })
      .eq('path', input.fromPath)
      .select('*')
      .single();
    if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '更新媒体路径失败' };
    return { ok: true, row: res.data as MediaAssetRow };
  }

  const withFolderRes = await supabase
    .from('media_assets')
    .update({ path: input.toPath, public_url: input.publicUrl, folder_id: input.folderId ?? null, updated_at: nowIso })
    .eq('path', input.fromPath)
    .select('*')
    .single();
  if (!withFolderRes.error && withFolderRes.data) {
    hasFolderIdColumn = true;
    return { ok: true, row: withFolderRes.data as MediaAssetRow };
  }
  if (!/folder_id/i.test(withFolderRes.error?.message ?? '')) {
    return { ok: false, message: withFolderRes.error?.message ?? '更新媒体路径失败' };
  }
  hasFolderIdColumn = false;

  const res = await supabase
    .from('media_assets')
    .update({ path: input.toPath, public_url: input.publicUrl, updated_at: nowIso })
    .eq('path', input.fromPath)
    .select('*')
    .single();
  if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '更新媒体路径失败' };
  return { ok: true, row: res.data as MediaAssetRow };
};

export const deleteMediaAssetRow = async (
  supabase: SupabaseClient,
  path: string
): Promise<{ ok: true } | { ok: false; message: string }> => {
  const res = await supabase.from('media_assets').delete().eq('path', path);
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true };
};

export const uploadMediaFile = async (
  supabase: SupabaseClient,
  file: File,
  options?: { folderPath?: string }
): Promise<{ ok: true; path: string; publicUrl: string; mimeType: string; size: number } | { ok: false; message: string }> => {
  const originalName = file.name.trim();
  const dot = originalName.lastIndexOf('.');
  const base = dot > 0 ? originalName.slice(0, dot) : originalName;
  const ext = dot > 0 ? originalName.slice(dot).toLowerCase() : '';
  const safeBase = slugifySegment(base) || 'file';
  const safeExt = slugifySegment(ext).startsWith('.') ? slugifySegment(ext) : ext;
  const fileName = `${safeBase}--${randomId(6)}${safeExt}`;
  const folderPath = normalizeFolderPath(options?.folderPath ?? '');
  const path = folderPath ? `${folderPath}/${fileName}` : fileName;
  const uploadRes = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    upsert: false,
    contentType: file.type || undefined
  });
  if (uploadRes.error) return { ok: false, message: uploadRes.error.message };
  const publicUrl = getPublicUrlForPath(supabase, path);
  return { ok: true, path, publicUrl, mimeType: file.type, size: file.size };
};

export const upsertMediaAsset = async (
  supabase: SupabaseClient,
  input: Pick<MediaAssetRow, 'path' | 'public_url' | 'title' | 'alt' | 'mime_type' | 'size' | 'folder_id'> & { bucket?: string }
): Promise<{ ok: true; row: MediaAssetRow } | { ok: false; message: string }> => {
  const nowIso = new Date().toISOString();
  if (hasFolderIdColumn === false) {
    const res = await supabase
      .from('media_assets')
      .upsert(
        {
          bucket: input.bucket ?? MEDIA_BUCKET,
          path: input.path,
          public_url: input.public_url,
          title: input.title ?? '',
          alt: input.alt ?? '',
          mime_type: input.mime_type ?? null,
          size: input.size ?? null,
          updated_at: nowIso
        },
        { onConflict: 'path' }
      )
      .select('*')
      .single();

    if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '保存媒体元信息失败' };
    return { ok: true, row: res.data as MediaAssetRow };
  }

  const withFolderRes = await supabase
    .from('media_assets')
    .upsert(
      {
        bucket: input.bucket ?? MEDIA_BUCKET,
        path: input.path,
        public_url: input.public_url,
        title: input.title ?? '',
        alt: input.alt ?? '',
        mime_type: input.mime_type ?? null,
        size: input.size ?? null,
        folder_id: input.folder_id ?? null,
        updated_at: nowIso
      },
      { onConflict: 'path' }
    )
    .select('*')
    .single();

  if (!withFolderRes.error && withFolderRes.data) {
    hasFolderIdColumn = true;
    return { ok: true, row: withFolderRes.data as MediaAssetRow };
  }
  if (!/folder_id/i.test(withFolderRes.error?.message ?? '')) {
    return { ok: false, message: withFolderRes.error?.message ?? '保存媒体元信息失败' };
  }
  hasFolderIdColumn = false;

  const res = await supabase
    .from('media_assets')
    .upsert(
      {
        bucket: input.bucket ?? MEDIA_BUCKET,
        path: input.path,
        public_url: input.public_url,
        title: input.title ?? '',
        alt: input.alt ?? '',
        mime_type: input.mime_type ?? null,
        size: input.size ?? null,
        updated_at: nowIso
      },
      { onConflict: 'path' }
    )
    .select('*')
    .single();

  if (res.error || !res.data) return { ok: false, message: res.error?.message ?? '保存媒体元信息失败' };
  return { ok: true, row: res.data as MediaAssetRow };
};

export const getMediaAssetByPath = async (
  supabase: SupabaseClient,
  path: string
): Promise<{ ok: true; row: MediaAssetRow | null } | { ok: false; message: string }> => {
  const res = await supabase.from('media_assets').select('*').eq('path', path).maybeSingle();
  if (res.error) return { ok: false, message: res.error.message };
  return { ok: true, row: (res.data as MediaAssetRow | null) ?? null };
};
