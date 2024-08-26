import type { Actions } from '@sveltejs/kit';
import { fail } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const response = await fetch(`${apiURL}/auth/login`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'x-sveltekit-action': 'true',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});

		if (response.ok) {
			const { accessToken, refreshToken } = await response.json();

			if (accessToken && refreshToken) {
				cookies.set('access_token', accessToken, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'lax'
				});
				cookies.set('refresh_token', refreshToken, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'lax'
				});
				return { success: true };
			} else {
				return fail(500, { message: 'Failed to set tokens' });
			}
		} else {
			return fail(response.status, { message: 'Invalid username or password' });
		}
	}
};
