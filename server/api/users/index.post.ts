import { create } from "~/server/models/users";

export default defineEventHandler(async (event) => {
	const data = await readBody(event);
	if (!data || Object.keys(data).length === 0) throw createError({ status: 404, message: "Data not found" });
	return await create(data);
})
