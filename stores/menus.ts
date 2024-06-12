import { defineStore } from "pinia";

export const useMenusStore = defineStore("menusStore", () => {
	const menuLists = ref([]);
	const menuSelected = ref();
	const menuPage = ref(1)
	const menuPageCount = ref(5)

	const menuParentDefault = [{
		id: undefined,
		value: 0,
		label: 'Select Parent',
		to: undefined,
		icon: 'i-heroicons-magnifying-glass',
		shortcuts: undefined,
	}]
	const menuParents = ref(menuParentDefault);

	const setMenuList = (data?: any) => (menuLists.value = data);
	const setMenuSelected = (data?: any) => (menuSelected.value = data);
	const setMenuParents = (data?: any) => (menuParents.value = data);
	const setMenuPage = (page: number) => (menuPage.value = page);
	const setMenuPageCount = (pageCount: number) => (menuPageCount.value = pageCount);

	function $reset() {
		setMenuList([]);
		setMenuSelected();
	};

	const getMenus = async (query: {}) => {
		try {
			const { data: menus } = await useFetch<any>("/api/menus", {
				query,
				default: () => [],
			});
			setMenuList(menus);

			const parents = menus.value.filter((item: any) => item.parent === 0)
				.map((item: any) => ({
					id: item.name,
					value: item.id,
					label: item.name,
					to: item.to,
					icon: item.icon,
					shortcuts: item.shortcuts ? JSON.parse(item.shortcuts) : undefined,
				}));
				setMenuParents([...menuParentDefault, ...parents])
		} catch (error) {
			console.error(error);
			setMenuList();
		}
	};

	return {
		menuLists,
		menuSelected,
		menuParentDefault,
		menuParents,
		menuPage,
		menuPageCount,
		setMenuList,
		setMenuSelected,
		getMenus,
		setMenuPage,
		setMenuPageCount,
		$reset
	};
});
