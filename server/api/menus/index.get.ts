import { menuFindMany } from "~/server/models/menus"

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await menuFindMany(query)
})
