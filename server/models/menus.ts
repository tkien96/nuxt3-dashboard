import { Menus } from "~/types/dashboard";
import {
	prisma,
	prismaCreate,
	prismaDelete,
	prismaFields,
	prismaFindMany,
	prismaFindUnique,
	prismaUpdate,
} from ".";

const model = "menus";

export const menuFindUnique = async (id: any) => {
	const menu = await prismaFindUnique(model, { where: { id: id } });
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 400, message: "menu not found" });
};

export const menuFindMany = async (queries: any) => {
	const menus = await prismaFindMany(model, queries);
	return await menus.map((menu: Menus) => {
		return transform(menu);
	});
};

export const menuUpdate = async (id: Number, data: any) => {
	const menu = await prismaUpdate(model, Number(id), data);
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 400, message: "Update failed" });
};

export const menuCreate = async (data: any) => {
	const menu = await prismaCreate(model, data);
	if (menu) {
		return await transform(menu);
	} else throw createError({ statusCode: 400, message: "Create failed" });
};

export const menuDelete = async (id: Number) => {
	try {
		return await prismaDelete(model, Number(id));
	} catch (error) {
		throw error;
	}
};

export const menuFields = async () => {
	try {
		return await prismaFields(model);
	} catch (error) {
		throw error;
	}
};

function transform(data: any) {
	const { id, name, parent, to, icon, exact, tooltip, shortcuts, status } = data;
	return { id, name, parent, to, icon, exact, tooltip, shortcuts, status };
}
