<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export const location = writable<string>('Asia/Dubai');

	const currentTime = writable(new Date().toLocaleTimeString(undefined, {
		timeZone: $location,
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	}));

	const updateTime = () => {
		currentTime.set(new Date().toLocaleTimeString(undefined, {
			timeZone: $location,
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		}));
	};

	onMount(() => {
		const locationSubscription = location.subscribe(value => {
			currentTime.set(new Date().toLocaleTimeString(undefined, {
				timeZone: value,
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}));
			updateTime();
		});

		return () => {
			locationSubscription();
			clearInterval(setInterval(updateTime, 1000));
		};
	});
</script>

<div class="time">
	<p class="font-xs font-medium">{$currentTime}</p>
	<p class="margin-left font-xs font-medium font-Square-Grotesk">
		ASIA/UAE
	</p>
</div>

<style lang="css">
	.time {
		display: flex;
		align-items: center;
		flex-direction: row;
		max-width: 200px;
		margin-top: var(--xs-px10);
		margin-left: 10px;
		border-radius: 5px;
		}

	.font-xs {
		font-size: var(--font-size-sm);
		}

	.font-medium {
		font-weight: 700;
		}

	.margin-left {
		margin-left: var(--xs-px10);
		}

	p {
		color: gray;
		}
</style>
