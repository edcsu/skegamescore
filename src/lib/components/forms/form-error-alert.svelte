<script lang="ts">
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { CircleAlertIcon } from '@lucide/svelte';
	let { title, description, errors } = $props();

</script>

<Alert.Root variant="destructive">
	<CircleAlertIcon />
	<Alert.Title>{title}</Alert.Title>
	<Alert.Description>
		<p>{description}</p>
		<ul class="list-inside list-disc text-sm">
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</Alert.Description>
</Alert.Root>
