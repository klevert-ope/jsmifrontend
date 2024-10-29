<svelte:head>
	<link href="https://fonts.cdnfonts.com/css/br-segma" rel="stylesheet">
	<link href="https://fonts.cdnfonts.com/css/waiting-summer" rel="stylesheet">
</svelte:head>

<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/FooterContact.svelte';
	import DonateFloat from '$lib/DonateFloat.svelte';


	interface Navigation {
		complete: Promise<void>;
	}

	let { children } = $props<{ children?: () => any }>();

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

{@render children?.()}
<Footer />
<DonateFloat />

<style global>
	:root {
		font-family: 'BR Segma', sans-serif;
		color: var(--black);
		background-color: var(--white);
		--white-black-fade: #333030;
		--white: #FCFCFD;
		--black: #141414;
		--yellow: #FFEA00;
		--blue: #1570EF;
		--small-max-width: 200px;
		--medium-max-width: 450px;
		--large-max-width: 600px;
		--xlarge-max-width: 800px;
		--xxlarge-max-width: 1000px;
		--lg-px40: 40px;
		--md-px20: 20px;
		--sm-px15: 15px;
		--xs-px10: 10px;
		}

	/* For browsers that support clamp and container queries */
	@supports (font-size: clamp(1rem, 1cqi, 1rem)) {
		:root {
			--font-size-sm: clamp(0.7rem, 0.2cqi + 0.6rem, 0.8rem);
			--font-size-base: clamp(0.8rem, 0.3cqi + 0.8rem, 1rem);
			--font-size-lg: clamp(1rem, 0.6cqi + 0.9rem, 1.3rem);
			--font-size-xl: clamp(1.3rem, 1cqi + 1.1rem, 1.8rem);
			--font-size-2xl: clamp(1.6rem, 1.5cqi + 1.3rem, 2.4rem);
			--font-size-3xl: clamp(2rem, 2.3cqi + 1.5rem, 3.2rem);
			--font-size-4xl: clamp(2.5rem, 3.4cqi + 1.8rem, 4.2rem);
			--font-size-5xl: clamp(3.2rem, 5cqi + 2.1rem, 5.6rem);
			--font-size-6xl: clamp(4rem, 7.2cqi + 2.4rem, 7.5rem);
			}
		}

	/* For browsers that don't support clamp or container queries */
	@supports not (font-size: clamp(1rem, 1cqi, 1rem)) {
		:root {
			--font-size-sm: 0.7rem;
			--font-size-base: 0.8rem;
			--font-size-lg: 1rem;
			--font-size-xl: 1.3rem;
			--font-size-2xl: 1.6rem;
			--font-size-3xl: 2rem;
			--font-size-4xl: 2.5rem;
			--font-size-5xl: 3.2rem;
			--font-size-6xl: 4rem;
			}

		@media screen and (min-width: 1280px) {
			:root {
				--font-size-sm: 0.8rem;
				--font-size-base: 1rem;
				--font-size-lg: 1.3rem;
				--font-size-xl: 1.8rem;
				--font-size-2xl: 2.4rem;
				--font-size-3xl: 3.2rem;
				--font-size-4xl: 4.2rem;
				--font-size-5xl: 5.6rem;
				--font-size-6xl: 7.5rem;
				}
			}
		}

	:root::view-transition-old(root) {
		animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-top;
		}

	:root::view-transition-new(root) {
		animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-bottom;
		}

	@media (prefers-reduced-motion: no-preference) {
		:root::view-transition-old(root) {
			animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out, 300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-top;
			}

		:root::view-transition-new(root) {
			animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in, 300ms cubic-bezier(
					0.4,
					0,
					0.2,
					1
			) both slide-from-bottom;
			}
		}

	@keyframes fade-in {
		from {
			opacity: 0;
			}
		}

	@keyframes fade-out {
		to {
			opacity: 0;
			}
		}

	@keyframes slide-from-bottom {
		from {
			transform: translateY(100px);
			}
		}

	@keyframes slide-to-top {
		to {
			transform: translateY(-100px);
			}
		}
</style>
