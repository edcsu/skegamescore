<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	const id = $props.id();
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { enhance } from '$app/forms';

	let { formType, articleform } = $props();
	let isLoading = $state(false);
	const rating = $derived(articleform?.rating || '');
</script>

<Card.Root class="mx-auto w-full max-w-lg">
	<Card.Content>
		<form use:enhance method="POST">
			<FieldGroup>
				<Field>
					<FieldLabel for="game-title-{id}">Game title</FieldLabel>
					<Input
						id="game-title-{id}"
						name="gametitle"
						type="text"
						value={articleform?.gametitle || ''}
					/>
				</Field>
				<Field>
					<div class="flex items-center">
						<FieldLabel for="article-title-{id}">Article title</FieldLabel>
					</div>
					<Input
						id="article-title-{id}"
						name="articletitle"
						type="text"
						value={articleform?.articletitle || ''}
					/>
				</Field>
				<Field>
					<FieldLabel for="game-description-{id}">Game Description</FieldLabel>
					<Textarea
						id="game-description-{id}"
						placeholder="Share your thoughts about the game..."
						rows={4}
						name="gamedescription"
						value={articleform?.gamedescription || ''}
					/>
					<FieldDescription>Share your thoughts about the game.</FieldDescription>
				</Field>
				<Field>
					<FieldLabel for="rating-{id}">Rating</FieldLabel>
					<Select.Root type="single" value={articleform?.rating || ''} name="rating">
						<Select.Trigger class="">{rating}</Select.Trigger>
						<Select.Content>
							<Select.Item value="1">1</Select.Item>
							<Select.Item value="2">2</Select.Item>
							<Select.Item value="3">3</Select.Item>
							<Select.Item value="4">4</Select.Item>
							<Select.Item value="5">5</Select.Item>
						</Select.Content>
					</Select.Root>
					<FieldDescription>Rate the game from 1 to 5.</FieldDescription>
				</Field>
				<Field>
					<Button type="submit" class="w-full" disabled={isLoading}>
						{#if isLoading}
							<Spinner />
							Saving...
						{:else}
							Save
						{/if}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
