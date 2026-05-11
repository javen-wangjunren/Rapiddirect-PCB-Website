// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://rapiddirect.com',
  base: '/ems',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  devToolbar: { enabled: false },
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
