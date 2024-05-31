// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		"@nuxt/eslint",
		"@nuxt/ui",
		"@nuxt/fonts",
		"@vueuse/nuxt",
		"@pinia/nuxt",
	],
    pinia: {
        storesDirs: ['./stores/**']
    },
	ui: {
		icons: ["heroicons", "simple-icons"],
		safelistColors: ["primary", "red", "orange", "green"],
	},
	colorMode: {
		preference: "system",
	},
	vite: {
		optimizeDeps: {
			include: ["vue3-smooth-dnd"],
		},
	},
});
