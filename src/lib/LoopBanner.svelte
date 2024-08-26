<script lang="ts">
	import { onMount } from 'svelte';

	interface Item {
		type: 'image' | 'heading' | 'paragraph';
		src?: string;
		alt?: string;
		text?: string;
	}

	let items: Item[] = [
		{
			type: 'image',
			src: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1720129509/IMG-20240628-WA0001_ekygt5.jpg',
			alt: 'Image 1'
		},
		{ type: 'heading', text: 'Faith' },
		{
			type: 'image',
			src: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1720129062/IMG-20240628-WA0009_s0a0oo.jpg',
			alt: 'Image 1'
		},
		{ type: 'paragraph', text: 'God\'s timing is perfect' },
		{ type: 'heading', text: 'Forgiveness' },
		{
			type: 'paragraph',
			text: 'For where two or three are gathered together in my name, there am I in the midst of them'
		},
		{
			type: 'image',
			src: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1720128858/IMG-20240627-WA0007_ybtekq.jpg',
			alt: 'Image 2'
		},
		{ type: 'heading', text: 'Worship' },
		{ type: 'paragraph', text: 'In His presence, there is fullness of joy' }
	];

	let rafId = 0;
	let scrollProgress = 0;
	let scrollContentWidth = 0;
	const scrollSpeed = 0.5;

	function animateScroll() {
		if (scrollContent) {
			scrollProgress += scrollSpeed;

			if (scrollProgress >= scrollContentWidth / 3) {
				scrollProgress = 0;
			}

			scrollContent.style.transform = `translateX(-${scrollProgress}px)`;

			rafId = requestAnimationFrame(animateScroll);
		}
	}

	function stopScroll() {
		if (rafId) {
			cancelAnimationFrame(rafId);
			rafId = 0;
		}
	}

	function startScroll() {
		if (!rafId) {
			rafId = requestAnimationFrame(animateScroll);
		}
	}

	let scrollContent: HTMLDivElement;

	onMount(() => {
		const handleResize = () => {
			updateScrollWidth();
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		startScroll();

		return () => {
			window.removeEventListener('resize', handleResize);
			stopScroll();
		};
	});

	function updateScrollWidth() {
		if (scrollContent) {
			scrollContentWidth = scrollContent.scrollWidth;
		}
	}

	$: updateScrollWidth();
</script>


<div
	aria-label="Scrolling content"
	class="container-content"
	on:mouseenter={stopScroll}
	on:mouseleave={startScroll}
	on:touchend={startScroll}
	on:touchstart={stopScroll}
	role="region"
>
	<div bind:this={scrollContent} class="scroll-content">
		{#each items.concat(items).concat(items) as item}
			<div class="item">
				{#if item.type === 'image'}
					<img src={item.src} alt={item.alt} />
				{:else if item.type === 'heading'}
					<h1>{item.text}</h1>
				{:else if item.type === 'paragraph'}
					<p>{item.text}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.container-content {
		position: relative;
		display: flex;
		overflow: hidden;
		align-items: center;
		justify-content: center;
		height: 20vh;
		white-space: nowrap;
		}

	.scroll-content {
		display: flex;
		align-items: center;
		transition: all;
		will-change: transform;
		}

	.item {
		display: flex;
		align-items: center;
		flex-direction: column;
		flex-shrink: 0;
		margin: 0 10px;
		}

	img {
		max-width: 150px;
		height: auto;
		user-select: none;
		}

	@media (max-width: 768px) {
		.item {
			margin: 0 5px;
			}
		}

	@media (min-width: 1200px) {
		.item {
			margin: 0 20px;
			}
		}


	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-2xl);
		font-weight: 500;
		user-select: none;
		color: var(--blue);
		}

	p {
		font-size: var(--font-size-lg);
		font-weight: 700;
		max-width: 400px;
		user-select: none;
		}
</style>
