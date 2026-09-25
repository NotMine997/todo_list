<script setup>
import { useTimeTools } from '~/composables/useTimeTools'

const {
  currentTime,
  swRunning,
  swElapsed,
  startSw,
  stopSw,
  resetSw,
  timerTotal,
  timerLeft,
  timerRunning,
  startTimer,
  stopTimer,
  resetTimer,
  setTimerMinutes,
  fmtHMS,
  fmtSeconds,
} = useTimeTools()
</script>

<template>
  <main
    class="min-h-screen flex items-start justify-center bg-bg-primary px-4 sm:px-6 lg:px-8 font-sans text-text-primary transition-colors duration-300 py-16"
  >
    <div class="w-full max-w-5xl flex flex-col gap-6">
      <!-- ====================== ЧАСЫ ====================== -->
      <div
        class="w-full flex items-center justify-center bg-surface-primary border border-border-primary rounded-xl py-16 px-8 transition-colors duration-300 select-none"
      >
        <div
          class="text-text-primary font-mono tabular-nums font-bold leading-none text-[clamp(2rem,10vw,7rem)] tracking-tight transition-colors duration-300"
        >
          {{ currentTime }}
        </div>
      </div>

      <!-- ============ ТАЙМЕР + СЕКУНДОМЕР ============ -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Секундомер -->
        <section class="bg-surface-primary border border-border-primary rounded-xl p-6 transition-colors duration-300">
          <h2 class="text-xl font-bold text-text-primary tracking-tight mb-4">Секундомер</h2>

          <div
            class="text-center font-mono tabular-nums font-bold leading-none text-text-primary text-[clamp(2rem,6vw,3.5rem)] mb-6 select-none"
          >
            {{ fmtHMS(swElapsed) }}
          </div>

          <div class="flex gap-2">
            <button
              v-if="!swRunning"
              @click="startSw"
              class="flex-1 px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              Старт
            </button>
            <button
              v-else
              @click="stopSw"
              class="flex-1 px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              Пауза
            </button>
            <button
              @click="resetSw"
              class="flex-1 px-4 py-2 bg-surface-secondary hover:bg-surface-hover border border-border-primary text-text-primary font-medium text-sm rounded-lg transition-colors focus:outline-none cursor-pointer"
            >
              Сброс
            </button>
          </div>
        </section>

        <!-- Таймер -->
        <section class="bg-surface-primary border border-border-primary rounded-xl p-6 transition-colors duration-300">
          <h2 class="text-xl font-bold text-text-primary tracking-tight mb-4">Таймер</h2>

          <div
            class="text-center font-mono tabular-nums font-bold leading-none text-text-primary text-[clamp(2rem,6vw,3.5rem)] mb-6 select-none"
          >
            {{ fmtSeconds(timerLeft) }}
          </div>

          <div class="flex gap-2 mb-3">
            <button
              v-if="!timerRunning"
              @click="startTimer"
              class="flex-1 px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              Старт
            </button>
            <button
              v-else
              @click="stopTimer"
              class="flex-1 px-4 py-2 bg-accent hover:bg-accent-hover text-text-on-accent font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
            >
              Пауза
            </button>
            <button
              @click="resetTimer"
              class="flex-1 px-4 py-2 bg-surface-secondary hover:bg-surface-hover border border-border-primary text-text-primary font-medium text-sm rounded-lg transition-colors focus:outline-none cursor-pointer"
            >
              Сброс
            </button>
          </div>

          <div class="flex gap-1 text-s">
            <button
              v-for="m in [1, 5, 10, 25]"
              :key="m"
              @click="setTimerMinutes(m)"
              :class="[
                'flex-1 px-2 py-1 rounded-md transition-colors cursor-pointer',
                timerTotal === m * 60
                  ? 'bg-surface-active text-text-primary'
                  : 'text-text-secondary hover:text-text-primary',
              ]"
            >
              {{ m }} мин
            </button>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>