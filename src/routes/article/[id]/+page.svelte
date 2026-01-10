<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { SquarePenIcon } from '@lucide/svelte';
	import * as StarRating from '$lib/components/ui/star-rating';
	import type { PageProps } from '../$types';

	let { data }: PageProps = $props();
</script>

<div class="mx-auto max-w-5xl px-6">
	{#if data.admin}
		<div class="mt-6 mb-4 flex">
			<Button href={`/dashboard/edit/${data.article.id}`}>
				<SquarePenIcon class="mr-2 h-4 w-4" />
				Edit Article
			</Button>
		</div>
	{/if}

	<section class="py-16">
		<div class="container">
			<div class="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
				<h1 class="max-w-3xl text-5xl font-semibold text-pretty md:text-6xl">
					{data.article.gametitle}
				</h1>
				<h3 class="max-w-3xl text-lg text-muted-foreground md:text-xl">
					{data.article.articletitle}
				</h3>
				<div class="flex items-center gap-3 text-sm md:text-base">
					<!-- <Avatar class="h-8 w-8 border">
              <AvatarImage src={authorImage} />
              <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
            </Avatar> -->
					<span>
                        By
						<span class="font-semibold">
							{data.author.email}
						</span>
						<span class="">on {data.article.created_at}</span>
					</span>
					<span class="">
						<StarRating.Root value={Number(data.article.rating)} readonly>
							{#snippet children({ items })}
								{#each items as item (item.index)}
									<StarRating.Star {...item} />
								{/each}
							{/snippet}
						</StarRating.Root>
					</span>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="prose dark:prose-invert max-w-8xl mx-auto">
				<p class="mt-2 text-lg text-muted-foreground">
					{data.article.description}
				</p>
			</div>
		</div>
	</section>
</div>
