<svelte:head>
	<title>COMMUNITY</title>
</svelte:head>

<script lang="ts">
	import LoopBanner from '$lib/LoopBanner.svelte';
	import NavSm from '$lib/NavSm.svelte';
	import Navlg from '$lib/NavLg.svelte';

	interface Values {
		text: string;
	}

	let values: Values[] = [
		{ text: 'To serve God with a pure heart and conscience in all godliness and honesty.' },
		{ text: 'To be a model and a pattern of a true people of God who have been made whole by demonstrating the God kind of life and a godly lifestyle.' },
		{ text: 'To teach and preach the undulated word of God both in season and out of season.' },
		{ text: 'To walk in love towards one another and submit to the authority of the Holy Scriptures in sincere honesty and reverence to God.' },
		{ text: 'Demonstrate integrity and honesty in all our dealings both within and without the church setting.' }
	];
</script>

<Navlg />
<NavSm />
<section>
	<div class="container">
		<h1>Community</h1>
		<h2>Welcome to the Jehovah Shammah Ministries International Community!</h2>
		<p>
			Are you searching for a place to connect with God and a supportive
			community of believers? Look no further! Here at Jehovah Shammah
			Ministries International, we're passionate about sharing the message of
			Jesus Christ and helping others experience His love and grace.
		</p>
		<p>
			we believe salvation comes through faith in Jesus Christ. His love and
			grace offer eternal life and peace, both now and in the future. This
			message, the good news of Jesus, compels us to share it with the world,
			fulfilling God's desire for all people to be saved 1 Timothy 2:3-4.
		</p>
	</div>
	<section class="loop-banner">
		<LoopBanner />
	</section>
	<div class="container">
		<h1>Our Core Values</h1>
		<ul>
			{#each values as value (value)}
				<li class="value">{value.text}</li>
			{/each}
		</ul>
		<h1>How We Reach You: Spreading the Message of Hope</h1>
		<p>
			Driven by Pastor Collins Oketch's vision, Jehovah Shammah Ministries
			International offers a welcoming space to connect with God. Explore the
			transformative power of faith through our daily social media messages,
			inspiring audio teachings, engaging videos, and live events. We're also
			here to support you – share your prayer requests and connect with our
			caring counselors via phone calls or WhatsApp groups.
		</p>
	</div>
</section>

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

	h1 {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}

	h2 {
		font-size: var(--font-size-base);
		font-weight: 800;
		max-width: var(--xlarge-max-width);
		margin-top: var(--md-px20);
		}

	p {
		font-size: var(--font-size-base);
		font-weight: 600;
		line-height: 1.5;
		max-width: var(--xlarge-max-width);
		margin-top: var(--sm-px15);
		margin-bottom: var(--sm-px15);
		}

	.value {
		font-size: var(--font-size-base);
		font-weight: 600;
		max-width: var(--large-max-width);
		margin-top: var(--sm-px15);
		margin-left: var(--lg-px40);
		}

	.loop-banner {
		padding-top: var(--md-px20);
		padding-bottom: var(--md-px20);
		}
</style>

