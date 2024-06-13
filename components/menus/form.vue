<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from "#ui/types";

	const menusStore = useMenusStore()
	const { menuSelected, menuParents, menuParentDefault } = menusStore

	const emit = defineEmits(["close"]);
    const toast = useToast();
	const state = reactive({
		parent: menuSelected?.parent || 0,
		name: menuSelected?.name || undefined,
		to: menuSelected?.to || undefined,
		icon: menuSelected?.icon || undefined,
		exact: menuSelected?.exact || false,
		tooltip: menuSelected?.name || undefined,
		shortcuts: menuSelected?.shortcuts || undefined,
	});

	// Parent Selected
	const parentSelected = ref();
	parentSelected.value = menuSelected ? menuParents.filter((item: any) => item.value == menuSelected.parent)[0] : menuParentDefault

	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Please enter a Name." });
		if (!state.to)
			errors.push({ path: "to", message: "Please enter an To." });
		return errors;
	};

	const refreshData =() => {
		menusStore.getMenus({})
		menusStore.setMenuSelected()
	}

	// Form submit
	const formIsSubmit = ref(false)
	async function onSubmit(event: FormSubmitEvent<any>) {
		formIsSubmit.value = true
		const data = await event.data
		// TODO: Get user login
		data.created_by = 1;
		if(!data.parent) data.parent = 0
		if(menuSelected) {
			await $fetch(`/api/menus/${ menuSelected.id }`, { method: "PUT", body: data, })
			.then((result) => {
				refreshData()
				toast.add({ title: 'Update menu successfully', description: 'Notification !', color: "cyan" })
				emit("close");
				formIsSubmit.value = false
			})
			.catch((e) => {
				toast.add({ title: e.message, description: 'Notification !', color: "red" })
				formIsSubmit.value = false
				emit("close");
				console.error(e.message)
			});
		} else {
			await $fetch(`/api/menus`, { method: "POST", body: data, })
			.then((result) => {
				refreshData()
				toast.add({ title: 'Add menu successfully', description: 'Notification !', color: "green" })
				emit("close");
				formIsSubmit.value = false
			})
			.catch((e) => {
				toast.add({ title: e.message, description: 'Notification !', color: "red" })
				formIsSubmit.value = false
				emit("close");
				console.error(e.message)
			});
		}
	}
</script>
<template>
	<UForm :validate="validate" :validate-on="['submit']" :state="state" class="space-y-4" @submit="onSubmit" :loading="formIsSubmit" >
		<UFormGroup label="Parent" name="parent">
			<USelectMenu v-model="parentSelected" :options="menuParents" placeholder="Select Parent" :disabled="formIsSubmit" @change="() => { state.parent = parentSelected?.value }">
				<template #leading>
					<UIcon :name="parentSelected?.icon ? parentSelected?.icon : 'i-heroicons-magnifying-glass'" class="w-5 h-5" />
				</template>
				<template v-if="parentSelected?.shortcuts" #trailing>
					<UKbd class="m-[0.1em]" v-for="tooltip in parentSelected?.shortcuts" :value="tooltip" />
				</template>
			</USelectMenu>
		</UFormGroup>
		<UFormGroup required label="Name" name="name">
			<UInput v-model="state.name" placeholder="Home" :disabled="formIsSubmit" autofocus />
		</UFormGroup>
		<UFormGroup required label="To" name="to">
			<UInput v-model="state.to" placeholder="/admin/menus" :disabled="formIsSubmit" />
		</UFormGroup>
		<UFormGroup label="Icon" name="icon">
			<UInput v-model="state.icon" placeholder="i-heroicons-[name]" :disabled="formIsSubmit" />
		</UFormGroup>
		<UFormGroup label="Tooltip" name="tooltip">
			<UInput v-model="state.tooltip" placeholder="tooltip" :disabled="formIsSubmit" />
		</UFormGroup>
		<UFormGroup label="Shortcuts" name="shortcuts">
			<UInput v-model="state.shortcuts" placeholder='["G", "H"]' :disabled="formIsSubmit" />
		</UFormGroup>
		<UFormGroup label="Exact" name="exact">
			<UToggle v-model="state.exact" size="md" @update:model-value="!state.exact" :disabled="formIsSubmit" />
		</UFormGroup>
		<div class="flex justify-end gap-3">
			<UButton type="submit" :label="(menuSelected ? 'Update' : 'Save')" :loading="formIsSubmit" />
			<UButton label="Cancel" color="red" @click="emit('close')" />
		</div>
	</UForm>
</template>
