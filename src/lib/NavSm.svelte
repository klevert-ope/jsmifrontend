<script lang="ts">
	import { get, writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Icon } from 'svelte-icons-pack';
	import { AiOutlineClose, AiOutlineMenu } from 'svelte-icons-pack/ai';

	const isOpen = writable(false);
	const activeLink = writable<string>('');

	$: activeLink.set(get(page).url.pathname);

	function toggleMenu() {
		isOpen.update(value => !value);
		setTimeout(() => {
			document.body.style.overflow = get(isOpen) ? 'hidden' : 'auto';
		}, 500);
	}

	async function handleNavigation(href: string) {
		toggleMenu();
		await goto(href);
	}

	const links: { path: string; label: string }[] = [
		{ path: '/', label: 'HOME' },
		{ path: '/ministry', label: 'MINISTRY' },
		{ path: '/community', label: 'COMMUNITY' },
		{ path: '/live', label: 'BROADCASTS' },
		{ path: '/about', label: 'ABOUT' },
		{ path: '/team', label: 'TEAM' }
	];
</script>

<nav class="container">
	<div class="menu-nav">
		<div class="flex-row-between">
			<img src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1719775803/jsmi-logo_p7ay2j.png"
					 alt="JSMI logo" width="45" height="45">
			<button on:click={toggleMenu}>
				{#if $isOpen}
					<div class="icon">
						<Icon color="var(--white)" size="35" src={AiOutlineClose} />
					</div>
				{:else}
					<div class="icon">
						<Icon color="var(--white)" size="35" src={AiOutlineMenu} />
					</div>
				{/if}
			</button>
		</div>
	</div>
</nav>

{#if $isOpen}
	<div class="menu" transition:fly={{ y: -300, duration: 500 }}>
		<ul>
			{#each links as { path, label }, index}
				<li class:active-link={$activeLink === path} class="slide-up"
						style="opacity: 0; animation-delay: {350 + index * 100}ms">
					<a href={path} on:click={(event) => {
            event.preventDefault();
            handleNavigation(path);
          }}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
{/if}



<style lang="css">
	:global(body) {
		margin: 0;
		padding: 0;
		overflow-x: hidden;
		}

	.container {
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		padding-right: var(--sm-px15);
		padding-left: var(--sm-px15);
		}

	@media (min-width: 540px) {
		.container {
			width: 540px;
			}
		}
	@media (min-width: 720px) {
		.container {
			width: 720px;
			}
		}
	@media (min-width: 960px) {
		.container {
			width: 960px;
			}
		}
	@media (min-width: 1140px) {
		.container {
			width: 1140px;
			}
		}

  @media (min-width: 720px) {
	  nav {
		  display: none;
		  }
	  }

  @media (max-width: 719px) {
	  nav {
		  display: block;
		  }
	  }

	nav {
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 9999;
		padding-bottom: var(--sm-px15);
		padding-top: var(--sm-px15);
		view-transition-name: nav;
		background-color: var(--black);
		}


	button {
		all: unset;
		}

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9998;
		width: 100%;
		height: 100vh;
		padding: 20px;
		transition: background-color 0.9s, transform 0.9s;
		background-color: var(--black);
		}

	.menu a {
		font-size: var(--font-size-2xl);
		margin-bottom: 10px;
		text-decoration: none;
		color: var(--white);
		outline: none;
		cursor: pointer;
		}

	.flex-row-between {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		}

	ul > li {
		margin-bottom: var(--md-px20);
		list-style: none;
		}

	.menu > ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 40%;
		}

	.active-link a {
		padding-bottom: 4px;
		transition: all 0.3s ease;
		color: var(--yellow);
		border-bottom: 3px solid var(--blue);
		}

	.slide-up {
		animation: slideUp 0.5s ease-in-out forwards;
		}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
			}
		to {
			transform: translateY(0);
			opacity: 1;
			}
		}

	.icon {
		cursor: pointer;
		}
</style>
