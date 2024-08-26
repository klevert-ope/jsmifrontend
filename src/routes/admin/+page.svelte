<svelte:head>
	<title>ADMIN</title>
	<meta
		content="JEHOVAH SHAMMAH MINISTRIES INTERNATIONAL - ADMIN"
		name="description" />
</svelte:head>

<script lang="ts">
	import { enhance } from '$app/forms';
	import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte';
</script>

<section class="h-svh">
	<div class="container">
		<div class="flex-row-between header">
			<h2 class="admin-title">Admin</h2>
			<form action="?/logoff"
						method="POST"
						use:enhance={async () => {
			return async ({ result}) => {
					if (result.type === 'success') {
					window.location.href = '/login';
					}
			};
		}}
			>
				<div class="flex-row">
					<label for="logout">Logout</label>
					<button
						aria-label="logging out"
						class="logging-out"
						type="submit"
					>
						<FaSignOutAlt />
					</button>
				</div>
			</form>
		</div>
		<div class="flex-col-center nav-admin">
			<a class="live-editor" href="admin/liveeditor">Live Editor</a>
			<a class="news-editor" href="admin/newseditor">News Editor</a>
		</div>
	</div>
</section>

<style>
	label {
		font-size: var(--font-size-sm);
		font-weight: bold;
		margin-right: 5px;
		}

	button {
		all: unset;
		}

	.logging-out {
		width: 20px;
		height: 20px;
		padding: 5px;
		cursor: pointer;
		color: var(--yellow);
		border-radius: 50%;
		background-color: #141414;
		}

	.h-svh {
		min-height: 70svh;
		}

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

	.admin-title {
		font-family: 'LeArchitect', sans-serif;
		font-size: var(--font-size-xl);
		color: var(--blue);
		}

	.flex-row {
		display: flex;
		align-items: center;
		flex-direction: row;
		}

	.flex-row-between {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		}

	.header {
		max-width: 800px;
		margin: 0 auto;
		}

	.flex-col-center {
		display: flex;
		align-items: center;
		justify-content: center;
		}

	.nav-admin {
		font-size: var(--font-size-sm);
		justify-content: space-between;
		max-width: 500px;
		margin: 40px auto 0;
		}

	.live-editor, .news-editor {
		padding: 8px;
		color: var(--white);
		border-radius: 8px;
		background-color: var(--black);
		}

	.live-editor:hover, .news-editor:hover {
		color: var(--yellow);
		}
</style>

