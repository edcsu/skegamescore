<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutProps } from './$types';
	import { onMount } from 'svelte';
	import LayoutSkeleton from '$lib/components/layout-skeleton.svelte';
	import { setAccessToken } from '$lib/firebase/client/auth.client';

	let { data, children }: LayoutProps = $props();
	let loading = $state(true);

	onMount(async () => {
		const user = await data.getAuthUser();
		await setAccessToken();
		loading = false;
	});

</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />
{#if loading}
	<LayoutSkeleton />
{:else}
<main>
	<Navbar />
	{@render children()}
	<Toaster />
</main>
{/if}
