import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export const actions: Actions = {
	logoff: async ({ cookies }) => {
		try {
			const response = await fetch(`${apiURL}/auth/logoff`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			if (!response.ok) {
				new Error('Failed to log off');
			}

			cookies.delete('access_token', { path: '/' });
			cookies.delete('refresh_token', { path: '/' });

			redirect(302, '/login');
		} catch (error) {
			console.error(error);
		}
	}
};
