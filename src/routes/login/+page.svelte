<svelte:head>
	<title>LOGIN</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - Login"
		name="description" />
</svelte:head>

<script lang="ts">
	import ToastForm from '$lib/toastform.svelte';
	import { AiFillEye, AiFillEyeInvisible } from 'svelte-icons-pack/ai';
	import {
		BsArrowLeftCircleFill,
		BsArrowRightCircleFill
	} from 'svelte-icons-pack/bs';
	import { enhance } from '$app/forms';
	import {
		errorMessage,
		form,
		isSubmitting,
		showPassword,
		successMessage
	} from './store';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { Icon } from 'svelte-icons-pack';

	let step = writable(1);
</script>

<section class=" h-svh flex-col-center">
	<div class="container">
		<form
			action="?/login"
			method="POST"
			use:enhance={async () => {
			isSubmitting.set(true);
			return async ({ result, update }) => {
				if (result.type === 'success') {
					await update({ reset: true, invalidateAll: true });
					successMessage.set('Logged in successfully');
					await goto('/admin');
				} else {
					errorMessage.set('An error occurred while logging in. Kindly verify your username or password.');
				}
				isSubmitting.set(false);
			};
		}}
		>
			<h1>Admin login</h1>

			{#if $step === 1}
				<input
					bind:value={form.data.username}
					name="username"
					placeholder="Username"
					required
					type="text"
				/>
				{#if $errorMessage}
					<p class="error">{$errorMessage}</p>
				{/if}
				<div class="flex-end">
					<button
						aria-label="next"
						class="next-button"
						on:click={() => {
						if (!form.data.username.trim()) {
							errorMessage.set('Username cannot be empty');
						} else {
							$step = 2;
							errorMessage.set('');
						}
					}}
						type="button"
					>
						<Icon size="34" src={BsArrowRightCircleFill} />
					</button>
				</div>
			{:else if $step === 2}
				<button
					aria-label="back"
					class="back-button"
					on:click={() => $step = 1}
					type="button"
				>
					<Icon size="34" src={BsArrowLeftCircleFill} />
				</button>
				<div class="username-display">
					<input
						bind:value={form.data.username}
						name="username"
						placeholder="Username"
						required
						type="text"
						readonly
						class="faded"
					/>
				</div>
				<div class="password-field">
					{#if $showPassword}
						<input
							bind:value={form.data.password}
							type="text"
							autocomplete="off"
							id="password"
							name="password"
							placeholder="Password"
							required
						/>
					{:else}
						<input
							bind:value={form.data.password}
							type="password"
							autocomplete="new-password"
							id="password"
							name="password"
							placeholder="Password"
							required
						/>
					{/if}
					<button
						aria-label="toggle password visibility"
						class="icon-password"
						on:click={() => $showPassword = !$showPassword}
						type="button"
					>
						{#if $showPassword}
							<Icon color="var(--black)" size="28" src={AiFillEye} />
						{:else}
							<Icon color="var(--black)" size="28" src={AiFillEyeInvisible} />
						{/if}
					</button>
				</div>

				{#if $errorMessage}
					<p class="error">{$errorMessage}</p>
				{/if}

				<button
					aria-label="login"
					class="login-button"
					disabled={$isSubmitting}
					type="submit"
				>
					{$isSubmitting ? "Logging in..." : "Login"}
				</button>
			{/if}
		</form>
	</div>
</section>

{#if $successMessage}
	<ToastForm message={$successMessage} type="success" />
{/if}


<style>
	.error {
		font-size: var(--font-size-sm);
		font-weight: 600;
		margin-top: -25px;
		color: oklch(0.636 0.227 26.593);
		}

	h1 {
		font-family: 'Waiting Summer', sans-serif;
		font-size: var(--font-size-2xl);
		text-align: center;
		color: var(--blue);
		}

	.h-svh {
		min-height: 70svh;
		}

	.next-button {
		cursor: pointer;
		color: var(--black);
		border-radius: 50%;
		}

	.back-button {
		cursor: pointer;
		color: var(--black);
		border-radius: 50%;
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

	.password-field {
		position: relative;
		display: flex;
		align-items: center;
		}

	input[type="password"], input[type="text"] {
		box-sizing: border-box;
		width: 100%;
		height: 40px;
		padding: 0 40px 0 10px;
		border: 1px solid rgba(20, 20, 20, 0.4);
		border-radius: 8px;
		outline: none;
		}

	.icon-password {
		position: absolute;
		right: 10px;
		cursor: pointer;
		color: var(--black);
		}

	.password-field {
		margin-bottom: 20px;
		}

	form {
		display: flex;
		flex-direction: column;
		max-width: 500px;
		margin: 0 auto;
		gap: 30px;
		}

	button {
		all: unset;
		}

	.login-button {
		font-size: var(--font-size-sm);
		width: auto;
		height: auto;
		padding: 10px;
		cursor: pointer;
		transition: color 0.3s ease;
		text-align: center;
		color: var(--white);
		border: none;
		border-radius: 8px;
		background-color: var(--black);
		}

	.login-button:disabled {
		cursor: default;
		opacity: 0.5;
		}

	.login-button:hover {
		color: var(--yellow);
		}

	.flex-end {
		display: flex;
		justify-content: flex-end;
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		justify-content: center;
		}

	.faded {
		opacity: 0.5;
		}
</style>
