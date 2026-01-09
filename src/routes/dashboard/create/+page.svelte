<script lang="ts">
	import type { PageProps } from './$types';
	import SiteHeader from '$lib/components/site-header.svelte';
	import ArticleForm from '$lib/components/forms/article/article-form.svelte';

	let { data, form }: PageProps = $props();
</script>

<SiteHeader title="Create Article" />
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<ArticleForm formType="create" articleform={form} />
		</div>
	</div>
</div>
