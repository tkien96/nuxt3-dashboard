import { get_menus } from "~/server/models/menus"

export default defineEventHandler(async (event) => {
  return await get_menus()
})
