<script lang="ts">
	import type { PageProps } from './$types';
	import SiteHeader from '$lib/components/site-header.svelte';
	import ProfileForm from '$lib/components/forms/profile/profile-form.svelte';
	import { toast } from 'svelte-sonner';

	let { data, form }: PageProps = $props();
	$effect(() => {
		if (form && form?.success === true) {
			toast.success('Profile updated successfully');
		}
	});
</script>

<SiteHeader title="Profile" />
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div class="px-4 lg:px-6">
				<ProfileForm formType="edit" profileform={{ ...data.user, form }} />
			</div>
		</div>
	</div>
</div>
