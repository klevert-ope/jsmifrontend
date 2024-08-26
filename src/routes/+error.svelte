<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let errorMessage = '$page.error.message';
	let errorStatus = Number($page.status);

	onMount(() => {
		if (errorStatus === 404) {
			errorMessage = 'Page not Found';
		} else if (errorStatus === 500) {
			errorMessage = 'Server Error';
		}
	});
</script>

<div class="error-page">
	<h2 class="font-lg font-semi-bold errormessage padding-bottom">{errorStatus} |
		{errorMessage}</h2>
	<p class="font-sm">
		{#if errorStatus === 404}
			The page you are looking for does not exist or has been moved.
		{:else if errorStatus === 500}
			We are sorry, but something went wrong. Please check your internet
			connection and try again.
		{/if}
	</p>
</div>

<style>
	.error-page {
		padding: 50px;
		text-align: center;
		}

	.errormessage {
		color: red;
		}

	.font-lg {
		font-size: var(--font-size-lg);
		}

	.font-sm {
		font-size: var(--font-size-sm);
		font-weight: 700;
		}

	.font-semi-bold {
		font-weight: 800;
		}

	.padding-bottom {
		padding-bottom: 10px;
		}
</style>
