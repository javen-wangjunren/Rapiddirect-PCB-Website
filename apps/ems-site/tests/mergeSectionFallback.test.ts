import assert from 'node:assert/strict';
import test from 'node:test';

import { emsHomeDefaults } from '../src/content/defaults/ems.ts';
import { mergeSectionFallback } from '../src/lib/supabase/mappers.ts';

test('mergeSectionFallback keeps fallback arrays when section is partial', () => {
  const data = mergeSectionFallback(emsHomeDefaults as any, {
    services: { title: 'X', description: 'Y' }
  });

  assert.equal(data.services.title, 'X');
  assert.equal(data.services.description, 'Y');
  assert.ok(Array.isArray(data.services.items));
  assert.equal(data.services.items.length, emsHomeDefaults.services.items.length);
});

test('mergeSectionFallback keeps fallback arrays when input array is null', () => {
  const data = mergeSectionFallback(emsHomeDefaults as any, {
    services: { items: null }
  });

  assert.ok(Array.isArray(data.services.items));
  assert.equal(data.services.items.length, emsHomeDefaults.services.items.length);
});

