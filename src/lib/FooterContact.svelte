<script lang="ts">
	import {
		AiFillFacebook,
		AiFillInstagram,
		AiFillTikTok,
		AiFillYoutube,
		AiOutlineWhatsApp
	} from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';

	let currentYear: number;
	const date = new Date();
	currentYear = date.getFullYear();

	const links: { path: string; label: string }[] = [
		{ path: '/', label: 'HOME' },
		{ path: '/news', label: 'NEWS' },
		{ path: '/community', label: 'COMMUNITY' },
		{ path: '/live', label: 'BROADCASTS' },
		{ path: '/about', label: 'ABOUT' },
		{ path: '/team', label: 'TEAM' }
	];

	function handleNavigation(href: string) {
		setTimeout(() => {
			history.pushState({}, '', href);
			window.dispatchEvent(new Event('popstate'));
		}, 500);
	}
</script>

<section>
	<img
		alt="JSMI logo"
		height="85"
		src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1719775803/jsmi-logo_p7ay2j.png"
		width="85">
	<h5 class="font-xl text-orange margin-y-md">
		JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL
	</h5>
	<div class="navigation">
		<div class="menu">
			<ul class="place-center flex-col">
				{#each links as { path, label }}
					<li class="link">
						<a href={path} on:click={() => handleNavigation(path)}>{label}</a>
					</li>
				{/each}
			</ul>
		</div>
		<div class="socials">
			<ul class="flex-row place-center">
				<li class="social">
					<a href="https://www.facebook.com/profile.php?id=61554778936270"
						 target="_blank">
						<Icon size="28" src={AiFillFacebook} />
					</a>
				</li>
				<li class="social">
					<a aria-label="Instagram handle"
						 href="https://www.instagram.com/jehovahshammahministies"
						 target="_blank">
						<Icon size="28" src={AiFillInstagram} />
					</a>
				</li>
				<li class="social">
					<a href="https://www.youtube.com/channel/UC_xgUSUeznyBct-tseuH8hA"
						 target="_blank">
						<Icon size="28" src={AiFillYoutube} />
					</a>
				</li>
				<li class="social">
					<a aria-label="TikTok handle"
						 href="https://www.tiktok.com/@jehovahshammah32?lang=en"
						 target="_blank">
						<Icon size="28" src={AiFillTikTok} />
					</a>
				</li>
				<li class="social">
					<a aria-label="Whatsapp group"
						 href="https://chat.whatsapp.com/L4iGhHCu7jfDKWWUlObWm5"
						 target="_blank">
						<Icon size="28" src={AiOutlineWhatsApp} />
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div class="place-center">
		<small class="font-xs font-medium">
			JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL &copy; 2022 - {currentYear} All
			rights reserved.
		</small>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 90svh;
		padding-right: 15px;
		padding-left: 15px;
		background-color: var(--black);
		}

	.font-xl {
		font-size: var(--font-size-xl);
		}

	.font-xs {
		font-size: var(--font-size-sm);
		}

	.font-medium {
		font-weight: 500;
		}

	.margin-y-md {
		margin-top: var(--md-px20);
		margin-bottom: var(--sm-px15);
		}

	.text-orange {
		color: var(--blue);
		}

	.place-center {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: auto;
		}

	small {
		margin-bottom: var(--lg-px40);
		color: var(--yellow);
		}

	h5 {
		font-family: 'Waiting Summer', sans-serif;
		max-width: 500px;
		}

	img {
		margin-top: var(--md-px20);
		}

	.menu a {
		margin-bottom: 10px;
		cursor: pointer;
		text-decoration: none;
		outline: none;
		}

	.socials {
		margin-top: var(--md-px20);
		margin-bottom: var(--md-px20);
		}

	a {
		font-size: var(--font-size-lg);
		color: var(--white);
		}

	a:hover {
		color: var(--yellow);
		}

	.navigation {
		height: auto;
		padding-top: var(--lg-px40);
		padding-bottom: var(--lg-px40);
		}

	.flex-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		max-width: 400px;
		margin: 0 auto;
		}

	.flex-col {
		display: flex;
		flex-direction: column;
		}

	.link {
		margin-bottom: var(--md-px20);
		}

	li {
		list-style: none;
		}
</style>
