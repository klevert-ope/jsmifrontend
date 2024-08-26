import { env } from '$env/dynamic/private';
import type { Live, LivesData } from './store';

const apiURL = env.POSTSAPI_URL;
const Token = env.BEARER_TOKEN;

export async function load(): Promise<LivesData> {
	try {
		const response = await fetch(`${apiURL}/lives`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${Token}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			return {
				success: false,
				message: errorData.message || 'Failed to load posts.',
				error: errorData.message,
				lives: []
			};
		}

		const fetchedLives: Live[] = await response.json();

		const sortedLives = fetchedLives.sort((a, b) =>
			new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);

		return {
			success: true,
			error: '',
			message: 'Lives loaded successfully.',
			lives: sortedLives
		};
	} catch (error: any) {
		return {
			success: false,
			message: 'Failed to load lives. Please try again later.',
			error: error.message,
			lives: []
		};
	}
}
