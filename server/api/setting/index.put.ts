import { settingUpdate } from '~/server/models/setting'

export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  if(!data) throw createError({ status: 401, message: 'Data is empty' })
  return await settingUpdate(1, data)
})
