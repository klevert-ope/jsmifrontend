<script lang="ts">
	import { get, writable } from 'svelte/store';
	import { page } from '$app/stores';

	const activeLink = writable<string>('');

	const links: Array<{ path: string; label: string }> = [
		{ path: '/', label: 'HOME' },
		{ path: '/ministry', label: 'MINISTRY' },
		{ path: '/community', label: 'COMMUNITY' },
		{ path: '/live', label: 'BROADCASTS' },
		{ path: '/about', label: 'ABOUT' },
		{ path: '/team', label: 'TEAM' }
	];

	$: activeLink.set(get(page).url.pathname);

	const handleNavigation = (path: string) => {
		activeLink.set(path);
	};
</script>

<nav>
	<div class="flex-row-between padding-y padding-x center-contents">
		<img alt="JSMI logo"
				 height="45"
				 src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1719775803/jsmi-logo_p7ay2j.png"
				 width="45">
		<ul class="flex-row-between font-xs">
			{#each links as { path, label } (path)}
				<li class={$activeLink === path ? 'active-link' : ''}>
					<a on:click={() => handleNavigation(path)}
						 href={path}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style lang="css">
	@media (min-width: 720px) {
		nav {
			display: block;
			}
		}

	@media (max-width: 719px) {
		nav {
			display: none;
			}
		}

	nav {
		position: sticky;
		z-index: 999;
		top: 0;
		background: var(--black);
		view-transition-name: nav;
		}

	.center-contents {
		align-content: center;
		}

	.flex-row-between {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		}

	ul > li {
		margin-right: var(--sm-px15);
		margin-left: var(--sm-px15);
		list-style: none;
		}

	.padding-y {
		padding-top: var(--xs-px10);
		padding-bottom: var(--xs-px10);
		}

	.padding-x {
		padding-right: var(--xs-px10);
		padding-left: var(--xs-px10);
		}

	ul > li > a {
		transition: all 0.3s ease;
		color: var(--white);
		}

	a:hover {
		transition: all 0.3s ease;
		color: var(--yellow);
		}

	.active-link a {
		padding-bottom: 4px;
		transition: all 0.3s ease;
		color: var(--yellow);
		border-bottom: 3px solid var(--blue);
		}

	.font-xs {
		font-size: var(--font-size-base);
		}
</style>
