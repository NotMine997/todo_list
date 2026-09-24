<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('--:--:--')
let timer = null

onMounted(() => {
  const updateClock = () => {
    currentTime.value = new Date().toLocaleTimeString('ru-RU')
  }

  updateClock()
  timer = setInterval(updateClock, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <main
    class="min-h-screen flex items-start justify-center bg-bg-primary px-4 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300"
  >
    <div
      class="w-full max-w-5xl flex items-center justify-center bg-surface-primary border border-border-primary rounded-xl py-16 px-8 transition-colors duration-300 select-none mt-16"
    >
      <div
        class="text-text-primary font-mono tabular-nums font-bold leading-none text-[clamp(2rem,10vw,7rem)] tracking-tight transition-colors duration-300"
      >
        {{ currentTime }}
      </div>
    </div>
  </main>
</template>