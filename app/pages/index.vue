<script setup lang="ts">
const features = [
  {
    title: 'Список задач',
    description: 'Простой todo-лист: добавляйте, отмечайте выполненные и удаляйте ненужные дела.',
    icon: 'local:task'
  },
  {
    title: 'Прогноз погоды',
    description: 'Актуальная погода в любом городе: температура, влажность, ветер и ощущения.',
    icon: 'local:cloud'
  },
  {
    title: 'Часы и таймеры',
    description: 'Текущее время, секундомер и таймер обратного отсчёта — всегда под рукой.',
    icon: 'local:clock'
  },
  {
    title: 'ИИ-ассистент',
    description: 'Задавайте вопросы и получайте ответы — умный помощник на каждый день.',
    icon: 'local:star'
  },
];
</script>

<template>
  <main
    class="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300">

    <header class="max-w-6xl mx-auto text-center mb-16">
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
        Всё в одном месте
      </h1>
      <p class="text-text-secondary text-md max-w-2xl mx-auto mb-8">
        Простой инструмент для повседневных дел: задачи, погода, время и умный ассистент —
        в одном аккуратном интерфейсе.
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <nuxt-link to="/tasks">
          <button
            class="px-6 py-2.5 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-md rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer">
            Начать
          </button>
        </nuxt-link>
        <a href="#about">
          <button
            class="px-6 py-2.5 bg-surface-secondary hover:bg-surface-hover border border-border-primary text-text-primary font-medium text-md rounded-lg transition-colors focus:outline-none cursor-pointer">
            Узнать больше
          </button>
        </a>
      </div>
    </header>

    <section class="max-w-6xl mx-auto mb-16">
      <h2 class="text-2xl font-bold text-text-primary tracking-tight text-center mb-8">
        Возможности
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <article v-for="feature in features" :key="feature.title"
          class="bg-surface-primary rounded-xl p-6 border border-border-primary transition-colors duration-300 hover:bg-surface-hover">
          <div
            class="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-secondary border border-border-primary text-accent text-xl mb-4 select-none">
            <Icon :name="feature.icon" size="26"/>
          </div>
          <h3 class="text-md font-semibold text-text-primary mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-s text-text-secondary leading-relaxed">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </section>

    <section id="about" class="max-w-3xl mx-auto text-center mb-16">
      <h2 class="text-2xl font-bold text-text-primary tracking-tight mb-4">
        О проекте
      </h2>
      <p class="text-text-secondary text-md leading-relaxed">
        Мы собрали в одном месте всё, что нужно для продуктивного дня: планирование задач,
        быстрый доступ к прогнозу погоды, работа с временем и интеллектуальный помощник.
        Никаких лишних настроек — только то, что действительно помогает.
      </p>
    </section>

    <section
      class="max-w-3xl mx-auto bg-surface-primary border border-border-primary rounded-xl p-8 text-center transition-colors duration-300">
      <h2 class="text-xl font-bold text-text-primary mb-3 tracking-tight">
        Готовы начать?
      </h2>
      <p class="text-text-secondary text-s mb-6">
        Создайте первую задачу прямо сейчас — это займёт несколько секунд.
      </p>
      <nuxt-link to="/tasks">
        <button
          class="px-6 py-2.5 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-md rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer">
          Попробовать
        </button>
      </nuxt-link>
    </section>

  </main>
</template>