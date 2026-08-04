import type { NavItemData, IndustryItemData, CaseStudyData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';

interface Props {
  navItem: NavItemData;
  onChange: (next: NavItemData) => void;
}

function IndustryEditor({ item, onChange, onRemove, index }: {
  item: IndustryItemData;
  onChange: (next: IndustryItemData) => void;
  onRemove: () => void;
  index: number;
}) {
  return (
    <div className="flex items-start gap-2 rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2">
      <span className="mt-2 text-xs text-[var(--admin-fg-muted)] w-5 text-right">{index + 1}.</span>
      <div className="flex-1 space-y-1.5">
        <div className="grid grid-cols-3 gap-2">
          <Input placeholder="Name" value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} />
          <Input placeholder="Href" value={item.href} onChange={(e) => onChange({ ...item, href: e.target.value })} />
          <Input placeholder="Icon SVG" value={item.icon_svg} onChange={(e) => onChange({ ...item, icon_svg: e.target.value })} />
        </div>
      </div>
      <Button variant="secondary" size="sm" className="text-[var(--admin-danger)] mt-1" onClick={onRemove}>删除</Button>
    </div>
  );
}

function CaseStudyEditor({ data, onChange }: { data: CaseStudyData; onChange: (next: CaseStudyData) => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Case Study Card</CardTitle>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Image URL</div>
            <Input value={data.image_url} onChange={(e) => onChange({ ...data, image_url: e.target.value })} />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Tag</div>
            <Input value={data.tag} onChange={(e) => onChange({ ...data, tag: e.target.value })} placeholder="Case Studies" />
          </label>
        </div>
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Title</div>
          <Input value={data.title} onChange={(e) => onChange({ ...data, title: e.target.value })} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">CTA Label</div>
            <Input value={data.cta_label} onChange={(e) => onChange({ ...data, cta_label: e.target.value })} />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">CTA Href</div>
            <Input value={data.cta_href} onChange={(e) => onChange({ ...data, cta_href: e.target.value })} />
          </label>
        </div>
      </CardBody>
    </Card>
  );
}

export default function MegaMenuEditorIndustries({ navItem, onChange }: Props) {
  const addIndustry = () => {
    onChange({ ...navItem, industries: [...navItem.industries, { label: '', href: '', icon_svg: '' }] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Industries Mega Menu</h3>
          <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">{navItem.industries.length} industries</p>
        </div>
        <Button variant="secondary" onClick={addIndustry}>添加 Industry</Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Header Title</div>
          <Input value={navItem.industries_header_title} onChange={(e) => onChange({ ...navItem, industries_header_title: e.target.value })} />
        </label>
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">"Browse all industries →" Href</div>
          <Input value={navItem.industries_browse_href} onChange={(e) => onChange({ ...navItem, industries_browse_href: e.target.value })} />
        </label>
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Industries ({navItem.industries.length})</div>
        {navItem.industries.map((ind, i) => (
          <IndustryEditor key={i} item={ind} index={i}
            onChange={(next) => { const list = [...navItem.industries]; list[i] = next; onChange({ ...navItem, industries: list }); }}
            onRemove={() => { const list = navItem.industries.filter((_, j) => j !== i); onChange({ ...navItem, industries: list }); }}
          />
        ))}
        {navItem.industries.length === 0 && (
          <div className="text-sm text-[var(--admin-fg-muted)] py-3 text-center">暂无行业</div>
        )}
      </div>

      <CaseStudyEditor data={navItem.case_study} onChange={(next) => onChange({ ...navItem, case_study: next })} />
    </div>
  );
}