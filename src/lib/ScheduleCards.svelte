<script lang="ts">
	import TiTime from 'svelte-icons/ti/TiTime.svelte';

	const cards = [
		{
			id: 1,
			title: 'online',
			schedules: [
				{
					day: 'MONDAY, THURSDAY & SATURDAY',
					activities: [
						{
							time: '8.00 PM - 9.00 PM',
							description: 'Souls, and ministry members and partners'
						}
					]
				},
				{
					day: 'ALL DAYS',
					activities: [
						{
							time: '11:00 PM - 12.00 AM',
							description: 'Daily global prayers'
						},
						{
							time: '5:00 AM - 5:25 AM',
							description: 'Commanding your morning'
						}
					]
				}
			]
		},
		{
			id: 2,
			title: 'on location',
			schedules: [
				{
					day: 'sunday',
					activities: [
						{
							time: '8:00 AM - 12.00 PM',
							description: 'Church service'
						}
					]
				}
			]
		}
	];
</script>

<div>
	<div class="cards">
		{#each cards as card (card.id)}
			<div class="card">
				<div class="title-sec">
					<h2 class="card-title">{card.title}</h2>
				</div>
				{#each card.schedules as schedule}
					<div class="schedule">
						<h3 class="day">{schedule.day}</h3>
						{#each schedule.activities as activity}
							<div class="activity-points">
								<div class="time-sec">
									<div class="time-icon">
										<TiTime />
									</div>
									<p class="time">{activity.time}</p>
								</div>
								<p class="activity-des">{activity.description}</p>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>


<style>
	.cards {
		display: flex;
		flex-direction: row;
		margin-top: var(--md-px20);
		gap: 20px;
		}

	@media (max-width: 760px) {
		.cards {
			display: flex;
			flex-direction: column;
			margin-top: var(--md-px20);
			gap: 20px;
			}
		}

	.card {
		width: 100%;
		max-width: 600px;
		height: auto;
		padding: 10px;
		border-radius: 4px;
		background-color: var(--black);
		box-shadow: 4px 3px 3px var(--blue);
		}

	.card-title {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-base);
		text-align: center;
		color: var(--white);
		}

	.day {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-lg);
		margin-bottom: 10px;
		color: var(--yellow);
		}

	.activity-points {
		margin-bottom: var(--xs-px10);
		color: var(--white);
		}

	.activity-des {
		font-size: var(--font-size-base);
		max-width: 300px;
		margin-bottom: var(--xs-px10);
		margin-left: var(--sm-px15);
		}

	.time {
		font-size: var(--font-size-base);
		font-style: italic;
		margin-top: 5px;
		color: gray;
		}

	.time-icon {
		width: 25px;
		height: 25px;
		margin-right: var(--xs-px10);
		color: var(--blue);
		}

	.time-sec {
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-bottom: var(--xs-px10);
		}

	.title-sec {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: center;
		margin-bottom: var(--xs-px10);
		padding: 10px;
		border-radius: 5px;
		background-color: var(--blue);
		}
</style>
