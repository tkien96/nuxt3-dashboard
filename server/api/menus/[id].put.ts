import { menusUpdate } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
	const id = await getRouterParam(event, "id");
	const data = await readBody(event);
    data.update_by = 1
	return await menusUpdate(Number(id), data);
});
