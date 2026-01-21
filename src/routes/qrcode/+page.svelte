<script lang="ts">
	import { browser } from '$app/environment';
	import { qrcode } from '@libs/qrcode';

	let svg = $state('');
	if (browser) {
		const email = localStorage.getItem('email') || '';
		const password = localStorage.getItem('password') || '';
		const search = new URLSearchParams({
			email,
			password,
		});
		svg = qrcode(`${location.origin}/login?${search}`, {
			output: 'svg',
			dark: '#1d293d',
			light: '#cad5e2',
		});
	}
</script>

<div class={['relative m-auto max-h-[90dvh] w-full overflow-hidden *:size-full']}>
	<div
		class="group absolute inset-0 flex items-center justify-center backdrop-blur-lg hover:backdrop-blur-none lg:backdrop-blur-2xl"
	>
		<div class="z-10 rounded-full bg-slate-900 px-4 py-2 group-hover:hidden">
			Tap/hover to reveal
		</div>
	</div>
	{#if svg}
		{@html svg}
	{/if}
</div>
