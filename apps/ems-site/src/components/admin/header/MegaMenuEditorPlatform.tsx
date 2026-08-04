import type { NavItemData, PlatformCardData, PlatformLinkData } from '../../../content/schemas/site-header';
import { Button, Input, Card, CardBody, CardHeader, CardTitle } from '../ui';

interface Props {
  navItem: NavItemData;
  onChange: (next: NavItemData) => void;
}

function LinkEditor({ link, onChange, onRemove, index }: {
  link: PlatformLinkData; onChange: (next: PlatformLinkData) => void; onRemove: () => void; index: number;
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

function CardEditor({ card, onChange, onRemove, index }: {
  card: PlatformCardData; onChange: (next: PlatformCardData) => void; onRemove: () => void; index: number;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">Card {index + 1}: {card.title || '(未命名)'}</CardTitle>
        <Button variant="secondary" size="sm" className="text-[var(--admin-danger)]" onClick={onRemove}>删除</Button>
      </CardHeader>
      <CardBody className="space-y-3 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Title</div>
            <Input value={card.title} onChange={(e) => onChange({ ...card, title: e.target.value })} />
          </label>
          <label className="block">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Image URL</div>
            <Input value={card.image_url} onChange={(e) => onChange({ ...card, image_url: e.target.value })} />
          </label>
        </div>
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">Description</div>
          <Input value={card.description} onChange={(e) => onChange({ ...card, description: e.target.value })} />
        </label>
        <label className="block">
          <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">List Style</div>
          <select className="w-full rounded border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2 text-sm text-[var(--admin-fg)]" value={card.list_style} onChange={(e) => onChange({ ...card, list_style: e.target.value as any })}>
            <option value="simple">Simple（bullet list）</option>
            <option value="timeline">Timeline（numbered flow）</option>
          </select>
        </label>
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-medium text-[var(--admin-fg-muted)]">Links ({card.links.length})</div>
            <Button variant="secondary" size="sm" onClick={() => onChange({ ...card, links: [...card.links, { label: '', href: '' }] })}>添加</Button>
          </div>
          <div className="space-y-2">
            {card.links.map((l, i) => (
              <LinkEditor key={i} link={l} index={i}
                onChange={(next) => { const list = [...card.links]; list[i] = next; onChange({ ...card, links: list }); }}
                onRemove={() => { const list = card.links.filter((_, j) => j !== i); onChange({ ...card, links: list }); }}
              />
            ))}
          </div>
        </div>
        {card.list_style === 'timeline' && (
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">CTA Label</div>
              <Input value={card.cta_label} onChange={(e) => onChange({ ...card, cta_label: e.target.value })} />
            </label>
            <label className="block">
              <div className="text-xs font-medium text-[var(--admin-fg-muted)] mb-1">CTA Href</div>
              <Input value={card.cta_href} onChange={(e) => onChange({ ...card, cta_href: e.target.value })} />
            </label>
          </div>
        )}
      </CardBody>
    </Card>
  );
}

export default function MegaMenuEditorPlatform({ navItem, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-[var(--admin-fg)]">Platform Mega Menu</h3>
          <p className="text-xs text-[var(--admin-fg-muted)] mt-0.5">{navItem.platform_cards.length} cards</p>
        </div>
        <Button variant="secondary" onClick={() => onChange({ ...navItem, platform_cards: [...navItem.platform_cards, { image_url: '', title: '', description: '', links: [], list_style: 'simple', cta_label: '', cta_href: '' }] })}>添加 Card</Button>
      </div>
      <div className="space-y-3">
        {navItem.platform_cards.map((card, i) => (
          <CardEditor key={i} card={card} index={i}
            onChange={(next) => { const list = [...navItem.platform_cards]; list[i] = next; onChange({ ...navItem, platform_cards: list }); }}
            onRemove={() => { const list = navItem.platform_cards.filter((_, j) => j !== i); onChange({ ...navItem, platform_cards: list }); }}
          />
        ))}
      </div>
    </div>
  );
}