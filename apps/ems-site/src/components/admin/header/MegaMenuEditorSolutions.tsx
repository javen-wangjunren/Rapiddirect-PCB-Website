import { useState } from 'react';
import type { NavItemData, SolTabData, SolStepData, CardData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';
import { cn } from '../ui/cn';

interface Props {
  navItem: NavItemData;
  onChange: (next: NavItemData) => void;
}

// ── Step 编辑器 ──
function StepEditor({ step, onChange, onRemove, index }: {
  step: SolStepData;
  onChange: (next: SolStepData) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <div className="flex items-start gap-2 rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2">
      <span className="mt-2 text-xs font-bold text-[var(--admin-fg-muted)] w-5 text-right">{step.step_number || index + 1}.</span>
      <div className="flex-1 space-y-1.5">
        <div className="grid grid-cols-4 gap-2">
          <label className="col-span-1">
            <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">步号</div>
            <Input value={step.step_number} onChange={(e) => onChange({ ...step, step_number: e.target.value })} placeholder="1" />
          </label>
          <label className="col-span-3">
            <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">标题</div>
            <Input value={step.title} onChange={(e) => onChange({ ...step, title: e.target.value })} placeholder="Design & Engineering" />
          </label>
        </div>
        <label className="block">
          <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">标题链接 (href)</div>
          <Input value={step.href} onChange={(e) => onChange({ ...step, href: e.target.value })} placeholder="/npi/design-engineering/" />
        </label>
        <label className="block">
          <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">描述</div>
          <Input value={step.desc} onChange={(e) => onChange({ ...step, desc: e.target.value })} placeholder="Turn concepts into precision parts." />
        </label>
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>删除</Button>
    </div>
  );
}

// ── 卡片编辑器（复用 Capabilities 的模式） ──
function CardEditor({ card, onChange, onRemove, index }: {
  card: CardData;
  onChange: (next: CardData) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <div className="flex items-start gap-2 rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2">
      <span className="mt-2 text-xs text-[var(--admin-fg-muted)] w-5 text-right">{index + 1}.</span>
      <div className="flex-1 space-y-1.5">
        <Input placeholder="Label" value={card.label} onChange={(e) => onChange({ ...card, label: e.target.value })} />
        <Input placeholder="Href" value={card.href} onChange={(e) => onChange({ ...card, href: e.target.value })} />
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>删除</Button>
    </div>
  );
}

// ── Tab 编辑器 ──
function TabEditor({ tab, onChange, onRemove, onMoveUp, onMoveDown, index }: {
  tab: SolTabData;
  onChange: (next: SolTabData) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);
  const isNpi = tab.panel_style === 'npi';

  const addStep = () => {
    onChange({
      ...tab,
      steps: [...tab.steps, { step_number: String(tab.steps.length + 1), title: '', desc: '', href: '' }]
    });
  };

  const addCard = () => {
    onChange({ ...tab, cards: [...tab.cards, { label: '', href: '' }] });
  };

  return (
    <Card>
      <CardHeader
        className="flex-row items-center justify-between space-y-0 pb-2 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <span className={cn("text-sm transition-transform duration-200", expanded && "rotate-90")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-[var(--admin-fg-muted)]">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </span>
          <CardTitle className="text-sm">Tab {index + 1}: {tab.tab_label || '(未命名)'}</CardTitle>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {onMoveUp && (
            <Button variant="secondary" size="sm" className="text-xs px-1.5" onClick={onMoveUp} title="上移">↑</Button>
          )}
          {onMoveDown && (
            <Button variant="secondary" size="sm" className="text-xs px-1.5" onClick={onMoveDown} title="下移">↓</Button>
          )}
          <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>删除 Tab</Button>
        </div>
      </CardHeader>
      {expanded && (
      <CardBody className="space-y-3 pt-0">
        {/* 基础字段 */}
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Tab Label（标题）</div>
            <Input value={tab.tab_label} onChange={(e) => onChange({ ...tab, tab_label: e.target.value })} placeholder="NPI Solutions" />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Panel Style</div>
            <select
              className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)] outline-none focus:border-[var(--admin-primary)]"
              value={tab.panel_style}
              onChange={(e) => onChange({ ...tab, panel_style: e.target.value as any })}
            >
              <option value="npi">NPI（步骤时间轴）</option>
              <option value="manufacturing">Manufacturing（服务卡片）</option>
            </select>
          </label>
        </div>

        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">描述</div>
          <Input value={tab.panel_desc} onChange={(e) => onChange({ ...tab, panel_desc: e.target.value })} placeholder="A one-stop product innovation service..." />
        </label>

        {/* NPI 样式：步骤 */}
        {isNpi && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Steps ({tab.steps.length})</div>
              <Button variant="secondary" size="sm" onClick={addStep}>添加 Step</Button>
            </div>
            <div className="space-y-2">
              {tab.steps.map((step, si) => (
                <StepEditor key={si} step={step} index={si}
                  onChange={(next) => { const steps = [...tab.steps]; steps[si] = next; onChange({ ...tab, steps }); }}
                  onRemove={() => { const steps = tab.steps.filter((_, i) => i !== si); onChange({ ...tab, steps }); }}
                />
              ))}
              {tab.steps.length === 0 && <div className="text-sm text-[var(--admin-fg-muted)] py-3 text-center">暂无步骤</div>}
            </div>
          </div>
        )}

        {/* Manufacturing 样式：服务卡片 */}
        {!isNpi && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">服务卡片 ({tab.cards.length})</div>
              <Button variant="secondary" size="sm" onClick={addCard}>添加卡片</Button>
            </div>
            <div className="space-y-2">
              {tab.cards.map((card, ci) => (
                <CardEditor key={ci} card={card} index={ci}
                  onChange={(next) => { const cards = [...tab.cards]; cards[ci] = next; onChange({ ...tab, cards }); }}
                  onRemove={() => { const cards = tab.cards.filter((_, i) => i !== ci); onChange({ ...tab, cards }); }}
                />
              ))}
              {tab.cards.length === 0 && <div className="text-sm text-[var(--admin-fg-muted)] py-3 text-center">暂无卡片</div>}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-[var(--admin-border-subtle)] pt-3">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-2">CTAs</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block">
                <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">CTA1 文案</div>
                <Input value={tab.cta1_label} onChange={(e) => onChange({ ...tab, cta1_label: e.target.value })} placeholder="Explore NPI solutions" />
              </label>
              <label className="block">
                <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">CTA1 链接</div>
                <Input value={tab.cta1_href} onChange={(e) => onChange({ ...tab, cta1_href: e.target.value })} placeholder="/npi/" />
              </label>
            </div>
            <div className="space-y-1.5">
              <label className="block">
                <div className="text-[10px] text-[var(--admin-fg-muted)] mb-0.5">CTA2 链接（固定 "Get Instant Quote"）</div>
                <Input value={tab.cta2_href} onChange={(e) => onChange({ ...tab, cta2_href: e.target.value })} placeholder="/quote/" />
              </label>
            </div>
          </div>
        </div>

        {/* 图片 */}
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Image URL</div>
          <Input value={tab.image_url} onChange={(e) => onChange({ ...tab, image_url: e.target.value })} placeholder="右侧联动图片 URL" />
        </label>
      </CardBody>
      )}
    </Card>
  );
}

