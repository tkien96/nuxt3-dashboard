import { menuDelete } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await menuDelete(Number(id))
})
