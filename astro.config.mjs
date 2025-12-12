// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://deliziaalessandro.it',
  adapter: cloudflare(),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), mdx(), sitemap()],
});