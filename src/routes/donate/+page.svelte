<script lang="ts">
	import NavLg from '$lib/NavLg.svelte';
	import NavSm from '$lib/NavSm.svelte';
</script>

<NavLg />
<NavSm />
<section class="container h-svh">
	<h1>Donate</h1>
	<p>
		At Jehovah Shammah Ministries International, our mission is spreading the
		Message of Hope. Your generous donations help us continue our work in
		feeding the homeless, supporting youth programs, and spreading the gospel.
		Every contribution, big or small, makes a significant impact in our
		community and beyond.
	</p>
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

	.h-svh {
		min-height: 100svh;
		}

	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}
</style>
