<script lang="ts">
	import LoginForm from '$lib/components/forms/login/login-form.svelte';
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>
<div class="flex h-screen w-full items-center justify-center px-4">
  <LoginForm formType='signup' />
</div>