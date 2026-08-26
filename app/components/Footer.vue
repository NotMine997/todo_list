<template>
  <footer
    class="border-t border-border-primary bg-surface-secondary transition-colors"
  >
    <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 xl:gap-12">
        <div class="space-y-4 md:col-span-1">
          <span
            class="flex items-center gap-2 text-lg font-bold tracking-tight text-text-primary"
          >
            <!-- LOGO HERE -->
            <span
              class="flex h-6 w-6 items-center justify-center rounded-lg bg-accent text-sm font-bold text-text-on-accent"
            >
            
            </span>
            TickTask
          </span>
          <p class="text-sm leading-relaxed text-text-secondary">
            Удобный планировщик задач.
          </p>
        </div>

        <div>
          <h3
            class="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Продукт
          </h3>
          <ul class="mt-4 space-y-2.5">
            <li>
              <a
                href="#"
                class="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Возможности
              </a>
            </li>
            <li>
              <a
                href="#"
                class="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                Контакты
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 border-t border-border-primary pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <p class="text-xs text-text-muted">
          &copy; 2026 TickTask. Права не защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>
