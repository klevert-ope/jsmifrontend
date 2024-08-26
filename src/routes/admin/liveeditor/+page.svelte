<svelte:head>
	<title>LIVES EDITOR</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - Lives Editor"
		name="description" />
</svelte:head>

<script lang="ts">
	import IoMdArrowDropleft from 'svelte-icons/io/IoMdArrowDropleft.svelte';
	import { enhance } from '$app/forms';
	import ToastForm from '$lib/toastform.svelte';
	import Modal from '$lib/LiveModal.svelte';
	import { writable } from 'svelte/store';
	import {
		error,
		errorMessage,
		form,
		isLoading,
		isSubmitting,
		lives,
		type LivesData,
		successMessage
	} from './store';
	import { onMount } from 'svelte';
	import FaPenSquare from 'svelte-icons/fa/FaPenSquare.svelte';
	import MdDelete from 'svelte-icons/md/MdDelete.svelte';
	import FaPen from 'svelte-icons/fa/FaPen.svelte';

	export let data: LivesData;

	const editing = writable(new Map<string, boolean>());
	const modals = writable(new Map<string, boolean>());

	onMount(() => {
		if (data.success && data.lives !== null) {
			lives.set(data.lives);
		} else if (data.error) {
			error.set(data.error);
		}
		isLoading.set(false);
	});

	function toggleModal(id: string) {
		modals.update((m) => {
			const newState = new Map(m);
			if (newState.has(id)) {
				newState.delete(id);
			} else {
				newState.set(id, true);
			}
			return newState;
		});
	}

	function closeModal(id: string) {
		modals.update((m) => {
			const newState = new Map(m);
			newState.delete(id);
			return newState;
		});
		editing.update((e) => {
			const newState = new Map(e);
			newState.delete(id);
			return newState;
		});
	}
</script>

