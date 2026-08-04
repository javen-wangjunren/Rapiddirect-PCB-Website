import type { NavItemData, AboutLinkGroupData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';

interface Props { navItem: NavItemData; onChange: (next: NavItemData) => void; }

function LinkEditor({ link, onChange, onRemove, index }: {
  link: { label: string; href: string }; onChange: (next: { label: string; href: string }) => void; onRemove: () => void; index: number;
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

function GroupEditor({ group, onChange, onRemove, index }: {
  group: AboutLinkGroupData; onChange: (next: AboutLinkGroupData) => void; onRemove: () => void; index: number;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Group {index + 1}: {group.group_title || '(未命名)'}</CardTitle>
        <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>删除</Button>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Title</div>
          <Input value={group.group_title} onChange={(e) => onChange({ ...group, group_title: e.target.value })} />
        </label>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Links ({group.links.length})</div>
            <Button variant="secondary" size="sm" onClick={() => onChange({ ...group, links: [...group.links, { label: '', href: '' }] })}>添加</Button>
          </div>
          <div className="space-y-2">
            {group.links.map((link, i) => (
              <LinkEditor key={i} link={link} index={i}
                onChange={(next) => { const list = [...group.links]; list[i] = next; onChange({ ...group, links: list }); }}
                onRemove={() => { const list = group.links.filter((_, j) => j !== i); onChange({ ...group, links: list }); }}
              />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default function MegaMenuEditorAbout({ navItem, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[var(--admin-fg)]">About Mega Menu</h3>
        <Button variant="secondary" onClick={() => onChange({ ...navItem, about_link_groups: [...navItem.about_link_groups, { group_title: '', links: [] }] })}>添加 Group</Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="block"><div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Banner Image URL</div>
          <Input value={navItem.about_banner_image_url} onChange={(e) => onChange({ ...navItem, about_banner_image_url: e.target.value })} />
        </label>
        <label className="block"><div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Banner Title</div>
          <Input value={navItem.about_banner_title} onChange={(e) => onChange({ ...navItem, about_banner_title: e.target.value })} />
        </label>
      </div>
      <label className="block"><div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Banner Description</div>
        <Input value={navItem.about_banner_desc} onChange={(e) => onChange({ ...navItem, about_banner_desc: e.target.value })} />
      </label>
      <div className="space-y-3">
        {navItem.about_link_groups.map((group, i) => (
          <GroupEditor key={i} group={group} index={i}
            onChange={(next) => { const list = [...navItem.about_link_groups]; list[i] = next; onChange({ ...navItem, about_link_groups: list }); }}
            onRemove={() => { const list = navItem.about_link_groups.filter((_, j) => j !== i); onChange({ ...navItem, about_link_groups: list }); }}
          />
        ))}
      </div>
    </div>
  );
}