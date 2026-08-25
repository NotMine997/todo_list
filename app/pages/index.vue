<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all') 

onMounted(() => {
  const savedTodos = localStorage.getItem('nuxt4-todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
})

watch(todos, (newTodos) => {
  localStorage.setItem('nuxt4-todos', JSON.stringify(newTodos))
}, { deep: true })

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})

const activeCount = computed(() => todos.value.filter(t => !t.completed).length)

const addTodo = () => {
  const text = newTodoText.value.trim()
  if (!text) return

  todos.value.push({
    id: Date.now(),
    text,
    completed: false
  })
  newTodoText.value = ''
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

const clearCompleted = () => {
  todos.value = todos.value.filter(t => !t.completed)
}
</script>

<template>
  <main class="min-h-screen bg-neutral-900/20 py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-800">
    <div class="w-1/2 mx-auto bg-neutral-100 rounded-xl shadow-md overflow-hidden p-6 border border-slate-100 colors-transition">
      
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Мои задачи</h1>
        <span class="bg-indigo-200 text-black-600 text-s font-semibold px-2.5 py-1 rounded-full">
          Осталось: {{ activeCount }}
        </span>
      </div>

      <form @submit.prevent="addTodo" class="flex gap-2 mb-6">
        <input
          v-model="newTodoText"
          type="text"
          placeholder="Что нужно сделать?"
          class="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-transparent text-sm transition-all"
        />
        <button
          type="submit"
          class="px-4 py-2 min-w-1/3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-md rounded-lg transition-colors focus:outline-none"
        >
          Добавить
        </button>
      </form>

      <div class="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 text-s font-medium text-slate-500">
        <div class="flex gap-1">
          <button 
            @click="filter = 'all'" 
            :class="['px-2.5 py-1 rounded-md transition-colors', filter === 'all' ? 'bg-slate-100 text-slate-900' : 'hover:text-slate-900']"
          >
            Все
          </button>
          <button 
            @click="filter = 'active'" 
            :class="['px-2.5 py-1 rounded-md transition-colors', filter === 'active' ? 'bg-slate-100 text-slate-900' : 'hover:text-slate-900']"
          >
            Активные
          </button>
          <button 
            @click="filter = 'completed'" 
            :class="['px-2.5 py-1 rounded-md transition-colors', filter === 'completed' ? 'bg-slate-100 text-slate-900' : 'hover:text-slate-900']"
          >
            Выполненные
          </button>
        </div>
        
        <button 
          @click="clearCompleted"
          class="hover:text-red-600 transition-colors text-slate-400"
        >
          Удалить выполненные
        </button>
      </div>

      <TransitionGroup 
        name="list" 
        tag="ul" 
        class="space-y-2 max-h-100 overflow-y-auto pr-1"
      >
        <li 
          v-for="todo in filteredTodos" 
          :key="todo.id"
          class="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 rounded-lg group transition-colors border border-slate-100"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodo(todo.id)"
              class="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <span 
              :class="['text-sm truncate select-none cursor-pointer flex-1', todo.completed ? 'line-through text-slate-400' : 'text-slate-700']"
              @click="toggleTodo(todo.id)"
            >
              {{ todo.text }}
            </span>
          </div>
          
          <button
            @click="deleteTodo(todo.id)"
            class="text-slate-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            aria-label="Удалить задачу"
          >
          </button>
        </li>
      </TransitionGroup>

      <div v-if="filteredTodos.length === 0" class="text-center py-8 text-md text-slate-400">
        Список задач пуст
      </div>

    </div>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
