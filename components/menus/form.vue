<script setup lang="ts">
	import type { FormError, FormSubmitEvent } from "#ui/types";

	const menusStore = useMenusStore()
	const menus = menusStore.menus
	const menuSelected = menusStore.menuSelected

	const emit = defineEmits(["close"]);
    const toast = useToast();
	const state = reactive({
		parent: menuSelected?.parent || undefined,
		name: menuSelected?.name || undefined,
		to: menuSelected?.to || undefined,
		icon: menuSelected?.icon || undefined,
		exact: menuSelected?.exact || false,
		tooltip: menuSelected?.name || undefined,
		shortcuts: menuSelected?.shortcuts || undefined,
	});
	const validate = (state: any): FormError[] => {
		const errors = [];
		if (!state.name)
			errors.push({ path: "name", message: "Please enter a Name." });
		if (!state.to)
			errors.push({ path: "to", message: "Please enter an To." });
		return errors;
	};

	
	const parents: any = [];
	menus.map((item: any) => {
		if(item.parent == 0) parents.push({
			id: item.name,
            value: item.id,
			label: item.name.toUpperCase(),
			to: item?.to,
			icon: item?.icon,
			shortcuts: item.shortcuts ? JSON.parse(item.shortcuts) : undefined
		})
	});
	const parentSelected = ref(parents[0]);

	const formIsSubmit = ref(false)
	async function onSubmit(event: FormSubmitEvent<any>) {
		formIsSubmit.value = true
		const data = await event.data
		
		data.created_by = 1;
        data.parent = data.parent.value ? data.parent.value : 0

		let url = '/api/menus',
		option: any = {
			method: "POST",
			body: data,
		}

		if(menuSelected) {
			url += `/${ menuSelected.id }`
			option.method = 'PUT'
		}

		await $fetch(url, option)
        .then((result) => {
			menusStore.setMenus([...menus, result])
			menusStore.setMenuSelected()
            toast.add({ title: 'Added menu successfully', description: 'Notification !', color: "gray" })
            emit("close");
			formIsSubmit.value = false
        })
        .catch((e) => {
			menusStore.setMenuSelected()
            toast.add({ title: e.message, description: 'Notification !', color: "red" })
            console.error(e.message)
			formIsSubmit.value = false
			emit("close");
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
		:loading="formIsSubmit"
	>
		<UFormGroup label="Parent" name="parent">
			<USelectMenu v-model="parentSelected" :options="parents" :disabled="formIsSubmit">
				<template #leading>
					<UIcon v-if="parentSelected?.icon" :name="(parentSelected?.icon)" class="w-5 h-5" />
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
			<UToggle
				v-model="state.exact"
				size="md"
				@update:model-value="!state.exact"
				:disabled="formIsSubmit"
			/>
		</UFormGroup>
		<div class="flex justify-end gap-3">
			<UButton label="Cancel" color="red" @click="emit('close')" />
			<UButton v-if="menuSelected" type="submit" label="Update" :loading="formIsSubmit" />
			<UButton v-if="!menuSelected" type="submit" label="Save" :loading="formIsSubmit" />
		</div>
	</UForm>
</template>
