<script lang="ts">
	import { page } from '$app/stores';

	let errorMessage = $state('');
	let errorStatus = $state(0);

	$effect(() => {
		errorStatus = $page.status;
		errorMessage = $page.error?.message || '';

		if (errorStatus === 404) {
			errorMessage = 'Page not Found';
		} else if (errorStatus === 500) {
			errorMessage = 'Server Error';
		}
	});
</script>

<div class="error-page">
	<h2 class="font-lg font-semi-bold errormessage padding-bottom">{errorStatus}
		| {errorMessage}</h2>
	<p class="font-sm">
		{#if errorStatus === 404}
			The page you are looking for does not exist or has been moved.
		{:else if errorStatus === 500}
			We are sorry, but something went wrong. Please check your internet
			connection and try again.
		{/if}
	</p>
	<button>
		<a class="font-sm" href="/">Back Home</a>
	</button>
</div>


<style>
	.error-page {
		min-height: 100svh;
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

	a {
		color: var(--white);
		}

	button {
		margin-top: 30px;
		padding: 0 20px;
		border: none;
		border-radius: 5px;
		background-color: var(--black);
		}
</style>
