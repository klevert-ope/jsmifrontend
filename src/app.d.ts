// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		module 'svelte-icons/*';
		declare module 'gsap/types/*';
		module '@sveltejs/kit/*';
		module 'svelte/*';
		module 'leaflet/*';
		declare module '@types/dompurify/*';
		declare module '@types/quill/*';
	}
}

export {};
