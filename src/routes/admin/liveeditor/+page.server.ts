import { env } from '$env/dynamic/private';
import type { Live, LivesData } from './store';
import { Actions, fail } from '@sveltejs/kit';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export async function load(): Promise<LivesData> {
	try {
		const response = await fetch(`${apiURL}/lives`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			return {
				success: false,
				message: errorData.message || 'Failed to load lives.',
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

export const actions: Actions = {
	postlive: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const link = data.get('link') as string;

		if (!title || !link) {
			return fail(400, { message: 'Title and link are required.' });
		}

		try {
			const submission = await fetch(`${apiURL}/lives`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true'
				},
				body: JSON.stringify({ title, link })
			});

			if (!submission.ok) {
				const errorData = await submission.json();
				return fail(submission.status, {
					message: errorData.message || 'Failed to create live.'
				});
			}

			return { success: true, message: 'Live created successfully' };
		} catch (error: any) {
			return fail(500, { message: 'Server error' });
		}
	},

	updatelive: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const title = data.get('title') as string;
		const link = data.get('link') as string;
		const created_at = data.get('created_at') as string;

		if (!id || !title || !link || !created_at) {
			return fail(400,
				{ message: 'ID, title, link and created_at are required.' });
		}

		try {
			const submission = await fetch(`${apiURL}/lives?id=${id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, link, created_at })
			});

			if (!submission.ok) {
				const errorData = await submission.json();
				return fail(submission.status, {
					message: errorData.message || 'Failed to update live.'
				});
			}

			return { success: true, message: 'Live updated successfully' };
		} catch (error: any) {
			return fail(500, { message: 'Server error' });
		}
	},

	deletelive: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		if (!id) {
			return fail(400, { message: 'ID is required.' });
		}

		try {
			const submission = await fetch(`${apiURL}/lives?id=${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true'
				}
			});

			if (!submission.ok) {
				const errorData = await submission.json();
				return fail(submission.status, {
					message: errorData.message || 'Failed to delete live.'
				});
			}

			return { success: true, message: 'Live deleted successfully' };
		} catch (error: any) {
			return fail(500, { message: 'Server error' });
		}
	}
};
