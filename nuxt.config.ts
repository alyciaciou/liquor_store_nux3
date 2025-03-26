// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: false,
    runtimeConfig: {
        public: {
            baseUrl: "https://vue3-course-api.hexschool.io/v2",
            appBase: "/liquor_store/",
        },
    },
    app: {
        baseURL:
            process.env.DEPLOY_ENV === "GH_PAGES" ? "/liquor_store_nux3/" : "/",
    },
    modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
    components: {
        dirs: [
            {
                path: "~/components/global",
                global: true,
            },
        ],
    },
});
