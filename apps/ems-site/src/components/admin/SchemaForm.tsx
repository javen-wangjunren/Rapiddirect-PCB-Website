import { useMemo, useState } from 'react';

import { getHref } from '../../lib/assets';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject, setAtPath } from '../../utils/jsonTree';
import { Button, Input, Select } from './ui';

type Schema =
  | 'string'
  | 'boolean'
  | 'array'
  | {
      type?: 'array';
      items?: any;
      [key: string]: any;
    };

const labelize = (key: string) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const isArraySchema = (schema: Schema): schema is { type: 'array'; items: any } => {
  return isObject(schema) && schema.type === 'array' && 'items' in schema;
};

const toTextarea = (key: string, value: unknown) => {
  if (['description', 'answer', 'benefit_conclusion', 'help_text', 'paragraph'].includes(key)) return true;
  if (typeof value !== 'string') return false;
  return value.length > 80;
};

const isMediaUrlKey = (key: string) => {
  if (!key) return false;
  if (key === 'og_image') return true;
  if (key.endsWith('_url')) return true;
  if (key.endsWith('_image')) return true;
  if (key.includes('image')) return true;
  if (key.includes('icon')) return true;
  return false;
};

const canPreviewAsImage = (value: string) => {
  if (!value) return false;
  const v = value.toLowerCase();
  if (v.startsWith('data:image/')) return true;
  if (v.endsWith('.png') || v.endsWith('.jpg') || v.endsWith('.jpeg') || v.endsWith('.webp') || v.endsWith('.gif') || v.endsWith('.svg')) {
    return true;
  }
  if (v.includes('/storage/v1/object/')) return true;
  return false;
};

const truncateText = (input: string, max = 80) => {
  const text = input.replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
};

const getStringAt = (value: JsonValue, path: string[]) => {
  let cur: any = value;
  for (const key of path) {
    if (!cur || typeof cur !== 'object') return '';
    cur = cur[key];
  }
  return typeof cur === 'string' ? cur : '';
};

const buildItemSummary = (item: JsonValue, fallback: string) => {
  if (!isObject(item)) return fallback;

  const question = getStringAt(item, ['question']);
  if (question) return truncateText(question, 90);

  const tabName = getStringAt(item, ['tab', 'name']);
  const cardTitle = getStringAt(item, ['card', 'title']);
  if (tabName || cardTitle) {
    const left = truncateText(tabName, 40);
    const right = truncateText(cardTitle, 60);
    if (left && right) return `${left} · ${right}`;
    if (left) return left;
    if (right) return right;
  }

  const title = getStringAt(item, ['title']);
  if (title) return truncateText(title, 90);

  const name = getStringAt(item, ['name']);
  if (name) return truncateText(name, 90);

  return fallback;
};

function CollapsibleTextareaField(props: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <label className="block">
      <div className="text-xs font-medium text-[var(--admin-fg-muted)]">{props.label}</div>
      <textarea
        className="mt-1 min-h-28 w-full rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)] outline-none placeholder:text-[var(--admin-fg-subtle)] focus:border-[var(--admin-primary)] focus:shadow-[0_0_0_3px_var(--admin-focus)]"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </label>
  );
}

