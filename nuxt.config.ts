import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: "TickTask",
    },
  },

  modules: ["@nuxtjs/color-mode", "@nuxt/icon"],
  colorMode: {
    classSuffix: "",
  },
  icon: {
    customCollections: [
    {
      prefix: 'local',
      dir: './assets/icons/',
      recursive: true
    }
    ]
  },
});