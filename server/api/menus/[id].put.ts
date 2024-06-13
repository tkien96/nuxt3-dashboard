import { menuUpdate } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
	const id = await getRouterParam(event, "id");
	const data = await readBody(event);
    data.updated_by = 1
	return await menuUpdate(Number(id), data);
});
