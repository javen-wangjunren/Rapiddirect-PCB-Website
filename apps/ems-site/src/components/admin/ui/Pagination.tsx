import * as React from 'react';

import { cn } from './cn';
import { Button } from './Button';

export type PaginationProps = {
  page: number; // 1-based
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const safeCount = Math.max(1, pageCount);
  const safePage = clamp(page, 1, safeCount);

  const pages = React.useMemo(() => {
    // Light-weight windowed pagination: show first/last + around current
    const set = new Set<number>([1, safeCount, safePage - 1, safePage, safePage + 1, safePage - 2, safePage + 2]);
    const list = [...set].filter((p) => p >= 1 && p <= safeCount).sort((a, b) => a - b);
    return list;
  }, [safeCount, safePage]);

  const go = (p: number) => onPageChange(clamp(p, 1, safeCount));

  return (
    <nav className={cn('flex items-center justify-end gap-2', className)} aria-label="Pagination">
      <Button variant="secondary" size="sm" onClick={() => go(safePage - 1)} disabled={safePage <= 1}>
        Prev
      </Button>
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          const prev = pages[idx - 1];
          const showEllipsis = idx > 0 && prev != null && p - prev > 1;
          const active = p === safePage;
          return (
            <React.Fragment key={p}>
              {showEllipsis ? <span className="px-1 text-sm text-[var(--admin-fg-muted)]">…</span> : null}
              <button
                type="button"
                onClick={() => go(p)}
                className={cn(
                  'h-8 min-w-8 rounded-[var(--admin-radius-sm)] px-2 text-sm',
                  active
                    ? 'bg-[var(--admin-primary)] text-white'
                    : 'text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)]'
                )}
                aria-current={active ? 'page' : undefined}
              >
                {p}
              </button>
            </React.Fragment>
          );
        })}
      </div>
      <Button variant="secondary" size="sm" onClick={() => go(safePage + 1)} disabled={safePage >= safeCount}>
        Next
      </Button>
    </nav>
  );
}

