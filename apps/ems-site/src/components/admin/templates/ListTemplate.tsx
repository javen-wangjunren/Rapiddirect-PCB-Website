import * as React from 'react';

import { Button } from '../ui/Button';
import { Card, CardBody } from '../ui/Card';
import { cn } from '../ui/cn';

export type ListTemplateEmptyState = {
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export type ListTemplateProps = {
  title: string;
  subtitle?: string;
  primaryAction?: React.ReactNode;
  secondaryActions?: React.ReactNode;
  filters?: React.ReactNode;
  /** When false, renders `children` without the default Card wrapper (useful when list items are already cards). */
  contentWrapper?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  empty?: ListTemplateEmptyState;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
};

function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="h-10 animate-pulse rounded-[var(--admin-radius-sm)] bg-[var(--admin-surface-muted)]"
        />
      ))}
    </div>
  );
}

export function ListTemplate({
  title,
  subtitle,
  primaryAction,
  secondaryActions,
  filters,
  contentWrapper = true,
  loading,
  error,
  onRetry,
  empty,
  children,
  footer,
  aside,
  className
}: ListTemplateProps) {
  const content =
    loading || error || empty ? (
      <Card>
        <CardBody className="pt-[var(--admin-card-p)]">
          {loading ? (
            <ListSkeleton />
          ) : error ? (
            <div className="space-y-3">
              <div className="text-sm text-[var(--admin-danger)]">{error}</div>
              {onRetry ? (
                <Button variant="secondary" onClick={onRetry}>
                  重试
                </Button>
              ) : null}
            </div>
          ) : empty ? (
            <div className="flex flex-col items-start gap-3">
              <div>
                <div className="text-sm font-semibold text-[var(--admin-fg)]">{empty.title}</div>
                {empty.description ? <div className="mt-1 text-sm text-[var(--admin-fg-muted)]">{empty.description}</div> : null}
              </div>
              {empty.action ? <div>{empty.action}</div> : null}
            </div>
          ) : null}
        </CardBody>
      </Card>
    ) : contentWrapper ? (
      <Card>
        <CardBody className="pt-[var(--admin-card-p)]">{children}</CardBody>
      </Card>
    ) : (
      <>{children}</>
    );

  const main = (
    <div className="min-w-0 space-y-[var(--admin-stack-gap)]">
      {filters ? (
        <Card>
          <CardBody className="pt-[var(--admin-card-p)]">{filters}</CardBody>
        </Card>
      ) : null}
      {content}

      {footer ? (
        <Card>
          <CardBody className="pt-[var(--admin-card-p)]">{footer}</CardBody>
        </Card>
      ) : null}
    </div>
  );

  return (
    <div className={cn('space-y-[var(--admin-stack-gap)]', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-[var(--admin-text-lg)] font-semibold text-[var(--admin-fg)]">{title}</h1>
          {subtitle ? <div className="mt-1 text-sm text-[var(--admin-fg-muted)]">{subtitle}</div> : null}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {secondaryActions}
          {primaryAction}
        </div>
      </div>

      {aside ? (
        <div className="grid grid-cols-1 gap-6 min-[1200px]:grid-cols-[minmax(0,1fr)_360px]">
          {main}
          <div className="min-w-0">{aside}</div>
        </div>
      ) : (
        main
      )}
    </div>
  );
}
