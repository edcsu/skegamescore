<script lang="ts">
	import articlesStore from '$lib/stores/articles.store';
	import { onMount } from 'svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Spinner } from '$lib/components/ui/spinner';

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
	<div class="mx-auto my-6 grid max-w-7xl grid-cols-1 gap-10 px-12 md:grid-cols-2 lg:grid-cols-3">
		{#each $articlesStore.articles as article (article.id)}
			<Card.Root
				class="rounded-2xl rounded-bl border border-transparent bg-background px-4 py-3 ring-1"
			>
				<Card.Header>
					<Card.Title class="text-xl font-semibold">{article.articletitle}</Card.Title>
					<Card.Description class="text-sm font-medium text-foreground">
						{article.gametitle}
					</Card.Description>
				</Card.Header>
				<Card.Content class="text-foreground line-clamp-10">
					<p>{article.description}</p>
				</Card.Content>
				<Card.Footer>
					<Button href={`/article/${article.id}`} class="w-full">Read article</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
	<div class="mt-6 mb-4 flex">
		<Button
			onclick={() => articlesStore.loadMoreHomeArticles($articlesStore.lastVisible)}
			disabled={$articlesStore.loading}
			class="mx-auto my-6"
		>
			{#if $articlesStore.loading}
				<Spinner />
				Loading...
			{:else}
				Load more
			{/if}
		</Button>
	</div>
{/if}
