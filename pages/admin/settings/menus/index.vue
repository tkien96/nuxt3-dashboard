<script lang="ts" setup>
	definePageMeta({ layout: "admin" });
	const q = ref("");
	const selected = ref<any[]>([]);
	const sort = ref({ column: "id", direction: "asc" as const });
	const selectedStatuses = ref([]);
	const query = computed(() => ({
		q: q.value,
		statuses: selectedStatuses.value,
		sort: sort.value.column,
		order: sort.value.direction,
	}));
	// Menus Store
	const menusStore = useMenusStore();
	await useAsyncData("menuLists", () => menusStore.getMenus(query));
	await useAsyncData("menuColumns", () => menusStore.getMenuColumns());
	const { menuPage, menuPageCount, menuLists, menuColumns } = menusStore

	const selectedColumns = ref(menuColumns);
	const columns = computed(() =>
		menuColumns.filter((column) =>
			selectedColumns.value.includes(column)
		)
	);
	// Modal Menus
	const isNewModalOpen = ref(false);
	function showModal() {
		isNewModalOpen.value = true;
	}
	function onSelectRow(row: any) {
		const index = selected.value.findIndex((item) => item.id === row.id);
		if (index === -1) {
			selected.value.push(row);
		} else selected.value.splice(index, 1);
	}
	// Actions
	// TODO: Get data on functions
	const items = (row: any) => [
		[
			{
				label: "Edit",
				icon: "i-heroicons-pencil-square-20-solid",
				click: () => {
					menusStore.setMenuSelected(row);
					showModal();
				},
			},
			{
				label: "Duplicate",
				icon: "i-heroicons-document-duplicate-20-solid",
				click: () => console.log("Duplicate", row.id),
			},
		],
		[
			{
				label: "Archive",
				icon: "i-heroicons-archive-box-20-solid",
				click: () => console.log("Archive", row.id),
			},
			{
				label: "Move",
				icon: "i-heroicons-arrow-right-circle-20-solid",
				click: () => console.log("Move", row.id),
			},
		],
		[
			{
				label: "Delete",
				icon: "i-heroicons-trash-20-solid",
				click: () => console.log("Delete", row.id),
			},
		],
	];
	// ShortCuts
	const input = ref<{ input: HTMLInputElement }>();
	defineShortcuts({
		"/admin": () => {
			input.value?.input?.focus();
		},
	});
</script>
<template>
	<UiDashboardPage>
		<UiDashboardPanel grow>
			<UiDashboardNavbar title="Menus">
				<template #right>
					<UInput ref="input" v-model="q" icon="i-heroicons-funnel" autocomplete="off" placeholder="Filter menus..." class="hidden lg:block" @keydown.esc="$event.target.blur()">
						<template #trailing><UKbd value="/" /></template>
					</UInput>
					<UButton label="New Menu" trailing-icon="i-heroicons-plus" @click="() => { menusStore.setMenuSelected(); showModal(); }" />
				</template>
			</UiDashboardNavbar>
			<UiDashboardToolbar>
				<template #left>
					<USelectMenu v-model="selectedStatuses" icon="i-heroicons-check-circle" placeholder="Status" multiple :options="selectedStatuses" :ui-menu="{ option: { base: 'capitalize' } }"/>
				</template>
				<template #right>
					<USelectMenu v-model="selectedColumns" icon="i-heroicons-adjustments-horizontal-solid" :options="menuColumns" multiple class="hidden lg:block">
						<template #label> Display </template>
					</USelectMenu>
				</template>
			</UiDashboardToolbar>
			<UiDashboardModal v-model="isNewModalOpen" title="New Menu" description="Add a new menu to your database" :ui="{ width: 'sm:max-w-md' }" :draggable="true">
				<MenusForm @close="isNewModalOpen = false" />
			</UiDashboardModal>
			<UTable v-model="selected" v-model:sort="sort" :rows="menuLists" :columns="columns" sort-mode="manual" class="w-full" draggable="true" :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }" @select="onSelectRow" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }">
				<template #icon-data="{ row }">
					<div class="flex items-center gap-3">
						<UIcon :name="row.icon" class="text-sm" />
						<span class="text-gray-900 dark:text-white font-medium">{{ row.icon }}</span>
					</div>
				</template>
				<template #status-data="{ row }">
					<UBadge size="xs" :label="row.status" variant="subtle" class="capitalize"/>
				</template>
				<template #actions-data="{ row }">
					<UDropdown :items="items(row)">
						<UButton variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid"/>
					</UDropdown>
				</template>
			</UTable>
			<div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
				<UPagination size="sm" :to="(page: number) => (menusStore.setMenuPage(page))" show-last show-first v-model="menuPage" :page-count="menuPageCount" :total="menuLists.length"/>
			</div>
		</UiDashboardPanel>
	</UiDashboardPage>
</template>
