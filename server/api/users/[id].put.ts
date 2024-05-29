import { update } from "~/server/models/users";

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, "id");
	const data = await readBody(event);

  if (!id) throw createError({ status: 404, message: "User ID not found" });
	if (!data || Object.keys(data).length === 0) throw createError({ status: 404, message: "Data not found" });

	return await update(Number(id), data);
});
