import * as React from 'react';

import { cn } from './cn';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        'h-[var(--admin-control-md)] w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 text-sm text-[var(--admin-fg)] outline-none',
        'focus:border-[var(--admin-primary)] focus:shadow-[0_0_0_3px_var(--admin-focus)]',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});
