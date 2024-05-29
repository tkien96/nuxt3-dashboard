<script setup lang="ts">
	definePageMeta({
		layout: "auth",
	});
	useSeoMeta({
		title: "Reset your password ?",
	});
	const fields = [
		{
			name: "email",
			type: "email",
			label: "",
			icon: "i-heroicons-user",
			placeholder: "Enter your name",
		},
	];
	const validate = (state: any) => {
		const errors = [];
		if (!state.email)
			errors.push({ path: "email", message: "Email is required" });
		return errors;
	};

	function onSubmit(data: any) {
		console.log("Submitted", data);
	}
</script>
<template>
	<UiAuthForm
		:fields="fields"
		:validate="validate"
		align="top"
		title="Reset your password ?"
		:ui="{ base: 'text-center', footer: 'text-center' }"
		:submit-button="{ label: 'Reset your password' }"
		@submit="onSubmit"
		icon="i-heroicons-arrow-path-rounded-square"
	>
		<template #description class="text-sm"
			>Enter your email and we'll send you a link to reset your
			password.</template
		>
		<template #footer>
			By signing up, you agree to our
			<NuxtLink to="/" class="text-primary font-medium"
				>Terms of Service</NuxtLink
			>.
		</template>
	</UiAuthForm>
</template>
