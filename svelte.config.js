import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		preprocess({
			typescript: true
		})
	],
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: '',
			polyfill: true
		})
	}
};

export default config;
