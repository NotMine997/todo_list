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
  pwa: {
    strategies: "injectManifest",
    srcDir: "service-worker",
    filename: "sw.ts",
    registerType: "autoUpdate",
    manifest: {
      name: "Nuxt 4 PWA Application",
      short_name: "Nuxt4PWA",
      theme_color: "#00dc82", 
      lang: "ru",
    },
    workbox: {
      navigateFallback: '/', 
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'] 
    },
    devOptions: {
      enabled: true, 
      type: "module",
    },
  },
  experimental: {
    appManifest: true
  }
});
