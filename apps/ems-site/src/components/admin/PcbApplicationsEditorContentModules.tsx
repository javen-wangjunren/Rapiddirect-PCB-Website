import { useState } from 'react';

import { pcbApplicationsSchema } from '../../content/schemas/pcb-applications';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

const modules: { key: keyof typeof pcbApplicationsSchema; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'description', label: 'Description' },
  { key: 'capability', label: 'Capability' },
  { key: 'advantage', label: 'Advantage' },
  { key: 'tech_table', label: 'Tech Table' },
  { key: 'faq', label: 'FAQ' }
];

export interface PcbApplicationsEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: keyof typeof pcbApplicationsSchema, next: JsonValue) => void;
}

export default function PcbApplicationsEditorContentModules({ contentJson, onModuleChange }: PcbApplicationsEditorContentModulesProps) {
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
                    schema={(pcbApplicationsSchema as any)[m.key]}
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

