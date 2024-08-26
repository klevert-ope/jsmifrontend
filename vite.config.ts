import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: [
			'gsap',
			'gsap/dist/ScrollTrigger',
			'gsap/dist/SplitText',
			'gsap/dist/ScrollToPlugin'
		]
	},
	server: {
		fs: {
			allow: ['static']
		},
		port: 3000,
		strictPort: true,
		host: true,
		origin: 'http://0.0.0.0:3000'
	}
});
