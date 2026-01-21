import { createClient } from '@neondatabase/neon-js';
import { PUBLIC_NEON_AUTH_URL, PUBLIC_NEON_REST_URL } from '$env/static/public';

if (!PUBLIC_NEON_AUTH_URL || !PUBLIC_NEON_REST_URL) throw new Error('PUBLIC_NEON_URL is not set');

export const client = createClient({
	auth: {
		url: PUBLIC_NEON_AUTH_URL,
	},
	dataApi: {
		url: PUBLIC_NEON_REST_URL,
	},
});
