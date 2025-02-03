import { env } from '$env/dynamic/private';
import type { PostData } from './store';

const apiURL = env.POSTSAPI_URL;
const token = env.BEARER_TOKEN;

export async function load({ params }): Promise<PostData> {
	const id = params.id;

	if (!id) {
		return {
			success: false,
			error: 'Missing [id] ID in the URL.',
			post: null,
			message: 'Missing [id] ID in the URL.'
		};
	}

	try {
		const response = await fetch(`${apiURL}/posts?id=${id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			new Error(`Error fetching post: ${response.statusText}`);
		}

		const postData = await response.json();
		return {
			success: true,
			error: '',
			message: 'Post loaded successfully.',
			post: {
				id: postData.id,
				title: postData.title,
				excerpt: postData.excerpt,
				body: postData.body
			}
		};
	} catch (error: any) {
		return {
			success: false,
			error: error.message,
			post: null,
			message: 'Failed to load [id]. Please try again later.'
		};
	}
}
