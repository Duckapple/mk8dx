<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import { client } from '$lib/db';

	let results = $state<any[] | null>(null);
</script>

<Button
	onclick={async () => {
		const res = await client?.from('player').select();
		results = res.data;
	}}
>
	make a query please :)
</Button>

{#if !results?.length}
	<p>No results</p>
{:else}
	<ul>
		{#each results as result}
			<li><code>{JSON.stringify(result)}</code></li>
		{/each}
	</ul>
{/if}
