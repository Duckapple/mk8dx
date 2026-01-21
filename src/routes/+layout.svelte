<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import { setToaster, type Toaster } from '$lib/hooks/toast.svelte';

	let { children } = $props();

	let toaster = $state({
		toast: null as Toaster['toast'],
		_timeout: null as null | ReturnType<typeof setTimeout>,
	});

	setToaster(toaster);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Mario Kart 8 Deluxe Randomizer</title>
</svelte:head>

<div class="flex h-dvh flex-col">
	<div class="border-b">
		<a class="inline-flex px-4 py-2" href={resolve('/')}>Randomize</a>
		<a class="inline-flex px-4 py-2" href={resolve('/qrcode')}>QR Code</a>
		<div class="grow"></div>
		{#if toaster?.toast}
			<span>{toaster.toast.message}</span>
		{/if}
	</div>
	{@render children()}
</div>
