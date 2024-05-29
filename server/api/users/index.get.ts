import { get_users } from "~/server/models/users"

export default defineEventHandler(async (event) => {
  return await get_users()
})
