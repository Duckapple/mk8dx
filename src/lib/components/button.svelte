<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children?: Snippet;
		style?: 'primary' | 'secondary';
	}
	let { onclick, children, style = 'primary' }: Props = $props();
</script>

<button
	type="button"
	class={[
		'my-6 cursor-pointer rounded-2xl bg-linear-210 px-10 py-6 text-2xl text-white transition-all select-none hover:via-30% hover:to-70%',
		{
			'from-orange-600 via-amber-600 to-yellow-600': style === 'primary',
			'from-slate-600 via-slate-700 to-slate-800': style === 'secondary',
		},
	]}
	{onclick}
>
	{@render children?.()}
</button>
