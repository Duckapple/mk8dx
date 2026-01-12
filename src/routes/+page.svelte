<script lang="ts">
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
	<button
		type="button"
		class="my-6 cursor-pointer rounded-2xl bg-linear-210 from-orange-600 via-amber-600 to-yellow-600 px-10 py-6 text-2xl text-white transition-all hover:scale-125 active:scale-90"
		onclick={randomize}
	>
		Randomize
	</button>
</div>

<div class="grid grid-cols-6">
	{#each data.cups as cup}
		<img
			src="/cups/{cup}.png"
			class="size-40 cursor-pointer rounded-full transition-all hover:scale-125 {current === cup
				? 'outline-4 outline-blue-500'
				: ''}"
			onclick={() => (current = cup)}
			onkeydown={(e) => e.key === 'Enter' && (current = cup)}
			role="button"
			tabindex={0}
			alt={cup}
		/>
	{/each}
</div>

{#if current}
	{@const maps = data.maps.filter((m) => m.cup === current)}
	<div class="flex flex-wrap gap-4">
		{#each maps as map}
			<div class="flex flex-col gap-2">
				{map.name}
				<img
					src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
						map.name
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
