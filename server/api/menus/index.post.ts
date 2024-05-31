import { menusCreate } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
	const data = await readBody(event);
	if (!data || Object.keys(data).length === 0) throw createError({ status: 404, message: "Data not found" });
	return await menusCreate(data);
})
