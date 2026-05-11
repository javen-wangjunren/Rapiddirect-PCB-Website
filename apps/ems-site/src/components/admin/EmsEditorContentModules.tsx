import { useState } from 'react';

import { emsHomeSchema } from '../../content/schemas/ems';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import { Card, CardBody, CardHeader, CardTitle, Tabs } from './ui';

type TabKey = 'overview' | 'capabilities' | 'trust' | 'faq';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'capabilities', label: 'Capabilities' },
  { key: 'trust', label: 'Trust' },
  { key: 'faq', label: 'FAQ' }
];

const modulesByTab: Record<TabKey, { key: keyof typeof emsHomeSchema; label: string }[]> = {
  overview: [
    { key: 'hero', label: 'Hero' },
    { key: 'services', label: 'EMS Service' }
  ],
  capabilities: [
    { key: 'quality', label: 'Quality Control' },
    { key: 'equipment', label: 'Equipment' },
    { key: 'order_process', label: 'Order Process' }
  ],
  trust: [
    { key: 'certification', label: 'Certification' },
    { key: 'industry', label: 'Industry' },
    { key: 'why_choose_us', label: 'Why Choose Us' }
  ],
  faq: [{ key: 'faq', label: 'FAQ' }]
};

export interface EmsEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: keyof typeof emsHomeSchema, next: JsonValue) => void;
}

export default function EmsEditorContentModules({ contentJson, onModuleChange }: EmsEditorContentModulesProps) {
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
                      schema={(emsHomeSchema as any)[m.key]}
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
