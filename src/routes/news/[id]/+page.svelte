<svelte:head>
	{#if $post}
		<title>{$post.title}</title>
		<meta name="description" content={$post.excerpt} />
		<meta itemprop="name" content={$post.title} />
		<meta itemprop="description" content={$post.excerpt} />
		<meta property="og:title" content={$post.title} />
		<meta property="og:description" content={$post.excerpt} />
		<meta property="twitter:title" content={$post.title} />
		<meta property="twitter:description" content={$post.excerpt} />
	{/if}
	<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css"
				rel="stylesheet" />
</svelte:head>

<script lang="ts">
	import IoMdArrowDropleft from 'svelte-icons/io/IoMdArrowDropleft.svelte';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { PostData } from './store';
	import { error, isLoading, post } from './store';
	import { convertDeltaToHtml } from './delta';
	import Navlg from '$lib/NavLg.svelte';
	import NavSm from '$lib/NavSm.svelte';

	export let data: PostData;
	let bodyHtml = '';

	const readTime = writable(0);

	const calculateReadTime = (text: string) => {
		const wordsPerMinute = 150;
		const wordCount = text.split(/\s+/).length;
		return Math.ceil(wordCount / wordsPerMinute);
	};

	onMount(async () => {
		if (data.success === true && data.post !== null) {
			post.set(data.post);
			bodyHtml = await convertDeltaToHtml(JSON.parse(data.post.body));
			const plainText = bodyHtml.replace(/<[^>]+>/g, '');
			readTime.set(calculateReadTime(plainText));
		} else if (data.error !== undefined) {
			error.set(data.error);
		}
		isLoading.set(false);
	});
</script>

<Navlg />
<NavSm />
<section>
	<div class="container h-svh">
		<div>
			<a class="back-nav" href="/news">
				<div class="back-icon">
					<IoMdArrowDropleft />
				</div>
				<p>Back</p>
			</a>
		</div>
		{#if $isLoading}
			<div class="flex-col-center">
				<div class="loader">
					<span class="bar"></span>
					<span class="bar"></span>
					<span class="bar"></span>
				</div>
			</div>
		{:else if $error}
			<p class="font-xs errormessage">Error: {$error}</p>
		{:else if $post}
			<div class="large-max-width">
				<h1>{$post.title}</h1>
				<p class="read-time">
					Estimated read
					time: {$readTime} {$readTime === 1 ? 'minute' : 'minutes'}
				</p>
				<div
					class="news-body">{@html bodyHtml}</div>
			</div>
		{/if}
	</div>
</section>

<style>
	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--md-px20);
		margin-bottom: var(--md-px20);
		color: var(--blue);
		}

	.read-time {
		font-size: var(--font-size-sm);
		margin-bottom: 1rem;
		color: gray;
		}

	.news-body {
		font-size: var(--font-size-base);
		}

	.errormessage {
		color: oklch(0.628 0.258 29.234);
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

	.large-max-width {
		max-width: 800px;
		}

	.h-svh {
		min-height: 100svh;
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

	.back-nav {
		display: flex;
		align-items: center;
		flex-direction: row;
		width: 100%;
		max-width: 100px;
		height: auto;
		margin-top: 40px;
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

	.flex-col-center {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		}
</style>
