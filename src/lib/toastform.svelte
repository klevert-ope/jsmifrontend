<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { writable } from 'svelte/store';
	import IoIosInformationCircle
		from 'svelte-icons/io/IoIosInformationCircle.svelte';
	import IoIosCheckmarkCircle
		from 'svelte-icons/io/IoIosCheckmarkCircle.svelte';

	export let message = '';
	export let type = 'success';
	export let duration = 6;

	let toast: HTMLElement | null = null;
	let toastTween: gsap.core.Tween | null = null;

	const toastStore = writable({
		message: '',
		type: 'success',
		visible: false
	});

	const animateToast = (element: HTMLElement, duration: number) => {
		return gsap.fromTo(
			element,
			{ autoAlpha: 0, y: -30 },
			{
				autoAlpha: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.in',
				onComplete: () => {
					gsap.to(element, {
						autoAlpha: 0,
						y: -30,
						duration: duration,
						delay: 1,
						ease: 'power2.out',
						onComplete: () => {
							toastStore.update((state) => ({ ...state, visible: false }));
						}
					});
				}
			}
		);
	};

	onMount(() => {
		toastStore.update(() => ({ message, type, visible: true }));
	});

	$: if ($toastStore.visible && toast) {
		toastTween = animateToast(toast, duration);
	}

	onDestroy(() => {
		if (toastTween) {
			toastTween.kill();
		}
	});
</script>

{#if $toastStore.visible}
	<div bind:this={toast} class="toast"
			 class:error={type === 'error'}
			 class:success={type === 'success'}
	>
		{#if $toastStore.type === 'success'}
			<div class="success-icon">
				<IoIosCheckmarkCircle />
			</div>
		{:else if $toastStore.type === 'error'}
			<div class="error-icon">
				<IoIosInformationCircle />
			</div>
		{/if}
		<p>{$toastStore.message}</p>
	</div>
{/if}


<style>
	.toast {
		position: fixed;
		z-index: 9999;
		top: 60px;
		left: 50%;
		display: flex;
		align-items: center;
		flex-direction: row;
		box-sizing: border-box;
		width: calc(100% - 30px);
		max-width: 600px;
		padding: 10px;
		transform: translate(-50%, -50%);
		pointer-events: none;
		border-radius: 5px;
		background-color: oklch(0.191 0 89.876);
		box-shadow: 0 4px 30px oklch(0.845 0 89.876);
		gap: 20px;
		}

	.error {
		color: oklch(0.636 0.227 26.593);
		}

	.success {
		color: oklch(0.884 0.153 132.71);
		}

	.error-icon,
	.success-icon {
		width: 28px;
		height: 28px;
		}

	p {
		font-size: var(--font-size-sm);
		font-weight: 600;
		}
</style>
