<script setup lang="ts">
	definePageMeta({ layout: 'admin', })
	import type { FormError, FormSubmitEvent } from "#ui/types";
	const fileRef = ref<HTMLInputElement>();
	const state = reactive({
		name: "Example Company",
		email: "example@gmail.com",
		phone: "0909xxxxxx",
		address: "Ho Chi Minh City",
		favicon: "",
		title: "",
		keyword: "",
		description: "",
		password_current: "",
		password_new: "",
		daily_email: true,
		desktop: true,
	});
	const toast = useToast();
	function validate(state: any): FormError[] {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Please enter your name." });
		if (!state.email)
			errors.push({ path: "email", message: "Please enter your email." });
		if (!state.phone)
			errors.push({ path: "phone", message: "Please enter your phone." });
		return errors;
	}
	function onFileChange(e: Event) {
		const input = e.target as HTMLInputElement;
		if (!input.files?.length) {
			return;
		}
		state.favicon = URL.createObjectURL(input.files[0]);
	}
	function onFileClick() {
		fileRef.value?.click();
	}
	async function onSubmit(event: FormSubmitEvent<any>) {
		console.log(event.data);
		toast.add({
			title: "Profile updated",
			icon: "i-heroicons-check-circle",
		});
	}
	async function onChange() {
		// Do something with data
		console.log(state);
	}
</script>
<template>
	<UiDashboardPage>
		<UiDashboardPanel grow>
			<UiDashboardNavbar title="Settings">
				<template #right>
					<UButton type="submit" label="Save" />
				</template>
			</UiDashboardNavbar>
			<UiDashboardPanelContent class="pb-24">
				<UForm
					id="form-setting"
					:state="state"
					:validate="validate"
					:validate-on="['submit']"
					@submit="onSubmit"
				>
					<UiDashboardSection>
						<UFormGroup
							name="name"
							label="Name"
							description="Will appear on receipts, invoices, and other communication."
							required
							class="grid grid-cols-2 gap-2 !border-t-0 !pt-0"
							:ui="{ container: '' }"
						>
							<UInput
								v-model="state.name"
								autocomplete="off"
								icon="i-heroicons-user"
								size="md"
							/>
						</UFormGroup>
						<UFormGroup
							name="email"
							label="Email"
							description="Your unique email."
							required
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UInput
								v-model="state.email"
								type="email"
								autocomplete="off"
								icon="i-heroicons-envelope"
								size="md"
							/>
						</UFormGroup>
						<UFormGroup
							name="phone"
							label="Phone"
							description="Your unique phone."
							required
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UInput
								v-model="state.phone"
								type="phone"
								autocomplete="off"
								size="md"
								icon="i-heroicons-phone"
							>
							</UInput>
						</UFormGroup>
						<UFormGroup
							name="address"
							label="Address"
							description="Your unique address."
							required
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UInput
								v-model="state.address"
								type="address"
								autocomplete="off"
								size="md"
								icon="i-heroicons-map-pin"
							>
							</UInput>
						</UFormGroup>
						<UFormGroup
							name="favicon"
							label="Favicon"
							description="The most common format is .ico but formats like .png and .jpg are also supported by modern browsers."
							required
							class="grid grid-cols-2 gap-2"
							help="ICO. 1MB Max."
							:ui="{
								container: 'flex flex-wrap items-center gap-3',
								help: 'mt-0',
							}"
						>
							<UAvatar
								:src="state.favicon"
								alt="Favicon"
								size="lg"
							/>
							<UButton
								label="Choose"
								color="white"
								size="md"
								@click="onFileClick"
							/>
							<input
								ref="fileRef"
								type="file"
								class="hidden"
								accept=".ico"
								@change="onFileChange"
							/>
						</UFormGroup>
						<UFormGroup
							name="title"
							label="Title"
							description="Aim for around 50-60 characters to ensure the full title displays in search results."
							class="grid grid-cols-2 gap-2"
						>
							<UInput
								v-model="state.title"
								size="md"
								autocomplete="false"
							/>
						</UFormGroup>
						<UFormGroup
							name="keyword"
							label="Keyword"
							description="Focus on incorporating keywords naturally throughout your content"
							class="grid grid-cols-2 gap-2"
						>
							<UInput
								v-model="state.keyword"
								size="md"
								autocomplete="false"
							/>
						</UFormGroup>
						<UFormGroup
							name="description"
							label="Description"
							description="Aim for around 155 characters to avoid truncation in search results."
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UTextarea
								v-model="state.description"
								:rows="5"
								autoresize
								size="md"
							/>
						</UFormGroup>
						<UFormGroup
							name="daily_email"
							label="Daily email"
							description="Receive a daily email digest."
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UToggle
								v-model="state.daily_email"
								size="md"
								@update:model-value="onChange"
							/>
						</UFormGroup>
						<UFormGroup
							name="desktop"
							label="Desktop"
							description="Receive desktop notifications."
							class="grid grid-cols-2 gap-2"
							:ui="{ container: '' }"
						>
							<UToggle
								v-model="state.desktop"
								size="md"
								@update:model-value="onChange"
							/>
						</UFormGroup>
					</UiDashboardSection>
				</UForm>
			</UiDashboardPanelContent>
		</UiDashboardPanel>
	</UiDashboardPage>
</template>
