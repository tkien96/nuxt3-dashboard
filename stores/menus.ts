import { defineStore } from "pinia";

export const useMenusStore = defineStore("menusStore", () => {
	const menus = ref();
	const menuSelected = ref();
	const menuParents = ref();

	const setMenus = (data?: any) => (menus.value = data);
	const setMenuSelected = (data?: any) => (menuSelected.value = data);
	const setMenuParent = (data?: any) => (menuParents.value = data);

	const getMenus = async (query: any) => {
		try {
			const { data: menus } = await useFetch<any>("/api/menus", {
				query,
				default: () => [],
			});
			setMenus(menus);

			const parents = await menus.filter((item: any) => item.parent === 0)
				.map((item: any) => ({
					id: item.name,
					value: item.id,
					label: item.name.toUpperCase(),
					to: item.to,
					icon: item.icon,
					shortcuts: item.shortcuts ? JSON.parse(item.shortcuts) : undefined,
				}));
			setMenuParent(parents)
		} catch (error) {
			console.error(error);
			setMenus();
		}
	};
	return { menus, menuSelected, menuParents, setMenus, setMenuSelected, getMenus, setMenuParent };
});
