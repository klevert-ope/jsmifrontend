<svelte:head>
	<title>JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL</title>
	<meta
		content="Growing Together in Faith and Love"
		name="description" />
</svelte:head>
<script lang="ts">
	import VideoIntro from '$lib/VideoIntro.svelte';
	import Verses from '$lib/TextHighlight.svelte';
	import Schedule from '$lib/PrayerSchedule.svelte';
	import PastorWords from '$lib/PastorWords.svelte';
	import FaithStatement from '$lib/FaithStatement.svelte';
	import NavSm from '$lib/NavSm.svelte';
	import Navlg from '$lib/NavLg.svelte';
	import Map from '$lib/LocationMap.svelte';
	import {
		AiFillFacebook,
		AiFillInstagram,
		AiFillTikTok,
		AiFillYoutube,
		AiOutlineWhatsApp
	} from 'svelte-icons-pack/ai';
	import { Icon } from 'svelte-icons-pack';
</script>

<Navlg />
<NavSm />
<section class="hero">
	<div class="flex-col-center px-1">
		<img
			alt="JSMI logo"
			class="banner"
			height="200"
			src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1719775803/jsmi-logo_p7ay2j.png"
			width="200">
		<p class="introduction-quote">
			WELCOME TO JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL
		</p>
		<p class="introduction-quote2">
			Where Faith Meets Purpose, and Lives are Transformed
		</p>
	</div>
</section>
<section class="intro-video container">
	<VideoIntro />
</section>
<section class="container">
	<div class="socials">
		<ul class="flex-row flex-col-center">
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
				<a aria-label="Youtube handle"
					 href="https://www.youtube.com/channel/UC_xgUSUeznyBct-tseuH8hA"
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
</section>
<section class="bible container">
	<Verses />
</section>
<section class="schedule">
	<Schedule />
</section>
<section class="pastor-sec">
	<div class="pastor container">
		<PastorWords />
	</div>
</section>
<section class="faith-sec container">
	<FaithStatement />
</section>
<section class="map-sec container">
	<h1 class="contact">Talk to us</h1>
	<div class="email-sec">
		<a class="email"
			 href="mailto:inquries@jehovahshammahministriesinternational.org">
			inquiries@jehovahshammahministriesinternational.org
		</a>
	</div>
	<Map />
</section>


<style>
	.email-sec {
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 600px;
		margin: 0 auto;
		text-align: center;
		}

	.contact {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		text-align: center;
		color: var(--blue);
		}

	.email {
		font-size: var(--font-size-base);
		font-weight: 600;
		line-height: 2;
		margin-top: 60px;
		text-decoration: underline var(--blue);
		word-break: break-all;
		color: var(--black);
		text-underline-offset: 8px;
		}

	.map-sec {
		margin: 60px auto var(--sm-px15);
		}

	.faith-sec {
		margin-top: var(--lg-px40);
		margin-bottom: var(--sm-px15);
		}

	.pastor-sec {
		background-color: var(--black);
		}

	.pastor {
		max-width: 900px;
		margin: auto;
		padding: var(--lg-px40) var(--sm-px15);
		}

	.introduction-quote2 {
		font-size: var(--font-size-lg);
		font-weight: 900;
		line-height: 1.5;
		max-width: var(--large-max-width);
		margin-top: var(--sm-px15);
		padding-right: var(--sm-px15);
		padding-left: var(--sm-px15);
		text-align: center;
		text-decoration: underline var(--yellow);
		color: var(--white);
		text-underline-offset: 8px;
		}

	.introduction-quote {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		font-weight: 500;
		max-width: var(--large-max-width);
		margin-top: var(--md-px20);
		padding-right: var(--sm-px15);
		padding-left: var(--sm-px15);
		text-align: center;
		color: var(--yellow);
		}

	.schedule {
		padding: var(--lg-px40) var(--sm-px15);
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

	@media (min-width: 801px) {
		.banner {
			max-width: 400px;
			}
		}

	@media (max-width: 800px) {
		.banner {
			max-width: 300px;
			}
		}

	.hero {
		position: relative;
		width: 100%;
		height: 75vh;
		background-color: rgba(0 0 0 / 0.1);
		background-image: url('https://res.cloudinary.com/dy9jpurpz/image/upload/v1721249648/ds1cp3mspfxjw376o9a0.jpg');
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		background-blend-mode: overlay;
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		}

	.intro-video {
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

	.social {
		list-style: none;
		}

	.social a {
		color: var(--black);
		}
</style>
