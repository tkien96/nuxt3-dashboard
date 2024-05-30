<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from "#ui/types";
	const emit = defineEmits(["close"]);
	const state = reactive({
		name: undefined,
		email: undefined,
		phone: undefined,
		address: undefined,
	});

	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Please enter a name." });
		if (!state.email)
			errors.push({ path: "email", message: "Please enter an email." });
		if (!state.phone)
			errors.push({ path: "phone", message: "Please enter an phone." });
		if (!state.address)
			errors.push({
				path: "address",
				message: "Please enter an address.",
			});
		return errors;
	};

	async function onSubmit(event: FormSubmitEvent<any>) {
		console.log(event.data);
		emit("close");
	}
</script>
<template>
	<UForm
		:validate="validate"
		:validate-on="['submit']"
		:state="state"
		class="space-y-4"
		@submit="onSubmit"
	>
		<UFormGroup required label="Name" name="name">
			<UInput v-model="state.name" placeholder="Hugo Nguyễn" autofocus />
		</UFormGroup>
		<UFormGroup required label="Email" name="email">
			<UInput
				v-model="state.email"
				type="email"
				placeholder="example@gmail.com"
			/>
		</UFormGroup>
		<UFormGroup required label="Phone" name="phone">
			<UInput
				v-model="state.phone"
				type="phone"
				placeholder="0909 xxx xxx"
			/>
		</UFormGroup>
		<UFormGroup required label="Address" name="address">
			<UInput
				v-model="state.email"
				type="address"
				placeholder="Hồ Chí Minh City"
			/>
		</UFormGroup>
		<div class="flex justify-end gap-3">
			<UButton label="Cancel" color="red" @click="emit('close')" />
			<UButton type="submit" label="Save" />
		</div>
	</UForm>
</template>
