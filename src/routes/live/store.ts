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


export const lives = writable<Live[]>([]);
export const error = writable<string | null>(null);
export const isLoading = writable(true);

