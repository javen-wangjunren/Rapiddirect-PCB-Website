import { useState } from 'react';

import { pcbDesignSchema } from '../../content/schemas/pcb-design';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

const modules: { key: keyof typeof pcbDesignSchema; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'services', label: 'Services' },
  { key: 'capability', label: 'Capability' },
  { key: 'workflow', label: 'Workflow' },
  { key: 'simulation', label: 'Simulation' },
  { key: 'deliverables', label: 'Deliverables' },
  { key: 'industry', label: 'Industry' },
  { key: 'why_choose_us', label: 'Why Choose Us' },
  { key: 'faq', label: 'FAQ' },
  { key: 'cta', label: 'CTA' }
];

export interface PcbDesignEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: keyof typeof pcbDesignSchema, next: JsonValue) => void;
}

export default function PcbDesignEditorContentModules({ contentJson, onModuleChange }: PcbDesignEditorContentModulesProps) {
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
                  {m.key === 'workflow' ? (
                    <div className="mb-3 text-xs leading-5 text-[var(--admin-fg-muted)]">
                      layout=standard 使用 steps/image_url；layout=special 使用 special_title/special_description/special_cta。
                    </div>
                  ) : m.key === 'simulation' ? (
                    <div className="mb-3 text-xs leading-5 text-[var(--admin-fg-muted)]">
                      panel.description 支持少量 HTML：span/br/strong/em（其余标签会被清理）。
                    </div>
                  ) : m.key === 'deliverables' ? (
                    <div className="mb-3 text-xs leading-5 text-[var(--admin-fg-muted)]">
                      description 支持少量 HTML：span/br/strong/em（其余标签会被清理）。
                    </div>
                  ) : m.key === 'cta' ? (
                    <div className="mb-3 text-xs leading-5 text-[var(--admin-fg-muted)]">
                      title 支持少量 HTML：span/br/strong/em（其余标签会被清理）。按钮与徽章图标固定，无需配置。
                    </div>
                  ) : null}
                  <SchemaForm
                    schema={(pcbDesignSchema as any)[m.key]}
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
