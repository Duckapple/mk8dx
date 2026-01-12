<script lang="ts">
	import Button from '$lib/components/button.svelte';

	let { data } = $props();

	let current = $state(data.maps[0]);
	const name = $derived(current.tn || current.name);
</script>

<div class="flex h-dvh w-full flex-col items-center justify-between pt-10 pb-4">
	<div class="flex w-full flex-col items-center gap-8 px-4">
		<img
			src="/cups/{current.cup}.png"
			class="aspect-square w-1/3 animate-cup-bob rounded-full"
			alt={current.cup}
		/>
		<img
			src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
				current.name,
			)}.webp"
			alt={name}
			title={name}
			class="w-2/3 rounded-md border border-slate-400"
		/>
	</div>
	<div class="flex flex-col items-center">
		<span class="text-2xl">{name}</span>
		<span class="text-lg text-slate-400">{current.cup}</span>
	</div>
	<div class="flex justify-center">
		<Button>Randomize</Button>
	</div>
</div>
