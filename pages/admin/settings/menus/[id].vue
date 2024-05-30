<script lang="ts" setup>
	definePageMeta({ layout: "admin" });
	import type { FormError, FormSubmitEvent } from "#ui/types";
	const router = useRouter();
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
	<UiDashboardPage>
		<UiDashboardPanel grow>
			<UiDashboardNavbar title="Users">
				<template #right>
					<UButton
						label="Cancel"
						color="red"
						@click="router.back()"
					/>
					<UButton type="submit" label="Save" />
				</template>
			</UiDashboardNavbar>
			<UiDashboardPanelContent class="pb-24">
				<UForm
					:validate="validate"
					:validate-on="['submit']"
					:state="state"
					class="grid grid-cols-3 gap-3"
					@submit="onSubmit"
				>
					<UFormGroup required label="Name" name="name">
						<UInput
							icon="i-heroicons-academic-cap"
							v-model="state.name"
							placeholder="Home"
							autofocus
						/>
					</UFormGroup>
					<UFormGroup required label="Email" name="email">
						<UInput
							icon="i-heroicons-envelope"
							v-model="state.email"
							type="email"
							placeholder="example@gmail.com"
						/>
					</UFormGroup>
					<UFormGroup required label="Phone" name="phone">
						<UInput
							icon="i-heroicons-device-phone-mobile"
							v-model="state.phone"
							type="phone"
							placeholder="0909 xxx xxx"
						/>
					</UFormGroup>
					<UFormGroup required label="Address" name="address">
						<UInput
							icon="i-heroicons-map"
							v-model="state.email"
							type="address"
							placeholder="Hồ Chí Minh City"
						/>
					</UFormGroup>
					<UFormGroup required label="Avatar" name="avatar">
						<UInput
							type="file"
							size="sm"
							icon="i-heroicons-folder"
						/>
					</UFormGroup>
				</UForm>
			</UiDashboardPanelContent>
		</UiDashboardPanel>
	</UiDashboardPage>
</template>
