import { getAssetPath } from '../../lib/assets';

export interface EmsEditorPublishSidebarProps {
  status: 'draft' | 'published';
  onStatusChange: (value: 'draft' | 'published') => void;
  templateType: 'ems_home' | 'ems_service' | 'pcb_assembly';
  onTemplateTypeChange: (value: 'ems_home' | 'ems_service' | 'pcb_assembly') => void;
  previewHref: string;
  saving: boolean;
  canPublish: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  onQuickSave: () => void;
  onTrash: () => void;
}

export default function EmsEditorPublishSidebar({
  status,
  onStatusChange,
  templateType,
  onTemplateTypeChange,
  previewHref,
  saving,
  canPublish,
  onSaveDraft,
  onPublish,
  onQuickSave,
  onTrash
}: EmsEditorPublishSidebarProps) {
  const resolvedPreviewHref = previewHref?.startsWith('/') ? previewHref : getAssetPath(previewHref || '/');
  return (
    <div className="rounded-md border border-[#dcdcde] bg-white">
      <div className="flex items-center justify-between border-b border-[#dcdcde] px-4 py-2">
        <div className="text-sm font-semibold">Publish</div>
        <a
          className="rounded-md border border-[#2271b1] bg-white px-2 py-1 text-xs font-medium text-[#2271b1] hover:bg-[#f6f7f7]"
          href={resolvedPreviewHref}
          target="_blank"
          rel="noreferrer"
        >
          Preview
        </a>
      </div>
      <div className="space-y-3 px-4 py-3 text-sm">
        <div className="flex items-center justify-between">
          <div className="text-[#646970]">Status</div>
          <select
            className="h-8 rounded-md border border-[#dcdcde] bg-white px-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={status}
            onChange={(e) => onStatusChange(e.target.value as any)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#646970]">Template</div>
          <select
            className="h-8 rounded-md border border-[#dcdcde] bg-white px-2 text-sm outline-none focus:border-[#2271b1] focus:ring-2 focus:ring-[#2271b1]/20"
            value={templateType}
            onChange={(e) => onTemplateTypeChange(e.target.value as any)}
          >
            <option value="ems_home">ems_home</option>
            <option value="ems_service">ems_service</option>
            <option value="pcb_assembly">pcb_assembly</option>
          </select>
        </div>

        <div className="border-t border-[#dcdcde] pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-[#dcdcde] bg-white px-3 text-sm text-[#1d2327] hover:bg-[#f6f7f7] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={saving || !canPublish}
              onClick={onSaveDraft}
            >
              Save Draft
            </button>
            <button
              type="button"
              className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-[#2271b1] px-3 text-sm font-medium text-white hover:bg-[#1e639a] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={saving || !canPublish}
              onClick={onPublish}
            >
              {status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button type="button" className="text-sm text-[#d63638] hover:underline" onClick={onTrash}>
              Move to Trash
            </button>
            <button type="button" className="text-sm text-[#2271b1] hover:underline" onClick={onQuickSave}>
              Quick Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
