import { menusDelete } from "~/server/models/menus";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await menusDelete(Number(id))
})
