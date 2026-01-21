import { createContext } from 'svelte';

export interface Toaster {
	toast: null | { message: string; type: 'info' | 'error' | 'success' };
}
export const [getToaster, setToaster] = createContext<Toaster>();
