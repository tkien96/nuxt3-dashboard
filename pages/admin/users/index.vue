<script lang="ts" setup>
	definePageMeta({ layout: "admin" });
	import type { User } from "~/types/dashboard";
	const defaultColumns = [
		{
			key: "id",
			label: "#",
		},
		{
			key: "name",
			label: "Name",
			sortable: true,
		},
		{
			key: "email",
			label: "Email",
			sortable: true,
		},
		{
			key: "address",
			label: "Address",
		},
		{
			key: "status",
			label: "Status",
		},
		{
			key: "classification",
			label: "Classification",
		},
		{
			key: "actions",
			label: "Actions",
		},
	];
	const q = ref("");
	const selected = ref<User[]>([]);
	const selectedColumns = ref(defaultColumns);
	const selectedStatuses = ref([]);
	const selectedAddress = ref([]);
	const sort = ref({ column: "id", direction: "asc" as const });
	const input = ref<{ input: HTMLInputElement }>();
	const isNewUserModalOpen = ref(false);
	const columns = computed(() =>
		defaultColumns.filter((column) =>
			selectedColumns.value.includes(column)
		)
	);
	const query = computed(() => ({
		q: q.value,
		statuses: selectedStatuses.value,
		locations: selectedAddress.value,
		sort: sort.value.column,
		order: sort.value.direction,
	}));
	const { data: users, pending } = await useFetch<User[]>("/api/users", {
		query,
		default: () => [],
	});
	const defaultAddress = users.value.reduce((acc, user) => {
		if (user.address && !acc.includes(user?.address)) {
			acc.push(user?.address);
		}
		return acc;
	}, [] as string[]);
	const defaultStatuses = users.value.reduce((acc, user) => {
		if (!acc.includes(user.status)) {
			acc.push(user.status);
		}
		return acc;
	}, [] as string[]);
	function onSelect(row: User) {
		const index = selected.value.findIndex((item) => item.id === row.id);
		if (index === -1) {
			selected.value.push(row);
		} else {
			selected.value.splice(index, 1);
		}
	}
	const items = (row: any) => [
		[
			{
				label: "Edit",
				icon: "i-heroicons-pencil-square-20-solid",
				to: `/admin/users/${ row.id }`
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
</script>
<template>
	<UiDashboardPage>
		<UiDashboardPanel grow>
			<UiDashboardNavbar title="Users">
				<template #right>
					<UInput
						ref="input"
						v-model="q"
						icon="i-heroicons-funnel"
						autocomplete="off"
						placeholder="Filter users..."
						class="hidden lg:block"
						@keydown.esc="$event.target.blur()"
					>
						<template #trailing>
							<UKbd value="/" />
						</template>
					</UInput>
					<UButton
						label="New user"
						trailing-icon="i-heroicons-plus"
						to="/admin/users/_"
						@click="isNewUserModalOpen = true"
					/>
				</template>
			</UiDashboardNavbar>
			<UiDashboardToolbar>
				<template #left>
					<USelectMenu
						v-model="selectedStatuses"
						icon="i-heroicons-check-circle"
						placeholder="Status"
						multiple
						:options="defaultStatuses"
						:ui-menu="{ option: { base: 'capitalize' } }"
					/>
					<USelectMenu
						v-model="selectedAddress"
						icon="i-heroicons-map-pin"
						placeholder="Address"
						:options="defaultAddress"
						multiple
					/>
				</template>
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
				v-model="isNewUserModalOpen"
				title="New user"
				description="Add a new user to your database"
				:ui="{ width: 'sm:max-w-md' }"
			>
				<UsersForm @close="isNewUserModalOpen = false" />
			</UiDashboardModal>
			<UTable
				v-model="selected"
				v-model:sort="sort"
				:rows="users"
				:columns="columns"
				:loading="pending"
				sort-mode="manual"
				class="w-full"
				:ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
				@select="onSelect"
				:empty-state="{
					icon: 'i-heroicons-circle-stack-20-solid',
					label: 'No items.',
				}"
			>
				<template #name-data="{ row }">
					<div class="flex items-center gap-3">
						<UAvatar
							v-bind="row.avatar"
							:alt="row.name"
							size="xs"
						/>
						<span
							class="text-gray-900 dark:text-white font-medium"
							>{{ row.name }}</span
						>
					</div>
				</template>
				<template #classification-data="{ row }">
					<UBadge
						size="xs"
						:label="row.classification"
						variant="subtle"
						class="capitalize"
					/>
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
							color="gray"
							variant="ghost"
							icon="i-heroicons-ellipsis-horizontal-20-solid"
						/>
					</UDropdown>
				</template>
			</UTable>
		</UiDashboardPanel>
	</UiDashboardPage>
</template>
