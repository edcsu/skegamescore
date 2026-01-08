<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
</script>

<div class="max-w-12xl mx-auto space-y-3 px-6 md:space-y-6 py-4">
	<div class="space-y-2">
		<Skeleton class="h-10 w-full" />
	</div>
	<Skeleton class="h-[80vh] w-full rounded-xl" />
</div>
