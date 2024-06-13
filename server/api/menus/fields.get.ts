import { menuFields } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
	return await menuFields();
});
