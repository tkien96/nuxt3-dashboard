import { defineStore } from "pinia";

export const useMenusStore = defineStore("menusStore", () => {
	const menus = ref();
	const menuSelected = ref()

	const setMenus = (data?: any) => (menus.value = data);
	const setMenuSelected = (data?: any) => (menuSelected.value = data);

	const getMenus = async (query: any) => {
		try {
			const { data: menus } = await useFetch<any>(
				"/api/menus",
				{ query, default: () => [] }
			);
			setMenus(menus);
		} catch (error) {
			console.error(error);
			setMenus()
		}
	};
	return { menus, menuSelected, setMenus, setMenuSelected, getMenus };
});
