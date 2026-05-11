import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeEmsHomeContentJson } from '../src/content/normalize/ems.ts';

test('normalizeEmsHomeContentJson converts description string to paragraph object', () => {
  const out = normalizeEmsHomeContentJson({
    services: {
      title: 't',
      description: 'd',
      items: [{ name: 'PCB', description: 'hello', cta: { label: 'L', href: '/x' } }]
    }
  } as any) as any;

  assert.equal(out.services.items[0].description.kind, 'paragraph');
  assert.equal(out.services.items[0].description.text, 'hello');
  assert.deepEqual(out.services.items[0].description.items, []);
});

test('normalizeEmsHomeContentJson converts description string[] with one item to paragraph', () => {
  const out = normalizeEmsHomeContentJson({
    services: {
      title: 't',
      description: 'd',
      items: [{ name: 'PCB', description: ['hello'], cta: { label: 'L', href: '/x' } }]
    }
  } as any) as any;

  assert.equal(out.services.items[0].description.kind, 'paragraph');
  assert.equal(out.services.items[0].description.text, 'hello');
  assert.deepEqual(out.services.items[0].description.items, []);
});

test('normalizeEmsHomeContentJson converts description string[] with many items to list', () => {
  const out = normalizeEmsHomeContentJson({
    services: {
      title: 't',
      description: 'd',
      items: [{ name: 'PCB', description: ['a', 'b'], cta: { label: 'L', href: '/x' } }]
    }
  } as any) as any;

  assert.equal(out.services.items[0].description.kind, 'list');
  assert.equal(out.services.items[0].description.text, '');
  assert.deepEqual(out.services.items[0].description.items, ['a', 'b']);
});

