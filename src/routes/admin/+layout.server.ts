import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export const load = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');

	if (!accessToken || !refreshToken) {
		throw redirect(302, '/login');
	}

	const response = await fetch(`${apiURL}/auth/refresh-token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ refreshToken })
	});

	if (!response.ok) {
		throw redirect(302, '/login');
	}

	const data = await response.json();
	const newAccessToken = data.accessToken;

	if (newAccessToken) {
		cookies.set('access_token', newAccessToken, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'lax'
		});
	}

	return {};
};
