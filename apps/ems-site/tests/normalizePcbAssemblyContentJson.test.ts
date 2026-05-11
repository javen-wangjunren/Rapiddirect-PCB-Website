import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizePcbAssemblyContentJson } from '../src/content/normalize/pcb-assembly.ts';

test('normalizePcbAssemblyContentJson converts capability card body array to {items:[]}', () => {
  const out = normalizePcbAssemblyContentJson({
    capability: {
      title: 't',
      desc: 'd',
      gallery: [],
      tabs: [{ label: 'L', cards: [{ title: 'C', icon_url: '', body: ['a', 'b'] }] }]
    }
  } as any) as any;

  assert.deepEqual(out.capability.tabs[0].cards[0].body.items, ['a', 'b']);
});

test('normalizePcbAssemblyContentJson fills missing body/items as empty array', () => {
  const out = normalizePcbAssemblyContentJson({
    capability: {
      title: 't',
      desc: 'd',
      gallery: [],
      tabs: [{ label: 'L', cards: [{ title: 'C', icon_url: '' }] }]
    }
  } as any) as any;

  assert.deepEqual(out.capability.tabs[0].cards[0].body.items, []);
});

test('normalizePcbAssemblyContentJson fills missing industry asset urls as empty strings', () => {
  const out = normalizePcbAssemblyContentJson({
    industry: {
      title: 'Industries',
      description: 'desc',
      items: [{ tab: { id: 'a', name: 'A' }, card: { title: 't', description: { paragraph: 'p', list: [] }, cta: { label: 'L', href: '/x' } } }]
    }
  } as any) as any;

  assert.equal(out.industry.items[0].tab.icon_url, '');
  assert.equal(out.industry.items[0].card.image_url, '');
});
