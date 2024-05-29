import { get_user } from "~/server/models/users";

export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, "id");
    if(!id) throw createError({ statusCode: 404, message: 'User ID not found' })
		return await get_user(Number(id));
	} catch (error) {
		throw error;
	}
});
