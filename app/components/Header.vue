<template>
  <header
    class="sticky top-0 z-50 bg-surface-secondary border-b border-border-primary transition-colors duration-300"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between p-3 sm:px-5 lg:px-7 select-none"
    >
      <div class="flex lg:flex-1">
        <nuxt-link
          to="/"
          class="flex items-center gap-2.5 text-xl font-black tracking-tight text-text-primary"
        >
          <Icon name="local:logo" size="29" /> TickTask</nuxt-link
        >
      </div>

      <nav class="hidden lg:flex lg:gap-x-10">
        <nuxt-link
          to="/"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >Главная</nuxt-link
        >
        <nuxt-link
          to="/tasks"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >Задачи</nuxt-link
        >
        <nuxt-link
          to="/time"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >Время</nuxt-link
        >
        <nuxt-link
          to="/weather"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >Погода</nuxt-link
        >
        <nuxt-link
          to="/ai"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >ИИ-Ассистент</nuxt-link
        >
      </nav>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6"
      >
        <nuxt-link
          to="/auth/login"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors select-none"
        >
          Войти
        </nuxt-link>
        <nuxt-link
          to="/auth/register"
          class="inline-flex h-9 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-text-on-accent shadow-sm hover:bg-accent-hover transition-colors"
        >
          Регистрация
      </nuxt-link>
        <button @click="toggleTheme" class="flex">
          <ColorScheme placeholder="...">
            <span v-if="colorMode.value === 'dark'" class="flex"
              ><Icon name="local:dark" size="31" class=""
            /></span>
            <span v-else class="flex"><Icon name="local:light" size="31" class="" /></span>
          </ColorScheme>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
