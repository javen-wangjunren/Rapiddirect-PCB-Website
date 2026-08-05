import { useState } from 'react';
import type { NavItemData, CapSectionData, CapTabData, CardData, CapFooterData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';
import { cn } from '../ui/cn';

interface Props {
  navItem: NavItemData;
  onChange: (next: NavItemData) => void;
}

// ── 卡片编辑器 ──
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
        <Input
          placeholder="Label (e.g. CNC Machining)"
          value={card.label}
          onChange={(e) => onChange({ ...card, label: e.target.value })}
        />
        <Input
          placeholder="Href (e.g. /cnc-machining/)"
          value={card.href}
          onChange={(e) => onChange({ ...card, href: e.target.value })}
        />
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>
        删除
      </Button>
    </div>
  );
}

// ── Tab 编辑器 ──
function TabEditor({ tab, onChange, onRemove, onMoveUp, onMoveDown, index }: {
  tab: CapTabData;
  onChange: (next: CapTabData) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

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
          <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>
            删除 Tab
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardBody className="space-y-3 pt-0">
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Tab Label（同时作为右侧面板标题）</div>
              <Input
                value={tab.tab_label}
                onChange={(e) => onChange({ ...tab, tab_label: e.target.value })}
                placeholder="e.g. Machining"
              />
            </label>
            <label className="block">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Image URL</div>
              <Input
                value={tab.image_url}
                onChange={(e) => onChange({ ...tab, image_url: e.target.value })}
                placeholder="右侧联动图片 URL"
              />
            </label>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tab.is_muted}
              onChange={(e) => onChange({ ...tab, is_muted: e.target.checked })}
              className="h-4 w-4 rounded border-[var(--admin-border)] text-[var(--admin-primary)]"
            />
            <span className="text-sm text-[var(--admin-fg)]">灰显（Muted Tab）</span>
          </label>

          {/* 服务卡片列表 */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">服务卡片 ({tab.cards.length})</div>
              <Button variant="secondary" size="sm" onClick={addCard}>添加卡片</Button>
            </div>
            <div className="space-y-2">
              {tab.cards.map((card, ci) => (
                <CardEditor
                  key={ci}
                  card={card}
                  index={ci}
                  onChange={(next) => {
                    const cards = [...tab.cards];
                    cards[ci] = next;
                    onChange({ ...tab, cards });
                  }}
                  onRemove={() => {
                    const cards = tab.cards.filter((_, i) => i !== ci);
                    onChange({ ...tab, cards });
                  }}
                />
              ))}
              {tab.cards.length === 0 && (
                <div className="text-sm text-[var(--admin-fg-muted)] py-3 text-center">暂无服务卡片，点击上方按钮添加</div>
              )}
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

// ── Section 编辑器 ──
function SectionEditor({ section, onChange, onRemove, onMoveUp, onMoveDown, index }: {
  section: CapSectionData;
  onChange: (next: CapSectionData) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  const addTab = () => {
    onChange({
      ...section,
      tabs: [...section.tabs, { tab_label: '', is_muted: false, cards: [], image_url: '' }]
    });
  };

  const moveTab = (from: number, to: number) => {
    const tabs = [...section.tabs];
    const [moved] = tabs.splice(from, 1);
    tabs.splice(to, 0, moved);
    onChange({ ...section, tabs });
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
          <CardTitle className="text-base">Section {index + 1}: {section.section_label || '(未命名)'}</CardTitle>
        </div>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {onMoveUp && (
            <Button variant="secondary" size="sm" className="text-xs px-1.5" onClick={onMoveUp} title="上移">↑</Button>
          )}
          {onMoveDown && (
            <Button variant="secondary" size="sm" className="text-xs px-1.5" onClick={onMoveDown} title="下移">↓</Button>
          )}
          <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>
            删除 Section
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardBody className="space-y-4 pt-0">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Section Label（一级分类名）</div>
            <Input
              value={section.section_label}
              onChange={(e) => onChange({ ...section, section_label: e.target.value })}
              placeholder="e.g. Mechanical Manufacturing"
            />
          </label>

          {/* Tabs 列表 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Tabs ({section.tabs.length})</div>
              <Button variant="secondary" size="sm" onClick={addTab}>添加 Tab</Button>
            </div>
            <div className="space-y-3">
              {section.tabs.map((tab, ti) => (
                <TabEditor
                  key={ti}
                  tab={tab}
                  index={ti}
                  onMoveUp={ti > 0 ? () => moveTab(ti, ti - 1) : undefined}
                  onMoveDown={ti < section.tabs.length - 1 ? () => moveTab(ti, ti + 1) : undefined}
                  onChange={(next) => {
                    const tabs = [...section.tabs];
                    tabs[ti] = next;
                    onChange({ ...section, tabs });
                  }}
                  onRemove={() => {
                    const tabs = section.tabs.filter((_, i) => i !== ti);
                    onChange({ ...section, tabs });
                  }}
                />
              ))}
              {section.tabs.length === 0 && (
                <div className="text-sm text-[var(--admin-fg-muted)] py-4 text-center">暂无 Tab，点击上方按钮添加</div>
              )}
            </div>
          </div>
        </CardBody>
      )}
    </Card>
  );
}

// ── Footer 编辑器 ──
function FooterEditor({ footer, onChange }: {
  footer: CapFooterData;
  onChange: (next: CapFooterData) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">底部 CTA（文案固定，仅编辑链接）</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">"Browse all capabilities →" 链接</div>
          <Input
            value={footer.browse_all_href}
            onChange={(e) => onChange({ ...footer, browse_all_href: e.target.value })}
            placeholder="e.g. /capabilities/"
          />
        </label>
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">"Get Instant Quote →" 链接</div>
          <Input
            value={footer.get_quote_href}
            onChange={(e) => onChange({ ...footer, get_quote_href: e.target.value })}
            placeholder="e.g. /quote/"
          />
        </label>
      </CardBody>
    </Card>
  );
}

// ── 主入口 ──
export default function MegaMenuEditorCapabilities({ navItem, onChange }: Props) {
  const addSection = () => {
    onChange({
      ...navItem,
      sections: [...navItem.sections, { section_label: '', tabs: [] }]
    });
  };

  const moveSection = (from: number, to: number) => {
    const sections = [...navItem.sections];
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    onChange({ ...navItem, sections });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Capabilities Mega Menu</h3>
          <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">
            Sections ({navItem.sections.length}) · Tabs ({navItem.sections.reduce((sum, s) => sum + s.tabs.length, 0)})
          </p>
        </div>
        <Button variant="secondary" onClick={addSection}>添加 Section</Button>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {navItem.sections.map((section, si) => (
          <SectionEditor
            key={si}
            section={section}
            index={si}
            onMoveUp={si > 0 ? () => moveSection(si, si - 1) : undefined}
            onMoveDown={si < navItem.sections.length - 1 ? () => moveSection(si, si + 1) : undefined}
            onChange={(next) => {
              const sections = [...navItem.sections];
              sections[si] = next;
              onChange({ ...navItem, sections });
            }}
            onRemove={() => {
              const sections = navItem.sections.filter((_, i) => i !== si);
              onChange({ ...navItem, sections });
            }}
          />
        ))}
        {navItem.sections.length === 0 && (
          <div className="text-sm text-[var(--admin-fg-muted)] py-6 text-center border border-dashed border-[var(--admin-border)] rounded-lg">
            暂无 Section，点击上方按钮添加
          </div>
        )}
      </div>

      {/* Footer */}
      <FooterEditor
        footer={navItem.footer}
        onChange={(next) => onChange({ ...navItem, footer: next })}
      />
    </div>
  );
}
