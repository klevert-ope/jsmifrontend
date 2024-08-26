<script lang="ts">
	import {
		afterUpdate,
		createEventDispatcher,
		onDestroy,
		onMount
	} from 'svelte';
	import IoIosCloseCircle from 'svelte-icons/io/IoIosCloseCircle.svelte';

	export let isOpen: boolean;
	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	function toggleBodyScroll(disable: boolean) {
		if (disable) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeyDown);
		toggleBodyScroll(isOpen);
	});

	onDestroy(() => {
		window.removeEventListener('keydown', handleKeyDown);
		toggleBodyScroll(false);
	});

	afterUpdate(() => {
		toggleBodyScroll(isOpen);
	});
</script>

<div aria-modal="true" class="modal {isOpen ? 'open' : ''}" role="dialog"
		 tabindex="-1">
	<div class="backdrop"></div>
	<div class="modal-content">
		<div
			aria-label="close button"
			class="close-button"
			on:click={() => closeModal()}
			on:keydown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					closeModal();
				}
			}}
			role="button"
			tabindex="0"
		>
			<div class="close-icon">
				<IoIosCloseCircle />
			</div>
		</div>
		<slot></slot>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		display: none;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding: var(--sm-px15);
		}

	.modal {
		display: flex;
		}

	.backdrop {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
		background-color: rgba(20, 20, 20, 0.5);
		}

	.modal-content {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 500px;
		height: auto;
		padding: 20px;
		border-radius: 5px;
		background-color: var(--white);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		}

	.close-button {
		display: flex;
		align-items: end;
		justify-content: end;
		cursor: pointer;
		}

	.close-icon {
		width: 25px;
		height: 25px;
		color: var(--black);
		}
</style>
