<script lang="ts">
	import { AiFillCloseCircle } from "svelte-icons-pack/ai";
	import { Icon } from 'svelte-icons-pack';

	let { isOpen, onclose, children } = $props<{
		isOpen: boolean;
		onclose?: () => void;
		children?: () => any
	}>();

	let isOpenState = $state(isOpen);

	function closeModal() {
		if (onclose) {
			onclose();
		}
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

	$effect(() => {
		window.addEventListener('keydown', handleKeyDown);
		toggleBodyScroll(isOpenState);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			toggleBodyScroll(false);
		};
	});

	$effect(() => {
		toggleBodyScroll(isOpenState);
	});
</script>

<div aria-modal="true" class="modal {isOpenState ? 'open' : ''}" role="dialog"
		 tabindex="-1">
	<div class="backdrop"></div>
	<div class="modal-frame">
		<div class="modal-content">
			<div
				aria-label="close button"
				class="close-button"
				onclick={() => closeModal()}
				onkeydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						closeModal();
					}
				}}
				role="button"
				tabindex="0"
			>
				<Icon color="var(--black)" size="28" src={AiFillCloseCircle} />
			</div>
			{@render children?.()}
		</div>
	</div>
</div>


<style lang="css">
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

	.modal.open {
		display: flex;
		}

	.backdrop {
		position: absolute;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: none;
		background-color: rgba(20, 20, 20, 0.5);
		}

	.modal-frame {
		z-index: 1000;
		display: flex;
		overflow-y: auto;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		max-height: 90vh;
		padding: 10px;
		}

	.modal-content {
		position: relative;
		z-index: 1001;
		overflow-y: auto;
		width: 100%;
		max-width: 900px;
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
		margin-bottom: 20px;
		cursor: pointer;
		}
</style>
