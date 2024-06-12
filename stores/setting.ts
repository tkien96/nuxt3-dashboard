import { defineStore } from "pinia"

export const useSetting = defineStore("settingStore", () => {
    const setting = ref()

    const setSetting = async (data: any) => await setting.value(data)
    const getSetting = async () => {
        const data = await useFetch(`/api/setting`)
        await setSetting(data)
    }

    return  { setting, setSetting, getSetting };
})