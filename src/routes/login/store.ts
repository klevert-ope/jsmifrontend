import { writable } from 'svelte/store';

export interface FormData {
	username: string;
	password: string;
}

export const initialFormData = { username: '', password: '' };

export const form: {
	data: FormData;
} = {
	data: { ...initialFormData }
};


export const successMessage = writable('');
export const errorMessage = writable('');
export const isSubmitting = writable(false);
export const showPassword = writable(false);
