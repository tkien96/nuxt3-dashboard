import { usersFindMany } from "~/server/models/users"

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await usersFindMany(query)
})
