<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { CircleUserIcon, FilePenIcon, LayoutDashboardIcon, NewspaperIcon } from '@lucide/svelte';
	import Home from './home.svelte';
	import Profile from './profile.svelte';
	import Articles from './articles.svelte';
	import CreateArticle from './create-article.svelte';
</script>

<div class="max-w-8xl mx-auto space-y-3 px-12 py-6 md:space-y-6">
	<Tabs.Root value="dashboard" class="">
		<Tabs.List class="mb-4 flex space-x-1 rounded-xl bg-muted p-1 items-center">
			<Tabs.Trigger value="dashboard">
				<LayoutDashboardIcon class="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
				Dashboard
			</Tabs.Trigger>
			<Tabs.Trigger value="profile">
				<CircleUserIcon class="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
				Profile
			</Tabs.Trigger>
			<Tabs.Trigger value="articles">
				<NewspaperIcon class="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
				Articles
			</Tabs.Trigger>
			<Tabs.Trigger value="create">
				<FilePenIcon class="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
				Create
			</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="dashboard">
            <Home />
        </Tabs.Content>
		<Tabs.Content value="profile">
            <Profile />
        </Tabs.Content>
		<Tabs.Content value="articles">
            <Articles />
        </Tabs.Content>
		<Tabs.Content value="create">
            <CreateArticle />
        </Tabs.Content>
	</Tabs.Root>
</div>
