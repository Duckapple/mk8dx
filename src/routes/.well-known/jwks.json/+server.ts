import { JWKS_ID, JWKS_KEY } from '$env/static/private';

export function GET() {
	return new Response(
		JSON.stringify({
			alg: 'RS256',
			e: 'AQAB',
			ext: true,
			key_ops: ['verify'],
			kty: 'RSA',
			n: JWKS_KEY,
			kid: JWKS_ID,
			use: 'sig',
		}),
		{
			headers: {
				'Content-Type': 'application/json',
			},
		},
	);
}
export const prerender = true;
