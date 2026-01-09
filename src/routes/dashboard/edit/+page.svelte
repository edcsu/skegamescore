<script lang="ts">
    import type { PageProps } from './$types';
	import SiteHeader from '$lib/components/site-header.svelte';

    let { data }: PageProps = $props();
</script>
<SiteHeader title="Edit Article" />
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div class="px-4 lg:px-6">
			</div>
		</div>
	</div>
</div>
