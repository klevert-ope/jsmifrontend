import { writable } from 'svelte/store';

export interface Live {
	id: string;
	title: string;
	link: string;
	created_at: string;
}

export interface LivesData {
	success: boolean;
	message: string;
	lives: Live[] | null;
	error?: string;
}

export interface FormData {
	title: string;
	link: string;
}

export const lives = writable<Live[]>([]);
export const error = writable<string | null>(null);
export const isLoading = writable(true);
export const successMessage = writable<string>('');
export const errorMessage = writable<string>('');
export const isSubmitting = writable(false);
export const initialFormData: FormData = { title: '', link: '' };
export const form: {
	data: FormData;
} = {
	data: { ...initialFormData }
};
