<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children?: Snippet;
	}
	let { onclick, children }: Props = $props();
</script>

<button
	type="button"
	class="my-6 cursor-pointer rounded-2xl bg-linear-210 from-orange-600 via-amber-600 to-yellow-600 px-10 py-6 text-2xl text-white transition-all hover:scale-125 active:scale-90"
	{onclick}
>
	{@render children?.()}
</button>
