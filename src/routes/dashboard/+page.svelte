<script lang="ts">
	import Dashboardtabs from '$lib/components/dashboard/dashboardtabs.svelte';
	import type { PageProps, ActionData  } from './$types';
	let { data, form }: PageProps = $props();
    console.log("CreateArticle form:", $form);

</script>

<Dashboardtabs {form} />
