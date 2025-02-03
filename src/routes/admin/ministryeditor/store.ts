import { writable } from 'svelte/store';
import { blogPostSchema } from './blogPostSchema';
import { z } from 'zod';

export const editorContent = writable('');
export const wordCountTitle = writable(0);
export const wordCountExcerpt = writable(0);
export const wordCountBody = writable(0);
export const QuillEditor = writable<any>(null);
export const successMessage = writable('');
export const errorMessage = writable('');
export const isSubmitting = writable(false);

export interface FormData {
	id: string;
	title: string;
	excerpt: string;
	body: string;
	created_at: string;
}

export const initialFormData = {
	id: '',
	title: '',
	excerpt: '',
	body: '',
	created_at: ''
};
export const initialFormErrors = {
	title: '',
	excerpt: '',
	body: ''
};
export const form: {
	data: FormData;
	errors: z.infer<typeof blogPostSchema>;
} = {
	data: { ...initialFormData },
	errors: { ...initialFormErrors }
};


export interface Post {
	id: string;
	title: string;
	excerpt: string;
	body: string;
	created_at: string;
}

export interface PostsData {
	success: boolean;
	message: string;
	posts: Post[] | null;
	error?: string;
}

export const posts = writable<Post[]>([]);
export const error = writable<string | null>(null);
export const isLoading = writable(true);


