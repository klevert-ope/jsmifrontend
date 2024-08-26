<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { SplitText } from 'gsap/dist/SplitText';

	gsap.registerPlugin(ScrollTrigger, SplitText);

	const defaultColor = 'rgba(0, 0, 0, 0.3)';
	const highlightColor = 'rgba(0, 0, 0, 1)';

	onMount(() => {
		const kjvParagraph = document.querySelector('.kjv p') as HTMLElement | null;

		animateParagraph(kjvParagraph, 'top 90%', 'top 60%');

		function animateParagraph(paragraph: HTMLElement | null, start: string, end: string) {
			if (!paragraph) return;

			const splitText = new SplitText(paragraph, { type: 'words' });
			const words = splitText.words;

			const tl = gsap.timeline({ paused: true });

			words.forEach((word, index) => {
				gsap.set(word, { color: defaultColor });
				tl.to(word, {
					duration: 0.5,
					color: highlightColor,
					delay: index * 0.1,
					ease: 'power2.easeOut'
				});
			});

			ScrollTrigger.create({
				trigger: paragraph,
				start: start,
				end: end,
				animation: tl,
				toggleActions: 'play none none reverse',
				scrub: true,
				markers: false
			});
		}

		return () => {
			ScrollTrigger.getAll().forEach((trigger) => {
				trigger.kill();
			});
		};
	});
</script>


<div class="kjv flex-col-center">
	<h4 class="title-verse">ephesians 1:3 [KJV]</h4>
	<p class="bible-verse">
    <span>
      Blessed be the God and Father of our Lord Jesus Christ, who hath blessed
      us with all spiritual blessings in heavenly places in Christ:
    </span>
	</p>
</div>


<style>
	.bible-verse {
		font-size: var(--font-size-lg);
		font-weight: 700;
		line-height: 1;
		color: rgba(0, 0, 0, 0.3);
		}

	.bible-verse span {
		display: inline-block;
		}

	.kjv {
		max-width: var(--large-max-width);
		margin: var(--lg-px40) auto 0;
		text-align: center;
		}

	.title-verse {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-xl);
		margin-bottom: var(--xs-px10);
		text-align: center;
		color: var(--blue);
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		}
</style>