function MediaUrlField(props: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const resolved = props.value ? getHref(props.value) : '';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-medium text-[var(--admin-fg-muted)]">{props.label}</div>
        <div className="flex items-center gap-3">
          <a
            className="text-xs font-medium text-[var(--admin-primary)] hover:underline"
            href={getHref('/admin/media/')}
            target="_blank"
            rel="noreferrer"
          >
            Media
          </a>
          <button
            type="button"
            className="text-xs font-medium text-[var(--admin-primary)] hover:underline disabled:opacity-50"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                const text = await navigator.clipboard.readText();
                if (text) props.onChange(text.trim());
              } catch {
                return;
              } finally {
                setBusy(false);
              }
            }}
          >
            {busy ? 'Pasting…' : 'Paste'}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <Input
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder="粘贴 URL 或站内路径"
          />
        </div>
        <div className="h-[var(--admin-control-md)] w-14 overflow-hidden rounded-[var(--admin-radius-sm)] border border-[var(--admin-border)] bg-[var(--admin-surface)]">
          {resolved && canPreviewAsImage(resolved) ? (
            <img src={resolved} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-[var(--admin-fg-muted)]">N/A</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrayObjectField(props: {
  label: string;
  arr: JsonValue[];
  itemSchema: any;
  onChangeArr: (next: JsonValue[]) => void;
  renderItemForm: (idx: number, item: JsonValue) => React.ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= props.arr.length) return;
    const next = [...props.arr];
    const tmp = next[to];
    next[to] = next[from];
    next[from] = tmp;
    props.onChangeArr(next);
    if (openIndex === from) setOpenIndex(to);
    else if (openIndex === to) setOpenIndex(from);
  };

  const remove = (idx: number) => {
    const next = props.arr.filter((_, i) => i !== idx);
    props.onChangeArr(next);
    if (openIndex === idx) setOpenIndex(null);
    else if (openIndex !== null && openIndex > idx) setOpenIndex(openIndex - 1);
  };

  const add = () => {
    const nextItem = isObject(props.itemSchema) ? ({} as JsonValue) : ('' as JsonValue);
    const next = [...props.arr, nextItem];
    props.onChangeArr(next);
    setOpenIndex(next.length - 1);
  };

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-[var(--admin-fg-muted)]">{props.label}</div>
      <div className="space-y-3 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-[var(--admin-card-p)]">
        {props.arr.length === 0 ? <div className="text-sm text-[var(--admin-fg-muted)]">暂无条目</div> : null}
        {props.arr.map((item, idx) => {
          const isOpen = openIndex === idx;
          const summary = buildItemSummary(item, `条目 ${idx + 1}`);
          return (
            <div key={idx} className="overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)]">
              <div className="flex items-center gap-3 px-3 py-2">
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="text-[var(--admin-fg-muted)]" aria-hidden="true">
                    {isOpen ? '▾' : '▸'}
                  </span>
                  <span className="min-w-0 truncate text-sm font-medium text-[var(--admin-fg)]">{summary}</span>
                </button>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={idx === 0}
                    onClick={() => move(idx, idx - 1)}
                  >
                    上移
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    disabled={idx === props.arr.length - 1}
                    onClick={() => move(idx, idx + 1)}
                  >
                    下移
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)]"
                    onClick={() => remove(idx)}
                  >
                    删除
                  </Button>
                </div>
              </div>
              {isOpen ? (
                <div className="border-t border-[var(--admin-border-subtle)] bg-[var(--admin-surface-muted)] p-3">{props.renderItemForm(idx, item)}</div>
              ) : null}
            </div>
          );
        })}
        <div>
          <Button type="button" variant="secondary" onClick={add}>
            添加条目
          </Button>
        </div>
      </div>
    </div>
  );
}

export interface SchemaFormProps {
  schema: Schema;
  value: JsonValue;
  onChange: (next: JsonValue) => void;
  pathLabel?: string;
}

