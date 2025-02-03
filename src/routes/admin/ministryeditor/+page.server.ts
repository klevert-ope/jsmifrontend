import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Post, PostsData } from './store';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export async function load(): Promise<PostsData> {
	try {
		const response = await fetch(`${apiURL}/posts`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			new Error(errorData.message || 'Failed to load posts.');
		}

		const fetchedPosts = await response.json();
		const sortedPosts = fetchedPosts.sort((a: Post, b: Post) => {
			return (
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
			);
		});

		return {
			success: true,
			error: '',
			message: 'Posts loaded successfully.',
			posts: sortedPosts
		};
	} catch (error: any) {
		return {
			success: false,
			message: 'Failed to load posts. Please try again later.',
			error: error.message,
			posts: []
		};
	}
}

export const actions = {
	postnews: async ({ request }: { request: Request }) => {
		try {
			const data = await request.formData();
			const title = data.get('title') as string;
			const excerpt = data.get('excerpt') as string;
			const body = data.get('body') as string;

			const response = await fetch(`${apiURL}/posts`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, excerpt, body })
			});

			if (!response.ok) {
				const errorData = await response.json();
				return fail(response.status, {
					message: errorData.message || 'Failed to create post'
				});
			}

			return { success: true, message: 'Post created successfully' };
		} catch (error) {
			console.error('Server error:', error);
			return fail(500, { message: 'Server error' });
		}
	},

	updatenews: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const title = data.get('title') as string;
		const excerpt = data.get('excerpt') as string;
		const body = data.get('body') as string;
		const created_at = data.get('created_at') as string;

		if (!id || !title || !excerpt || !body || !created_at) {
			return fail(400,
				{ message: 'ID, title, excerpt, body and created_at are required.' });
		}

		try {
			const submission = await fetch(`${apiURL}/posts?id=${id}`, {
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ title, excerpt, body, created_at })
			});

			if (!submission.ok) {
				const errorData = await submission.json();
				return fail(submission.status, {
					message: errorData.message || 'Failed to update post.'
				});
			}

			return { success: true, message: 'Post updated successfully' };
		} catch (error: any) {
			return fail(500, { message: 'Server error' });
		}
	},


	deletenews: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;

		if (!id) {
			return fail(400, { message: 'ID is required.' });
		}

		try {
			const submission = await fetch(`${apiURL}/posts?id=${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
					'x-sveltekit-action': 'true'
				}
			});

			if (!submission.ok) {
				const errorData = await submission.json();
				return fail(submission.status, {
					message: errorData.message || 'Failed to delete post.'
				});
			}

			return { success: true, message: 'Post deleted successfully' };
		} catch (error: any) {
			return fail(500, { message: 'Server error' });
		}
	}
};
