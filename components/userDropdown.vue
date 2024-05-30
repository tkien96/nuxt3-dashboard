<script setup lang="ts">
	const appConfig = useAppConfig();
	const router = useRouter();
	const colorMode = useColorMode();
	const { isHelpSlideoverOpen } = useDashboard();
	const { isDashboardSearchModalOpen } = useUIState();
	const { metaSymbol } = useShortcuts();
	const items = computed(() => [
		[
			{
				slot: "account",
				label: "",
				disabled: true,
			},
		],
		[
			{
				slot: "colors",
				label: "Colors",
			},
		],
		[
			{
				slot: "themes",
				label: "Themes",
			},
		],
		[
			{
				label: "Visit Website",
				icon: "i-heroicons-home",
				shortcuts: ["G", "D"],
				click: () => {
					router.push({ path: "/" });
				},
			},
			{
				label: "Command menu",
				icon: "i-heroicons-command-line",
				shortcuts: [metaSymbol.value, "K"],
				click: () => {
					isDashboardSearchModalOpen.value = true;
				},
			},
			{
				label: "Help & Support",
				icon: "i-heroicons-question-mark-circle",
				shortcuts: ["?"],
				click: () => (isHelpSlideoverOpen.value = true),
			},
		],
		[
			{
				label: "Sign out",
				icon: "i-heroicons-arrow-left-on-rectangle",
			},
		],
	]);
	// Colors
	const colors = [
		{
			name: "Green",
			color: "green",
			click: () => (appConfig.ui.primary = "green"),
		},
		{
			name: "Teal",
			color: "teal",
			click: () => (appConfig.ui.primary = "teal"),
		},
		{
			name: "Cyan",
			color: "cyan",
			click: () => (appConfig.ui.primary = "cyan"),
		},
		{
			name: "Sky",
			color: "sky",
			click: () => (appConfig.ui.primary = "sky"),
		},
		{
			name: "Blue",
			color: "blue",
			click: () => (appConfig.ui.primary = "blue"),
		},
		{
			name: "Indigo",
			color: "indigo",
			click: () => (appConfig.ui.primary = "indigo"),
		},
		{
			name: "Violet",
			color: "violet",
			click: () => (appConfig.ui.primary = "violet"),
		},
	];
	const themes = [
		{
			id: "theme-light",
			label: "Light",
			key: 'light',
			icon: appConfig.ui.icons.light,
			click: () => { colorMode.preference = "light"; },
		},
		{
			id: "theme-dark",
			label: "Dark",
			key: 'dark',
			icon: appConfig.ui.icons.dark,
			click: () => {
				colorMode.preference = "dark";
			},
		},
		{
			id: "system",
			label: "System",
			key: 'system',
			icon: appConfig.ui.icons.system,
			click: () => {
				colorMode.preference = "system";
			},
		}
	];
</script>
<template>
	<UDropdown
		:items="items"
		:ui="{ width: 'w-full', item: { disabled: 'cursor-text select-text' } }"
		:popper="{ strategy: 'absolute', placement: 'top' }"
		class="w-full"
	>
		<template #default="{ open }">
			<UButton
				color="gray"
				variant="ghost"
				class="w-full"
				label="Benjamin"
				:class="[open && 'bg-gray-50 dark:bg-gray-800']"
			>
				<template #leading>
					<UAvatar alt="Hugo Nguyễn" size="2xs" />
				</template>
				<template #trailing>
					<UIcon
						name="i-heroicons-ellipsis-vertical"
						class="w-5 h-5 ml-auto"
					/>
				</template>
			</UButton>
		</template>
		<template #account>
			<div class="w-full text-center truncate font-medium text-gray-900 dark:text-white">
				ben@nuxtlabs.com
			</div>
		</template>
		<template #colors>
			<div class="w-full flex flex-wrap justify-center gap-1">
				<UBadge
					@click="color.click"
					v-for="color in colors"
					:color="color.color"
					class="size-5"
				/>
			</div>
		</template>
		<template #themes>
			<div class="w-full flex justify-center gap-1">
				<UButton
					v-for="theme in themes"
					@click="theme.click"
					:disabled="colorMode.preference === theme.key"
					:icon="theme.icon"
					:label="theme.label"
					size="2xs"
				></UButton>
			</div>
		</template>
	</UDropdown>
</template>
