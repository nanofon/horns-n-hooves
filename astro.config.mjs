// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

import node from '@astrojs/node';

const isBuild = process.argv.includes('build');
const basePath = isBuild && process.env.BASE_URL ? process.env.BASE_URL : '/';

if (isBuild) {
  console.log(`Astro build base path set to: ${basePath}`);
}

// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  base: basePath,
  site: 'https://nanofon.github.io',

  vite: {
    resolve: {
      alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react/jsx-runtime': 'preact/jsx-runtime',
      }
    }
  },

  adapter: node({
    mode: 'standalone'
  })
});