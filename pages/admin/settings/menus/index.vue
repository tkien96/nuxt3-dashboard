<script lang="ts" setup>
	definePageMeta({ layout: "admin" });
	import type { Menus } from "~/types/dashboard";
	const menusStore = useMenusStore();

	// TODO: Get columns on database
	const defaultColumns = [
		{
			key: "id",
			label: "#",
		},
		{
			key: "name",
			label: "Name",
		},
		{
			key: "parent",
			label: "Parent",
		},
		{
			key: "to",
			label: "To",
		},
		{
			key: "icon",
			label: "Icon",
		},
		{
			key: "tooltip",
			label: "Tooltip",
		},
		{
			key: "shortcuts",
			label: "Shortcuts",
		},
		{
			key: "status",
			label: "Status",
		},
		{
			key: "actions",
			label: "Actions",
		},
	];
	const q = ref("");
	const selected = ref<Menus[]>([]);
	const selectedColumns = ref(defaultColumns);
	// TODO: Danh sách status
	const selectedStatuses = ref([]);
	const sort = ref({ column: "id", direction: "asc" as const });
	const input = ref<{ input: HTMLInputElement }>();
	const isNewModalOpen = ref(false);
	const columns = computed(() =>
		defaultColumns.filter((column) =>
			selectedColumns.value.includes(column)
		)
	);
	const query = computed(() => ({
		q: q.value,
		statuses: selectedStatuses.value,
		sort: sort.value.column,
		order: sort.value.direction,
	}));
	menusStore.getMenus(query);
	const menus = menusStore.menus
	// const defaultStatuses = menus.reduce((acc: any, menu: any) => {
	// 	if (!acc.includes(menu.status)) acc.push(menu.status);
	// 	return acc;
	// }, [] as string[]);
	function onSelect(row: Menus) {
		const index = selected.value.findIndex((item) => item.id === row.id);
		if (index === -1) {
			selected.value.push(row);
		} else {
			selected.value.splice(index, 1);
		}
	}
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
	defineShortcuts({
		"/": () => {
			input.value?.input?.focus();
		},
	});

	function showModal() {
		isNewModalOpen.value = true;
	}

	watch(isNewModalOpen, () => {
		if (!isNewModalOpen) menusStore.setMenuSelected(undefined);
	});
</script>
<template>
	<UiDashboardPage>
		<UiDashboardPanel grow>
			<UiDashboardNavbar title="Menus">
				<template #right>
					<UInput
						ref="input"
						v-model="q"
						icon="i-heroicons-funnel"
						autocomplete="off"
						placeholder="Filter menus..."
						class="hidden lg:block"
						@keydown.esc="$event.target.blur()"
					>
						<template #trailing>
							<UKbd value="/" />
						</template>
					</UInput>
					<UButton
						label="New Menu"
						trailing-icon="i-heroicons-plus"
						@click="showModal()"
					/>
				</template>
			</UiDashboardNavbar>
			<UiDashboardToolbar>
				<!-- <template #left>
					<USelectMenu
						v-model="selectedStatuses"
						icon="i-heroicons-check-circle"
						placeholder="Status"
						multiple
						:options="defaultStatuses"
						:ui-menu="{ option: { base: 'capitalize' } }"
					/>
				</template> -->
				<template #right>
					<USelectMenu
						v-model="selectedColumns"
						icon="i-heroicons-adjustments-horizontal-solid"
						:options="defaultColumns"
						multiple
						class="hidden lg:block"
					>
						<template #label> Display </template>
					</USelectMenu>
				</template>
			</UiDashboardToolbar>
			<UiDashboardModal
				v-model="isNewModalOpen"
				title="New Menu"
				description="Add a new menu to your database"
				:ui="{ width: 'sm:max-w-md' }"
			>
				<MenusForm @close="isNewModalOpen = false" />
			</UiDashboardModal>
			<UTable
				v-model="selected"
				v-model:sort="sort"
				:rows="menus"
				:columns="columns"
				sort-mode="manual"
				class="w-full"
				:ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
				@select="onSelect"
				:empty-state="{
					icon: 'i-heroicons-circle-stack-20-solid',
					label: 'No items.',
				}"
			>
				<template #icon-data="{ row }">
					<div class="flex items-center gap-3">
						<UIcon :name="row.icon" class="text-sm" />
						<span
							class="text-gray-900 dark:text-white font-medium"
							>{{ row.icon }}</span
						>
					</div>
				</template>
				<template #status-data="{ row }">
					<UBadge
						size="xs"
						:label="row.status"
						variant="subtle"
						class="capitalize"
					/>
				</template>
				<template #actions-data="{ row }">
					<UDropdown :items="items(row)">
						<UButton
							variant="ghost"
							icon="i-heroicons-ellipsis-horizontal-20-solid"
						/>
					</UDropdown>
				</template>
			</UTable>
		</UiDashboardPanel>
	</UiDashboardPage>
</template>
