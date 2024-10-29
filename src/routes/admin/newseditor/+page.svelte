<svelte:head>
	<title>NEWS EDITOR</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - News Editor"
		name="description" />
	<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css"
				rel="stylesheet" />
</svelte:head>

<script lang="ts">
	import Modal from '$lib/newsModal.svelte';
	import ToastForm from '$lib/toastform.svelte';
	import { enhance } from '$app/forms';
	import PostQuillEditorBody from './postQuillEditor.svelte';
	import UpdateQuillEditorBody from './updateQuillEditor.svelte';
	import type { PostsData } from './store';
	import {
		editorContent,
		error,
		errorMessage,
		form,
		initialFormData,
		initialFormErrors,
		isLoading,
		isSubmitting,
		posts,
		QuillEditor,
		successMessage,
		wordCountBody,
		wordCountExcerpt,
		wordCountTitle
	} from './store';
	import { blogPostSchema } from './blogPostSchema';
	import { get, writable } from 'svelte/store';
	import { IoCreate, IoTrashBin } from 'svelte-icons-pack/io';
	import { Icon } from 'svelte-icons-pack';
	import { BiSolidLeftArrow, BiSolidPencil } from 'svelte-icons-pack/bi';

	const editing = writable(new Map<string, boolean>());
	const modals = writable(new Map<string, boolean>());

	let { data } = $props<{ data: PostsData }>();

	function handleInputTitle(event: Event) {
		form.errors = { ...initialFormErrors };
		const inputElement = event.target as HTMLTextAreaElement;
		form.data.title = inputElement.value;
		wordCountTitle.set(form.data.title.trim().split(/\s+/).length);
	}

	function handleInputExcerpt(event: Event) {
		form.errors = { ...initialFormErrors };
		const inputElement = event.target as HTMLTextAreaElement;
		form.data.excerpt = inputElement.value;
		wordCountExcerpt.set(form.data.excerpt.trim().split(/\s+/).length);
	}

	function handleInputBody(event: Event) {
		form.errors = { ...initialFormErrors };
		const inputElement = event.target as HTMLTextAreaElement;
		const inputValue = inputElement.value.trim();
		form.data.body = inputValue;
		editorContent.set(inputValue);

		if (inputValue === '') {
			form.errors.body = 'Body cannot be empty';
		} else {
			form.errors.body = '';
		}
	}

	function validateForm(fieldsToValidate: string[]): boolean {
		isSubmitting.set(false);
		const result = blogPostSchema.safeParse(form.data);

		form.errors = { ...initialFormErrors };
		errorMessage.set('');
		successMessage.set('');

		if (!result.success) {
			form.errors = result.error.issues.reduce((acc: any, curr: any) => {
				if (fieldsToValidate.includes(<string>curr.path[0])) {
					acc[curr.path[0]] = curr.message;
				}
				return acc;
			}, { ...initialFormErrors });
		}

		return result.success && !form.errors.title && !form.errors.excerpt && !form.errors.body;
	}

	function resetForm() {
		form.data = { ...initialFormData };
		form.errors = { ...initialFormErrors };
		wordCountTitle.set(0);
		wordCountExcerpt.set(0);
		wordCountBody.set(0);
		editorContent.set('');
		const editor = get(QuillEditor);
		if (editor) {
			editor.setContents([]);
		}
	}

	$effect(() => {
		if (data.success === true && data.posts !== null) {
			posts.set(data.posts);
		} else if (data.error !== undefined) {
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
		resetForm();
	}

	function openEditModal(post: any) {
		form.data.id = post.id;
		form.data.title = post.title;
		form.data.excerpt = post.excerpt;
		form.data.body = post.body;
		form.data.created_at = post.created_at;
		wordCountTitle.set(post.title.trim().split(/\s+/).length);
		wordCountExcerpt.set(post.excerpt.trim().split(/\s+/).length);
		wordCountBody.set(post.body.trim().split(/\s+/).filter((word: string) => word.trim() !== '').length);
		toggleModal(post.id);
		editing.update((e) => {
			const newState = new Map(e);
			newState.set(post.id, true);
			return newState;
		});
	}

	editorContent.subscribe(content => {
		form.data.body = content;
	});
</script>


<section class="container h-svh">
	<div>
		<a class="back-nav" href="/admin">
			<div class="back-icon">
				<Icon size="24" src={BiSolidLeftArrow} />
			</div>
			<p>Back</p>
		</a>
	</div>
	<h1>News Editor</h1>
	<div
		aria-label="create button"
		class="create-button"
		onclick={() => toggleModal('new')}
		onkeydown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            toggleModal('new');
        }
    }}
		role="button"
		tabindex="0">
		<p class="create-button-label">Create</p>
		<div class="create-icon">
			<Icon color="var(--yellow)" size="20" src={IoCreate} />
		</div>
	</div>

	{#if $modals.has('new')}
		<Modal isOpen={$modals.get('new') ?? false}
					 onclose={() => toggleModal('new')}>
			<form action="?/postnews"
						class="padding-y container"
						method="POST"
						use:enhance={async () => {
							const fieldsToValidate = ['title', 'excerpt', 'body'];
							const isValid = validateForm(fieldsToValidate);
							if (isValid) {
								isSubmitting.set(true);
								return async ({ result }) => {
									if (result.type === "success") {
										successMessage.set("Post created successfully");
										resetForm();
										closeModal('new');
										window.location.reload();
									} else {
										errorMessage.set("An error occurred while submitting post");
									}
									isSubmitting.set(false);
								};
							}
						}}>
					<textarea bind:value={form.data.title} id="title" name="title"
										oninput={handleInputTitle}
										placeholder="Write your title..."></textarea>
				<p class="font-xs flex-end">{$wordCountTitle}/15 Words</p>
				{#if form.errors.title}
					<p class="font-xs errormessage">{form.errors.title}</p>
				{/if}

				<textarea bind:value={form.data.excerpt} id="excerpt" name="excerpt"
									oninput={handleInputExcerpt}
									placeholder="Write your excerpt..."></textarea>
				<p class="font-xs flex-end">{$wordCountExcerpt}/60 Words</p>
				{#if form.errors.excerpt}
					<p class="font-xs errormessage">{form.errors.excerpt}</p>
				{/if}

				<PostQuillEditorBody on:input={handleInputBody} />
				{#if form.errors.body}
					<p class="font-xs errormessage">{form.errors.body}</p>
				{/if}
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

	{#if $isLoading}
		<div class="flex-col-center">
			<div class="loader">
				<span class="bar"></span>
				<span class="bar"></span>
				<span class="bar"></span>
			</div>
		</div>
	{:else if $error}
		<p class="errormessage-table font-xs">Error: {$error}</p>
	{:else}
		<table>
			<thead>
			<tr class="table-header">
				<th>TITLE</th>
				<th>ACTIONS</th>
			</tr>
			</thead>
			<tbody>
			{#each $posts as post (post.id)}
				<tr class="each-post">
					<td
						class="capitalize-first-letter">
						{post.title}
					</td>
					<td>
						<div class="flex-row">
							<div
								aria-label="edit button"
								class="edit-button"
								onclick={() => openEditModal(post)}
								onkeydown={(event) => {
											if (event.key === 'Enter' || event.key === ' ') {
												openEditModal(post);
											}
										}}
								role="button"
								tabindex="0">
								<div class="edit-icon">
									<Icon size="20" src={BiSolidPencil} />
								</div>
							</div>
							<div
								aria-label="delete button"
								class="delete-button"
								onclick={() => toggleModal(post.id)}
								onkeydown={(event) => {
											if (event.key === 'Enter' || event.key === ' ') {
												toggleModal(post.id);
											}
										}}
								role="button"
								tabindex="0">
								<div class="delete-icon">
									<Icon size="20" src={IoTrashBin} />
								</div>
							</div>
						</div>
						{#if $modals.has(post.id)}
							<Modal isOpen={$modals.get(post.id) ?? false}
										 onclose={() => closeModal(post.id)}>
								{#if $editing.has(post.id)}
									<form
										action="?/updatenews"
										method="POST"
										use:enhance={async () => {
											const fieldsToValidate = ['title', 'excerpt', 'body'];
											const isValid = validateForm(fieldsToValidate);
											if (isValid) {
												isSubmitting.set(true);
												return async ({ result, update}) => {
													if (result.type === 'success') {
														await update({ reset: true, invalidateAll: true });
														closeModal(post.id);
														window.location.reload();
														successMessage.set('Post updated successfully');
													} else {
														errorMessage.set('An error occurred while updating Post');
													}
													isSubmitting.set(false);
												};
											}
										}}
									>
										<input type="hidden" name="id" value={post.id} />
										<textarea name="title"
															placeholder="Update title"
															bind:value={form.data.title}
															oninput={handleInputTitle}
										></textarea>
										<p class="font-xs flex-end">{$wordCountTitle}/15 Words</p>
										{#if form.errors.title}
											<p class="font-xs errormessage">{form.errors.title}</p>
										{/if}
										<textarea name="excerpt"
															placeholder="Update excerpt"
															bind:value={form.data.excerpt}
															oninput={handleInputExcerpt}
										></textarea>
										<p class="font-xs flex-end">{$wordCountExcerpt}/60 Words</p>
										{#if form.errors.excerpt}
											<p class="font-xs errormessage">{form.errors.excerpt}</p>
										{/if}
										<UpdateQuillEditorBody on:input={handleInputBody} />
										{#if form.errors.body}
											<p class="font-xs errormessage">{form.errors.body}</p>
										{/if}
										<input type="hidden" name="created_at"
													 value={post.created_at} />
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
										action="?/deletenews"
										method="POST"
										use:enhance={async () => {
													isSubmitting.set(true);
													return async ({ result }) => {
														if (result.type === 'success') {
															closeModal(post.id);
															window.location.reload();
															successMessage.set('Post deleted successfully');
														} else {
															errorMessage.set('An error occurred while deleting Post');
														}
														isSubmitting.set(false);
													};
												}}
									>
										<div class="flex-col-center">
											<p class="delete-query">Are you sure?</p>
											<input type="hidden" name="id" value={post.id} />
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
</section>

{#if $successMessage}
	<ToastForm message={$successMessage} type="success" />
{:else if $errorMessage}
	<ToastForm message={$errorMessage} type="error" />
{/if}


<style>
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

	.h-svh {
		min-height: 100svh;
		}

	h1 {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		margin-bottom: 40px;
		color: var(--blue);
		}

	.padding-y {
		padding-top: 20px;
		padding-bottom: 20px;
		}

	form {
		display: flex;
		flex-direction: column;
		max-width: 700px;
		gap: 10px;
		}

	textarea {
		font-size: var(--font-size-sm);
		height: 100px;
		margin-top: 20px;
		padding: 10px;
		resize: vertical;
		border: 1px solid rgba(20, 20, 20, 0.4);
		border-radius: 4px;
		}

	textarea:focus {
		outline: 1px solid oklch(0.479 0.001 17.203);
		}

	button {
		all: unset;
		}

	.errormessage {
		margin-top: -30px;
		margin-bottom: 60px;
		color: #ff0000;
		}

	.errormessage-table {
		margin-top: 30px;
		margin-bottom: 60px;
		color: #ff0000;
		}

	.font-xs {
		font-size: var(--font-size-sm);
		}

	.container {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		padding-right: 15px;
		padding-left: 15px;

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

	.padding-y {
		padding-top: 20px;
		padding-bottom: 20px;
		}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		}

	table {
		width: 100%;
		height: auto;
		border-collapse: collapse;
		}

	.table-header {
		color: var(--yellow);
		border-radius: 8px;
		background-color: var(--black);
		}

	.capitalize-first-letter::first-letter {
		text-transform: uppercase;
		}

	th, td {
		font-size: var(--font-size-sm);
		font-weight: 600;
		padding: 15px;
		text-align: left;
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
		font-size: var(--font-size-base);
		font-weight: 500;
		margin-bottom: 20px;
		}


	.edit-button {
		padding: 10px;
		cursor: pointer;
		border-radius: 8px;
		background-color: var(--black);
		}

	.edit-icon {
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
		color: var(--yellow);
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

	button {
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

	tr:nth-child(even) {
		background-color: rgba(21, 112, 239, 0.3);
		}

	.each-post {
		border-bottom: 1px solid var(--black);
		}

	.loader {
		display: flex;
		align-items: center;
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
</style>
