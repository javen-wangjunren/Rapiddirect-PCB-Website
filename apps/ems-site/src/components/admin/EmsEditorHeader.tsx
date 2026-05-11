import { useEffect, useState } from 'react';

export interface EmsEditorHeaderProps {
  title: string;
  onTitleChange: (value: string) => void;
  slug: string;
  onSlugCommit: (value: string) => void;
  dirty: boolean;
  saving: boolean;
}

const normalizeSlug = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return '';
  const withLeading = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
};

export default function EmsEditorHeader({ title, onTitleChange, slug, onSlugCommit, dirty, saving }: EmsEditorHeaderProps) {
  const lockSlug = slug === '/ems/';
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(slug);

  useEffect(() => {
    if (!editing) setDraft(slug);
  }, [editing, slug]);

  useEffect(() => {
    if (editing && lockSlug) {
      setEditing(false);
    }
  }, [editing, lockSlug]);

  return (
    <div className="rounded-md border border-[#dcdcde] bg-white p-4">
      <input
        className="h-11 w-full rounded-md border border-[#dcdcde] px-3 text-[22px] font-semibold outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        placeholder="添加标题"
      />

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <div className="text-[#646970]">固定链接：</div>
        <div className="text-[#2271b1]">{slug}</div>
        {lockSlug ? (
          <div className="text-xs text-[#646970]">首页固定链接不可修改</div>
        ) : !editing ? (
          <button
            type="button"
            className="rounded border border-[#2271b1] bg-white px-2 py-1 text-xs font-medium text-[#2271b1] hover:bg-[#f6f7f7]"
            onClick={() => setEditing(true)}
          >
            编辑
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <input
              className="h-8 w-64 rounded-md border border-[#dcdcde] px-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button
              type="button"
              className="h-8 rounded-md bg-[#2271b1] px-3 text-sm font-medium text-white hover:bg-[#1e639a]"
              onClick={() => {
                const normalized = normalizeSlug(draft);
                onSlugCommit(normalized);
                setEditing(false);
              }}
            >
              保存
            </button>
            <button
              type="button"
              className="h-8 rounded-md border border-[#dcdcde] bg-white px-3 text-sm text-[#1d2327] hover:bg-[#f6f7f7]"
              onClick={() => setEditing(false)}
            >
              取消
            </button>
          </div>
        )}

        <div className="ml-auto text-xs text-[#646970]">{saving ? '保存中…' : dirty ? '未保存更改' : '已保存'}</div>
      </div>
    </div>
  );
}
