// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: [
        '@nuxt/eslint',
        '@nuxt/ui',
        '@nuxt/fonts',
        '@vueuse/nuxt'
    ],
    ui: {
        icons: ['heroicons', 'simple-icons'],
        safelistColors: ["primary", "red", "orange", "green"],
    },
    colorMode: {
        preference: "light",
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    vite: {
        optimizeDeps: {
            include: ["vue3-smooth-dnd"],
        },
    },
});