// ── 主入口 ──
export default function MegaMenuEditorSolutions({ navItem, onChange }: Props) {
  const addTab = () => {
    onChange({
      ...navItem,
      tabs: [...navItem.tabs, { tab_label: '', panel_style: 'npi', panel_desc: '', steps: [], cards: [], cta1_label: '', cta1_href: '', cta2_href: '', image_url: '' }]
    });
  };

  const moveTab = (from: number, to: number) => {
    const tabs = [...navItem.tabs];
    const [moved] = tabs.splice(from, 1);
    tabs.splice(to, 0, moved);
    onChange({ ...navItem, tabs });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Solutions Mega Menu</h3>
          <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">Tabs ({navItem.tabs.length})</p>
        </div>
        <Button variant="secondary" onClick={addTab}>添加 Tab</Button>
      </div>

      <div className="space-y-3">
        {navItem.tabs.map((tab, ti) => (
          <TabEditor key={ti} tab={tab} index={ti}
            onMoveUp={ti > 0 ? () => moveTab(ti, ti - 1) : undefined}
            onMoveDown={ti < navItem.tabs.length - 1 ? () => moveTab(ti, ti + 1) : undefined}
            onChange={(next) => { const tabs = [...navItem.tabs]; tabs[ti] = next; onChange({ ...navItem, tabs }); }}
            onRemove={() => { const tabs = navItem.tabs.filter((_, i) => i !== ti); onChange({ ...navItem, tabs }); }}
          />
        ))}
        {navItem.tabs.length === 0 && (
          <div className="text-sm text-[var(--admin-fg-muted)] py-6 text-center border border-dashed border-[var(--admin-border)] rounded-lg">
            暂无 Tab，点击上方按钮添加
          </div>
        )}
      </div>
    </div>
  );
}