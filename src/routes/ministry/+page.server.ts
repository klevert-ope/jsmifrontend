import { env } from '$env/dynamic/private';
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
