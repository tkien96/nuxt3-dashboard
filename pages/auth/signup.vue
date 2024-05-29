<script setup lang="ts">
	definePageMeta({
		layout: "auth",
	});
	useSeoMeta({
		title: "Sign up",
	});
	const fields = [
		{
			name: "name",
			type: "text",
			label: "Name",
			icon: "i-heroicons-user",
			placeholder: "Enter your name",
		},
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
	];
	const validate = (state: any) => {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Name is required" });
		if (!state.email)
			errors.push({ path: "email", message: "Email is required" });
		if (!state.password)
			errors.push({ path: "password", message: "Password is required" });
		return errors;
	};
	const providers = [
		{
			label: "Continue with Google",
			icon: "i-simple-icons-google",
			color: "gray" as const,
			click: () => {
				console.log("Redirect to Google");
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
		align="top"
		title="Create an account"
		:ui="{ base: 'text-center', footer: 'text-center' }"
		:submit-button="{ label: 'Create account' }"
		@submit="onSubmit"
		icon="i-heroicons-user-plus"
	>
		<template #description>
			Already have an account?
			<NuxtLink to="/auth/signin" class="text-primary font-medium"
				>Signin</NuxtLink
			>.
		</template>
		<template #footer>
			By signing up, you agree to our
			<NuxtLink to="/" class="text-primary font-medium"
				>Terms of Service</NuxtLink
			>.
		</template>
	</UiAuthForm>
</template>
