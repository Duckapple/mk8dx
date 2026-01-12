<script lang="ts">
	import {
		ArrowLeftIcon,
		ArrowRightIcon,
		ArrowUpIcon,
		ArrowDownIcon,
	} from '@sidekickicons/svelte/24/outline';
	interface Props {
		button: 'a' | 'l' | 'down' | 'up' | 'right' | 'left';
	}
	let { button }: Props = $props();
</script>

<div class="size-8 text-white">
	{#if button === 'a'}
		<div
			class="flex size-8 items-center justify-center rounded-full border-2 border-slate-300 bg-red-900"
		>
			A
		</div>
	{:else if button === 'l'}
		<div
			class="my-1 flex h-6 items-center justify-center rounded-sm border-2 border-slate-300 bg-zinc-800"
		>
			L
		</div>
	{:else if button === 'down'}
		<ArrowDownIcon />
	{:else if button === 'up'}
		<ArrowUpIcon />
	{:else if button === 'right'}
		<ArrowRightIcon />
	{:else if button === 'left'}
		<ArrowLeftIcon />
	{/if}
</div>
