import * as React from 'react';

import { cn } from './cn';

export type TabItem<T extends string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export type TabsProps<T extends string> = {
  items: Array<TabItem<T>>;
  value: T;
  onValueChange: (next: T) => void;
  className?: string;
  ariaLabel?: string;
};

export function Tabs<T extends string>({ items, value, onValueChange, className, ariaLabel = 'Tabs' }: TabsProps<T>) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const focusByIndex = (idx: number) => {
    const el = refs.current[idx];
    if (el) el.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.filter((i) => !i.disabled);
    const enabledValues = enabled.map((i) => i.value);
    const currentIndex = enabledValues.indexOf(value);
    if (currentIndex < 0) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const nextIndex = (currentIndex + dir + enabledValues.length) % enabledValues.length;
      const nextValue = enabledValues[nextIndex];
      onValueChange(nextValue);
      const nextItemIndex = items.findIndex((i) => i.value === nextValue);
      focusByIndex(nextItemIndex);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      const nextValue = enabledValues[0];
      onValueChange(nextValue);
      focusByIndex(items.findIndex((i) => i.value === nextValue));
    }
    if (e.key === 'End') {
      e.preventDefault();
      const nextValue = enabledValues[enabledValues.length - 1];
      onValueChange(nextValue);
      focusByIndex(items.findIndex((i) => i.value === nextValue));
    }
  };

  return (
    <div
      className={cn('flex gap-4 border-b border-[var(--admin-border)]', className)}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {items.map((item, idx) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            aria-disabled={item.disabled ? true : undefined}
            tabIndex={active ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onValueChange(item.value)}
            className={cn(
              'relative -mb-px inline-flex h-[var(--admin-control-lg)] items-center justify-center px-1 text-sm font-medium text-[var(--admin-fg-muted)]',
              'hover:text-[var(--admin-fg)] disabled:cursor-not-allowed disabled:opacity-50',
              active ? 'font-semibold text-[var(--admin-fg)]' : null
            )}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute bottom-0 left-0 right-0 h-[2px]',
                active ? 'bg-[var(--admin-primary)]' : 'bg-transparent'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
