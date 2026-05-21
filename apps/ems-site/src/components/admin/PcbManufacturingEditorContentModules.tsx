import { useState } from 'react';

import { pcbManufacturingSchema } from '../../content/schemas/pcb-manufacturing';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

const modules: { key: keyof typeof pcbManufacturingSchema; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'capability', label: 'Capability' },
  { key: 'tech_table', label: 'Tech Table' },
  { key: 'process', label: 'Process' },
  { key: 'quality', label: 'Quality Control' },
  { key: 'industry', label: 'Industry' },
  { key: 'why_choose_us', label: 'Why Choose Us' },
  { key: 'product_gallery', label: 'Product Gallery' },
  { key: 'faq', label: 'FAQ' }
];

export interface PcbManufacturingEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: keyof typeof pcbManufacturingSchema, next: JsonValue) => void;
}

export default function PcbManufacturingEditorContentModules({
  contentJson,
  onModuleChange
}: PcbManufacturingEditorContentModulesProps) {
  const [openModuleKey, setOpenModuleKey] = useState<string>('hero');

  const contentObj = (isObject(contentJson) ? (contentJson as any) : {}) as Record<string, JsonValue>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Modules</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        {modules.map((m) => {
          const isOpen = openModuleKey === String(m.key);
          return (
            <Card key={String(m.key)} className="shadow-none">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 p-[var(--admin-card-p)] text-left"
                onClick={() => setOpenModuleKey(isOpen ? '' : String(m.key))}
              >
                <div className="text-sm font-medium text-[var(--admin-fg)]">{m.label}</div>
                <div className="text-sm text-[var(--admin-fg-muted)]" aria-hidden="true">
                  {isOpen ? '▾' : '▸'}
                </div>
              </button>

              {isOpen ? (
                <div className="border-t border-[var(--admin-border-subtle)] bg-[var(--admin-surface-muted)] p-[var(--admin-card-p)]">
                  <SchemaForm
                    schema={(pcbManufacturingSchema as any)[m.key]}
                    value={(contentObj[m.key] ?? {}) as JsonValue}
                    onChange={(next) => onModuleChange(m.key, next)}
                    pathLabel={m.label}
                  />
                </div>
              ) : null}
            </Card>
          );
        })}
      </CardBody>
    </Card>
  );
}
