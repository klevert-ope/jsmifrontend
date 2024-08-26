<script lang="ts">
	import FaPrayingHands from 'svelte-icons/fa/FaPrayingHands.svelte';

	interface Believes {
		text: string;
	}

	let believes: Believes[] = [
		{
			text:
				'We believe that salivation is a gift to all men and is received by Faith in Jesus Christ and not by our own good works. For by grace are ye saved through faith and that not of yourself it is the gift of God. Ephesians 2:8'
		},
		{ text: 'We believe in the baptism of the Holy Spirit with the evidence of speaking in tongues and that it is a gift from God to everyone who believes in Jesus as his Lord and Savior. Acts: 2:8 says: And they were filled with the Holy Ghost and began to speak with other tongues as the Spirit gave them utterance.' },
		{ text: 'We believe in miracles signs and wonders and that healing is a divine blessing to everyone in this day and edge according as it’s written in John 14:12 Verily, verily I say unto you, he that believeth on me, the works that I do shall he do also and greater works than these shall he do because I go unto my father. And these signs shall follow them that believe, in my name shall they cast out devils; they shall speak with new tongues. They shall take up serpents and if they shall lay hands on the sick, they shall recover.' },
		{ text: 'We believe that Jesus Christ is the son of God he was manifested in the flesh , died for the sin of the world and was raised up on the third day and is now seated at the right hand of the father' }
	];
</script>

<div class="faith-banner">
	<figure>
		<img
			alt="Church session"
			src="https://res.cloudinary.com/dy9jpurpz/image/upload/v1720128858/IMG-20240627-WA0007_ybtekq.jpg">
		<figcaption>
			Church service at Jehovah Shammah Ministries
			International
		</figcaption>
	</figure>
	<div>
		<h1>FAITH STATEMENT</h1>
		<p>
			We firmly believe that salvation, eternal life, and peace in this world
			and the next come exclusively through faith in our Lord Jesus Christ. As a
			ministry, we are dedicated to proclaiming the good news of God's grace
			through Jesus Christ, which brings people into His kingdom. As 1 Timothy
			2:3-4 clearly states, "This is good, and pleases God our Savior, who wants
			everyone to be saved and to understand the truth."
		</p>
	</div>
</div>

<h1 class="believe-title">WHAT WE BELIEVE</h1>
<ul>
	{#each believes as believe (believe)}
		<li class="font-md">
			<div class="icon">
				<FaPrayingHands />
			</div>
			{believe.text}
		</li>
	{/each}
</ul>

<style>
	.icon {
		width: 24px;
		height: 24px;
		color: var(--yellow);
		}

	h1 {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-2xl);
		margin-bottom: var(--sm-px15);
		color: var(--blue);
		}

	p {
		font-size: var(--font-size-base);
		font-weight: 600;
		line-height: 1.5;
		max-width: var(--large-max-width);
		margin-bottom: var(--xs-px10);
		}

	li {
		font-size: var(--font-size-base);
		font-weight: 600;
		max-width: 800px;
		height: auto;
		margin-top: var(--lg-px40);
		margin-bottom: var(--lg-px40);
		padding: 20px;
		list-style: none;
		color: var(--black);
		border-radius: 4px;
		background-color: rgba(21, 112, 239, 0.3);
		}

	.believe-title {
		margin-top: var(--lg-px40);
		}

	.faith-banner {
		display: flex;
		flex-direction: row;
		gap: 20px;
		}

	@media (max-width: 760px) {
		.faith-banner {
			display: flex;
			flex-direction: column;
			gap: 20px;
			}
		}

	figcaption {
		font-size: var(--font-size-sm);
		font-weight: 600;
		margin-top: 8px;
		color: gray;
		}

	figure {
		max-width: 600px;
		}

	figure > img {
		border-radius: 8px;
		}
</style>
