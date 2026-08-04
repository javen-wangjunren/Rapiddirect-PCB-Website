import { useMemo } from 'react';
import { siteHeaderSchema } from '../../content/schemas/site-header';
import type { NavItemData, SiteHeaderData } from '../../content/schemas/site-header';
import type { JsonValue } from '../../utils/jsonTree';
import { isObject } from '../../utils/jsonTree';
import SchemaForm from './SchemaForm';
import MegaMenuEditorCapabilities from './header/MegaMenuEditorCapabilities';
import MegaMenuEditorSolutions from './header/MegaMenuEditorSolutions';
import MegaMenuEditorIndustries from './header/MegaMenuEditorIndustries';
import MegaMenuEditorPlatform from './header/MegaMenuEditorPlatform';
import MegaMenuEditorResources from './header/MegaMenuEditorResources';
import MegaMenuEditorAbout from './header/MegaMenuEditorAbout';
import { Card, CardBody, CardHeader, CardTitle } from './ui';

export interface SiteHeaderEditorContentModulesProps {
  contentJson: JsonValue;
  onModuleChange: (key: string, next: JsonValue) => void;
  onContentReplace?: (next: JsonValue) => void;
}

// 提取顶部简单字段（logo / cta / top_banner），供 SchemaForm 渲染
const simpleFieldsSchema = {
  logo_url: 'string',
  cta_text: 'string',
  cta_href: 'string'
} as const;

// 从 contentJson 中提取简单字段
function extractSimpleFields(contentJson: JsonValue): Record<string, JsonValue> {
  if (!isObject(contentJson)) return {};
  const obj = contentJson as any;
  return {
    logo_url: obj.logo_url ?? '',
    cta_text: obj.cta_text ?? '',
    cta_href: obj.cta_href ?? ''
  };
}

// 从 contentJson 中提取 top_banner
function extractTopBanner(contentJson: JsonValue): JsonValue {
  if (!isObject(contentJson)) return {};
  return (contentJson as any).top_banner ?? {};
}

// 从 contentJson 中提取 nav_items
function extractNavItems(contentJson: JsonValue): NavItemData[] {
  if (!isObject(contentJson)) return [];
  const items = (contentJson as any).nav_items;
  return Array.isArray(items) ? items : [];
}

export default function SiteHeaderEditorContentModules({
  contentJson,
  onContentReplace
}: SiteHeaderEditorContentModulesProps) {
  // 确保 contentJson 是对象
  const safeContent = useMemo(() => (isObject(contentJson) ? (contentJson as any) : {}), [contentJson]);

  const simpleFields = useMemo(() => extractSimpleFields(safeContent), [safeContent]);
  const topBanner = useMemo(() => extractTopBanner(safeContent), [safeContent]);
  const navItems = useMemo(() => extractNavItems(safeContent), [safeContent]);

  // 更新简单字段
  const updateSimpleFields = (next: JsonValue) => {
    if (!isObject(next)) return;
    const n = next as any;
    onContentReplace?.({
      ...safeContent,
      logo_url: n.logo_url ?? '',
      cta_text: n.cta_text ?? '',
      cta_href: n.cta_href ?? ''
    });
  };

  // 更新 top_banner
  const updateTopBanner = (next: JsonValue) => {
    onContentReplace?.({ ...safeContent, top_banner: next });
  };

  // 更新某个 nav_item
  const updateNavItem = (index: number, next: NavItemData) => {
    const items = [...navItems];
    items[index] = next;
    onContentReplace?.({ ...safeContent, nav_items: items });
  };

  return (
    <div className="space-y-4">
      {/* 品牌 + CTA */}
      <Card>
        <CardHeader>
          <CardTitle>Brand & CTA</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 pt-0">
          <SchemaForm
            schema={simpleFieldsSchema as any}
            value={simpleFields as any}
            onChange={updateSimpleFields}
            pathLabel="Brand"
          />
        </CardBody>
      </Card>

      {/* 顶部通知栏 */}
      <Card>
        <CardHeader>
          <CardTitle>Top Banner</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3 pt-0">
          <SchemaForm
            schema={siteHeaderSchema.top_banner as any}
            value={topBanner}
            onChange={updateTopBanner}
            pathLabel="Top Banner"
          />
        </CardBody>
      </Card>

      {/* Nav Items */}
      {navItems.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Nav Item {index + 1}: {item.label || '(未命名)'}</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3 pt-0">
            {/* 基础字段 */}
            <div className="grid grid-cols-3 gap-3">
              <label className="block">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Label</div>
                <input
                  className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)] outline-none focus:border-[var(--admin-primary)]"
                  value={item.label}
                  onChange={(e) => updateNavItem(index, { ...item, label: e.target.value })}
                />
              </label>
              <label className="block">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Href</div>
                <input
                  className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)] outline-none focus:border-[var(--admin-primary)]"
                  value={item.href}
                  onChange={(e) => updateNavItem(index, { ...item, href: e.target.value })}
                />
              </label>
              <label className="block">
                <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Mega Type</div>
                <select
                  className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)] outline-none focus:border-[var(--admin-primary)]"
                  value={item.mega_type}
                  onChange={(e) => updateNavItem(index, { ...item, mega_type: e.target.value as any })}
                >
                  <option value="capabilities">capabilities</option>
                  <option value="solutions">solutions</option>
                  <option value="industries">industries</option>
                  <option value="platform">platform</option>
                  <option value="resources">resources</option>
                  <option value="about">about</option>
                </select>
              </label>
            </div>

            {/* Mega Menu 编辑器（按类型分发） */}
            {item.mega_type === 'capabilities' && (
              <MegaMenuEditorCapabilities
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type === 'solutions' && (
              <MegaMenuEditorSolutions
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type === 'industries' && (
              <MegaMenuEditorIndustries
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type === 'platform' && (
              <MegaMenuEditorPlatform
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type === 'resources' && (
              <MegaMenuEditorResources
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type === 'about' && (
              <MegaMenuEditorAbout
                navItem={item}
                onChange={(next) => updateNavItem(index, next)}
              />
            )}
            {item.mega_type !== 'capabilities' && item.mega_type !== 'solutions' && item.mega_type !== 'industries' && item.mega_type !== 'platform' && item.mega_type !== 'resources' && item.mega_type !== 'about' && (
              <div className="text-sm text-[var(--admin-fg-muted)] py-4 text-center border border-dashed border-[var(--admin-border)] rounded-lg">
                {item.mega_type} 编辑器尚未实现
              </div>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
}