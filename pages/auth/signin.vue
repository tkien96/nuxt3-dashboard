<script setup lang="ts">
	definePageMeta({ layout: "auth" });
	useSeoMeta({
		title: "Sign In",
	});
	import type { FormError } from "#ui/types";
	const fields = [
		{
			name: "email",
			type: "text",
			label: "Email",
			icon: "i-heroicons-at-symbol",
			placeholder: "Enter your email",
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			icon: "i-heroicons-key",
			placeholder: "Enter your password",
		},
		{
			name: "remember",
			label: "Remember me",
			type: "checkbox",
		},
	];
	const validate = (state: any) => {
		const errors: FormError[] = [];
		if (!state.email)
			errors.push({ path: "email", message: "Email is required" });
		if (!state.password)
			errors.push({ path: "password", message: "Password is required" });
		return errors;
	};
	const providers = [
		{
			label: "Continue with github",
			icon: "i-simple-icons-github",
			color: "white" as const,
			click: () => {
				console.log("Redirect to github");
			},
		},
	];
	function onSubmit(data: any) {
		console.log("Submitted", data);
	}
</script>
<template>
	<UiAuthForm
		:fields="fields"
		:validate="validate"
		:providers="providers"
		title="Welcome back!"
		align="top"
		icon="i-heroicons-lock-closed"
		:ui="{ base: 'text-center', footer: 'text-center' }"
		@submit="onSubmit"
	>
		<template #description>
			Don't have an account?
			<NuxtLink to="/auth/signup" class="text-primary font-medium">Sign up</NuxtLink
			>.
		</template>
		<template #password-hint>
			<NuxtLink to="/auth/forgot" class="text-primary font-medium">Forgot password?</NuxtLink>
		</template>
		<template #footer>
			By signing in, you agree to our
			<NuxtLink to="/" class="text-primary font-medium">Terms of Service</NuxtLink>.
		</template>
	</UiAuthForm>
</template>
