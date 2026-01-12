<script lang="ts">
	import Button from '$lib/components/button.svelte';

	let { data } = $props();

	let current = $state('');
	let currentMap = $state('');

	function randomize() {
		const map = data.maps[Math.floor(Math.random() * data.maps.length)];
		current = map.cup;
		currentMap = map.name;
	}
</script>

<svelte:head>
	<title>Mario Cart cups</title>
</svelte:head>

<div class="flex justify-center">
	<Button onclick={randomize}>Randomize</Button>
</div>

<div class="grid grid-cols-6 gap-2">
	{#each data.cups as cup}
		<button
			type="button"
			class="group flex cursor-pointer flex-col items-center justify-between gap-2"
			onclick={() => (current = cup)}
		>
			<span class="min-h-3 text-xs">{cup}</span>
			<img
				src="/cups/{cup}.png"
				class="aspect-square rounded-full transition-all group-hover:scale-125 {current === cup
					? 'outline-4 outline-blue-500'
					: ''}"
				alt={cup}
			/>
		</button>
	{/each}
</div>

{#if current}
	{@const maps = data.maps.filter((m) => m.cup === current)}
	<div class="flex gap-4">
		{#each maps as map}
			<div class="flex flex-col justify-between gap-2 text-sm">
				{map.tn || map.name}
				<img
					src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
						map.name,
					)}.webp"
					alt={map.name}
					title={map.name}
					class={currentMap === map.name
						? 'scale-105 outline-4 outline-offset-2 outline-blue-500'
						: ''}
				/>
			</div>
		{/each}
	</div>
{/if}
