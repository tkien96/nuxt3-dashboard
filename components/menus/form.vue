<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from "#ui/types";
	const emit = defineEmits(["close"]);
    const toast = useToast();
	const state = reactive({
		parent: 0,
		name: undefined,
		to: undefined,
		icon: undefined,
		exact: false,
		tooltip: undefined,
		shortcuts: undefined,
	});
	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Please enter a Name." });
		if (!state.to)
			errors.push({ path: "to", message: "Please enter an To." });
		return errors;
	};

	const menus = [
		{
			id: 'Default',
            value: 0,
			label: "Select Parent",
			icon: "i-heroicons-inbox-arrow-down",
		},
		{
			id: 'Home',
            value: 1,
			label: "Home",
			icon: "i-heroicons-home",
			to: "/admin",
			shortcuts: ["G", "H"],
		},
		{
			id: 'Users',
            value: 2,
			label: "Users",
			icon: "i-heroicons-user-group",
			to: "/admin/users",
			shortcuts: ["G", "U"],
		},
		{
			id: 'Settings',
            value: 3,
			label: "Settings",
			to: "/admin/settings",
			icon: "i-heroicons-cog-8-tooth",
			shortcuts: ["G", "S"],
		},
	];
	const parentSelected = ref(menus[0]);

	async function onSubmit(event: FormSubmitEvent<any>) {
		const data = await event.data;
		data.created_by = 1;
        data.parent = data.parent.value ? data.parent.value : 0
		$fetch("/api/menus", {
			method: "POST",
			body: data,
		})
        .then((result) => {
            toast.add({ title: 'Added menu successfully', description: 'Notification !', color: "gray" })
            emit("close");
        })
        .catch((e) => {
            toast.add({ title: e.message, description: 'Notification !', color: "red" })
            console.error(e.message)
        });
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
		<UFormGroup label="Parent" name="parent">
			<USelectMenu v-model="parentSelected" :options="menus">
				<template #leading>
					<UIcon
						v-if="parentSelected.icon"
						:name="(parentSelected.icon as string)"
						class="w-5 h-5"
					/>
				</template>
				<template v-if="parentSelected.shortcuts" #trailing>
					<UKbd
						class="m-[0.1em]"
						v-for="tooltip in parentSelected.shortcuts"
						:value="tooltip"
					/>
				</template>
			</USelectMenu>
		</UFormGroup>
		<UFormGroup required label="Name" name="name">
			<UInput v-model="state.name" placeholder="Home" autofocus />
		</UFormGroup>
		<UFormGroup required label="To" name="to">
			<UInput v-model="state.to" placeholder="/admin/menus" />
		</UFormGroup>
		<UFormGroup label="Icon" name="icon">
			<UInput v-model="state.icon" placeholder="i-heroicons-[name]" />
		</UFormGroup>
		<UFormGroup label="Tooltip" name="tooltip">
			<UInput v-model="state.tooltip" placeholder="tooltip" />
		</UFormGroup>
		<UFormGroup label="Shortcuts" name="shortcuts">
			<UInput v-model="state.shortcuts" placeholder='["G", "H"]' />
		</UFormGroup>
		<UFormGroup label="Exact" name="exact">
			<UToggle
				v-model="state.exact"
				size="md"
				@update:model-value="!state.exact"
			/>
		</UFormGroup>
		<div class="flex justify-end gap-3">
			<UButton label="Cancel" color="red" @click="emit('close')" />
			<UButton type="submit" label="Save" />
		</div>
	</UForm>
</template>
