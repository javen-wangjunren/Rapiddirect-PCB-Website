import * as React from 'react';

import { cn } from './cn';
import { Button } from './Button';

export type ModalProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function Modal({ open, onOpenChange, title, description, children, footer, className }: ModalProps) {
  const titleId = React.useId();
  const descId = React.useId();
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/30"
        aria-label="Close"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        className={cn(
          'relative z-10 w-full max-w-lg rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[var(--admin-shadow-md)]',
          className
        )}
      >
        {(title || description) && (
          <div className="border-b border-[var(--admin-border-subtle)] p-[var(--admin-card-p)]">
            {title ? (
              <div id={titleId} className="text-sm font-semibold text-[var(--admin-fg)]">
                {title}
              </div>
            ) : null}
            {description ? (
              <div id={descId} className="mt-1 text-sm text-[var(--admin-fg-muted)]">
                {description}
              </div>
            ) : null}
          </div>
        )}

        {children ? <div className="p-[var(--admin-card-p)]">{children}</div> : null}

        {footer ? <div className="border-t border-[var(--admin-border-subtle)] p-[var(--admin-card-p)]">{footer}</div> : null}
      </div>
    </div>
  );
}

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  intent?: 'default' | 'danger';
  onConfirm: () => void | Promise<void>;
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  intent = 'default',
  onConfirm,
  loading
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
            {cancelText}
          </Button>
          <Button variant={intent === 'danger' ? 'danger' : 'primary'} loading={loading} onClick={() => void onConfirm()}>
            {confirmText}
          </Button>
        </div>
      }
    />
  );
}

