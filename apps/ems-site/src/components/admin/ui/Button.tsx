import * as React from 'react';

import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md';

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--admin-radius-sm)] text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50';

const sizes: Record<ButtonSize, string> = {
  sm: 'h-[var(--admin-control-sm)] px-3',
  md: 'h-[var(--admin-control-md)] px-4'
};

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--admin-primary)] text-white shadow-[var(--admin-shadow-sm)] hover:bg-[var(--admin-primary-hover)]',
  secondary:
    'border border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-fg)] hover:bg-[var(--admin-surface-muted)]',
  ghost: 'text-[var(--admin-primary)] hover:bg-[var(--admin-primary-soft)]',
  danger:
    'bg-[var(--admin-danger)] text-white shadow-[var(--admin-shadow-sm)] hover:bg-[var(--admin-danger-hover)]'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'secondary', size = 'md', loading, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading ? true : undefined}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
          <span className="min-w-0">{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
});
