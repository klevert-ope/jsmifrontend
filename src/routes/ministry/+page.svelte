<svelte:head>
	<title>NEWS AND OUR STORIES</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - Ministry"
		name="description" />
</svelte:head>

<script lang="ts">
	import { page } from '$app/stores';
	import type { PostsData } from './store';
	import {
		currentPage,
		error,
		isLoading,
		paginatedPosts,
		posts,
		totalPages
	} from './store';
	import formartDate from '$lib/formartDate';
	import {
		BsArrowLeftCircleFill,
		BsArrowRightCircleFill
	} from 'svelte-icons-pack/bs';
	import Navlg from '$lib/NavLg.svelte';
	import NavSm from '$lib/NavSm.svelte';
	import { Icon } from 'svelte-icons-pack';

	let { data } = $props<{ data: PostsData }>();
	const numberPostsPerPage = 10;

	const getPaginatedPosts = () => {
		if (!data || !data.posts || data.posts.length === 0) {
			return [];
		}

		const startIndex = ($currentPage - 1) * numberPostsPerPage;
		const endIndex = startIndex + numberPostsPerPage;
		return data.posts.slice(startIndex, endIndex);
	};

	const handleNextPage = () => {
		if ($currentPage < $totalPages) {
			currentPage.set($currentPage + 1);
		}
	};

	const handlePreviousPage = () => {
		if ($currentPage > 1) {
			currentPage.set($currentPage - 1);
		}
	};

	$effect(() => {
		if (data.success === true && data.posts !== null) {
			posts.set(data.posts);
		} else if (data.error !== undefined) {
			error.set(data.error);
		}
		isLoading.set(false);

		paginatedPosts.set(getPaginatedPosts());
		if (data.posts !== null) {
			totalPages.set(Math.ceil(data.posts.length / numberPostsPerPage));
		}
	});

	$effect(() => {
		paginatedPosts.set(getPaginatedPosts());
		if (data.posts !== null) {
			totalPages.set(Math.ceil(data.posts.length / numberPostsPerPage));
		}
	});
</script>

<Navlg />
<NavSm />
<section class="h-svh">
	<div class="container">
		<h1>Ministry</h1>
		{#if $isLoading}
			<div class="flex-col-center">
				<div class="loader">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</div>
			</div>
		{:else if $error}
			<p class="errormessage font-xs">Error: {$error}</p>
		{:else}
			<ul>
				{#each $paginatedPosts as post (post.id)}
					<li
						class="border-bottom large-max-width margin-bottom">
						<h3
							class="uppercase">
							{post.title}
						</h3>
						<p
							class="capitalize-first-letter excerpt">
							{post.excerpt}
						</p>
						<p
							class="date">{formartDate(post.created_at)}</p>
						<div class="flex-end padding-top">
							<a href={`/ministry/${post.id}`}
								 aria-current={$page.url.pathname === `/ministry/${post.id}` ?
								 'page' : undefined}
								 class="read-more"
							>
								Read More
							</a>
						</div>
					</li>
				{/each}
			</ul>
		{/if}

		<div
			class="pagination flex-row-center padding-top padding-bottom-lg large-max-width">
			<button aria-label="Previous Blogposts"
							class="icon-direction"
							disabled={$currentPage === 1}
							onclick={handlePreviousPage}
			>
				<Icon size="34" src={BsArrowLeftCircleFill} />
			</button>
			<span class="font-xs font-semi-bold mx-small">{$currentPage}</span>
			<button aria-label="Next Blogposts"
							class="icon-direction"
							disabled={$currentPage === $totalPages}
							onclick={handleNextPage}
			>
				<Icon size="34" src={BsArrowRightCircleFill} />
			</button>
		</div>
	</div>
</section>


<style>
	h3 {
		font-size: var(--font-size-lg);
		}

	.excerpt {
		font-size: var(--font-size-base);
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

	.h-svh {
		min-height: 100svh;
		}

	.margin-bottom {
		margin-bottom: 10px;
		}

	button {
		all: unset;
		}

	.icon-direction {
		cursor: pointer;
		color: var(--black);
		}

	.icon-direction:disabled {
		color: var(--white-black-fade);
		}

	.icon-direction:not(:disabled):hover {
		color: var(--orange-blue);
		}

	.flex-row-center {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		}

	.errormessage {
		color: #ff0000;
		}


	.capitalize-first-letter::first-letter {
		text-transform: uppercase;
		}

	.uppercase {
		text-transform: uppercase;
		}

	.large-max-width {
		max-width: 600px;
		}

	.border-bottom {
		border-bottom: 1px solid var(--blue);
		}

	.padding-top {
		padding-top: 20px;
		}

	.padding-bottom-lg {
		padding-bottom: 50px;
		}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		}

	li {
		padding-top: 20px;
		padding-bottom: 20px;
		list-style: none;
		}

	.mx-small {
		margin-right: 8px;
		margin-left: 8px;
		}

	h1 {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--lg-px40);
		margin-bottom: var(--sm-px15);
		color: var(--blue);
		}

	.loader {
		display: flex;
		align-items: center;
		margin-top: var(--lg-px40);
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

	.date {
		font-size: var(--font-size-sm);
		font-weight: 600;
		margin-top: 10px;
		color: gray;
		}

	.read-more {
		font-size: var(--font-size-sm);
		padding: 8px;
		color: var(--white);
		border-radius: 8px;
		background-color: var(--black);
		}

	.read-more:hover {
		color: var(--yellow);
		}
</style>
