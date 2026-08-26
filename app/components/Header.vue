<template>
  <header
    class="sticky top-0 z-50 bg-surface-secondary border-b border-border-primary"
  >
    <div
      class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8"
    >
      <div class="flex lg:flex-1">
        <a
          href="/"
          class="flex items-center gap-2.5 text-xl font-black tracking-tight text-text-primary"
        >
          <span
            class="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-sm font-bold text-text-on-accent shadow-sm shadow-accent/30"
          >
            <!-- LOGO HERE -->
          </span>
          TickTask
        </a>
      </div>

      <nav class="hidden lg:flex lg:gap-x-10">
        <a href="#" class="text-sm font-medium text-accent transition-colors">
          Главная
        </a>
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Задачи
        </a>
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Статистика
        </a>
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Время
        </a>
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Погода
        </a>
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          ИИ-Ассистент
        </a>
      </nav>

      <div
        class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6"
      >
        <a
          href="#"
          class="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          Войти
        </a>
        <a
          href="#"
          class="inline-flex h-9 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-text-on-accent shadow-sm hover:bg-accent-hover transition-colors"
        >
          Регистрация
        </a>
        <button
          @click="toggleTheme"
          class=""
        >
        <ColorScheme placeholder="...">
          <span v-if="colorMode.value === 'dark'"><Icon name="local:dark" size="34" class=""/></span>
          <span v-else><Icon name="local:light" size="34" class=""/></span>
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
