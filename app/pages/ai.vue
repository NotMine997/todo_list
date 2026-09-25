<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useOllamaChat } from '~/composables/useOllamaChat';

const { messages, loading, send, cancel, clear } = useOllamaChat();
const input = ref('');
const scroller = ref<HTMLElement | null>(null);

const submit = () => {
  const text = input.value.trim();
  if (!text || loading.value) return;
  send(text);
  input.value = '';
};

watch(
  () => messages.value[messages.value.length - 1]?.content,
  async () => {
    await nextTick();
    scroller.value?.scrollTo({ top: scroller.value.scrollHeight });
  },
);
</script>

<template>
  <main
    class="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300"
  >
    <section
      class="w-1/2 mx-auto bg-surface-primary rounded-xl p-6 transition-colors duration-300 flex flex-col"
    >
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-text-primary tracking-tight">
          ИИ-Ассистент
        </h2>
        <button
          @click="clear"
          :disabled="loading"
          class="text-s text-text-muted hover:text-status-danger disabled:opacity-50 transition-colors cursor-pointer"
        >
          Очистить
        </button>
      </div>

      <div
        ref="scroller"
        class="flex-1 space-y-2 max-h-100 overflow-y-auto pr-1 mb-4"
      >
        <div
          v-for="(m, i) in messages"
          :key="i"
          :class="[
            'p-3 rounded-lg text-sm whitespace-pre-wrap transition-colors duration-300 max-w-[85%]',
            m.role === 'user'
              ? 'ml-auto bg-accent text-text-on-accent'
              : 'bg-surface-secondary border border-border-primary text-text-primary',
          ]"
        >
          {{ m.content || '…' }}
        </div>

        <div
          v-if="loading && !messages[messages.length - 1]?.content"
          class="text-text-muted text-s"
        >
          Ассистент печатает…
        </div>
      </div>

      <form @submit.prevent="submit" class="flex gap-2">
        <input
          v-model="input"
          type="text"
          placeholder="Спросите что-нибудь..."
          :disabled="loading"
          class="flex-1 px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all bg-input-bg text-text-primary disabled:opacity-50"
        />
        <button
          v-if="!loading"
          type="submit"
          class="px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-md rounded-lg transition-colors focus:outline-none cursor-pointer"
        >
          Отправить
        </button>
        <button
          v-else
          type="button"
          @click="cancel"
          class="px-4 py-2 bg-surface-secondary hover:bg-surface-hover border border-border-primary text-text-primary font-medium text-md rounded-lg transition-colors focus:outline-none cursor-pointer"
        >
          Стоп
        </button>
      </form>
    </section>
  </main>
</template>