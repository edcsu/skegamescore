<script lang="ts">
	import articlesStore from '$lib/stores/articles.store';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	articlesStore.subscribe((value) => {
		console.log('Articles Store Updated:', value);
	});

	onMount(async () => {
		if ($articlesStore.articles?.length) {
			await articlesStore.getHomeArticles();
		}
	});
</script>

{#if $articlesStore.articles.length <= 0}
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl my-6">
		{#each Array(6) as _, index}
			<Skeleton class="h-70 w-full rounded-md" />
		{/each}
	</div>
{:else}
    <h2 class="text-2xl font-semibold mb-4">Latest Articles</h2>
{/if}
