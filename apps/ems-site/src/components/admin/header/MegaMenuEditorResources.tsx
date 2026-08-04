import type { NavItemData, ResourceSectionData, ResourceLinkData, ResourceServiceItemData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';

interface Props {
  navItem: NavItemData;
  onChange: (next: NavItemData) => void;
}

function LinkEditor({ link, onChange, onRemove, index }: {
  link: ResourceLinkData; onChange: (next: ResourceLinkData) => void; onRemove: () => void; index: number;
}) {
  return (
    <div className="flex items-start gap-2 rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2">
      <span className="mt-2 text-xs text-[var(--admin-fg-muted)] w-5 text-right">{index + 1}.</span>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <Input placeholder="Label" value={link.label} onChange={(e) => onChange({ ...link, label: e.target.value })} />
        <Input placeholder="Href" value={link.href} onChange={(e) => onChange({ ...link, href: e.target.value })} />
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>删除</Button>
    </div>
  );
}

function ServiceItemEditor({ item, onChange, onRemove, index }: {
  item: ResourceServiceItemData; onChange: (next: ResourceServiceItemData) => void; onRemove: () => void; index: number;
}) {
  return (
    <div className="flex items-start gap-2 rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2">
      <span className="mt-2 text-xs text-[var(--admin-fg-muted)] w-5 text-right">{index + 1}.</span>
      <div className="flex-1 space-y-1.5">
        <Input placeholder="Title" value={item.title} onChange={(e) => onChange({ ...item, title: e.target.value })} />
        <Input placeholder="Description" value={item.desc} onChange={(e) => onChange({ ...item, desc: e.target.value })} />
        <Input placeholder="Href" value={item.href} onChange={(e) => onChange({ ...item, href: e.target.value })} />
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>删除</Button>
    </div>
  );
}

function SectionEditor({ section, onChange, onRemove, index }: {
  section: ResourceSectionData; onChange: (next: ResourceSectionData) => void; onRemove: () => void; index: number;
}) {
  const isService = section.link_style === 'service';
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Section {index + 1}: {section.section_title || '(未命名)'}</CardTitle>
        <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>删除</Button>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Title</div>
            <Input value={section.section_title} onChange={(e) => onChange({ ...section, section_title: e.target.value })} />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Style</div>
            <select className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm" value={section.link_style} onChange={(e) => onChange({ ...section, link_style: e.target.value as any })}>
              <option value="simple">Simple（链接列表）</option>
              <option value="service">Service（标题+描述卡片）</option>
            </select>
          </label>
        </div>

        {isService ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Service Items ({section.service_items.length})</div>
              <Button variant="secondary" size="sm" onClick={() => onChange({ ...section, service_items: [...section.service_items, { title: '', desc: '', href: '' }] })}>添加</Button>
            </div>
            <div className="space-y-2">
              {section.service_items.map((item, i) => (
                <ServiceItemEditor key={i} item={item} index={i}
                  onChange={(next) => { const list = [...section.service_items]; list[i] = next; onChange({ ...section, service_items: list }); }}
                  onRemove={() => { const list = section.service_items.filter((_, j) => j !== i); onChange({ ...section, service_items: list }); }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Links ({section.links.length})</div>
              <Button variant="secondary" size="sm" onClick={() => onChange({ ...section, links: [...section.links, { label: '', href: '' }] })}>添加</Button>
            </div>
            <div className="space-y-2">
              {section.links.map((link, i) => (
                <LinkEditor key={i} link={link} index={i}
                  onChange={(next) => { const list = [...section.links]; list[i] = next; onChange({ ...section, links: list }); }}
                  onRemove={() => { const list = section.links.filter((_, j) => j !== i); onChange({ ...section, links: list }); }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Footer Label</div>
            <Input value={section.footer_label} onChange={(e) => onChange({ ...section, footer_label: e.target.value })} />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Footer Href</div>
            <Input value={section.footer_href} onChange={(e) => onChange({ ...section, footer_href: e.target.value })} />
          </label>
        </div>
      </CardBody>
    </Card>
  );
}

export default function MegaMenuEditorResources({ navItem, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Resources Mega Menu</h3>
          <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">{navItem.resource_sections.length} sections</p>
        </div>
        <Button variant="secondary" onClick={() => onChange({ ...navItem, resource_sections: [...navItem.resource_sections, { section_title: '', link_style: 'simple', links: [], service_items: [], footer_label: '', footer_href: '' }] })}>添加 Section</Button>
      </div>
      <div className="space-y-3">
        {navItem.resource_sections.map((section, i) => (
          <SectionEditor key={i} section={section} index={i}
            onChange={(next) => { const list = [...navItem.resource_sections]; list[i] = next; onChange({ ...navItem, resource_sections: list }); }}
            onRemove={() => { const list = navItem.resource_sections.filter((_, j) => j !== i); onChange({ ...navItem, resource_sections: list }); }}
          />
        ))}
      </div>
    </div>
  );
}