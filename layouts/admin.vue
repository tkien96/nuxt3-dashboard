<script setup lang="ts">
	// TODO: Get data in table menus 
	const links = [
		{
			id: "home",
			label: "Home",
			icon: "i-heroicons-home",
			to: "/admin",
			tooltip: {
				text: "Home",
				shortcuts: ["G", "H"],
			},
		},
		{
			id: "users",
			label: "Users",
			icon: "i-heroicons-user-group",
			to: "/admin/users",
			tooltip: {
				text: "Users",
				shortcuts: ["G", "U"],
			},
		},
		{
			id: "settings",
			label: "Settings",
			to: "/admin/settings",
			icon: "i-heroicons-cog-8-tooth",
			children: [
				{
					label: "General",
					to: "/admin/settings",
					exact: true,
				},
				{
					label: "Menus",
					to: "/admin/settings/menus",
				},
				{
					label: "Options",
					to: "/admin/settings/options",
				}
			],
			tooltip: {
				text: "Settings",
				shortcuts: ["G", "S"],
			},
		},
	];
	const groups = [
		{
			key: "links",
			label: "Go to",
			commands: links.map((link) => ({
				...link,
				shortcuts: link.tooltip?.shortcuts,
			})),
		}
	];
</script>
<template>
	<UiDashboardLayout>
		<UiDashboardPanel
			:width="250"
			:resizable="{ min: 200, max: 300 }"
			collapsible
		>
			<UiDashboardNavbar
				class="!border-transparent"
				:ui="{ left: 'flex-1' }"
			>
				<template #left>
					<TeamsDropdown />
				</template>
			</UiDashboardNavbar>
			<UiDashboardSidebar>
				<template #header>
					<UiDashboardSearchButton />
				</template>
				<UiDashboardSidebarLinks :links="links" />
				<div class="flex-1" />
				<UDivider class="sticky bottom-0" />
				<template #footer>
					<UserDropdown />
				</template>
			</UiDashboardSidebar>
		</UiDashboardPanel>
		<slot />
		<HelpSlideover />
		<NotificationsSlideover />
		<ClientOnly>
			<LazyUiDashboardSearch :groups="groups" />
		</ClientOnly>
	</UiDashboardLayout>
</template>
