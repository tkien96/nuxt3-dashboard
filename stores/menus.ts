import { item } from "@unovis/ts/components/bullet-legend/style";
import { defineStore } from "pinia";

export const useMenusStore = defineStore("menusStore", () => {
	const menuLists = ref([]);
	const menuColumns = ref([])
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
	const setMenuColumns = (data?: any) => (menuColumns.value = data);
	const setMenuSelected = (data?: any) => (menuSelected.value = data);
	const setMenuParents = (data?: any) => (menuParents.value = data);
	const setMenuPage = (page: number) => (menuPage.value = page);
	const setMenuPageCount = (pageCount: number) => (menuPageCount.value = pageCount);

	function $reset() {
		setMenuList([]);
		setMenuSelected();
	};

	const getMenuColumns = async() => {
		try {
			const { data: columns } = await useFetch<any>("/api/menus/fields");
			setMenuColumns(columns.value.map((item: any) => ({
				key: item.column_name,
				label: columnName(item.column_name)
			})));
		} catch (error) {
			console.error(error);
			setMenuList();
		}
	}

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
		menuColumns,
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
		getMenuColumns,
		setMenuColumns,
		$reset
	};
});
