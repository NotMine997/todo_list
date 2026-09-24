<script setup>
import { ref, computed, onMounted, watch } from "vue";

const todos = ref([]);
const newTodoText = ref("");
const filter = ref("all");

onMounted(() => {
  const savedTodos = localStorage.getItem("nuxt4-todos");
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos);
  }
});

watch(
  todos,
  (newTodos) => {
    localStorage.setItem("nuxt4-todos", JSON.stringify(newTodos));
  },
  { deep: true },
);


const filteredTodos = computed(() => {
  if (filter.value === "active") return todos.value.filter((t) => !t.completed);
  if (filter.value === "completed")
    return todos.value.filter((t) => t.completed);
  return todos.value;
});

const activeCount = computed(
  () => todos.value.filter((t) => !t.completed).length,
);

const addTodo = () => {
  const text = newTodoText.value.trim();
  if (!text) return;

  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
  });
  newTodoText.value = "";
};

const toggleTodo = (id) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) todo.completed = !todo.completed;
};

const deleteTodo = (id) => {
  todos.value = todos.value.filter((t) => t.id !== id);
};

const clearCompleted = () => {
  todos.value = todos.value.filter((t) => !t.completed);
};
</script>

<template>
  <main
    class="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300"
  >
    <div
      class="w-1/2 mx-auto bg-surface-primary rounded-xl overflow-hidden p-6 transition-colors duration-300 select-none"
    >
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-text-primary tracking-tight">
          Мои задачи
        </h1>
        <span
          class="bg-accent text-text-on-accent text-s font-semibold px-2.5 py-1 rounded-full transition-colors duration-300"
        >
          Осталось: {{ activeCount }}
        </span>
      </div>

      <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="Что нужно сделать?"
          class="flex-1 px-4 py-2 border border-border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm transition-all bg-input-bg text-text-primary"
        />
        <button
          type="submit"
          class="px-4 py-2 min-w-1/3 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-md rounded-lg transition-colors focus:outline-none cursor-pointer"
        >
          Добавить
        </button>
      </form>

      <div
        class="flex items-center justify-between border-b border-border-primary pb-4 mb-4 text-s font-medium text-text-secondary"
      >
        <div class="flex gap-1">
          <button
            @click="filter = 'all'"
            :class="[
              'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
              filter === 'all'
                ? 'bg-surface-active text-text-primary'
                : 'hover:text-text-primary',
            ]"
          >
            Все
          </button>
          <button
            @click="filter = 'active'"
            :class="[
              'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
              filter === 'active'
                ? 'bg-surface-active text-text-primary'
                : 'hover:text-text-primary',
            ]"
          >
            Активные
          </button>
          <button
            @click="filter = 'completed'"
            :class="[
              'px-2.5 py-1 rounded-md transition-colors cursor-pointer',
              filter === 'completed'
                ? 'bg-surface-active text-text-primary'
                : 'hover:text-text-primary',
            ]"
          >
            Выполненные
          </button>
        </div>

        <button
          @click="clearCompleted"
          class="hover:text-status-danger transition-colors text-text-muted cursor-pointer"
        >
          Удалить выполненные
        </button>
      </div>

      <TransitionGroup
        name="list"
        tag="ul"
        class="space-y-2 max-h-150 overflow-y-auto pr-1"
      >
        <li
          v-for="todo in filteredTodos"
          :key="todo.id"
          class="flex items-center justify-between p-3 bg-surface-secondary hover:bg-surface-hover rounded-lg group transition-colors border border-border-primary"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
              class="h-4 w-4 rounded text-accent focus:ring-accent cursor-pointer"
            />
            <span
              :class="[
                'text-sm truncate select-none cursor-pointer flex-1 transition-colors',
                todo.completed
                  ? 'line-through text-text-muted'
                  : 'text-text-primary',
              ]"
              @click="toggleTodo(todo.id)"
            >
              {{ todo.text }}
            </span>
          </div>

          <button
            @click="deleteTodo(todo.id)"
            class="text-text-muted hover:text-status-danger p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label="Удалить задачу"
          >
          </button>
        </li>
      </TransitionGroup>

      <div
        v-if="filteredTodos.length === 0"
        class="text-center py-8 text-md text-text-muted"
      >
        Список задач пуст
      </div>
    </div>
  </main>
</template>

