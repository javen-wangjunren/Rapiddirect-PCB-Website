import * as React from 'react';

import { cn } from './cn';

export type BadgeVariant = 'published' | 'draft' | 'disabled';

const variants: Record<BadgeVariant, string> = {
  published: 'bg-[var(--admin-success-soft)] text-[var(--admin-success)]',
  draft: 'bg-[var(--admin-warning-soft)] text-[var(--admin-warning)]',
  disabled: 'bg-[var(--admin-surface-muted)] text-[var(--admin-fg-subtle)]'
};

export function Badge({ className, variant, ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant: BadgeVariant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
