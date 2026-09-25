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

      <!-- Desktop nav -->
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

      <!-- Desktop auth + theme -->
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

      <!-- Mobile: theme toggle + burger -->
      <div class="flex items-center gap-x-3 lg:hidden">
        <button @click="toggleTheme" class="flex">
          <ColorScheme placeholder="...">
            <span v-if="colorMode.value === 'dark'" class="flex"
              ><Icon name="local:dark" size="28"
            /></span>
            <span v-else class="flex"><Icon name="local:light" size="28" /></span>
          </ColorScheme>
        </button>
        <button
          @click="mobileOpen = !mobileOpen"
          class="flex h-9 w-9 items-center justify-center rounded-xl border border-border-primary text-text-primary"
          aria-label="Меню"
        >
          <svg
            v-if="!mobileOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="lg:hidden border-t border-border-primary bg-surface-secondary"
      >
        <nav class="mx-auto flex max-w-7xl flex-col gap-y-1 px-4 py-4 sm:px-5">
          <nuxt-link
            to="/"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
            @click="mobileOpen = false"
            >Главная</nuxt-link
          >
          <nuxt-link
            to="/tasks"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
            @click="mobileOpen = false"
            >Задачи</nuxt-link
          >
          <nuxt-link
            to="/time"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
            @click="mobileOpen = false"
            >Время</nuxt-link
          >
          <nuxt-link
            to="/weather"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
            @click="mobileOpen = false"
            >Погода</nuxt-link
          >
          <nuxt-link
            to="/ai"
            class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
            @click="mobileOpen = false"
            >ИИ-Ассистент</nuxt-link
          >

          <div class="mt-2 flex flex-col gap-y-2 border-t border-border-primary pt-3">
            <nuxt-link
              to="/auth/login"
              class="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-surface-primary hover:text-text-primary transition-colors"
              @click="mobileOpen = false"
              >Войти</nuxt-link
            >
            <nuxt-link
              to="/auth/register"
              class="inline-flex h-10 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-text-on-accent shadow-sm hover:bg-accent-hover transition-colors"
              @click="mobileOpen = false"
              >Регистрация</nuxt-link
            >
          </div>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
const colorMode = useColorMode();
const mobileOpen = ref(false);

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>