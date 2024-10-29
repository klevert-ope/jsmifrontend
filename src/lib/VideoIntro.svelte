<script lang="ts">
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';

	const showPlayer = writable(false);

	const posterUrl = 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1720000112/20240702_224645_nzwqvp.jpg';
	const videoSource = 'https://res.cloudinary.com/dy9jpurpz/video/upload/v1719948161/VID-20240627-WA0003_v6pit2.mp4';

	onMount(() => {
		showPlayer.set(true);
	});
</script>

{#if $showPlayer}
	<video
		controls
		poster={posterUrl}
		style="width: 100%; border-radius: 8px;"
	>
		<source src={videoSource} type="video/mp4">
		Your browser does not support the video tag.
	</video>
{:else}
	<div class="video-loading"></div>
{/if}

<style>
	.video-loading {
		position: relative;
		z-index: 1;
		width: 100%;
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
</style>
