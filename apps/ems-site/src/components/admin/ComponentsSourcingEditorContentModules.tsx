import { useState } from 'react';

import { componentsSourcingSchema } from '../../content/schemas/components-sourcing';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle, Tabs } from './ui';

type TabKey = 'overview' | 'process_quality' | 'common';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'process_quality', label: 'Process & Quality' },
  { key: 'common', label: 'Common Sections' }
];

const modulesByTab: Record<TabKey, { key: keyof typeof componentsSourcingSchema; label: string }[]> = {
  overview: [
    { key: 'hero', label: 'Hero Banner' },
    { key: 'source_capability', label: 'Source Capability' },
    { key: 'source_solutions', label: 'Key Solutions' }
  ],
  process_quality: [
    { key: 'source_process', label: 'Source Process' },
    { key: 'source_quality_control', label: 'Source Quality Control' }
  ],
  common: [
    { key: 'industry', label: 'Industry Section' },
    { key: 'why_choose_us', label: 'Why Choose Us' },
    { key: 'faq', label: 'FAQ' }
  ]
};

export interface ComponentsSourcingEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: keyof typeof componentsSourcingSchema, next: JsonValue) => void;
}

export default function ComponentsSourcingEditorContentModules({ contentJson, onModuleChange }: ComponentsSourcingEditorContentModulesProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [openModuleKey, setOpenModuleKey] = useState<string>('hero');

  const contentObj = (isObject(contentJson) ? (contentJson as any) : {}) as Record<string, JsonValue>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Modules</CardTitle>
      </CardHeader>
      <CardBody className="space-y-4 pt-0">
        <Tabs<TabKey>
          items={tabs.map((t) => ({ value: t.key, label: t.label }))}
          value={activeTab}
          onValueChange={(next) => {
            setActiveTab(next);
            setOpenModuleKey(String(modulesByTab[next][0]?.key ?? ''));
          }}
          ariaLabel="Content Module Tabs"
        />

        <div className="space-y-3">
          {modulesByTab[activeTab].map((m) => {
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
                      schema={(componentsSourcingSchema as any)[m.key]}
                      value={(contentObj[m.key] ?? {}) as JsonValue}
                      onChange={(next) => onModuleChange(m.key, next)}
                      pathLabel={m.label}
                    />
                  </div>
                ) : null}
              </Card>
            );
          })}
        </div>

        <Card className="bg-[var(--admin-surface-muted)] shadow-none">
          <CardBody className="pt-[var(--admin-card-p)] text-sm text-[var(--admin-fg-muted)]">
            Quote Form 为固定前端模块，本阶段不进入后台编辑。
          </CardBody>
        </Card>
      </CardBody>
    </Card>
  );
}
