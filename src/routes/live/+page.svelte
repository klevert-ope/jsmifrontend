<svelte:head>
	<title>LIVE BROADCASTS</title>
</svelte:head>

<script lang="ts">
	import { onMount } from 'svelte';
	import { error, isLoading, lives, type LivesData } from './store';
	import formartDate from '$lib/formartDate';
	import NavSm from '$lib/NavSm.svelte';
	import Navlg from '$lib/NavLg.svelte';

	export let data: LivesData;

	const numberLives = 5;

	onMount(() => {
		if (data.success && data.lives !== null) {
			lives.set(data.lives);
		} else if (data.error) {
			error.set(data.error);
		}
		isLoading.set(false);
	});
</script>

<Navlg />
<NavSm />
<section class="container">
	<h1>LIVE BROADCASTS</h1>
	<div class="margin-top">
		{#if $isLoading}
			<div class="large-max-width">
				{#each Array(numberLives) as _, index}
					<div {...{ key: index }} class="margin-bottom">
						<div class="iframe-loading"></div>
					</div>
				{/each}
			</div>
		{:else if $error}
			<p class="errormessage">Error: {$error}</p>
		{:else}
			<ul>
				{#each $lives as live (live.id)}
					<li class="margin-bottom flex-col-center">
						<p class="badge">Created {formartDate(live.created_at)}</p>
						<iframe src={live.link}
										title={live.title}
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										referrerpolicy="strict-origin-when-cross-origin"
										allowfullscreen></iframe>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<style>
	.badge {
		padding: 4px 8px 4px 8px;
		color: var(--white);
		border-radius: 5px;
		background-color: var(--black);
		box-shadow: 4px 3px 3px var(--blue);
		}

	.container {
		width: 100%;
		min-height: 100svh;
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

	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-3xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}

	p {
		font-size: var(--font-size-sm);
		font-weight: bold;
		margin-bottom: var(--sm-px15);
		}

	iframe {
		width: 100%;
		max-width: 900px;
		height: 500px;
		border: none;
		border-radius: 8px;
		outline: none;
		}

	li {
		list-style: none;
		}

	.margin-top {
		margin-top: var(--lg-px40);
		}

	.margin-bottom {
		margin-bottom: 60px;
		}

	.iframe-loading {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 900px;
		height: 500px;
		padding-bottom: 56.25%;
		animation: pulse 1.5s infinite alternate;
		border-radius: 8px;
		background-color: #f0f0f0;
		}

	@keyframes pulse {
		0% {
			background-color: #f0f0f0;
			}
		100% {
			background-color: #e0e0e0;
			}
		}

	.errormessage {
		color: red;
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		}
</style>
