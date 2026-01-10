<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';

	let { rating } = $props();
</script>

<StarRating.Root value={Number(rating)} readonly>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<StarRating.Star {...item} />
		{/each}
	{/snippet}
</StarRating.Root>
