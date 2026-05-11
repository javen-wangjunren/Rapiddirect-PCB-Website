import * as React from 'react';

import { cn } from '../ui/cn';

export type EditorTemplateProps = {
  header: React.ReactNode;
  tabs?: React.ReactNode;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
};

export function EditorTemplate({ header, tabs, children, sidebar, className }: EditorTemplateProps) {
  return (
    <div className={cn('space-y-[var(--admin-stack-gap)]', className)}>
      {header}
      {tabs}

      {sidebar ? (
        <div className="grid grid-cols-1 gap-6 min-[1200px]:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0">{children}</div>
          <div className="min-w-0">{sidebar}</div>
        </div>
      ) : (
        <div className="min-w-0">{children}</div>
      )}
    </div>
  );
}