export default function SchemaForm({ schema, value, onChange, pathLabel }: SchemaFormProps) {
  const rootPath: (string | number)[] = useMemo(() => [], []);

  const updateAt = (path: (string | number)[], nextValue: JsonValue) => {
    onChange(setAtPath(value, path, nextValue));
  };

  const renderField = (key: string, fieldSchema: Schema, fieldValue: JsonValue, path: (string | number)[]) => {
    if (fieldSchema === 'string') {
      if (toTextarea(key, fieldValue)) {
        return (
          <div key={key}>
            <CollapsibleTextareaField
              label={labelize(key)}
              value={typeof fieldValue === 'string' ? fieldValue : ''}
              onChange={(next) => updateAt(path, next)}
            />
          </div>
        );
      }
      if (isMediaUrlKey(key)) {
        return (
          <div key={key}>
            <MediaUrlField
              label={labelize(key)}
              value={typeof fieldValue === 'string' ? fieldValue : ''}
              onChange={(next) => updateAt(path, next)}
            />
          </div>
        );
      }
      return (
        <label className="block" key={key}>
          <div className="text-xs font-medium text-[var(--admin-fg-muted)]">{labelize(key)}</div>
          <Input
            className="mt-1"
            value={typeof fieldValue === 'string' ? fieldValue : ''}
            onChange={(e) => updateAt(path, e.target.value)}
          />
        </label>
      );
    }

    if (fieldSchema === 'boolean') {
      return (
        <label className="flex items-center gap-2" key={key}>
          <input
            type="checkbox"
            checked={Boolean(fieldValue)}
            onChange={(e) => updateAt(path, e.target.checked)}
            className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-primary)] accent-[var(--admin-primary)]"
          />
          <span className="text-sm text-[var(--admin-fg)]">{labelize(key)}</span>
        </label>
      );
    }

    if (fieldSchema === 'array') {
      const arr = Array.isArray(fieldValue) ? (fieldValue as JsonValue[]) : [];
      return (
        <div className="space-y-2" key={key}>
          <div className="text-xs font-medium text-[var(--admin-fg-muted)]">{labelize(key)}</div>
          <div className="space-y-2 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-[var(--admin-card-p)]">
            {arr.length === 0 ? <div className="text-sm text-[var(--admin-fg-muted)]">暂无条目</div> : null}
            {arr.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Input
                  className="flex-1"
                  value={typeof item === 'string' ? item : JSON.stringify(item)}
                  onChange={(e) => {
                    const next = [...arr];
                    next[idx] = e.target.value;
                    updateAt(path, next);
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  className="text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)]"
                  onClick={() => {
                    const next = arr.filter((_, i) => i !== idx);
                    updateAt(path, next);
                  }}
                >
                  删除
                </Button>
              </div>
            ))}
            <div>
              <Button type="button" variant="secondary" onClick={() => updateAt(path, [...arr, ''] as JsonValue)}>
                添加条目
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (isArraySchema(fieldSchema)) {
      const arr = Array.isArray(fieldValue) ? (fieldValue as JsonValue[]) : [];
      const itemSchema = fieldSchema.items;
      return (
        <div key={key}>
          <ArrayObjectField
            label={labelize(key)}
            arr={arr}
            itemSchema={itemSchema}
            onChangeArr={(next) => updateAt(path, next as any)}
            renderItemForm={(idx, item) => (
              <SchemaForm
                schema={itemSchema}
                value={(isObject(item) || Array.isArray(item) ? item : ({} as any)) as JsonValue}
                onChange={(next) => {
                  const out = [...arr];
                  out[idx] = next;
                  updateAt(path, out);
                }}
                pathLabel={`${key}[${idx}]`}
              />
            )}
          />
        </div>
      );
    }

    if (isObject(fieldSchema)) {
      if (
        key === 'description' &&
        (fieldSchema as any).kind === 'string' &&
        (fieldSchema as any).text === 'string' &&
        (fieldSchema as any).items === 'array'
      ) {
        const desc = isObject(fieldValue) ? (fieldValue as any) : {};
        const kind = desc.kind === 'list' ? 'list' : 'paragraph';
        const items = Array.isArray(desc.items) ? (desc.items as JsonValue[]) : [];
        const text = typeof desc.text === 'string' ? desc.text : '';

        return (
          <div
            key={key}
            className="space-y-3 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-[var(--admin-card-p)]"
          >
            <div className="text-sm font-medium text-[var(--admin-fg)]">{labelize(key)}</div>
            <div className="grid grid-cols-1 gap-3">
              <label className="block">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Kind</div>
                <Select
                  className="mt-1"
                  value={kind}
                  onChange={(e) => {
                    const nextKind = e.target.value === 'list' ? 'list' : 'paragraph';
                    const nextItems = Array.isArray(desc.items)
                      ? (desc.items as unknown[]).filter((v) => typeof v === 'string')
                      : [];
                    updateAt(path, {
                      kind: nextKind,
                      text: nextKind === 'paragraph' ? text : '',
                      items: nextKind === 'list' ? nextItems : []
                    } as any);
                  }}
                >
                  <option value="paragraph">paragraph</option>
                  <option value="list">list</option>
                </Select>
              </label>

              {kind === 'paragraph' ? (
                <CollapsibleTextareaField
                  label="Text"
                  value={text}
                  onChange={(next) => updateAt([...path, 'text'], next)}
                />
              ) : (
                renderField('items', 'array', items as any, [...path, 'items'])
              )}
            </div>
          </div>
        );
      }

      const objValue = isObject(fieldValue) ? (fieldValue as Record<string, JsonValue>) : ({} as Record<string, JsonValue>);
      const keys = Object.keys(fieldSchema);
      return (
        <div
          key={key}
          className="space-y-3 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-[var(--admin-card-p)]"
        >
          <div className="text-sm font-medium text-[var(--admin-fg)]">{labelize(key)}</div>
          <div className="grid grid-cols-1 gap-3">
            {keys.map((childKey) =>
              renderField(
                childKey,
                (fieldSchema as any)[childKey],
                (objValue[childKey] ?? null) as JsonValue,
                [...path, childKey]
              )
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="text-sm text-[var(--admin-fg-muted)]">
        {labelize(key)} 暂不支持编辑
      </div>
    );
  };

  if (schema === 'string' || schema === 'boolean' || schema === 'array') {
    return (
      <div className="space-y-3">
        <div className="text-sm text-[var(--admin-fg-muted)]">{pathLabel ?? '字段'}</div>
        {renderField(pathLabel ?? 'value', schema, value, rootPath)}
      </div>
    );
  }

  if (isArraySchema(schema)) {
    return renderField(pathLabel ?? 'items', schema, value, rootPath);
  }

  if (isObject(schema)) {
    const objValue = isObject(value) ? (value as Record<string, JsonValue>) : ({} as Record<string, JsonValue>);
    const keys = Object.keys(schema);
    return (
      <div className="grid grid-cols-1 gap-3">
        {keys.map((key) => renderField(key, (schema as any)[key], (objValue[key] ?? null) as JsonValue, [key]))}
      </div>
    );
  }

  return null;
}
