<script lang="ts">
	import articlesStore from '$lib/stores/articles.store';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Button from '$lib/components/ui/button/button.svelte';

	articlesStore.subscribe((value) => {
		console.log('Articles Store Updated:', value);
	});

	onMount(async () => {
		if (!$articlesStore.articles?.length) {
			await articlesStore.getHomeArticles();
		}
	});
</script>

{#if $articlesStore.articles.length <= 0}
	<div class="mx-auto my-6 grid max-w-7xl grid-cols-1 gap-8 px-12 md:grid-cols-2 lg:grid-cols-3">
		{#each Array(6) as _, index}
			<Skeleton class="h-70 w-full rounded-md" />
		{/each}
	</div>
{:else}
	<Button
		onclick={() => articlesStore.loadMoreHomeArticles($articlesStore.lastVisible)}
		class="mx-auto my-6"
	>
		Load more
	</Button>
{/if}
