import assert from 'node:assert/strict';
import test from 'node:test';

import { normalizeSiteFooterContentJson } from '../src/content/normalize/site-footer.ts';

test('normalizeSiteFooterContentJson normalizes nested fields', () => {
  const out = normalizeSiteFooterContentJson({
    logo_url: 123,
    company_info: { phones: ['a', 1], email: 2, address_lines: ['x', null] },
    social_links: [{ platform: 'x', href: '/x' }, { platform: 1, href: 2 }],
    footer_bottom: { copyright: 3, legal_links: [{ label: 'L', href: '/h' }, { label: 1, href: 2 }] },
    menus: { capabilities: { title: 't', links: [{ label: 'A', href: '/a' }, { label: 1, href: 2 }] } }
  } as any) as any;

  assert.equal(out.logo_url, '');
  assert.deepEqual(out.company_info.phones, ['a']);
  assert.equal(out.company_info.email, '');
  assert.deepEqual(out.company_info.address_lines, ['x']);
  assert.deepEqual(out.social_links, [{ platform: 'x', href: '/x' }, { platform: '', href: '' }]);
  assert.equal(out.footer_bottom.copyright, '');
  assert.deepEqual(out.footer_bottom.legal_links, [{ label: 'L', href: '/h' }, { label: '', href: '' }]);
  assert.equal(out.menus.capabilities.title, 't');
  assert.deepEqual(out.menus.capabilities.links, [{ label: 'A', href: '/a' }, { label: '', href: '' }]);
});
