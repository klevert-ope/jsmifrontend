<script lang="ts">
	import TimeDisplay from '$lib/TimeDisplay.svelte';
	import ScheduleCards from '$lib/ScheduleCards.svelte';
</script>

<div>
	<h1 class="schedule-header">
		Our Prayer Schedule
	</h1>
	<TimeDisplay />
	<p>For the most up-to-date prayer schedule and announcements, join our
		<span>
			<a href="https://chat.whatsapp.com/L4iGhHCu7jfDKWWUlObWm5"
				 target="_blank">
			WhatsApp group
			</a>
		</span>.</p>
	<ScheduleCards />
</div>

<style>
	.schedule-header {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		margin-top: var(--sm-px15);
		color: var(--blue);
		}

	p {
		font-size: var(--font-size-base);
		font-weight: 600;
		max-width: 600px;
		margin-top: 20px;
		}

	p > span > a {
		text-decoration: underline var(--blue);
		color: var(--black);
		text-underline-offset: 8px;
		}
</style>
