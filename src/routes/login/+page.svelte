<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { client } from '$lib/db';
	import { getToaster } from '$lib/hooks/toast.svelte';

	let error = $state<string>();

	const toaster = getToaster();

	if (browser) {
		const email = page.url.searchParams.get('email');
		const password = page.url.searchParams.get('password');

		if (!email || !password) {
			error = 'Email and password are required';
		} else {
			const res = await client.auth.signIn.email({
				email,
				password,
				rememberMe: true,
			});

			if (res.error) {
				error = res.error.message;
			} else {
				toaster.toast = { message: 'Logged in!', type: 'success' };
				localStorage.setItem('email', email);
				// Yep, this is unsafe. I don't care.
				localStorage.setItem('password', password);
				window.location.href = '/';
			}
		}
	}
</script>

<svelte:head>
	<title>Connecting...</title>
</svelte:head>

<div class="flex justify-center p-4">
	{#if error}
		{error}
	{:else}
		Connecting...
	{/if}
</div>
