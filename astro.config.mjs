import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://blog.dongmu001.top',
  integrations: [mdx()],
  output: 'static',
});
