<script>
	let spiritualSupportData = [
		{
			title: 'MIRROR OF LIFE - A TRUE REFLECTION OF LIGHT',
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1738596383/pexels-blitzboy-940880-scaled-e1725436138249_fq5p6x.jpg',
			caption: 'Life is a mirror; it reflects what you project. Shine with love, and love will shine back at you'
		},
		{
			title: 'PRAY WITH US',
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1738596383/pexels-jibarofoto-2014775-scaled-e1725436039672_uh2lj2.jpg',
			caption: 'Pray not because you need something, but because you have so much to thank God for'
		},
		{
			title: 'BIBLE STUDY',
			image: 'https://res.cloudinary.com/dy9jpurpz/image/upload/v1738596383/pexels-nappy-935944-e1725435953731_xvbrun.jpg',
			caption: 'Open your Bible to open your heart; in its pages, God speaks directly to you'
		}
	];
</script>

<div>
	<h4>Spiritual Support and Activities</h4>
	<p>
		At Jehovah Shammah Ministries International, we are committed to providing
		spiritual support and meaningful activities that help you grow in your faith
		and deepen your relationship with God. Our ministry offers a range of
		opportunities for worship, fellowship, discipleship, and community service,
		designed to encourage and empower you in your spiritual journey.
	</p>
	<div class="spiritual-support">
		{#each spiritualSupportData as item}
			<figure>
				<h5>{item.title}</h5>
				<img alt={item.title} loading="lazy" src={item.image}>
				<figcaption>{item.caption}</figcaption>
			</figure>
		{/each}
	</div>
</div>

<style lang="css">
	h4 {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-xl);
		margin-bottom: var(--xs-px10);
		color: var(--blue);
		}

	p {
		font-size: var(--font-size-base);
		font-weight: 600;
		max-width: 600px;
		margin-top: 20px;
		}

	.spiritual-support {
		display: grid;
		margin-top: var(--md-px20);
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		place-items: center;
		gap: 10px;
		}

	h5 {
		text-align: center;
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
