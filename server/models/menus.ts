import { Menus } from "~/types/dashboard";
import {
	prismaCreate,
	prismaDelete,
	prismaFindMany,
	prismaFindUnique,
	prismaUpdate,
} from ".";

export const menusFindUnique = async (id: any) => {
	const menu = await prismaFindUnique("menus", { where: { id: id } });
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 404, message: "menu not found" });
};

export const menusFindMany = async (queries: any) => {
	const menus = await prismaFindMany("menus", queries);
	return await menus.map((menu: Menus) => {
		return transform(menu);
	});
};

export const menusUpdate = async (id: Number, data: any) => {
	const menu = await prismaUpdate("menus", Number(id), data);
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 404, message: "Update failed" });
};

export const menusCreate = async (data: any) => {
	const menu = await prismaCreate("menus", data);
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 404, message: "Create failed" });
};

export const menusDelete = async (id: Number) => {
	try {
		return await prismaDelete("menus", Number(id));
	} catch (error) {
		throw createError({ statusCode: 404, message: "Delete failed" });
	}
};

function transform(data: any) {
	const { id, name, parent, to, icon, exact, tooltip, shortcuts, status } =
		data;
	return { id, name, parent, to, icon, exact, tooltip, shortcuts, status };
}
