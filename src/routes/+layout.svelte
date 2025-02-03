<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/FooterContact.svelte';
	import DonateFloat from '$lib/DonateFloat.svelte';

	interface Navigation {
		complete: Promise<void>;
	}

	let { children } = $props();

	onNavigate((navigation: Navigation) => {
		if (!('startViewTransition' in document)) return;

		return new Promise<void>((resolve) => {
			(document as Document & {
				startViewTransition: Function
			}).startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{@render children()}
<Footer />
<DonateFloat />

