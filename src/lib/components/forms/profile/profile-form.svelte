<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldError
	} from '$lib/components/ui/field/index.js';
	const id = $props.id();
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import FormErrorAlert from '../form-error-alert.svelte';

	let { formType, profileform } = $props();
	let isLoading = $state(false);
	// The 'enhance' callback function
	const submitEnhance: SubmitFunction = ({ formElement, data, cancel, submitter }) => {
		isLoading = true; // Set loading state to true on submission

		return async ({ update }) => {
			await update(); // Wait for the UI update after the server action
			isLoading = false; // Set loading state to false after completion
		};
	};
</script>

<Card.Root class="mx-auto w-full max-w-lg">
	<Card.Content>
		<form use:enhance={submitEnhance} method="POST">
			<FieldGroup>
				<Field
					data-invalid={profileform?.error?.properties?.firstname?.errors ||
					profileform?.form?.error?.properties?.firstname?.errors
						? true
						: false}
				>
					<FieldLabel for="firstname-{id}">First name</FieldLabel>
					<Input
						id="firstname-{id}"
						name="firstname"
						type="text"
						value={profileform?.firstname || ''}
						aria-invalid={profileform?.error?.properties?.firstname?.errors ||
						profileform?.form?.error?.properties?.firstname?.errors
							? 'true'
							: 'false'}
					/>
					{#each profileform?.error?.properties?.firstname?.errors || profileform?.form?.error?.properties?.firstname?.errors as err}
						<FieldError>{err}</FieldError>
					{/each}
				</Field>
				<Field
					data-invalid={profileform?.error?.properties?.lastname?.errors ||
					profileform?.form?.error?.properties?.lastname?.errors
						? true
						: false}
					aria-invalid={profileform?.error?.properties?.lastname?.errors ||
					profileform?.form?.error?.properties?.lastname?.errors
						? 'true'
						: 'false'}
				>
					<div class="flex items-center">
						<FieldLabel for="lastname-{id}">Last name</FieldLabel>
					</div>
					<Input
						id="lastname-{id}"
						name="lastname"
						type="text"
						value={profileform?.lastname || ''}
						aria-invalid={profileform?.error?.properties?.lastname?.errors ||
						profileform?.form?.error?.properties?.lastname?.errors
							? 'true'
							: 'false'}
					/>
					{#each profileform?.error?.properties?.lastname?.errors || profileform?.form?.error?.properties?.lastname?.errors as err}
						<FieldError>{err}</FieldError>
					{/each}
				</Field>
				{#if profileform?.error?.errors?.length || profileform?.form?.error?.errors?.length > 0}
					<FormErrorAlert
						title="There were some problems with your submission"
						description="Please fix the following errors and try again."
						errors={profileform.error.errors || profileform.form.error.errors}
					/>
				{/if}
				<Field>
					<Button type="submit" class="w-full" disabled={isLoading}>
						{#if isLoading}
							<Spinner />
							Saving...
						{:else}
							Save
						{/if}
					</Button>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
