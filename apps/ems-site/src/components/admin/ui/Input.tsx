import * as React from 'react';

import { cn } from './cn';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  suffix?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, suffix, ...props }, ref) {
  const input = (
    <input
      ref={ref}
      className={cn(
        'h-[var(--admin-control-md)] w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 text-sm text-[var(--admin-fg)] outline-none',
        'placeholder:text-[var(--admin-fg-subtle)]',
        'focus:border-[var(--admin-primary)] focus:shadow-[0_0_0_3px_var(--admin-focus)]',
        className
      )}
      {...props}
    />
  );

  if (!suffix) return input;

  return (
    <div className="flex h-[var(--admin-control-md)] items-stretch overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)] focus-within:border-[var(--admin-primary)] focus-within:shadow-[0_0_0_3px_var(--admin-focus)]">
      <input
        ref={ref}
        className={cn(
          'min-w-0 flex-1 bg-transparent px-3 text-sm text-[var(--admin-fg)] outline-none',
          'placeholder:text-[var(--admin-fg-subtle)]'
        )}
        {...props}
      />
      <div className="flex items-center border-l border-[var(--admin-border-subtle)] px-2 text-sm text-[var(--admin-fg-muted)]">
        {suffix}
      </div>
    </div>
  );
});