<section class="container h-svh">
	<div>
		<a class="back-nav" href="/admin">
			<div class="back-icon">
				<IoMdArrowDropleft />
			</div>
			<p>Back</p>
		</a>
	</div>
	<h1>LIVE BROADCASTS</h1>
	<div
		aria-label="create button"
		class="create-button"
		on:click={() => toggleModal('new')}
		on:keydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleModal('new');
        }
    }}
		role="button"
		tabindex="0">
		<p class="create-button-label">Create</p>
		<div class="create-icon">
			<FaPenSquare />
		</div>
	</div>

	{#if $modals.has('new')}
		<Modal isOpen={$modals.get('new') ?? false}
					 on:close={() => toggleModal('new')}>
			<form
				action="?/postlive"
				method="POST"
				use:enhance={async () => {
					isSubmitting.set(true);
					return async ({ result, update }) => {
						if (result.type === 'success') {
							await update({ reset: true, invalidateAll: true });
							closeModal('new');
							window.location.reload();
							successMessage.set('Live created successfully');
						} else {
							errorMessage.set('An error occurred while submitting Live');
						}
						isSubmitting.set(false);
					};
				}}
			>
				<input
					bind:value={form.data.title}
					name="title"
					placeholder="Live title"
					required
					type="text"
				/>
				<input
					bind:value={form.data.link}
					name="link"
					pattern="https?://.+"
					placeholder="Live link"
					required
					title="Please enter a valid URL starting with https://"
					type="text"
				/>
				<div class="flex-end">
					<button
						aria-label="submit post"
						class="submit-button"
						disabled={$isSubmitting}
						type="submit"
					>
						{$isSubmitting ? "Submitting..." : "Submit Live"}
					</button>
				</div>
			</form>
		</Modal>
	{/if}

	{#if $successMessage}
		<ToastForm message={$successMessage} type="success" />
	{:else if $errorMessage}
		<ToastForm message={$errorMessage} type="error" />
	{/if}

	<div class="margin-top table-frame">
		{#if $isLoading}
			<div class="flex-col-center">
				<div class="loader">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</div>
			</div>
		{:else if $error}
			<p class="errormessage">Error: {$error}</p>
		{:else}
			<table>
				<thead>
				<tr class="table-header">
					<th>TITLE</th>
					<th>ACTIONS</th>
				</tr>
				</thead>
				<tbody>
				{#each $lives as live (live.id)}
					<tr class="each-live">
						<td class="live-title">{live.title}</td>
						<td>
							<div class="flex-row">
								<div
									aria-label="edit button"
									class="edit-button"
									on:click={() => {
											toggleModal(live.id);
											editing.update((e) => {
												const newState = new Map(e);
												newState.set(live.id, true);
												return newState;
											});
										}}
									on:keydown={(event) => {
											if (event.key === 'Enter' || event.key === ' ') {
												toggleModal(live.id);
												editing.update((e) => {
													const newState = new Map(e);
													newState.set(live.id, true);
													return newState;
												});
											}
										}}
									role="button"
									tabindex="0">
									<div class="edit-icon">
										<FaPen />
									</div>
								</div>
								<div
									aria-label="delete button"
									class="delete-button"
									on:click={() => toggleModal(live.id)}
									on:keydown={(event) => {
											if (event.key === 'Enter' || event.key === ' ') {
												toggleModal(live.id);
											}
										}}
									role="button"
									tabindex="0">
									<div class="delete-icon">
										<MdDelete />
									</div>
								</div>
							</div>
							{#if $modals.has(live.id)}
								<Modal isOpen={$modals.get(live.id) ?? false}
											 on:close={() => closeModal(live.id)}>
									{#if $editing.has(live.id)}
										<form
											action="?/updatelive"
											method="POST"
											use:enhance={async () => {
													isSubmitting.set(true);
													return async ({ result, update }) => {
														if (result.type === 'success') {
															await update({ reset: true, invalidateAll: true });
															closeModal(live.id);
															window.location.reload();
															successMessage.set('Live updated successfully');
														} else {
															errorMessage.set('An error occurred while updating Live');
														}
														isSubmitting.set(false);
													};
												}}
										>
											<input type="hidden" name="id" value={live.id} />
											<input
												bind:value={live.title}
												name="title"
												placeholder="Live title"
												required
												type="text"
											/>
											<input
												bind:value={live.link}
												name="link"
												pattern="https?://.+"
												placeholder="Live link"
												required
												title="Please enter a valid URL starting with https://"
												type="text"
											/>
											<input type="hidden" name="created_at"
														 value={live.created_at} />
											<div class="flex-end">
												<button
													aria-label="submit post"
													class="submit-button"
													disabled={$isSubmitting}
													type="submit"
												>
													{$isSubmitting ? "Saving..." : "Save"}
												</button>
											</div>
										</form>
									{:else}
										<form
											action="?/deletelive"
											method="POST"
											use:enhance={async () => {
													isSubmitting.set(true);
													return async ({ result }) => {
														if (result.type === 'success') {
															closeModal(live.id);
															window.location.reload();
															successMessage.set('Live deleted successfully');
														} else {
															errorMessage.set('An error occurred while deleting Live');
														}
														isSubmitting.set(false);
													};
												}}
										>
											<div class="flex-col-center">
												<p class="delete-query">Are you sure?</p>
												<input type="hidden" name="id" value={live.id} />
												<button
													aria-label="delete post"
													class="delete-completely"
													disabled={$isSubmitting}
													type="submit"
												>
													{$isSubmitting ? "Deleting..." : "Yes"}
												</button>
											</div>
										</form>
									{/if}
								</Modal>
							{/if}
						</td>
					</tr>
				{/each}
				</tbody>
			</table>
		{/if}
	</div>
</section>


<style>
	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}

	.delete-completely {
		font-size: var(--font-size-sm);
		width: 100%;
		max-width: 140px;
		height: auto;
		padding: 5px;
		cursor: pointer;
		text-align: center;
		color: var(--white);
		border-radius: 8px;
		background-color: var(--black);
		}

	.delete-completely:hover {
		color: var(--yellow);
		}

	.delete-query {
		font-size: var(--font-size-sm);
		font-weight: 600;
		margin-bottom: 20px;
		}

	.live-title {
		text-wrap: none;
		}

	tr:nth-child(even) {
		background-color: rgba(21, 112, 239, 0.3);
		}

	.each-live {
		border-bottom: 1px solid var(--black);
		}

	.edit-button {
		padding: 10px;
		cursor: pointer;
		border-radius: 8px;
		background-color: var(--black);
		}

	.edit-icon {
		width: 18px;
		height: 18px;
		color: var(--yellow);
		}

	.delete-button {
		margin-left: 40px;
		padding: 10px;
		cursor: pointer;
		border-radius: 8px;
		background-color: var(--black);
		}

	.delete-icon {
		width: 20px;
		height: 20px;
		color: var(--yellow);
		}

	.create-button-label {
		font-size: var(--font-size-base);
		font-weight: 500;
		margin-right: 15px;
		color: var(--white);
		}

	.create-button-label:hover {
		color: var(--yellow);
		}

	.create-icon {
		width: 20px;
		height: 20px;
		color: var(--yellow);
		}

	.create-button {
		display: flex;
		flex-direction: row;
		max-width: 100px;
		height: auto;
		margin-top: 20px;
		margin-bottom: 20px;
		padding: 8px;
		cursor: pointer;
		border-radius: 8px;
		background-color: var(--black);
		}

	.table-frame {
		overflow-x: auto;
		max-width: 700;
		height: auto;
		}

	.h-svh {
		min-height: 100svh;
		}

	.container {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		padding: 40px 15px;

		@media (min-width: 540px) {
			width: 540px;
			}
		@media (min-width: 720px) {
			width: 720px;
			}
		@media (min-width: 960px) {
			width: 960px;
			}
		@media (min-width: 1140px) {
			width: 1140px;
			}
		}

	table {
		width: 100%;
		margin-top: 20px;
		border-collapse: collapse;
		}

	th, td {
		font-size: var(--font-size-sm);
		font-weight: 600;
		padding: 15px;
		text-align: left;
		}

	.table-header {
		color: var(--yellow);
		border-radius: 8px;
		background-color: var(--black);
		}

	.errormessage {
		color: red;
		}

	.margin-top {
		margin-top: 20px;
		}

	form {
		display: flex;
		flex-direction: column;
		max-width: 600px;
		gap: 10px;
		}

	button {
		cursor: pointer;
		all: unset;
		}

	.submit-button {
		font-size: var(--font-size-sm);
		width: 100%;
		max-width: 150px;
		height: auto;
		margin-top: 20px;
		padding: 8px;
		cursor: pointer;
		transition: color 0.3s ease;
		text-align: center;
		text-wrap: none;
		color: var(--white);
		border: none;
		border-radius: 8px;
		background-color: var(--black);
		}

	.submit-button:disabled {
		cursor: default;
		opacity: 0.5;
		}

	.submit-button:hover {
		color: var(--yellow);
		}

	input {
		font-size: var(--font-size-sm);
		margin-top: 20px;
		padding: 10px;
		border: 1px solid rgba(20, 20, 20, 0.4);
		border-radius: 8px;
		}

	.flex-row {
		display: flex;
		flex-direction: row;
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		}

	.bar {
		display: inline-block;
		width: 3px;
		height: 20px;
		animation: scale-up4 1s linear infinite;
		border-radius: 10px;
		background-color: var(--blue);
		}

	.bar:nth-child(2) {
		height: 35px;
		margin: 0 5px;
		animation-delay: .25s;
		}

	.bar:nth-child(3) {
		animation-delay: .5s;
		}

	@keyframes scale-up4 {
		20% {
			background-color: #ffff;
			transform: scaleY(1.5);
			}

		40% {
			transform: scaleY(1);
			}
		}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		}

	.back-nav {
		display: flex;
		align-items: center;
		flex-direction: row;
		width: 100%;
		max-width: 100px;
		height: auto;
		margin-bottom: 40px;
		color: var(--black);
		}

	.back-nav:has(p) {
		font-size: var(--font-size-base);
		}

	.back-nav:hover {
		color: var(--blue);
		}

	.back-icon {
		width: 25px;
		height: 25px;
		}
</style>
