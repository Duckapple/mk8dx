<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import ControllerButton from '$lib/components/controller-button.svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';
	// import { client } from '$lib/db/index';

	let { data } = $props();

	let index = $state(0);
	let current = $derived(data.maps[index]);
	const name = $derived(current.tn || current.name);

	const last = $state(new SvelteSet<number>());

	function randomize() {
		let newVal = undefined;
		while (newVal === undefined || (data.maps.length > 4 && last.has(newVal))) {
			newVal = Math.floor(Math.random() * data.maps.length);
		}

		index = newVal;
		last.add(newVal);
	}

	const len = $derived(data.maps.length);

	let prev = $state(0);
	const hasL = $derived(Math.floor(index / (len / 2)) !== Math.floor(prev / (len / 2)));
	const upDown = $derived((Math.floor(index / (len / 4)) % 2) - (Math.floor(prev / (len / 4)) % 2));
	const leftRight = $derived((Math.floor(index / 4) % 6) - (Math.floor(prev / 4) % 6));
	const fasterLeftRight = $derived(
		!leftRight
			? leftRight
			: Math.abs(leftRight) > Math.abs((leftRight - 6) % 6)
				? (leftRight - 6) % 6
				: Math.abs(leftRight) > Math.abs((leftRight + 6) % 6)
					? (leftRight + 6) % 6
					: leftRight,
	);
	const trackNum = $derived(index % 4);
	const fasterTrackNum = $derived(trackNum === 3 ? -1 : trackNum);
</script>

<div class="flex h-full w-full flex-col items-center justify-between pt-10 pb-4">
	<div class="flex w-full flex-col items-center gap-8 px-4">
		<img
			src="/cups/{current.cup}.png"
			class="aspect-square w-1/3 max-w-64 animate-cup-bob rounded-full"
			alt={current.cup}
		/>
		<div class="relative min-h-full w-3/4 max-w-96">
			{#key current.name}
				<img
					src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
						current.name,
					)}.webp"
					alt={name}
					title={name}
					class="absolute top-0 w-full rounded-md border border-slate-400"
					transition:fade
				/>
			{/key}
		</div>
	</div>
	<div class="mt-36 flex flex-col items-center">
		<span class="text-2xl">{name}</span>
		<span class="text-lg text-slate-400">{current.cup}</span>

		<span class="mt-8 flex gap-2">
			{#snippet repeater(num: number)}
				{#if num && num > 0}
					{#each Array(num) as _}
						<ControllerButton button="right" />
					{/each}
				{:else if num && num < 0}
					{#each Array(-num) as _}
						<ControllerButton button="left" />
					{/each}
				{/if}
			{/snippet}
			{#if hasL}
				<ControllerButton button="l" />
			{/if}
			{#if upDown === -1}
				<ControllerButton button="up" />
			{:else if upDown === 1}
				<ControllerButton button="down" />
			{/if}
			{@render repeater(fasterLeftRight)}
			<ControllerButton button="a" />

			{@render repeater(fasterTrackNum)}
			<ControllerButton button="a" />
		</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<!-- <Button
			onclick={async () => {
				// const res = await client?.from('player').select();
				// console.log(res);
			}}
		>
			make a query please :)
		</Button> -->
		<span
			><span class="text-xl font-medium">{data.maps.length - last.size}</span> left to pick from</span
		>
		<div class="flex justify-center gap-2">
			<Button
				onclick={() => {
					prev = index;
					randomize();
				}}
			>
				Played it
			</Button>
			<Button onclick={randomize} style="secondary">Veto</Button>
		</div>
	</div>
</div>

<div class="sr-only">
	{#each data.maps as map}
		<img
			src="https://ryankopp.github.io/mk8d-randomizer/assets/maps/{encodeURIComponent(
				map.name,
			)}.webp"
			alt={map.name}
		/>
	{/each}
</div>
