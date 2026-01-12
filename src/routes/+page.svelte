<script lang="ts">
	let { data } = $props();

	let current = $state('');
</script>

<svelte:head>
	<title>Mario Cart cups</title>
</svelte:head>

<div class="grid grid-cols-6">
	{#each data.cups as cup}
		<img src="/cups/{cup}.png" class="size-40" onclick={() => (current = cup)} />
	{/each}
</div>

{#if current}
	{@const maps = data.maps.filter((m) => m.cup === current)}
	<div class="flex">
		{#each maps as map}
			<div class="flex flex-col">
				{map.name}
				<img
					src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
						map.name
					)}.webp"
					alt={map.name}
					title={map.name}
				/>
			</div>
		{/each}
	</div>
{/if}
