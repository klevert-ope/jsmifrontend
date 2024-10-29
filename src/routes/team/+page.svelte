<svelte:head>
	<title>TEAM</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - Our Team"
		name="description" />
</svelte:head>

<script lang="ts">
	import NavSm from '$lib/NavSm.svelte';
	import Navlg from '$lib/NavLg.svelte';

	const cards = [
		{
			id: 1,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342954/jsmiteam/woinlyjolvfclduzdq69.png',
			name: 'Collins Oketch',
			role: 'Pastor'

		},
		{
			id: 2,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342953/jsmiteam/hem6m9ziuz4rbilfi2n2.png',
			name: 'Sharon Niva',
			role: 'Treasurer Administrative leader'

		},
		{
			id: 3,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342953/jsmiteam/fpaqneamwaka6sqlieh8.png',
			name: 'Wisdom Serges',
			role: 'Secretary'

		},
		{
			id: 4,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342953/jsmiteam/ynklfnmhvczz22dhijdw.png',
			name: 'Godwin Musinguzi',
			role: 'Apostle'

		},
		{
			id: 5,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342953/jsmiteam/exwzdunxqjpp0ahgubdy.png',
			name: 'Henry Chibuka',
			role: 'Relational and Overseer'

		},
		{
			id: 6,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721858969/jsmiteam/bmvufnt5tooymlcrmc3k.png',
			name: 'Anita Ghah',
			role: 'Evangelism Ministry Coordinator'

		},
		{
			id: 7,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342954/jsmiteam/opiyx1a89xiv1mqamjp4.png',
			name: 'Dolly',
			role: 'Prayer and Worship leader'

		},
		{
			id: 8,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721345723/jsmiteam/xvfrk82nfzeoaxqpmupq.png',
			name: 'Modest Fanaka',
			role: 'Stewardship Team Leader'

		},
		{
			id: 9,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342954/jsmiteam/hnf5sxdmaykxxz1slojl.png',
			name: 'Toifak Carmbell',
			role: 'Director of Media and Communications'

		},
		{
			id: 10,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721858969/jsmiteam/hokt6gbn9f0djdkok0y8.png',
			name: 'Elenoraa',
			role: 'Human Resource'

		},
		{
			id: 11,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342953/jsmiteam/opg3iwsuytsby7wb45zu.png',
			name: 'Florence Awour',
			role: 'Prayers and Intercessions'

		},
		{
			id: 12,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721342954/jsmiteam/ytlcsuyl6qjjsxxjvjcv.png',
			name: 'Josphine Fofana',
			role: 'Treasurer and Financial Secretary'

		},
		{
			id: 13,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1721859445/jsmiteam/vimhjiqmsogru7q5gkfi.png',
			name: 'Fone Augostine',
			role: 'Media Team'

		},
		{
			id: 14,
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1722876135/jsmiteam/g944h798ylp8jbhsivnz.png',
			name: 'Fone Bronston',
			role: 'Media Team'

		}
	];
</script>

<Navlg />
<NavSm />
<section class="container">
	<h1>TEAM</h1>
	<p>
		At JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL, our dedicated team is committed
		to fostering a vibrant, welcoming community where everyone can grow in faith
		and love. Each member of our team brings unique gifts and a deep passion for
		serving God and our congregation.
	</p>
	<p>
		Our team is here to support and guide you on your spiritual journey, whether
		you’re visiting us for the first time or have been part of our community for
		years. From our pastoral staff and worship leaders to our dedicated
		volunteers and support staff, we work together to create a space where
		everyone can experience the transformative power of God’s love.
	</p>
	<p>
		Meet the faces behind the mission of JEHOVAH SHAMMAH MINISTRIES
		INTERNATIONAL, and get to know the individuals who are here to help you
		connect, grow, and thrive in your faith.
	</p>

	<div class="team">
		{#each cards as card (card.id)}
			<div class="card">
				<img src="{card.image}" alt="{card.name}">
				<h2 class="name">{card.name}</h2>
				<h3 class="role">{card.role}</h3>
			</div>
		{/each}
	</div>
</section>

<style>
	.team {
		display: grid;
		margin-top: var(--md-px20);
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 50px;
		justify-items: center;
		}

	.card {
		padding: 10px;
		background-color: var(--white);
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
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}


	p {
		font-size: var(--font-size-base);
		font-weight: 600;
		line-height: 1.5;
		max-width: var(--xlarge-max-width);
		margin-top: var(--sm-px15);
		margin-bottom: var(--sm-px15);
		}

	.name {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-base);
		font-weight: 700;
		margin-top: 5px;
		color: var(--blue);
		}

	.role {
		font-size: var(--font-size-sm);
		font-weight: 700;
		margin-top: 5px;
		}

	img {
		max-width: 220px;
		height: 220px;
		background-color: var(--white);
		}
</style>

