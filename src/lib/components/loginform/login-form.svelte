<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription
	} from '$lib/components/ui/field/index.js';
	const id = $props.id();
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { FormSchema } from './loginschema';
	import { formSchema } from './loginschema';
	import FieldError from '../ui/field/field-error.svelte';
	import { loginUser, registerUser } from '$lib/firebase/client/auth.client';
	import Spinner from '../ui/spinner/spinner.svelte';

	let { formType } = $props();
	let isLoading = $state(false);

	const { form, errors } = createForm<FormSchema>({
		// ...
		extend: validator({ schema: formSchema }), // OR `extend: [validator],`

		async onSubmit(values: FormSchema, context: any) {
			await handleSubmit(values);
		}
	});

	const handleSubmit = async (values: FormSchema) => {
		isLoading = true;
		if (formType === 'signup') {
			await registerUser(values);
		} else {
			await loginUser(values);
		}
		isLoading = false;
	};
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">{formType === 'login' ? 'Login' : 'Sign Up'}</Card.Title>
		<Card.Description
			>{formType === 'login'
				? 'Enter your email below to login to your account'
				: 'Enter your email below to create a new account'}</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form use:form>
			<FieldGroup>
				<Field data-invalid={$errors.email ? true : false}>
					<FieldLabel for="email-{id}">Email</FieldLabel>
					<Input
						id="email-{id}"
						name="email"
						type="email"
						placeholder="m@example.com"
						aria-invalid={$errors.email ? true : false}
					/>
					{#if $errors.email}
						<FieldError>{$errors.email}</FieldError>
					{/if}
				</Field>
				<Field data-invalid={$errors.password ? true : false}>
					<div class="flex items-center">
						<FieldLabel for="password-{id}">Password</FieldLabel>
						<a href="##" class="ms-auto inline-block text-sm underline"> Forgot your password? </a>
					</div>
					<Input
						id="password-{id}"
						name="password"
						type="password"
						autocomplete=""
						aria-invalid={$errors.password ? true : false}
					/>
					{#if $errors.password}
						<FieldError>{$errors.password}</FieldError>
					{/if}
				</Field>
				<Field>
					<Button type="submit" class="w-full" disabled={isLoading}>
						{#if isLoading}
							<Spinner />
							Submitting...
						{:else}
							Submit
						{/if}
					</Button>
					<Button variant="outline" class="w-full">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<path
								d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
								fill="currentColor"
							/>
						</svg>
						Login with Google
					</Button>
					<FieldDescription class="text-center">
						{formType === 'login' ? "Don't have an account? " : 'Already have an account? '}<a
							href="##">{formType === 'login' ? 'Sign up' : 'Login'}</a
						>
					</FieldDescription>
				</Field>
			</FieldGroup>
		</form>
	</Card.Content>
</Card.Root>
