<template>
  <header class="sticky top-0 z-50 border-b border-gray-100 bg-white/70 backdrop-blur-md dark:border-gray-800/60 dark:bg-gray-950/70">
    <div class="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
      
      <div class="flex lg:flex-1">
        <a href="/" class="flex items-center gap-2.5 text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white shadow-sm shadow-indigo-500/30">
            <!-- LOGO HERE -->
          </span>
          TickTask
        </a>
      </div>


      <nav class="hidden lg:flex lg:gap-x-10">
        <!-- ЦВЕТОВАЯ ЗАГЛУШКА -->
        <a href="#" class="text-sm font-medium text-indigo-600 dark:text-indigo-400">Главная</a> 
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Задачи</a>
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Статистика</a>
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Время</a>
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">Погода</a>
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">ИИ-Ассистент</a>
      </nav>

      <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-6">
        <a href="#" class="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
          Мой профиль
        </a>

      </div>

    </div>
  </header>
</template>