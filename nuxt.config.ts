import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  runtimeConfig: {
    openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  },
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: "TickTask",
    },
  },

  modules: ["@nuxtjs/color-mode", "@nuxt/icon", "nuxt-time", "@vite-pwa/nuxt"],
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  icon: {
    clientBundle: {
      includeCustomCollections: true,
    },
    customCollections: [
      {
        prefix: "local",
        dir: "./app/assets/icons",
        recursive: true,
      },
    ],
  },
});
