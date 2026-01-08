<script lang="ts">
	import Dashboardtabs from '$lib/components/dashboard/dashboardtabs.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

<Dashboardtabs />