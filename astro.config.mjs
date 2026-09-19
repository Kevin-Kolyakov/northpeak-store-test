// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	// Static by default; /products/[slug] and /search opt into SSR
	// (`export const prerender = false`) so BUG-04's artificial delay is a
	// genuine per-request wait instead of a build-time no-op.
	adapter: cloudflare(),
});
